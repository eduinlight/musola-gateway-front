import { Breadcrumbs, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import Home from "../../components/Home";
import { translate } from "../../core/translate";
import AppbarLayout from "../../layouts/AppbarLayout";

interface HomeRouterProps {}

const HomeRouter: FunctionComponent<HomeRouterProps> = () => {
  return (
    <AppbarLayout
      renderBreadcrum={
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">
            {translate("gatewaysBreadcrum")}
          </Typography>
        </Breadcrumbs>
      }
    >
      <Home />
    </AppbarLayout>
  );
};

export default HomeRouter;
