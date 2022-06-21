import React from "react";
import { AudioContainer, AudioDevice, AudioSelect, MicText } from "./styles/Audio.styled";

type ClickableListProps = {
  items: MediaDeviceInfo[];
  onSelect: (item: MediaDeviceInfo) => void;
  onRemove: (item: MediaDeviceInfo) => void;
  mRef?: React.Ref<HTMLUListElement> | null;
};

export function ClickList(props: ClickableListProps) {
  return (
      <AudioSelect>
        {props.items.map((item, i) => (
          <AudioDevice onClick={() => props.onSelect(item)}>
            {item.label}
          </AudioDevice>
        ))}
      </AudioSelect>
  );
}
