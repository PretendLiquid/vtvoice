import React from "react";
import { ActionCommand } from "./common";
import { Chip, ChipContainer, ChipContainerInner, ChipContent, ChipRemove } from "./styles/Chip.styles";

type ClickableListProps = {
  items: ActionCommand[];
  onSelect: (item: ActionCommand) => void;
  onRemove: (item: ActionCommand) => void;
  mRef?: React.Ref<HTMLUListElement> | null;
};

export function Chiplist(props: ClickableListProps) {
  return (
    <ChipContainer>
      <ChipContainerInner>
        <ChipContent>
          {props.items.map((item, i) => (
            <Chip key={i} onClick={() => props.onSelect(item)}>
              {item.action.name + " : " + item.displayWord}
              <ChipRemove onClick={() => props.onRemove(item)}>x</ChipRemove>
            </Chip>
          ))}
        </ChipContent>
      </ChipContainerInner>
    </ChipContainer>
  );
}
