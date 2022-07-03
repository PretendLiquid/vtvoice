import styled from "styled-components";
import "@fontsource/roboto"

export const Footer = styled.div`
    position: fixed;
    bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 98%;
`;

export const Question = styled.button`
    font-family: roboto, sans-serif;
    font-weight: bold;
    border-style: none;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    height: 50px;
    width: 50px;
    padding-left: 5px;
    padding-right: 5px;
    :hover {
        opacity: 0.8;
    }
    box-shadow: ${({ theme }) => theme.shadow.medium} ${({ theme }) => theme.colors.shadow.primary};
`;

export const PersonalNote = styled.div`
    font-family: roboto, sans-serif;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text.primary};

`;

export const Credits = styled.div`
    font-family: roboto, sans-serif;
    font-weight: bold;
    border-style: none;
    font-size: 15px;
    display: flex;
    align-items: center;
`;

export const Credit = styled.div`
    color: ${({ theme }) => theme.colors.text.primary};
    display: flex;
    border-radius: 12px;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    background-color: ${({ theme }) => theme.colors.background.primary};
    padding-left: 10px;
    padding-right: 10px;
    box-shadow: ${({ theme }) => theme.shadow.medium} ${({ theme }) => theme.colors.shadow.primary};
    height: 50px;
    z-index: 1;
`;

export const Mail = styled.button`
    font-size: 25px;
    background-color: transparent;
    border-style: none;
    padding-right: 0px;
    color: ${({ theme }) => theme.colors.text.primary};
    :hover {
        opacity: 0.8;
    }
`;