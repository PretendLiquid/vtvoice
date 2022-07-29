import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { CheckBox } from "../../buttons/CheckBox";
import { CommandTrigger } from "../../common";
import { HoverButtonShadow } from "../../styles/common/Buttons.styled";
import { MidBorderDiv } from "../../styles/common/Divs.styled";
import { Modal } from "../../styles/common/Modal.styled";
import Tab from "../../tabs/tab";
import Tabs from "../../tabs/tabs";

type props = {
    transscript: string;
    setPanel: Dispatch<SetStateAction<boolean>>;
    setCommandTrigger: Dispatch<SetStateAction<CommandTrigger | undefined>>;
}

export function VoicePanel({ setPanel, setCommandTrigger, transscript }: props) {
    return (
        <Modal style={{ position: 'relative', height: '450px', width: '600px', margin: 'auto', overflow: 'hidden', backgroundColor: 'transparent' }}>
            <Tabs>
                <Tab title={"Say it"}>
                    <Voice transscript={transscript} setCommandTrigger={setCommandTrigger} />
                </Tab>
                <Tab title={"Write it"}>
                    <Written setCommandTrigger={setCommandTrigger} />
                </Tab>
            </Tabs>
            <HoverButtonShadow onClick={() => setPanel(false)} style={{ position: 'absolute', width: '60px', height: '30px', bottom: '15px', right: '80px' }}>Close</HoverButtonShadow>
            <HoverButtonShadow onClick={() => setPanel(false)} style={{ position: 'absolute', width: '60px', height: '30px', bottom: '15px', right: '15px' }}>Add</HoverButtonShadow>
        </Modal>
    );
}

type vProps = {
    transscript: string;
    setCommandTrigger: Dispatch<SetStateAction<CommandTrigger | undefined>>;
}

function Voice({ transscript, setCommandTrigger }: vProps) {

    const [matchSentence, setMatchSentence] = useState(false);
    const [agressiveMatch, setAgressiveMatch] = useState(false);
    const [closeWords, setCloseWords] = useState(false);
    const [wordThreshold, setWordThreshold] = useState("80");
    const [currentInput, setCurrentInput] = useState("");

    const button = matchSentence ?
        <HoverButtonShadow style={{ width: '120px', height: '30px' }} onClick={() => setMatchSentence(!matchSentence)}>Match Setence</HoverButtonShadow>
        :
        <HoverButtonShadow style={{ width: '120px', height: '30px' }} onClick={() => setMatchSentence(!matchSentence)}>Match every time</HoverButtonShadow>;

    useEffect(() => {
        action();
    }, [currentInput, matchSentence, agressiveMatch, closeWords, wordThreshold]);

    useEffect(() => {
        if (transscript !== "") {
            setCurrentInput(transscript);
        }
    }, [transscript]);

    const action = () => {
        const word = matchSentence ? currentInput : new RegExp("\\b" + currentInput + "\\b");
        const threshold = parseInt(wordThreshold);
        if (closeWords) {
            setCommandTrigger({ triggerWord: word, matchInter: agressiveMatch, fuzzy: closeWords, threshold: (Number(wordThreshold) / 100) });
        } else {
            setCommandTrigger({ triggerWord: word, matchInter: agressiveMatch });
        }
    };

    return (
        <Scrollbars style={{ width: '100%', height: '365px' }}>
            <div style={{ padding: '10px', gap: '20px', display: 'flex', flexDirection: 'column' }}>
                <MidBorderDiv primary={false} style={{ height: '70px', borderRadius: '20px', padding: '15px', display: 'flex' }}>
                    <p style={{ margin: '0px' }}>{currentInput}</p>
                </MidBorderDiv>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                        {button}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <p>Agressive matching:</p>
                            <CheckBox state={agressiveMatch} onCheck={() => setAgressiveMatch(!agressiveMatch)} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <p>Close words:</p>
                            <CheckBox state={closeWords} onCheck={() => setCloseWords(!closeWords)} />
                        </div>
                        {closeWords && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <p>Word match threshold</p>
                                <input type="number" min="20" max="100" step="0.5" value={wordThreshold} onChange={(event) => setWordThreshold(event.target.value)} style={{width: '45px'}} />
                                <p>%</p>
                            </div>
                        )}
                    </div>
                </div>
                <MidBorderDiv primary={false} style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderRadius: '20px', padding: '10px', paddingBottom: '20px', paddingTop: '20px' }}>
                    {matchSentence ?
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                            <p style={{ fontWeight: 'bold', margin: '0px' }}>Match sentence: I like saying cat</p>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-evenly', width: '100%' }}>
                                <p style={{ fontWeight: 'bold', margin: '0px' }}>I like saying cat and dog ✗</p>
                                <p style={{ textDecorationLine: 'underline', textDecorationThickness: '2px', margin: '0px' }}>I like saing cat ✔</p>
                            </div>
                        </div> :
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                                <p style={{ fontWeight: 'bold', margin: '0px' }}>Match every time: I like saying cat</p>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-evenly', width: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                        <p style={{ fontWeight: 'bold', margin: '0px', height: '17px', textDecorationLine: 'underline', textDecorationThickness: '2px' }}>I like saying cat</p>
                                        <p style={{ fontWeight: 'bold', margin: '0px' }}>and dog ✔</p>
                                    </div>
                                    <p style={{ textDecorationLine: 'underline', textDecorationThickness: '2px', margin: '0px' }}>I like saying cat ✔</p>
                                </div>
                            </div>
                        </div>}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                        <p style={{ fontWeight: 'bold', margin: '0px' }}>Agressive matching:</p>
                        <p style={{ fontWeight: 'bold', margin: '0px', textAlign: 'left' }}>Matches your words when talking. Faster triggering since it doesnt wait for you to finish a sentence.</p>
                        <p style={{ fontWeight: 'bold', margin: '0px', textAlign: 'left' }}>Less accurate. Should only be used for simple sentences</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                        <p style={{ fontWeight: 'bold', margin: '0px' }}>Close words:</p>
                        <p style={{ fontWeight: 'bold', margin: '0px', textAlign: 'left' }}>Trigger words that are similiar to what you are saying</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                        <p style={{ fontWeight: 'bold', margin: '0px' }}>Word match threshold:</p>
                        <p style={{ fontWeight: 'bold', margin: '0px', textAlign: 'left' }}>The minimum similarity between your words in order to trigger default is 0.8</p>
                    </div>
                </MidBorderDiv>
            </div>
        </Scrollbars>
    );
}

