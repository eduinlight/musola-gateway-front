import Action from "./Action";

export class ChangeState<State> extends Action<State, Partial<State>> {
  callReducer(state: State, payload?: Partial<State>): void {
    Object.assign(state, payload);
  }
}
