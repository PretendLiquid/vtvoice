import styled from "styled-components";

export const HoverButtonTransparent = styled.button`
    border-style: none;
    background-color: transparent;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    color: ${({ theme }) => theme.colors.base2Light};
    text-align: left;
    :hover {
        background-color: ${({ theme }) => theme.colors.base2Light};
        color: white;
    }
    &.active {
        background-color: ${({ theme }) => theme.colors.base2Light};
        color: white;
    }
`;

export const HoverButtonTransparentInverted = styled(HoverButtonTransparent)`
    color: ${({ theme }) => theme.colors.base2};
    font-weight: bold;
    :hover {
        background-color: ${({ theme }) => theme.colors.base2};
    }
    &.active {
        background-color: ${({ theme }) => theme.colors.base2};
    }
`;

export const HoverButtonShadow = styled.button`
    border-style: none; 
    background-color: ${({ theme }) => theme.colors.base2}; 
    color: ${({ theme }) => theme.colors.base}; 
    box-shadow: 2px 2px #262626;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    :hover {
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
`;