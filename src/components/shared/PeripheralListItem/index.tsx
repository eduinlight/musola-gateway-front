import React, { FunctionComponent, useCallback } from "react";
import { Box, Typography } from "@material-ui/core";
import RemoveButton from "../RemoveButton";
import { translate } from "../../../core/translate";
import EditButton from "../EditButton";
import {
  EPeripheralStatus,
  IPeripheral
} from "../../../core/interfaces/peripheral.model";
import { getService } from "../../../core/services";
import { DateService } from "../../../core/services/date.service";
import { ResponseUtilsService } from "../../../core/services/responseUtils.service";

const dateService = getService<DateService>(DateService);
const responseUtilsService =
  getService<ResponseUtilsService>(ResponseUtilsService);

export interface PeripheralListItemProps {
  peripheral: IPeripheral;
  onRemove: (id: IPeripheral["id"]) => void;
  onEdit: (peripheral: IPeripheral) => void;
}

const PeripheralListItem: FunctionComponent<PeripheralListItemProps> = ({
  peripheral,
  onRemove,
  onEdit
}: PeripheralListItemProps) => {
  const handleRemove = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (onRemove) {
        onRemove(peripheral.id);
      }
    },
    [onRemove, peripheral.id]
  );

  const handleEdit = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (onEdit) {
        onEdit(peripheral);
      }
    },
    [onEdit, peripheral]
  );

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column">
        <Typography>
          <b>{translate("uid")}:</b> {peripheral.uid}
        </Typography>
        <Typography>
          <b>{translate("vendor")}:</b> {peripheral.vendor}
        </Typography>
        <Typography>
          <b>{translate("dateCreated")}:</b>{" "}
          {dateService.format(peripheral.dateCreated)}
        </Typography>
        <Typography
          color={
            peripheral.status === EPeripheralStatus.ONLINE
              ? "textPrimary"
              : "textSecondary"
          }
        >
          <b>{translate("status")}:</b>{" "}
          {responseUtilsService.peripheralStatusToStr(peripheral.status)}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="flex-start">
        <RemoveButton
          onClick={handleRemove}
          title={translate("removePeripheral")}
        />
        <EditButton onClick={handleEdit} title={translate("editPeripheral")} />
      </Box>
    </Box>
  );
};

export default PeripheralListItem;
