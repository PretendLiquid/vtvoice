import React from "react";
import { HotkeyCommand } from "./common";
import { List, ListContainer } from "./styles/List.styled";

type ClickableListProps = {
  items: HotkeyCommand[];
  onSelect: (item: HotkeyCommand) => void;
  onRemove: (item: HotkeyCommand) => void;
  mRef?: React.Ref<HTMLUListElement> | null;
};

export function ClickableList(props: ClickableListProps) {
  return (
    <ListContainer>
      <List ref={props.mRef}>
        {props.items.map((item, i) => (
          <li key={i}>
            <button onClick={() => props.onSelect(item)}>
              {item.hotkey.name}
              {item.command.command}
            </button>
            <button onClick={() => props.onRemove(item)}>Remove</button>
          </li>
        ))}
      </List>
    </ListContainer>

  );
}
