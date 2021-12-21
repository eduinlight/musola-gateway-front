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
import GatewayForm from "../shared/GatewayForm";
import { Grid } from "@material-ui/core";
import useRoutes from "../../core/hooks/useRoutes";
import useApiGetGateway, {
  apiGetGatewayEvents
} from "../../core/hooks/api/gateways/useApiGetGateway";
import { useParams } from "react-router";
import useEmitterEvents from "../../core/hooks/useEmitterEvents";

export interface EditGatewayProps {}

const EditGateway: FunctionComponent<EditGatewayProps> = ({}) => {
  const dispatch = useDispatch();
  const { selectedGateway } = useTypedSelector((store) => store.gatewayList);
  const { goToHome } = useRoutes();
  const { sendRequest: getGateway } = useApiGetGateway();
  const params = useParams() as any;

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
    if (!selectedGateway && params.id) {
      getGateway({ id: params.id });
    }
  }, [getGateway, params.id, selectedGateway]);

  const handleResponse = useCallback(
    (gateway: IGateway) => {
      dispatch(gatewayListActions.edit.call(gateway));
      goToHome();
    },
    [dispatch, goToHome]
  );

  return (
    <Grid container justifyContent="flex-start" direction="column" spacing={2}>
      <Grid item>
        <GatewayForm onResponse={handleResponse} gateway={selectedGateway} />
      </Grid>
    </Grid>
  );
};

export default EditGateway;
