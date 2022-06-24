import styled from "styled-components";

export const AudioContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 5px 5px #303030;
`;

export const MicText = styled.div`
display: flex;
justify-content: space-between;
margin: -10px;
`;



export const AudioSelect = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
`;

export const AudioDevice = styled.button`
    border-style: none;
    border-bottom: 2px solid white;
    color: white;
    background-color: #7948df;
    padding-left: 10px;
    padding-right: 10px;
    :hover {
        opacity: 0.5;
    }
`;