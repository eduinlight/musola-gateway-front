import React, { FunctionComponent } from "react";
import { IconButton, IconButtonProps } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export type RemoveButtonProps = IconButtonProps;

const RemoveButton: FunctionComponent<RemoveButtonProps> = (
  props: RemoveButtonProps
) => {
  return (
    <IconButton {...props}>
      <Delete />
    </IconButton>
  );
};

export default RemoveButton;
