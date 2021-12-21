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
import useApiGetGateway, {
  apiGetGatewayEvents
} from "../../core/hooks/api/gateways/useApiGetGateway";
import { useParams } from "react-router";
import useEmitterEvents from "../../core/hooks/useEmitterEvents";
import GatewayCard from "../shared/GatewayCard";
import PeripheralList from "../shared/PeripheralList";
import { IPeripheral } from "../../core/interfaces/peripheral.model";
import useApiDeletePeripheral, {
  apiDeletePeripheralEvents,
  ApiDeletePeripheralResponse
} from "../../core/hooks/api/gateways/useApiDeletePeripheral";
import AddButton from "../shared/AddButton";
import useRoutes from "../../core/hooks/useRoutes";

export interface DetailsGatewayProps {}

const DetailsGateway: FunctionComponent<DetailsGatewayProps> = ({}) => {
  const dispatch = useDispatch();
  const { selectedGateway } = useTypedSelector((store) => store.gatewayList);
  const { sendRequest: getGateway } = useApiGetGateway();
  const params = useParams() as any;
  const { goToAddPeripheral, goToEditPeripheral } = useRoutes();
  const { sendRequest: removePeripheral } = useApiDeletePeripheral();

  const handleRemovePeripheralSuccess = useCallback(
    (response: ApiDeletePeripheralResponse) => {
      if (response) {
        dispatch(gatewayListActions.removePeripheral.call(response));
      }
    },
    [dispatch]
  );

  const handleGetGatewaySuccess = useCallback(
    (gateway: IGateway) => {
      dispatch(gatewayListActions.change.call({ selectedGateway: gateway }));
    },
    [dispatch]
  );

  const events = useMemo(
    () => [
      { event: apiGetGatewayEvents.success, handler: handleGetGatewaySuccess },
      {
        event: apiDeletePeripheralEvents.success,
        handler: handleRemovePeripheralSuccess
      }
    ],
    [handleGetGatewaySuccess, handleRemovePeripheralSuccess]
  );

  useEmitterEvents(events);

  useEffect(() => {
    if (!selectedGateway && params.id) {
      getGateway({ id: params.id });
    }
  }, [getGateway, params.id, selectedGateway]);

  const handleRemove = useCallback(
    (id: IPeripheral["id"]) => {
      removePeripheral({ id });
    },
    [removePeripheral]
  );

  const handleAddGatewayClick = useCallback(() => {
    if (selectedGateway) {
      goToAddPeripheral({ gatewayId: selectedGateway.id });
    }
  }, [goToAddPeripheral, selectedGateway]);

  const handleEdit = useCallback(
    (peripheral: IPeripheral) => {
      if (selectedGateway) {
        dispatch(
          gatewayListActions.change.call({ selectedPeripheral: peripheral })
        );
        goToEditPeripheral({
          id: peripheral.id,
          gatewayId: selectedGateway.id
        });
      }
    },
    [dispatch, goToEditPeripheral, selectedGateway]
  );

  return (
    <Grid container justifyContent="flex-start" direction="column" spacing={2}>
      {selectedGateway && (
        <>
          <Grid item>
            <GatewayCard gateway={selectedGateway} />
          </Grid>
          <Grid item>{<AddButton onClick={handleAddGatewayClick} />}</Grid>
          <Grid item>
            <PeripheralList
              peripherals={selectedGateway.peripherals}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default DetailsGateway;
