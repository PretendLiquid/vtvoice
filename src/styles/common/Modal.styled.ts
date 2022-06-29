import styled from "styled-components";

export const Modal = styled.div`
    position: absolute;
    border-radius: ${({ theme }) => theme.borderRadius.large};
    background-color: ${({ theme }) => theme.colors.base};
    border-style: none;
    box-shadow: ${({ theme }) => theme.shadow.medium} ${({ theme }) => theme.colors.shadow};
    padding: 2p;
`;