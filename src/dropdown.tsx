import React, { useEffect, useState } from "react";
import { Hotkey } from "vtubestudio";

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
      <div className={showDropDown ? "dropdown" : "dropdown active"}>
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
      </div>
    </>
  );
};

export default DropDown;
