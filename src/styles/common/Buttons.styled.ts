import styled from "styled-components";

export const HoverButtonTransparent = styled.button`
    border-style: none;
    background-color: transparent;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: bold;
    text-align: left;
    :hover {
        background-color: ${({ theme }) => theme.colors.button.primary};
        color: white;
    }
    &.active {
        background-color: ${({ theme }) => theme.colors.button.primary};
        color: white;
    }
`;

export const HoverButtonTransparentInverted = styled(HoverButtonTransparent)`
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: bold;
    :hover {
        background-color: ${({ theme }) => theme.colors.button.primary};
    }
    &.active {
        background-color: ${({ theme }) => theme.colors.button.primary};
    }
`;

export const HoverButtonShadow = styled.button`
    border-style: none; 
    background-color: ${({ theme }) => theme.colors.button.primary}; 
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: roboto, sans-serif;
    font-weight: bold;
    box-shadow: ${({ theme }) => theme.shadow.small} ${({ theme }) => theme.colors.shadow.primary};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    :hover {
        opacity: 0.8;
    }
    :disabled {
        opacity: 0.8;
    }
`;

export const StyledCheckBox = styled.button`
    border-style: none;
    font-weight: bold;
    justify-items: center;
    align-items: center;
    margin: 0px;
    padding: 0px;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    width: 30px;
    height: 30px;
    box-shadow: ${({ theme }) => theme.shadow.small} ${({ theme }) => theme.colors.shadow.primary};
`;

export const ThemeButton = styled.button`
    border-style: none;
    background-color: ${props => props.color};
    height: 50px;
    width: 50px;
    border-radius: 12px;
    box-shadow: ${({ theme }) => theme.shadow.medium} ${({ theme }) => theme.colors.shadow.primary};
`;