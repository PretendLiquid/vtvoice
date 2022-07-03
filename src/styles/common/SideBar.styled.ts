import styled from "styled-components";

export const SideBar = styled.div`
    display: flex; 
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.background.secondary};
`;