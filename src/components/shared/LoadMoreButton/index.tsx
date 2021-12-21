import React, { FunctionComponent } from "react";
import { IconButton, IconButtonProps } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";

export type LoadMoreButtonProps = IconButtonProps;

const LoadMoreButton: FunctionComponent<LoadMoreButtonProps> = (
  props: LoadMoreButtonProps
) => {
  return (
    <IconButton {...props}>
      <Refresh />
    </IconButton>
  );
};

export default LoadMoreButton;
