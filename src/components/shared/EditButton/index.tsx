import React, { FunctionComponent } from "react";
import { IconButton, IconButtonProps } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

export type EditButtonProps = IconButtonProps;

const EditButton: FunctionComponent<EditButtonProps> = (
  props: EditButtonProps
) => {
  return (
    <IconButton {...props}>
      <Edit />
    </IconButton>
  );
};

export default EditButton;
