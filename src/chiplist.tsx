import React from "react";
import { HotkeyCommand } from "./common";
import { Chip, ChipContainer, ChipContainerInner, ChipContent, ChipRemove } from "./styles/Chip.styles";
import { List, ListContainer } from "./styles/List.styled";

type ClickableListProps = {
  items: HotkeyCommand[];
  onSelect: (item: HotkeyCommand) => void;
  onRemove: (item: HotkeyCommand) => void;
  mRef?: React.Ref<HTMLUListElement> | null;
};

export function Chiplist(props: ClickableListProps) {
  return (
    <ChipContainer>
      <ChipContainerInner>
        <ChipContent>
          {props.items.map((item, i) => (
            <Chip onClick={() => props.onSelect(item)}>
              {item.hotkey.name + " : " + item.command.command.toLowerCase()}
              <ChipRemove onClick={() => props.onRemove(item)}>x</ChipRemove>
            </Chip>
          ))}
        </ChipContent>
      </ChipContainerInner>
    </ChipContainer>
  );
}
