import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Hotkey } from "vtubestudio";
import { List } from "./styles/List.styled";

type DropDownProps = {
  hotkeys: Hotkey[];
  showDropDown: boolean;
  toggleDropDown: Function;
  hotkeySelection: Function;
};

const DropDown: React.FC<DropDownProps> = ({
  hotkeys,
  hotkeySelection: hotkeySelection
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the hotkey name
   * back to the parent component
   *
   * @param hotkey  The selected hotkey
   */
  const onClickHandler = (hotkey: Hotkey): void => {
    hotkeySelection(hotkey);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <Scrollbars style={{ display: "block", backgroundColor: '#7948df', height: '150px', borderRadius: '12px' }}>
        <List className={showDropDown ? "dropdown" : "dropdown active"}>
          {hotkeys.map(
            (hotkey: Hotkey, index: number): JSX.Element => {
              return (
                <p
                  key={index}
                  onClick={(): void => {
                    onClickHandler(hotkey);
                  }}
                >
                  {hotkey.name}
                </p>
              );
            }
          )}
        </List>
      </Scrollbars>
    </>
  );
};

export default DropDown;
