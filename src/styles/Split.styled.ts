import styled from "styled-components";

interface SplitProps{
    height?: string;
}

export const SplitWrapper = styled.div<SplitProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${props => props.height || "0px"};
`;

interface Props {
    width: string;
    color?: string;
}  

export const HorizontalSplit = styled.div<Props>`
    border-top: 2px solid ${props => props.color || "#f2edfc"};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    display: flex;
    width: ${props => props.width || "100px"};
`;