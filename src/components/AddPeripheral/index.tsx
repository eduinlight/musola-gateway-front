import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo
} from "react";
import { useDispatch } from "react-redux";
import { gatewayListActions } from "../../redux/gatewayList/actions";
import { Grid } from "@material-ui/core";
import useRoutes from "../../core/hooks/useRoutes";
import { IPeripheral } from "../../core/interfaces/peripheral.model";
import PeripheralForm from "../shared/PeripheralForm";
import { useTypedSelector } from "../../core/hooks/use_typed_selector";
import { useParams } from "react-router";
import { IGateway } from "../../core/interfaces/gateway.model";
import useApiGetGateway, {
  apiGetGatewayEvents
} from "../../core/hooks/api/gateways/useApiGetGateway";
import useEmitterEvents from "../../core/hooks/useEmitterEvents";

export interface AddPeripheralProps {}

const AddPeripheral: FunctionComponent<AddPeripheralProps> = ({}) => {
  const dispatch = useDispatch();
  const { goToDetailsGateway } = useRoutes();
  const { selectedGateway } = useTypedSelector((store) => store.gatewayList);
  const params = useParams() as any;
  const { sendRequest: getGateway } = useApiGetGateway();

  const handleGetGatewaySuccess = useCallback(
    (gateway: IGateway) => {
      dispatch(gatewayListActions.change.call({ selectedGateway: gateway }));
    },
    [dispatch]
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
      dispatch(gatewayListActions.addPeripheral.call(peripheral));
      goToDetailsGateway({ id: peripheral.gateway });
    },
    [dispatch, goToDetailsGateway]
  );

  return (
    <Grid container justifyContent="flex-start" direction="column" spacing={2}>
      <Grid item>
        {selectedGateway && (
          <PeripheralForm
            onResponse={handleResponse}
            gateway={selectedGateway}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default AddPeripheral;
