import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import EditPeripheral from "../../components/EditPeripheral";
import useRoutes from "../../core/hooks/useRoutes";
import { useTypedSelector } from "../../core/hooks/use_typed_selector";
import { translate } from "../../core/translate";
import AppbarLayout from "../../layouts/AppbarLayout";

interface EditPeripheralRouterProps {}

const EditPeripheralRouter: FunctionComponent<
  EditPeripheralRouterProps
> = () => {
  const { goToHome, goToDetailsGateway } = useRoutes();
  const { selectedGateway, selectedPeripheral } = useTypedSelector(
    (store) => store.gatewayList
  );

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
            {selectedPeripheral && (
              <Typography color="textPrimary">
                {translate("peripheral") + ": "}
                {selectedPeripheral.uid}
              </Typography>
            )}
            <Typography color="textPrimary">
              {translate("editPeripheral")}
            </Typography>
          </Breadcrumbs>
        </Breadcrumbs>
      }
    >
      <EditPeripheral />
    </AppbarLayout>
  );
};

export default EditPeripheralRouter;
