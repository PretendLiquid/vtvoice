import styled from "styled-components";
import "@fontsource/roboto"

export const ChipContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    width: 700px;
    background-color: ${({ theme }) => theme.colors.background.primary};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    box-shadow: ${({ theme }) => theme.shadow.medium} ${({ theme }) => theme.colors.shadow.primary};
`;

export const ChipContainerInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.large};
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
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding-left: 10px;
    padding-right: 10px;
    background-color: ${({ theme }) => theme.colors.button.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: roboto, sans-serif;
    font-weight: bold;
    height: 30px;
    box-shadow: ${({ theme }) => theme.shadow.small} ${({ theme }) => theme.colors.shadow.primary};
`;

export const ChipRemove = styled.div`
    display: flex;
    border-radius: ${({ theme }) => theme.borderRadius.circle};
    background-color: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: roboto, sans-serif;
    font-weight: bold;
    border-style: none;
    text-align: center;
    justify-content: center;
    height: 20px;
    width: 20px;
`;