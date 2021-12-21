import React, { FunctionComponent, PropsWithChildren, useState } from "react";

interface LoadAppProps {}

type LoadAppPropsWithChildren = PropsWithChildren<LoadAppProps>;

// this componest is for configurations previous to react and after redux,
// language, context etc.
// right now dont do nothing but is here for example purpose
const LoadApp: FunctionComponent<LoadAppPropsWithChildren> = (
  props: LoadAppPropsWithChildren
) => {
  const { children } = props;
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <></>;
  }

  return <>{children}</>;
};

export default LoadApp;
