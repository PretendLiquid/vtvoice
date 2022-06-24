import styled from "styled-components";
import "@fontsource/roboto"

export const WordSelctionContainer = styled.div`
    position: absolute;
    top: 350px;
    left: 200px;
    right: 200px;
    border-radius: 20px;
    background-color: #5622c4;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    font-family: roboto, sans-serif;
    font-weight: bold;
    border-style: none;
    font-size: 20px;
    color: white;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 40px;
    padding-right: 40px;
    box-shadow: 5px 5px #000000;
`;

export const WordButton = styled.button`
    font-family: roboto, sans-serif;
    font-weight: bold;
    font-size: 15px;
    display: flex;
    border-style: none;
    border-radius: 12px;
    color: white;
    background-color: grey;
    box-shadow: 5px 5px #2a2a2a;
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
   border-radius: 4px;
   overflow: hidden;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 600px;
   transition: visibility 0.25s, color 0.5s, background-color 0.5s, width 0.5s;
`;

export const TooltipCard = styled.div`
    background-color: #5d5d5d;
    font-family: roboto, sans-serif;
    font-weight: bold;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 45%;
    height: 25px;
    width: 25px;
    position: relative;
    & ${TooltipText}:hover + ${TooltipBox} {
        visibility: visible;
        color: #fff;
        background-color: #5d5d5d;
        width: 630px;
        padding: 8px 8px;
        border-radius: 12px;
   }
   box-shadow: 2px 2px #2a2a2a;
`;



export const WordSaid = styled.div`
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
    align-self: center;
    background-color: #9f7ce9;
    border-radius: 12px;
    width: 90%;
    box-shadow: 3px 3px #2a2a2a;
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
    background-color: #484848;
    border-radius: 12px;
    padding-left: 15px;
    padding-right: 15px;
    box-shadow: 2px 2px #2a2a2a;
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
    color: white;
    font-family: roboto, sans-serif;
    font-weight: bold;
    border-radius: 50%;
    background-color: #3a1784;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    width: 40px;
    height: 40px;
    font-size: 15px;
    :hover {
        opacity: 0.8;
    }
    box-shadow: 2px 2px #000000;
`;