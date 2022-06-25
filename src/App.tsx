import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { CurrentModel, Hotkey } from "vtubestudio";
import { useVClient } from './vtubestudio';
import { Dictaphone } from './Dictaphone';
import DropDown from './dropdown';
import { HotkeyCommand } from './common';
import { Credit, Credits, Footer, Mail, PersonalNote, Question } from './styles/Footer.styled';
import { GlobalStyles } from './styles/Global';
import { CardContainer, Card } from './styles/Card.styled';
import { CircleGreen, CircleRed } from './styles/Circle.styled';
import { ConnectionStatus, ModelStatus, StatusContainer, VoiceStatus } from './styles/Status.styled';
import { AddPanel } from './styles/AddPanel.styled';
import { HorizontalSplit, SplitWrapper } from './styles/Split.styled';
import { UnderlinedWord, UnderlinedWordContainer } from './styles/Word.styled';
import { OverallContainer } from './styles/Container.styled';
import { Chiplist } from './chiplist';
import { stringify } from 'querystring';
import { Close, Info } from './styles/Info.styled';
import { Helmet } from "react-helmet";
import { AudioContainer, AudioSelect, MicText } from './styles/Audio.styled';
import { ClickList } from './clickList';
import { Example, FlexStartText, TooltipBox, TooltipCard, TooltipText, WordButton, WordContainerInner, WordSaid, WordSelctionContainer } from './styles/WordSelction.styled';
import LanguageDropdown from './languageDropdown';
import { ThemeProvider } from 'styled-components';
import { light } from './styles/Theme.styled';


// function useLocalStorage<T>(storageKey: string, defaultValue: T){
//   const [value, setValue] = React.useState<T>(
//     JSON.parse(localStorage.getItem(storageKey)!) ?? defaultValue
//   );

//   React.useEffect(() => {
//     localStorage.setItem(storageKey, JSON.stringify(value));
//   }, [value, storageKey]);

//   return [value, setValue];
// }


