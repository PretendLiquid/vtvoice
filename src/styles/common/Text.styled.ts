import styled from "styled-components";
import "@fontsource/roboto"

type Props = {
    inverted?: boolean;
}

export const ActionHeader = styled.p<Props>`
    color : ${({ theme, inverted}) => inverted ? theme.colors.text.primary : theme.colors.text.primary};
`;

export const ActionDescription = styled(ActionHeader)`
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: bold;
    font-family: roboto, sans-serif;
    font-weight: bold;
`;