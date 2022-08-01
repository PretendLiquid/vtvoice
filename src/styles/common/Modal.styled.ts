import styled from "styled-components";

export const ModalDiv = styled.div`
    position: absolute;
    border-radius: ${({ theme }) => theme.borderRadius.large};
    background-color: ${({ theme }) => theme.colors.background.primary};
    border-style: none;
    box-shadow: ${({ theme }) => theme.shadow.medium} ${({ theme }) => theme.colors.shadow.primary};
    padding: 2p;
`;