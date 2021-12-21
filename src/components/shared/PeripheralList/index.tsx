import React, { FunctionComponent } from "react";
import { Box, Divider, List, ListItem } from "@material-ui/core";
import { IPeripheral } from "../../../core/interfaces/peripheral.model";
import PeripheralListItem, {
  PeripheralListItemProps
} from "../PeripheralListItem";

export interface PeripheralListProps {
  peripherals: IPeripheral[];
  onRemove: PeripheralListItemProps["onRemove"];
  onEdit: PeripheralListItemProps["onEdit"];
}

const PeripheralList: FunctionComponent<PeripheralListProps> = ({
  peripherals,
  onRemove,
  onEdit
}: PeripheralListProps) => {
  return (
    <List>
      {peripherals.map((peripheral, index) => (
        <React.Fragment key={peripheral.id}>
          <ListItem button>
            <PeripheralListItem
              peripheral={peripheral}
              onRemove={onRemove}
              onEdit={onEdit}
            />
          </ListItem>
          {index < peripherals.length - 1 && (
            <Box my={1} width="100%">
              <Divider light />
            </Box>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default PeripheralList;
