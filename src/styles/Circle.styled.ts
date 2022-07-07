import styled from "styled-components";

export const CircleGreen = styled.div`
    background-color: #009d00;
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: -2px;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    box-shadow: 1px 1px ${({ theme }) => theme.colors.shadow.primary};
`;

export const CircleRed = styled.div`
    background-color: #ff4a4a;
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: -2px;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    box-shadow: 1px 1px ${({ theme }) => theme.colors.shadow.primary};
`;