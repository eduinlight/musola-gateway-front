import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { RouteType } from ".";

export interface RouteWrapperProps {
  route: RouteType;
}

const RouteWrapper = (props: any) => {
  const { route } = props;
  const [ok, setOk] = useState(true);

  useEffect(() => {
    for (const guard of route.guards) {
      if (!guard()) {
        setOk(false);
      }
    }
  }, [route.guards]);

  if (ok) {
    return <route.component {...props} />;
  }

  if (route.guardsNotPassRedirect) {
    return <Redirect to={route.guardsNotPassRedirect} />;
  }

  return <Redirect to={"/"} />;
};

export default RouteWrapper;
