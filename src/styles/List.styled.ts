import styled from "styled-components";
import "@fontsource/roboto"

export const List = styled.div`
    p {
        height: 25px;
        color: ${({ theme }) => theme.colors.text.primary};
        font-family: roboto, sans-serif;
        font-weight: bold;
    }
`;