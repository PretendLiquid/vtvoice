import { useState } from "react";
import { StyledCheckBox } from "../styles/common/Buttons.styled";

type Props = {
    state: boolean;
    onCheck: () => void;
}

export function CheckBox({ onCheck, state }: Props) {
    const handleCheck = () => {
        onCheck();
    };

    return (
        <>
            {state ? <StyledCheckBox onClick={handleCheck}>X</StyledCheckBox> : <StyledCheckBox onClick={handleCheck}></StyledCheckBox>}
        </>
    );
}