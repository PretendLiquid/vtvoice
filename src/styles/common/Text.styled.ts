import styled from "styled-components";

type Props = {
    inverted?: boolean;
}

export const ActionHeader = styled.p<Props>`
    color: ${({ theme }) => theme.colors.base2};
    color : ${({ theme, inverted}) => inverted ? theme.colors.base2 : theme.colors.base2Light};
`;

export const ActionDescription = styled(ActionHeader)`
    color: ${({ theme }) => theme.colors.base};
`;