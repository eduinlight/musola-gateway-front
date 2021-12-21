import React, { FunctionComponent } from "react";
import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import AddPeripheral from "../../components/AddPeripheral";
import useRoutes from "../../core/hooks/useRoutes";
import { useTypedSelector } from "../../core/hooks/use_typed_selector";
import { translate } from "../../core/translate";
import AppbarLayout from "../../layouts/AppbarLayout";

interface AddPeripheralRouterProps {}

const AddPeripheralRouter: FunctionComponent<AddPeripheralRouterProps> = () => {
  const { selectedGateway } = useTypedSelector((store) => store.gatewayList);
  const { goToHome, goToDetailsGateway } = useRoutes();

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
            {translate("addPeripheral")}
          </Typography>
        </Breadcrumbs>
      }
    >
      <AddPeripheral />
    </AppbarLayout>
  );
};

export default AddPeripheralRouter;
