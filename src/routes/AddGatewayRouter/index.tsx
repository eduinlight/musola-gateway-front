import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import AddGateway from "../../components/AddGateway";
import useRoutes from "../../core/hooks/useRoutes";
import { translate } from "../../core/translate";
import AppbarLayout from "../../layouts/AppbarLayout";

interface AddGatewayRouterProps {}

const AddGatewayRouter: FunctionComponent<AddGatewayRouterProps> = () => {
  const { goToHome } = useRoutes();

  return (
    <AppbarLayout
      renderBreadcrum={
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="textPrimary"
            onClick={() => goToHome()}
            aria-current="page"
            className="cursor-pointer"
          >
            {translate("gatewaysBreadcrum")}
          </Link>
          <Typography color="textPrimary">{translate("addGateway")}</Typography>
        </Breadcrumbs>
      }
    >
      <AddGateway />
    </AppbarLayout>
  );
};

export default AddGatewayRouter;