function App() {
  const [hotkeyCommands, setHotkeyCommands] = useState<HotkeyCommand[]>((JSON.parse(localStorage.getItem('hotkeyCommands')!) ?? []) as HotkeyCommand[]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentDevice, setCurrentDevice] = useState<MediaDeviceInfo>();

  useEffect(() => {
    localStorage.setItem('hotkeyCommands', JSON.stringify(hotkeyCommands));
  }, [hotkeyCommands]);


  const [selectedHotkey, setSelectedHotkey] = useState<Hotkey>();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [showLangDropDown, setShowLangDropDown] = useState<boolean>(false);

  const [currentWord, setCurrentWord] = useState<string>('');
  const [hotkeys, setHotkeys] = useState<Hotkey[]>([]);
  const [currentModel, setCurrentModel] = useState<CurrentModel | null>();
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showPersonalNote, setShowPersonalNote] = useState<boolean>(false);
  const [exactWords, setExactWords] = useState<boolean>(true);
  const [showWordSelect, setShowWordSelect] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [selectedLang, setSelectedLang] = useState<string>("en-GB");

  /**
 * Hide the drop down menu if click occurs
 * outside of the drop-down element.
 *
 * @param event  The mouse event
 */
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  }
  
  const getMedia = async () => {
    setAudioDevices((await navigator.mediaDevices.enumerateDevices()).filter((value) => value.kind === 'audioinput'));
  }

  useEffect(() => {
    getMedia();
  }, [])


  /**
* Callback function to consume the
* hotkey name from the child component
*
* @param hotkey  The selected hotkey
*/
  const hotkeySelection = (hotkey: Hotkey): void => {
    setSelectedHotkey(hotkey);
  };

  const addCommand = () => {
    if (selectedHotkey && selectedWord) {
      const word = exactWords ? selectedWord : new RegExp("\\b" + selectedWord + "\\b");
      setHotkeyCommands([...hotkeyCommands, {
        hotkey: selectedHotkey, command: { command: word, callback: async () => await selectedHotkey.trigger() }, word: selectedWord
      }]);
    }
  };

  const connection = useVClient();

  const toggleDropDown = () => {
    refreshHotkeys();
    setShowDropDown(!showDropDown);
  }

  const { interimTranscript, listening, startListening, stopListening, transcript, finalTranscript, isMicrophoneAvailable } = Dictaphone(hotkeyCommands.map(hc => hc.command), selectedLang);


  useEffect(() => {
    if (interimTranscript !== '') {
      setCurrentWord(interimTranscript);
    }
  }, [interimTranscript])

  useEffect(() => {
    console.log("Changing language new one: " + selectedLang);
    if (listening) {
      startListening();
    }
  }, [selectedLang])


  const refreshHotkeys = useCallback(() => {
    if (connection && connection.client.wsw.ws.readyState !== connection.client.wsw.ws.CONNECTING) {
      connection.runCommand(async () => {
        const currentModel = await connection.client.plugin.currentModel();
        setCurrentModel(currentModel);
        const hotkeys = await currentModel?.hotkeys();
        setHotkeys(hotkeys!);
      })
    }
  }, [connection.connected]);


  useEffect(() => {
    refreshHotkeys();
  }, [connection?.connected, refreshHotkeys]);

  let button;
  if (listening) {
    button = <button onClick={stopListening}>Stop voice detection</button>;
  } else {
    button = <button onClick={startListening}>Start voice detection</button>;
  }

  let word;
  if (currentWord !== "") {
    word = <>{currentWord}</>
  } else {
    word = <></>
  }

  return (
    <ThemeProvider theme={light}>
      <div className="App">
        <Helmet>
          <title>Vtvoice</title>
        </Helmet>
        <GlobalStyles />
        <OverallContainer>
          <CardContainer>
            <Card>
              <ConnectionStatus>
                <div>
                </div>
                <ModelStatus>
                  <StatusContainer>
                    <p>
                      VTubeStudio connection status:
                    </p>
                    {connection.connected ? <CircleGreen /> : <CircleRed />}
                  </StatusContainer>
                </ModelStatus>
              </ConnectionStatus>

              <VoiceStatus>
                {button}
                <StatusContainer>
                  <p>
                    Voice detection status:
                  </p>
                  {listening ? <CircleGreen /> : <CircleRed />}
                </StatusContainer>
              </VoiceStatus>

              <ModelStatus>
                <StatusContainer>
                  <p>
                    Current model:
                  </p>
                  {currentModel && (currentModel.name)}
                </StatusContainer>
              </ModelStatus>

              <SplitWrapper>
                <HorizontalSplit width='550px' />
              </SplitWrapper>
              <AddPanel>
                <div>
                  <p>Hotkey</p>
                  <button onClick={toggleDropDown} disabled={!connection.connected} onBlur={(event: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(event)}>
                    <div>{selectedHotkey ? "Select: " + selectedHotkey.name : " . . ."} </div>
                    {showDropDown && (
                      <DropDown hotkeys={hotkeys} showDropDown={false} toggleDropDown={toggleDropDown} hotkeySelection={hotkeySelection} />
                    )}
                  </button>
                </div>
                <div>
                  <p>Word</p>
                  <button onClick={() => setShowWordSelect(true)}>{selectedWord ? selectedWord : " . . ."}</button>
                </div>

                <button onClick={addCommand} disabled={!connection.connected}>Add</button>
              </AddPanel>
            </Card>
          </CardContainer>
          <Chiplist items={hotkeyCommands} onSelect={(element) => { }} onRemove={(element) => {
            setHotkeyCommands(hotkeyCommands.filter(hc => !(hc.word === element.word && hc.hotkey.name === element.hotkey.name)));
          }} />
          <Footer>
            <div style={{ display: 'flex', gap: '5px' }}>
              <Question onClick={() => { setShowInfo(true) }}>?</Question>

              <Question onClick={() => { setShowPersonalNote(true) }}>♥</Question>
            </div>
            <Credit>
              <Credits>Current language: {selectedLang}</Credits>
            </Credit>
            <Credit>
              <Credits>Stiched together by PretendLiquid</Credits>
              <Mail onClick={() => { window.location.href = 'mailto:pretendliquid@gmail.com' }}>✉</Mail>
            </Credit>
          </Footer>
          {(audioDevices.length !== 0 && audioDevices[0].label !== "") ?
            <AudioContainer>
              <MicText>
                <p>Select a microphone</p>
              </MicText>
              <ClickList items={audioDevices} onSelect={(Element) => {
                navigator.mediaDevices.getUserMedia({ audio: Element });
                setCurrentDevice(Element);
              }} onRemove={(Element) => { }} />
            </AudioContainer>
            : <WordButton onClick={() => navigator.mediaDevices.getUserMedia({audio:true}).then((value) => {
              console.log("Mic permission given");
              getMedia();
          }).catch((error)=> console.log("Error while trying to get mic permission: " + error))}>Give microphone permission</WordButton>
          }

        </OverallContainer>
        {showInfo && (
          <Info>
            <p>The webapp tries to connect to localhost:8001. In the future this will be customizeable</p>
            <p>If it is not connected try refresing and check vtube studio for auth popup</p>
            <p>To start using it click the "start voice detection" button</p>
            <p>1. Select a hotkey</p>
            <p>2. click word button</p>
            <p>3. Say a word</p>
            <p>4. Click the "Add" button</p>
            <p>To stop voice detection click the "stop voice detection" button</p>
            <Close onClick={() => { setShowInfo(false) }}>X</Close>
          </Info>
        )}
        {showPersonalNote && (
          <Info>
            <p>Thanks so much for using my webapp. I hope you have many fun moments with it. </p>
            <p>If you have a great idea for a new vtubestudio project feel free to contact me.</p>
            <p>This project was a trainingground for me to practice typescript.</p>
            <p> I will continue to update and improve this project until I dont</p>
            <p>I hope you enjoy it</p>
            <p>- PretentLiquid (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧</p>
            <Close onClick={() => { setShowPersonalNote(false) }}>X</Close>
          </Info>
        )}
        {showWordSelect && (
          <WordSelctionContainer>
            <WordSaid>
              <p>{currentWord}</p>
            </WordSaid>
            <WordContainerInner>
              <div style={{ display: 'flex', gap: '10px' }}>
                {exactWords ? <WordButton onClick={() => setExactWords(!exactWords)}>
                  Exact words
                  <TooltipCard>
                    <TooltipText>
                      <p>?</p>
                    </TooltipText>
                    <TooltipBox>
                      <FlexStartText>Triggers hotkeys everytime you say be exactly the words described and pauses.</FlexStartText>
                      <div style={{ width: '100%', borderTopStyle: 'solid', paddingBottom: '10px' }}></div>
                      <FlexStartText>Example: "I like saying cat"</FlexStartText>
                      <Example>
                        <p style={{ color: 'red' }}>✗: I like saying cat and dog</p> <p style={{ color: 'lime' }}> ✔: I like saing cat</p>
                      </Example>
                      <FlexStartText>Exact word setting means you have to finish talking before it detects</FlexStartText>
                    </TooltipBox>
                  </TooltipCard>
                </WordButton> : <WordButton onClick={() => setExactWords(!exactWords)}>
                  Words in sentence
                  <TooltipCard>
                    <TooltipText>
                      <p>?</p>
                    </TooltipText>
                    <TooltipBox>
                      <FlexStartText>Triggers hotkeys everytime a word is said</FlexStartText>
                      <div style={{ width: '100%', borderTopStyle: 'solid', paddingBottom: '10px' }}></div>
                      <FlexStartText>Example: "I like saying cat"</FlexStartText>
                      <Example>
                        <p style={{ color: 'red' }}>✗: I like saying dog and dog </p> <p style={{ color: 'lime' }}> ✔: I like saying cat and dog but I like saying cat the most</p>
                      </Example>
                      <FlexStartText>You don't have to finish talking before it detects</FlexStartText>
                    </TooltipBox>
                  </TooltipCard>
                </WordButton>}
                <WordButton style={{ display: 'block', width: '100px' }} onClick={() => setShowLangDropDown(!showLangDropDown)} onBlur={(event: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(event)}>
                  <div>{selectedLang}</div>
                  {showLangDropDown && (
                    <LanguageDropdown values={['en-GB', 'en-US', 'da-DK', 'de-DE', 'ja', 'es-ES']} showDropDown={false} toggleDropDown={() => setShowLangDropDown(!showLangDropDown)} onSelection={(value: string) => { setSelectedLang(value); }} />
                  )}
                </WordButton>
                <WordButton onClick={() => {
                  setSelectedWord(currentWord);
                  setShowWordSelect(false);
                }}>Add</WordButton>
              </div>
            </WordContainerInner>
            <Close onClick={() => { setShowWordSelect(false) }}>X</Close>
          </WordSelctionContainer>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
