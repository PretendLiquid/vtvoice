import React, { useEffect, useState } from "react";
import { Hotkey } from "vtubestudio";
import { List } from "./styles/List.styled";

type DropDownProps = {
  values: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  onSelection: Function;
};

const LanguageDropdown: React.FC<DropDownProps> = ({
  values,
  onSelection: onSelection
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the hotkey name
   * back to the parent component
   *
   * @param hotkey  The selected hotkey
   */
  const onClickHandler = (value: string): void => {
    onSelection(value);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <List style={{width: '100px', display:"block"}} className={showDropDown ? "dropdown" : "dropdown active"}>
        {values.map(
          (value: string, index: number): JSX.Element => {
            return (
              <p
                key={index}
                onClick={(): void => {
                  onClickHandler(value);
                }}
              >
                {value}
              </p>
            );
          }
        )}
      </List>
    </>
  );
};

export default LanguageDropdown;
