import styled from "styled-components";

export const AddPanel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-width: 3px;


    button {
        background-color: #7948df;
        color: white;
        font-family: roboto, sans-serif;
        font-weight: bold;
        border-radius: 10px;
        height: 30px;
        border-style: none;
        width: 125px;
        :disabled {
            background-color: #7948df;
            opacity: 0.5;
        }
    }
`;