type wProps = {
    setCommandTrigger: Dispatch<SetStateAction<CommandTrigger | undefined>>;
}

function Written({ setCommandTrigger }: wProps) {

    const [agressiveMatch, setAgressiveMatch] = useState(false);
    const [closeWords, setCloseWords] = useState(false);
    const [wordThreshold, setWordThreshold] = useState("80");
    const [currentInput, setCurrentInput] = useState("");

    useEffect(() => {
        action();
    }, [currentInput, agressiveMatch, closeWords, wordThreshold]);

    const action = () => {
        if (closeWords) {
            setCommandTrigger({ triggerWord: currentInput, matchInter: agressiveMatch, fuzzy: closeWords, threshold: (Number(wordThreshold) / 100) });
        } else {
            setCommandTrigger({ triggerWord: currentInput, matchInter: agressiveMatch });
        }
    };

    return (
        <Scrollbars style={{ width: '100%', height: '365px' }}>
            <div style={{ padding: '10px', gap: '20px', display: 'flex', flexDirection: 'column' }}>
                <MidBorderDiv primary={false} style={{ height: '40px', padding: '15px', display: 'flex' }}>
                    <textarea onChange={(event) => setCurrentInput(event.target.value)} style={{ borderStyle: 'none', width: '100%', borderRadius: '12px', outline: 'none', fontWeight: 'bold', padding: '10px', lineBreak: 'auto', resize: 'none' }} placeholder={'Pass the salt (please)'} />
                </MidBorderDiv>
                <MidBorderDiv primary={false} style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderRadius: '20px', padding: '10px', paddingBottom: '20px', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                        <p style={{ fontWeight: 'bolder', margin: '0px' }}>Optional words ( ):</p>
                        <p style={{ fontWeight: 'bold', margin: '0px', textAlign: 'left' }}>This is a phrase wrapped in parentheses ( and ), and is not required to match the command</p>
                        <p style={{ fontWeight: 'bolder', margin: '0px', textAlign: 'left' }}>Example: 'Pass the salt (please)'</p>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-evenly', width: '100%' }}>
                            <p style={{ fontWeight: 'bold', margin: '0px' }}>Pass the salt ✔</p>
                            <p style={{ fontWeight: 'bold', margin: '0px' }}>Pass the salt please✔</p>
                        </div>
                    </div>
                </MidBorderDiv>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <p style={{ fontWeight: 'bolder', margin: '0px' }}>Agressive matching:</p>
                            <CheckBox state={agressiveMatch} onCheck={() => setAgressiveMatch(!agressiveMatch)} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <p style={{ fontWeight: 'bolder', margin: '0px' }}>Close words:</p>
                            <CheckBox state={closeWords} onCheck={() => setCloseWords(!closeWords)} />
                        </div>
                        {closeWords && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <p>Word match threshold</p>
                                <input type="number" min="20" max="100" step="0.5" value={wordThreshold} onChange={(event) => setWordThreshold(event.target.value)} style={{width: '45px'}} />
                                <p>%</p>
                            </div>
                        )}
                    </div>
                </div>
                <MidBorderDiv primary={false} style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderRadius: '20px', padding: '10px', paddingBottom: '20px', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                        <p style={{ fontWeight: 'bolder', margin: '0px' }}>Match sentence: I like saying cat</p>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-evenly', width: '100%' }}>
                            <p style={{ fontWeight: 'bold', margin: '0px' }}>I like saying cat and dog ✗</p>
                            <p style={{ textDecorationLine: 'underline', textDecorationThickness: '2px', margin: '0px', }}>I like saing cat ✔</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                        <p style={{ fontWeight: 'bolder', margin: '0px' }}>Agressive matching:</p>
                        <p style={{ fontWeight: 'bold', margin: '0px', textAlign: 'left' }}>Matches your words when talking. Faster triggering since it doesnt wait for you to finish a sentence.</p>
                        <p style={{ fontWeight: 'bold', margin: '0px', textAlign: 'left' }}>Less accurate. Should only be used for simple sentences</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                        <p style={{ fontWeight: 'bolder', margin: '0px' }}>Close words:</p>
                        <p style={{ fontWeight: 'bold', margin: '0px', textAlign: 'left' }}>Trigger words that are similiar to what you are saying</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                        <p style={{ fontWeight: 'bolder', margin: '0px' }}>Word match threshold:</p>
                        <p style={{ fontWeight: 'bold', margin: '0px', textAlign: 'left' }}>The minimum similarity between your words in order to trigger default is 0.8</p>
                    </div>
                </MidBorderDiv>
            </div>
        </Scrollbars>
    )
}