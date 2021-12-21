import Action from "./Action";

export abstract class ComplexAction<
  StateType,
  CallType,
  SuccessType,
  FailedType
> extends Action<StateType, CallType> {
  successType: string;
  failedType: string;
  resetType: string;

  constructor(callType: string) {
    super(callType);
    this.successType = `${this.callType}_SUCCESS`;
    this.failedType = `${this.callType}_FAILED`;
    this.resetType = `${this.callType}_RESET`;
  }

  success = (payload?: SuccessType) => {
    return {
      type: this.successType,
      ...this.getPayload(payload)
    };
  };

  failed = (payload?: Partial<FailedType>) => {
    return {
      type: this.failedType,
      ...this.getPayload(payload)
    };
  };

  reset = () => {
    return {
      type: this.resetType
    };
  };

  //eslint-disable-next-line
  successReducer = (_state: StateType, payload: SuccessType) => {};

  //eslint-disable-next-line
  failedReducer = (_state: StateType, payload: FailedType) => {}

  //eslint-disable-next-line
  resetReducer = (_state: StateType) => {};
}

export default ComplexAction;
