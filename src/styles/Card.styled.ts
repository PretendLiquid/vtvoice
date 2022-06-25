import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.base};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: 600px;
  height: 225px;
  padding: 20px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='21' ry='21' stroke='%23F2EDFCFF' stroke-width='10' stroke-dasharray='15%2c 15%2c 1' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  box-shadow: ${({ theme }) => theme.shadow.medium} ${({ theme }) => theme.colors.shadow};
`;