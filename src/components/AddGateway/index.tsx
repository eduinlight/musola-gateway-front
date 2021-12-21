import React, { FunctionComponent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { gatewayListActions } from "../../redux/gatewayList/actions";
import { IGateway } from "../../core/interfaces/gateway.model";
import GatewayForm from "../shared/GatewayForm";
import { Grid } from "@material-ui/core";
import useRoutes from "../../core/hooks/useRoutes";

export interface AddGatewayProps {}

const AddGateway: FunctionComponent<AddGatewayProps> = ({}) => {
  const dispatch = useDispatch();
  const { goToHome } = useRoutes();

  const handleResponse = useCallback(
    (gateway: IGateway) => {
      dispatch(gatewayListActions.add.call(gateway));
      goToHome();
    },
    [dispatch, goToHome]
  );

  return (
    <Grid container justifyContent="flex-start" direction="column" spacing={2}>
      <Grid item>
        <GatewayForm onResponse={handleResponse} />
      </Grid>
    </Grid>
  );
};

export default AddGateway;
