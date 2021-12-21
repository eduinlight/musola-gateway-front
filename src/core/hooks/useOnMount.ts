import { useEffect } from "react";

function useOnMount(handler: () => void, unmountHandler = () => {}): void {
  useEffect(() => {
    handler();

    return unmountHandler();
    // eslint-disable-next-line
  }, []);
}

export default useOnMount;
