import type { ReactNode } from "react";

interface ListItemProps {
  itemName: ReactNode;
  className?: string;
}

const ListItem = ({ itemName, className }: ListItemProps) => {
  return <li className={className}>{itemName}</li>;
};

export default ListItem;
