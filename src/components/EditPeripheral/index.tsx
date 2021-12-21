import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo
} from "react";
import { useTypedSelector } from "../../core/hooks/use_typed_selector";
import { useDispatch } from "react-redux";
import { gatewayListActions } from "../../redux/gatewayList/actions";
import { IGateway } from "../../core/interfaces/gateway.model";
import { Grid } from "@material-ui/core";
import useRoutes from "../../core/hooks/useRoutes";
import useApiGetGateway, {
  apiGetGatewayEvents
} from "../../core/hooks/api/gateways/useApiGetGateway";
import { useParams } from "react-router";
import useEmitterEvents from "../../core/hooks/useEmitterEvents";
import PeripheralForm from "../shared/PeripheralForm";
import { IPeripheral } from "../../core/interfaces/peripheral.model";

export interface EditPeripheralProps {}

const EditPeripheral: FunctionComponent<EditPeripheralProps> = ({}) => {
  const dispatch = useDispatch();
  const { selectedGateway, selectedPeripheral } = useTypedSelector(
    (store) => store.gatewayList
  );
  const { goToDetailsGateway, goToHome } = useRoutes();
  const { sendRequest: getGateway } = useApiGetGateway();
  const params = useParams() as any;

  const handleGetGatewaySuccess = useCallback(
    (gateway: IGateway) => {
      dispatch(gatewayListActions.change.call({ selectedGateway: gateway }));
      const peripheral = gateway.peripherals.find(
        (peripheral) => peripheral.id === params.id
      );
      if (peripheral) {
        dispatch(
          gatewayListActions.change.call({ selectedPeripheral: peripheral })
        );
      } else {
        goToHome();
      }
    },
    [dispatch, goToHome, params.id]
  );

  const events = useMemo(
    () => [
      { event: apiGetGatewayEvents.success, handler: handleGetGatewaySuccess }
    ],
    [handleGetGatewaySuccess]
  );

  useEmitterEvents(events);

  useEffect(() => {
    if (!selectedGateway && params.gatewayId) {
      getGateway({ id: params.gatewayId });
    }
  }, [getGateway, params.gatewayId, selectedGateway]);

  const handleResponse = useCallback(
    (peripheral: IPeripheral) => {
      dispatch(gatewayListActions.editPeripheral.call(peripheral));
      goToDetailsGateway({ id: peripheral.gateway });
    },
    [dispatch, goToDetailsGateway]
  );

  return (
    <Grid container justifyContent="flex-start" direction="column" spacing={2}>
      <Grid item>
        {selectedPeripheral && (
          <PeripheralForm
            onResponse={handleResponse}
            gateway={selectedGateway}
            peripheral={selectedPeripheral}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default EditPeripheral;
