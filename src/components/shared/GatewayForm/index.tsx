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
  Grid,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IGateway } from "../../../core/interfaces/gateway.model";
import useApiAddGateway, {
  apiAddGatewayEvents,
  ApiAddGatewayParams
} from "../../../core/hooks/api/gateways/useApiAddGateway";
import useApiEditGateway, {
  apiEditGatewayEvents
} from "../../../core/hooks/api/gateways/useApiEditGateway";
import useImmerState from "../../../core/hooks/useImmerState";
import { translate } from "../../../core/translate";
import useEmitterEvents from "../../../core/hooks/useEmitterEvents";
import { AxiosError } from "axios";
import useNotifications from "../../../core/hooks/useNotifications";
import { getService } from "../../../core/services";
import { ResponseUtilsService } from "../../../core/services/responseUtils.service";

const responseUtilsService =
  getService<ResponseUtilsService>(ResponseUtilsService);

const useStyles = makeStyles(() => ({
  form: {
    width: "100%"
  }
}));

export interface GatewayFormProps {
  onResponse?: (gateway: IGateway) => void;
  gateway?: IGateway;
}

const GatewayForm: FunctionComponent<GatewayFormProps> = ({
  onResponse,
  gateway
}: GatewayFormProps) => {
  const styles = useStyles();
  const { state: addGatewayState, sendRequest: addGatewayRequest } =
    useApiAddGateway();
  const { state: editGatewayState, sendRequest: editGatewayRequest } =
    useApiEditGateway();
  const initialValue = useMemo<ApiAddGatewayParams>(
    () => ({
      serial: "",
      name: "",
      ipv4: ""
    }),
    []
  );
  const [state, setState] = useImmerState<ApiAddGatewayParams>(initialValue);
  const [errors, setErrors] =
    useImmerState<Record<keyof ApiAddGatewayParams, string>>(initialValue);
  const loading = gateway ? editGatewayState.loading : addGatewayState.loading;
  const submitBtnLabel = useMemo(() => {
    let label = "";
    if (gateway) {
      label = translate("editGateway");
    } else {
      label = translate("addGateway");
    }
    if (loading) {
      label = translate("loading");
    }
    return label;
  }, [gateway, loading]);
  const { warning, success } = useNotifications();
  const isValid = useMemo(
    () =>
      state.ipv4.trim().length > 0 &&
      state.name.trim().length > 0 &&
      state.serial.trim().length > 0,
    [state.ipv4, state.name, state.serial]
  );
  const disabled = loading || !isValid;

  useEffect(() => {
    if (gateway) {
      setState((state) => {
        state.serial = gateway.serial;
        state.ipv4 = gateway.ipv4;
        state.name = gateway.name;
      });
    }
  }, [gateway, setState]);

  const reset = useCallback(() => {
    setState((state) => {
      Object.assign(state, initialValue);
    });
    setErrors((errors) => {
      Object.assign(errors, initialValue);
    });
  }, [initialValue, setErrors, setState]);

  const handleGatewayAdded = useCallback(
    (gateway: IGateway) => {
      if (onResponse) {
        onResponse(gateway);
      }
      reset();
      success(translate("gatewaySucessfullyAdded"));
    },
    [onResponse, reset, success]
  );

  const handleGatewayEdited = useCallback(
    (gateway: IGateway) => {
      if (onResponse) {
        onResponse(gateway);
      }
      reset();
      success(translate("gatewaySucessfullyEdited"));
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
        event: apiEditGatewayEvents.error,
        handler: handleError
      },
      {
        event: apiAddGatewayEvents.error,
        handler: handleError
      },
      {
        event: apiEditGatewayEvents.success,
        handler: handleGatewayEdited
      },
      {
        event: apiAddGatewayEvents.success,
        handler: handleGatewayAdded
      }
    ],
    [handleError, handleGatewayAdded, handleGatewayEdited]
  );

  useEmitterEvents(events);

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      if (gateway) {
        editGatewayRequest({ ...state, id: gateway.id });
      } else {
        addGatewayRequest(state);
      }
    },
    [addGatewayRequest, editGatewayRequest, gateway, state]
  );

  const handleChange = useCallback(
    (key: keyof ApiAddGatewayParams) => (event: any) => {
      const value = event.target.value;
      setState((state) => {
        state[key] = value;
      });
      setErrors((errors) => {
        errors[key] = "";
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
            value={state.serial}
            onChange={handleChange("serial")}
            label={translate("serial")}
            error={Boolean(errors.serial)}
            helperText={errors.serial}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={state.name}
            onChange={handleChange("name")}
            label={translate("name")}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={state.ipv4}
            onChange={handleChange("ipv4")}
            label={translate("ipv4")}
            error={Boolean(errors.ipv4)}
            helperText={errors.ipv4}
          />
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

export default GatewayForm;
