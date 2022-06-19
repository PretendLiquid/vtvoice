import styled from "styled-components";

export const Info = styled.div`
    position: absolute;
    top: 80px;
    left: 200px;
    right: 200px;
    bottom: 80px;
    border-radius: 20px;
    background-color: #5622c4;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

export const Close = styled.button`
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