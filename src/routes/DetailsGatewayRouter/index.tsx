import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import DetailsGateway from "../../components/DetailsGateway";
import useRoutes from "../../core/hooks/useRoutes";
import { useTypedSelector } from "../../core/hooks/use_typed_selector";
import { translate } from "../../core/translate";
import AppbarLayout from "../../layouts/AppbarLayout";

interface DetailsGatewayRouterProps {}

const DetailsGatewayRouter: FunctionComponent<
  DetailsGatewayRouterProps
> = () => {
  const { goToHome } = useRoutes();
  const { selectedGateway } = useTypedSelector((store) => store.gatewayList);

  return (
    <AppbarLayout
      renderBreadcrum={
        <Breadcrumbs aria-label="breadcrumb">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              color="textPrimary"
              onClick={() => goToHome()}
              aria-current="page"
              className="cursor-pointer"
            >
              {translate("gatewaysBreadcrum")}
            </Link>
            {selectedGateway && (
              <Typography color="textPrimary">
                {selectedGateway.name}
              </Typography>
            )}
          </Breadcrumbs>
        </Breadcrumbs>
      }
    >
      <DetailsGateway />
    </AppbarLayout>
  );
};

export default DetailsGatewayRouter;
