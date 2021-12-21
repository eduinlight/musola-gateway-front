import { Action, createReducer } from "../../core/classes/redux-actions-helper";
import { ChangeState } from "../../core/classes/redux-actions-helper/ChangeStateAction";
import { IGateway } from "../../core/interfaces/gateway.model";
import { IPeripheral } from "../../core/interfaces/peripheral.model";

export interface GatewayListState {
  gateways: IGateway[];
  limit: number;
  skip: number;
  selectedGateway?: IGateway;
  selectedPeripheral?: IPeripheral;
}

const initialState = {
  gateways: [],
  limit: 20,
  skip: 0
} as GatewayListState;

class AddGateway extends Action<GatewayListState, IGateway> {
  callReducer(state: GatewayListState, payload: IGateway): void {
    state.gateways.push(payload);
  }
}

class EditGateway extends Action<GatewayListState, IGateway> {
  callReducer(state: GatewayListState, payload: IGateway): void {
    state.gateways = state.gateways.map((g: IGateway) =>
      g.id === payload.id ? payload : g
    );
  }
}

class RemoveGateway extends Action<GatewayListState, string> {
  callReducer(state: GatewayListState, payload: string): void {
    state.gateways = state.gateways.filter((gateway) => gateway.id !== payload);
  }
}

class AddPeripheral extends Action<GatewayListState, IPeripheral> {
  callReducer(state: GatewayListState, payload: IPeripheral): void {
    if (state.selectedGateway) {
      state.selectedGateway = {
        ...state.selectedGateway,
        peripherals: [...state.selectedGateway.peripherals, payload]
      };
    }
  }
}

class EditPeripheral extends Action<GatewayListState, IPeripheral> {
  callReducer(state: GatewayListState, payload: IPeripheral): void {
    if (state.selectedGateway) {
      state.selectedGateway = {
        ...state.selectedGateway,
        peripherals: state.selectedGateway.peripherals.map((peripheral) =>
          peripheral.id === payload.id ? payload : peripheral
        )
      };
    }
  }
}

class RemovePeripheral extends Action<GatewayListState, IPeripheral["id"]> {
  callReducer(state: GatewayListState, payload: IPeripheral["id"]): void {
    if (state.selectedGateway) {
      state.selectedGateway = {
        ...state.selectedGateway,
        peripherals: state.selectedGateway.peripherals.filter(
          (peripheral) => peripheral.id !== payload
        )
      };
    }
  }
}

export const gatewayListActions = {
  change: new ChangeState("GATEWAY_CHANGE_STATE"),
  add: new AddGateway("GATEWAY_ADD"),
  edit: new EditGateway("GATEWAY_EDIT"),
  remove: new RemoveGateway("GATEWAY_REMOVE"),
  addPeripheral: new AddPeripheral("GATEWAY_ADD_PERIPHERAL"),
  editPeripheral: new EditPeripheral("GATEWAY_EDIT_PERIPHERAL"),
  removePeripheral: new RemovePeripheral("GATEWAY_REMOVE_PERIPHERAL")
};

export const gatewayListReducer = createReducer(
  gatewayListActions,
  initialState
);
