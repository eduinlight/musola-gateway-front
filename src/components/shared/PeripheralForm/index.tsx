import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo
} from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useImmerState from "../../../core/hooks/useImmerState";
import { translate } from "../../../core/translate";
import useEmitterEvents from "../../../core/hooks/useEmitterEvents";
import { AxiosError } from "axios";
import useNotifications from "../../../core/hooks/useNotifications";
import { getService } from "../../../core/services";
import { ResponseUtilsService } from "../../../core/services/responseUtils.service";
import {
  EPeripheralStatus,
  IPeripheral
} from "../../../core/interfaces/peripheral.model";
import useApiAddPeripheral, {
  apiAddPeripheralEvents,
  ApiAddPeripheralParams
} from "../../../core/hooks/api/gateways/useApiAddPeripheral";
import useApiEditPeripheral, {
  apiEditPeripheralEvents
} from "../../../core/hooks/api/gateways/useApiEditPeripheral";
import { IGateway } from "../../../core/interfaces/gateway.model";
import { DateService } from "../../../core/services/date.service";

const responseUtilsService =
  getService<ResponseUtilsService>(ResponseUtilsService);
const dateService = getService<DateService>(DateService);

const useStyles = makeStyles(() => ({
  form: {
    width: "100%"
  }
}));

export interface PeripheralFormProps {
  gateway: IGateway;
  onResponse?: (peripheral: IPeripheral) => void;
  peripheral?: IPeripheral;
}

const PeripheralForm: FunctionComponent<PeripheralFormProps> = ({
  gateway,
  onResponse,
  peripheral
}: PeripheralFormProps) => {
  const styles = useStyles();
  const { state: addPeripheralState, sendRequest: addPeripheralRequest } =
    useApiAddPeripheral();
  const { state: editPeripheralState, sendRequest: editPeripheralRequest } =
    useApiEditPeripheral();
  const initialValue = useMemo<ApiAddPeripheralParams>(
    () => ({
      gateway: "",
      uid: 0,
      vendor: "",
      dateCreated: new Date(),
      status: EPeripheralStatus.ONLINE
    }),
    []
  );
  const initialErrors = useMemo<Record<keyof ApiAddPeripheralParams, string>>(
    () => ({
      gateway: "",
      uid: "",
      vendor: "",
      dateCreated: "",
      status: ""
    }),
    []
  );
  const [state, setState] = useImmerState<ApiAddPeripheralParams>(initialValue);
  const [errors, setErrors] =
    useImmerState<Record<keyof ApiAddPeripheralParams, string>>(initialErrors);
  const loading = peripheral
    ? editPeripheralState.loading
    : addPeripheralState.loading;
  const submitBtnLabel = useMemo(() => {
    let label = "";
    if (peripheral) {
      label = translate("editPeripheral");
    } else {
      label = translate("addPeripheral");
    }
    if (loading) {
      label = translate("loading");
    }
    return label;
  }, [peripheral, loading]);
  const { warning, success } = useNotifications();
  const isValid = useMemo(
    () => state.uid > 0 && state.vendor.trim().length > 0,
    [state.uid, state.vendor]
  );
  const disabled = loading || !isValid;

  useEffect(() => {
    if (peripheral) {
      setState((state) => {
        state.vendor = peripheral.vendor;
        state.uid = peripheral.uid;
        state.status = peripheral.status;
        state.dateCreated = peripheral.dateCreated;
      });
    }
  }, [peripheral, setState]);

  const reset = useCallback(() => {
    setState((state) => {
      Object.assign(state, initialValue);
    });
    setErrors((errors) => {
      Object.assign(errors, initialValue);
    });
  }, [initialValue, setErrors, setState]);

  const handlePeripheralAdded = useCallback(
    (peripheral: IPeripheral) => {
      if (onResponse) {
        onResponse(peripheral);
      }
      reset();
      success(translate("peripheralSucessfullyAdded"));
    },
    [onResponse, reset, success]
  );

  const handlePeripheralEdited = useCallback(
    (peripheral: IPeripheral) => {
      if (onResponse) {
        onResponse(peripheral);
      }
      reset();
      success(translate("peripheralSucessfullyEdited"));
    },
    [onResponse, reset, success]
  );

  const handleError = useCallback(
    (error: AxiosError) => {
      if (error.response) {
        const message = error.response.data.message;
        if (typeof message === "string") {
          warning(message);
        } else {
          const responseErrors =
            responseUtilsService.classValidatorErrorToRecord(message);
          setErrors((errors) => {
            Object.assign(errors, responseErrors);
          });
          warning(translate("fixTheErrors"));
        }
      }
    },
    [setErrors, warning]
  );

  const events = useMemo(
    () => [
      {
        event: apiAddPeripheralEvents.error,
        handler: handleError
      },
      {
        event: apiEditPeripheralEvents.error,
        handler: handleError
      },
      {
        event: apiEditPeripheralEvents.success,
        handler: handlePeripheralEdited
      },
      {
        event: apiAddPeripheralEvents.success,
        handler: handlePeripheralAdded
      }
    ],
    [handleError, handlePeripheralAdded, handlePeripheralEdited]
  );

  useEmitterEvents(events);

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      if (peripheral) {
        editPeripheralRequest({ ...state, id: peripheral.id });
      } else {
        addPeripheralRequest({ ...state, gateway: gateway.id });
      }
    },
    [addPeripheralRequest, editPeripheralRequest, gateway.id, peripheral, state]
  );

  const handleChange = useCallback(
    (key: keyof ApiAddPeripheralParams) => (event: any) => {
      const value = event.target.value;
      setState((state) => {
        let valueChanged: string | number | Date = value;
        if (key === "uid") {
          valueChanged = parseInt(value);
        } else if (key === "dateCreated") {
          valueChanged = new Date(value);
        }
        Object.assign(state, { [key]: valueChanged });
      });
      setErrors((errors) => {
        errors[key] = "";
      });
    },
    [setErrors, setState]
  );

  const handleCheckedChange = useCallback(
    (_, value: boolean) => {
      setState((state) => {
        state.status = value
          ? EPeripheralStatus.ONLINE
          : EPeripheralStatus.OFFLINE;
      });
      setErrors((errors) => {
        errors.status = "";
      });
    },
    [setErrors, setState]
  );

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.form}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            value={state.uid}
            onChange={handleChange("uid")}
            label={translate("uid")}
            error={Boolean(errors.uid)}
            helperText={errors.uid}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={state.vendor}
            onChange={handleChange("vendor")}
            label={translate("vendor")}
            error={Boolean(errors.vendor)}
            helperText={errors.vendor}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            value={dateService.format(state.dateCreated)}
            onChange={handleChange("dateCreated")}
            label={translate("dateCreated")}
            error={Boolean(errors.dateCreated)}
            helperText={errors.dateCreated}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={state.status === EPeripheralStatus.ONLINE}
                  color="primary"
                  onChange={handleCheckedChange}
                />
              }
              label={responseUtilsService.peripheralStatusToStr(state.status)}
            />
          </FormGroup>
        </Grid>
        <Grid item container direction="row">
          <Grid item xs={12} sm={6}>
            <Divider light />
            <Box mt={2} width="100%">
              <Button
                fullWidth
                type="submit"
                disabled={disabled}
                variant="contained"
                color="primary"
              >
                {loading && (
                  <Box mr={2}>
                    <CircularProgress color="primary" size="20px" />
                  </Box>
                )}
                {submitBtnLabel}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default PeripheralForm;
