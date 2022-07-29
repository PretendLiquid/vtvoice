import styled from "styled-components";

export const Base2LightDiv = styled.div`
    background-color: ${({ theme }) => theme.colors.background.primary};
`;

export const MidBorderDiv = styled.div<{primary: boolean}>`
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    background-color: ${props => props.primary ? props.theme.colors.background.primary : props.theme.colors.background.secondary};
    color: ${props => !props.primary ? props.theme.colors.text.primary : props.theme.colors.text.secondary};
`;