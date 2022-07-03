import styled from "styled-components";
import "@fontsource/roboto"

export const WordSelctionContainer = styled.div`
    position: absolute;
    top: 290px;
    left: 200px;
    right: 200px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.background.primary};
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    font-family: roboto, sans-serif;
    font-weight: bold;
    border-style: none;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.text.primary};
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 40px;
    padding-right: 40px;
    box-shadow: ${({ theme }) => theme.shadow.medium} ${({ theme }) => theme.colors.shadow.primary};
`;

export const WordButton = styled.button`
    font-family: roboto, sans-serif;
    font-weight: bold;
    font-size: 15px;
    display: flex;
    border-style: none;
    border-radius: 12px;
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.button.primary};
    box-shadow: ${({ theme }) => theme.shadow.small} ${({ theme }) => theme.colors.shadow.primary};
    align-items: center;
    gap: 5px;
    height: 40px;

`;

export const TooltipText = styled.div`
`;
export const FlexStartText = styled.p`
    align-self: flex-start;
    padding-left: 10px;
`;

export const TooltipBox = styled.div`
   position: absolute;
   top: calc(100% + 10px);
   left: 30px;
   visibility: hidden;
   color: transparent;
   background-color: transparent;
   width: 150px;
   padding: 5px 5px;
   border-radius: ${({ theme }) => theme.borderRadius.small};;
   overflow: hidden;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 600px;
   transition: visibility 0.25s, color 0.5s, background-color 0.5s, width 0.5s;
`;

export const TooltipCard = styled.div`
    background-color: ${({ theme }) => theme.colors.background.primary};
    font-family: roboto, sans-serif;
    font-weight: bold;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.borderRadius.circle};
    height: 25px;
    width: 25px;
    position: relative;
    & ${TooltipText}:hover + ${TooltipBox} {
        visibility: visible;
        color: ${({ theme }) => theme.colors.text.primary};
        background-color: ${({ theme }) => theme.colors.background.primary};
        width: 630px;
        padding: 8px 8px;
        border-radius: ${({ theme }) => theme.borderRadius.medium};
   }
   box-shadow: ${({ theme }) => theme.shadow.medium} ${({ theme }) => theme.colors.shadow};
`;



export const WordSaid = styled.div`
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
    align-self: center;
    background-color: ${({ theme }) => theme.colors.background.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    width: 90%;
    height: 60px;
    box-shadow: ${({ theme }) => theme.shadow.small} ${({ theme }) => theme.colors.shadow};
`;

export const WordContainerInner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 120px;
`;

export const Example = styled.div`
    background-color: ${({ theme }) => theme.colors.background.primary};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding-left: 15px;
    padding-right: 15px;
    box-shadow: ${({ theme }) => theme.shadow.small} ${({ theme }) => theme.colors.shadow};
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 600px;
`;


export const WordSelectionClose = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border-style: none;
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: roboto, sans-serif;
    font-weight: bold;
    border-radius: ${({ theme }) => theme.borderRadius.circle};
    background-color: ${({ theme }) => theme.colors.button.primary};
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
`;