import styled from "styled-components";
import "@fontsource/roboto"

export const ChipContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    width: 700px;
    background-color: white;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='21' ry='21' stroke='%23F2EDFCFF' stroke-width='10' stroke-dasharray='15%2c 15%2c 1' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
    border-radius: 21px;
    box-shadow: 5px 5px #303030;
`;

export const ChipContainerInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: 21px;
    width: 95%;
    height: 90%;
`;

export const ChipContent = styled.div`
    display: flex;
    overflow-y: auto;
    justify-content: flex-start;
    flex-flow: row wrap;
    gap: 5px;
    align-content: flex-start;
    width: 95%;
    height: 90%;
`;


export const Chip = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    border-style: none;
    border-radius: 12px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #7948df;
    color: white;
    font-family: roboto, sans-serif;
    font-weight: bold;
    height: 30px;
`;

export const ChipRemove = styled.button`
    border-radius: 50%;
    background-color: #966ae6;
    color: white;
    font-family: roboto, sans-serif;
    font-weight: bold;
    border-style: none;
`;