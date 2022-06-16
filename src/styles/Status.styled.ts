import styled from "styled-components";
import "@fontsource/roboto"

export const ConnectionStatus = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        background-color: #7948df;
        color: white;
        font-family: roboto, sans-serif;
        font-weight: bold;
        border-radius: 10px;
        height: 30px;
        border-style: none;
    }
`;

export const VoiceStatus = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        background-color: #7948df;
        color: white;
        font-family: roboto, sans-serif;
        font-weight: bold;
        border-radius: 10px;
        height: 30px;
        border-style: none;
    }
`;

export const StatusContainer = styled.div`
    display: flex;
    align-items: center;
    width: 400px;
    justify-content: space-between;
`;

export const ModelStatus = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;