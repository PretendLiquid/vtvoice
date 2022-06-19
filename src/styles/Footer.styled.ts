import styled from "styled-components";
import "@fontsource/roboto"

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const Question = styled.button`
    font-family: roboto, sans-serif;
    font-weight: bold;
    border-style: none;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #875ae2;
    color: white;
    border-radius: 12px;
    height: 50px;
    width: 50px;
    padding-left: 5px;
    padding-right: 5px;
    :hover {
        opacity: 0.8;
    }
    box-shadow: 2px 2px #2a2a2a;
`;

export const PersonalNote = styled.div`
    font-family: roboto, sans-serif;
    font-weight: bold;
    color: white;

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
    color: white;
    display: flex;
    border-radius: 12px;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    background-color: #875ae2;
    padding-left: 5px;
    padding-right: 5px;
    box-shadow: 2px 2px #2a2a2a;
    height: 50px;
`;

export const Mail = styled.button`
    font-size: 25px;
    background-color: #875ae2;
    border-style: none;
    color: white;
    :hover {
        opacity: 0.8;
    }
`;