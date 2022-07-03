import { createGlobalStyle, useTheme, withTheme } from "styled-components";
import "@fontsource/roboto";
import { Theme } from "./Theme.styled";

const GlobalStyle = createGlobalStyle<{theme: Theme}>`
    body {
        background-color: ${({ theme }) => theme.colors.button.primary};
        font-family: roboto, sans-serif;
        font-weight: bold;
    }
`;

export default withTheme(GlobalStyle);