export abstract class Action<StateType, CallType> {
  constructor(public callType: string) {}

  protected getPayload = (payload: any) => {
    return payload !== undefined ? { payload } : {};
  };

  call = (payload?: CallType) => {
    return {
      type: this.callType,
      ...this.getPayload(payload)
    };
  };

  abstract callReducer(state: StateType, payload?: CallType): void;
}

export default Action;
