import { RouteType } from "./components/shared/Routes";
import AddGatewayRouter from "./routes/AddGatewayRouter";
import AddPeripheralRouter from "./routes/AddPeripheralRouter";
import DetailsGatewayRouter from "./routes/DetailsGatewayRouter";
import EditGatewayRouter from "./routes/EditGatewayRouter";
import EditPeripheralRouter from "./routes/EditPeripheralRouter";
import HomeRouter from "./routes/HomeRouter";

export const paths = {
  HOME: "/",
  ADD_GATEWAY: "/add-gateway",
  EDIT_GATEWAY: "/edit-gateway/:id",
  DETAILS_GATEWAY: "/gateway/:id",
  ADD_PERIPHERAL: "/gateway/:gatewayId/add-peripheral",
  EDIT_PERIPHERAL: "/gateway/:gatewayId/edit-peripheral/:id"
};

export const routes: RouteType[] = [
  {
    path: paths.HOME,
    exact: true,
    component: HomeRouter,
    guards: []
  },
  {
    path: paths.ADD_GATEWAY,
    exact: true,
    component: AddGatewayRouter,
    guards: []
  },
  {
    path: paths.DETAILS_GATEWAY,
    exact: true,
    component: DetailsGatewayRouter,
    guards: []
  },
  {
    path: paths.EDIT_GATEWAY,
    exact: true,
    component: EditGatewayRouter,
    guards: []
  },
  {
    path: paths.ADD_PERIPHERAL,
    exact: true,
    component: AddPeripheralRouter,
    guards: []
  },
  {
    path: paths.EDIT_PERIPHERAL,
    exact: true,
    component: EditPeripheralRouter,
    guards: []
  }
];
