import styled from "styled-components";
import "@fontsource/roboto"

export const List = styled.div`
    background-color: #7948df;
    border-radius: 25px;
    padding: 2px;

    height: 100px;
    overflow-y: scroll;
    p {
        color: white;
        font-family: roboto, sans-serif;
        font-weight: bold;
    }
`;