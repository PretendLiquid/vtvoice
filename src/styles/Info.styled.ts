import styled from "styled-components";

export const Info = styled.div`
    position: absolute;
    top: 80px;
    left: 200px;
    right: 200px;
    bottom: 80px;
    border-radius: ${({ theme }) => theme.borderRadius.large};;
    background-color: ${({ theme }) => theme.colors.background.primary};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: roboto, sans-serif;
    font-weight: bold;
    border-style: none;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text};
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 40px;
    padding-right: 40px;
    box-shadow: ${({ theme }) => theme.shadow.medium} ${({ theme }) => theme.colors.shadow.primary};
`;

export const Close = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border-style: none;
    color: ${({ theme }) => theme.colors.text.primary};;
    font-family: roboto, sans-serif;
    font-weight: bold;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.background.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    width: 35px;
    height: 35px;
    font-size: 15px;
    :hover {
        opacity: 0.8;
    }
    box-shadow: ${({ theme }) => theme.shadow.small} ${({ theme }) => theme.colors.shadow.primary};
;
`;