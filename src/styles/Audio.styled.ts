import styled from "styled-components";

export const AudioContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.background.primary};
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 12px;
    box-shadow: ${({ theme }) => theme.shadow.medium} ${({ theme }) => theme.colors.shadow.primary};
`;

export const MicText = styled.div`
display: flex;
`;



export const AudioSelect = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 12px;
`;

export const AudioDevice = styled.button`
    border-style: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    height: 20px;
    background-color: ${({ theme }) => theme.colors.button.primary};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    padding-left: 10px;
    padding-right: 10px;
    :hover {
        opacity: 0.5;
    }
`;