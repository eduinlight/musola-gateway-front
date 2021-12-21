import React, { FunctionComponent, useCallback, useMemo } from "react";
import { Box, Grid } from "@material-ui/core";
import { useTypedSelector } from "../../core/hooks/use_typed_selector";
import useOnMount from "../../core/hooks/useOnMount";
import { useDispatch } from "react-redux";
import useApiDeleteGateway, {
  apiDeleteGatewayEvents,
  ApiDeleteGatewayResponse
} from "../../core/hooks/api/gateways/useApiDeleteGateway";
import useApiFilterGateway, {
  apiFilterGatewayEvents
} from "../../core/hooks/api/gateways/useApiFilterGateway";
import { gatewayListActions } from "../../redux/gatewayList/actions";
import { IGateway } from "../../core/interfaces/gateway.model";
import GatewayList from "../shared/GatewayList";
import { translate } from "../../core/translate";
import LoadMoreButton from "../shared/LoadMoreButton";
import useEmitterEvents from "../../core/hooks/useEmitterEvents";
import AddButton from "../shared/AddButton";
import useRoutes from "../../core/hooks/useRoutes";

export interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { gateways, limit, skip } = useTypedSelector(
    (store) => store.gatewayList
  );
  const isEmpty = gateways.length === 0;
  const { sendRequest: listGateways } = useApiFilterGateway();
  const { sendRequest: removeGateway } = useApiDeleteGateway();
  const dispatch = useDispatch();
  const { goToAddGateway, goToEditGateway, goToDetailsGateway } = useRoutes();

  useOnMount(() => {
    if (gateways.length === 0) {
      listGateways({ limit, skip });
    }
    dispatch(gatewayListActions.change.call({ selectedGateway: undefined }));
  });

  const handleGatewayRemoveSuccess = useCallback(
    (response: ApiDeleteGatewayResponse) => {
      if (response) {
        dispatch(gatewayListActions.remove.call(response));
      }
    },
    [dispatch]
  );

  const handleFilterGatewaysSuccess = useCallback(
    (response: IGateway[]) => {
      dispatch(
        gatewayListActions.change.call({ gateways: [...gateways, ...response] })
      );
    },
    [dispatch, gateways]
  );

  const events = useMemo(
    () => [
      {
        event: apiDeleteGatewayEvents.success,
        handler: handleGatewayRemoveSuccess
      },
      {
        event: apiFilterGatewayEvents.success,
        handler: handleFilterGatewaysSuccess
      }
    ],
    [handleFilterGatewaysSuccess, handleGatewayRemoveSuccess]
  );

  useEmitterEvents(events);

  const loadMore = useCallback(() => {
    dispatch(gatewayListActions.change.call({ skip: skip + limit }));
    listGateways({ limit, skip: skip + limit });
  }, [dispatch, limit, listGateways, skip]);

  const handleRemove = useCallback(
    (id: IGateway["id"]) => {
      removeGateway({ id });
    },
    [removeGateway]
  );

  const handleAddGatewayClick = useCallback(() => {
    goToAddGateway();
  }, [goToAddGateway]);

  const handleEdit = useCallback(
    (gateway: IGateway) => {
      dispatch(gatewayListActions.change.call({ selectedGateway: gateway }));
      goToEditGateway({ id: gateway.id });
    },
    [dispatch, goToEditGateway]
  );

  const handleGatewayClick = useCallback(
    (gateway: IGateway) => {
      dispatch(gatewayListActions.change.call({ selectedGateway: gateway }));
      goToDetailsGateway({ id: gateway.id });
    },
    [dispatch, goToDetailsGateway]
  );

  return (
    <Grid container justifyContent="flex-start" direction="column" spacing={2}>
      <Grid item>
        <AddButton onClick={handleAddGatewayClick} />
      </Grid>
      <Grid item>
        {isEmpty && <Box>{translate("noGateways")}</Box>}
        <GatewayList
          gateways={gateways}
          onRemove={handleRemove}
          onEdit={handleEdit}
          onClick={handleGatewayClick}
        />
      </Grid>
      {!isEmpty && (
        <Grid item>
          <LoadMoreButton
            onClick={loadMore}
            title={translate("loadMoreGateways")}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
