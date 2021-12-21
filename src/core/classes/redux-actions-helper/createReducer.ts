import produce from "immer";

const isComplexAction = (action: any) => {
  return !!action.successType;
};

export const createReducer = (
  actions: Record<string, any>,
  initialState: any
) => {
  return (oldState = initialState, action: any): any =>
    produce(oldState, (state: any) => {
      const managers: Record<string, any> = {};
      for (const key of Object.keys(actions)) {
        const actionObj = actions[key];
        managers[actionObj.callType] = actionObj.callReducer;
        if (isComplexAction(actionObj)) {
          managers[actionObj.successType] = actionObj.successReducer;
          managers[actionObj.failedType] = actionObj.failedReducer;
          managers[actionObj.resetType] = actionObj.resetReducer;
        }
      }

      const actionManager = managers[action.type];
      if (actionManager) {
        actionManager(state, action.payload);
      }
    });
};

export default createReducer;
