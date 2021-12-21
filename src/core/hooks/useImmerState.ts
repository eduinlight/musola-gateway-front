import { useState, useCallback } from "react";
import produce from "immer";

function useImmerState<S>(value: S): [S, (fun: (state: S) => void) => void] {
  const [state, setState] = useState(value);

  const setImmerState = useCallback((fun: (state: S) => void) => {
    setState((oldState: S) => produce(oldState, fun));
  }, []);

  return [state, setImmerState];
}

export default useImmerState;
