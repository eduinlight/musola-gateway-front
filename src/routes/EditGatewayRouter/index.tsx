import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import EditGateway from "../../components/EditGateway";
import useRoutes from "../../core/hooks/useRoutes";
import { useTypedSelector } from "../../core/hooks/use_typed_selector";
import { translate } from "../../core/translate";
import AppbarLayout from "../../layouts/AppbarLayout";

interface EditGatewayRouterProps {}

const EditGatewayRouter: FunctionComponent<EditGatewayRouterProps> = () => {
  const { goToHome, goToDetailsGateway } = useRoutes();
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
              <Link
                color="textPrimary"
                onClick={() => goToDetailsGateway({ id: selectedGateway.id })}
                aria-current="page"
                className="cursor-pointer"
              >
                {selectedGateway.name}
              </Link>
            )}
            <Typography color="textPrimary">
              {translate("editGateway")}
            </Typography>
          </Breadcrumbs>
        </Breadcrumbs>
      }
    >
      <EditGateway />
    </AppbarLayout>
  );
};

export default EditGatewayRouter;
