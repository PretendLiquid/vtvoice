import styled from "styled-components";
import "@fontsource/roboto"

export const UnderlinedWord = styled.div`
    display: flex;
    font-weight: bold;
    color: #7948df;
    font-family: roboto, sans-serif;
    background-color: ${({ theme }) => theme.colors.background.primary};
    width: 125px;
    height: 30px;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    justify-content: center;
    align-items: center;
`;

export const UnderlinedWordContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;