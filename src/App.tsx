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

  useEffect(() => {
    localStorage.setItem('hotkeyCommands', JSON.stringify(hotkeyCommands));
  }, [hotkeyCommands]);


  const [selectedHotkey, setSelectedHotkey] = useState<Hotkey>();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const [currentWord, setCurrentWord] = useState<string>('');
  const [hotkeys, setHotkeys] = useState<Hotkey[]>([]);
  const [currentModel, setCurrentModel] = useState<CurrentModel | null>();
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showPersonalNote, setShowPersonalNote] = useState<boolean>(false);

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
  };

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
    if (selectedHotkey && currentWord) {
      setHotkeyCommands([...hotkeyCommands, { hotkey: selectedHotkey, command: { command: currentWord, callback: async () => await selectedHotkey.trigger() } }]);
    }
  };

  const connection = useVClient();

  const toggleDropDown = () => {
    refreshHotkeys();
    setShowDropDown(!showDropDown);
  }

  const { interimTranscript, listening, startListening, stopListening } = Dictaphone(hotkeyCommands.map(hc => hc.command));


  useEffect(() => {
    if (interimTranscript !== '') {
      setCurrentWord(interimTranscript);
    }
  }, [interimTranscript])


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
                <UnderlinedWord>{word}</UnderlinedWord>
              </div>

              <button onClick={addCommand} disabled={!connection.connected}>Add</button>
            </AddPanel>
          </Card>
        </CardContainer>
        <Chiplist items={hotkeyCommands} onSelect={(element) => { }} onRemove={(element) => {
          setHotkeyCommands(hotkeyCommands.filter(hc => hc.command.command !== element.command.command))
        }} />
        <Footer>
          <div style={{ display: 'flex', gap: '5px' }}>
            <Question onClick={() => { setShowInfo(true) }}>?</Question>

            <Question onClick={() => { setShowPersonalNote(true) }}>♥</Question>
          </div>
          <Credit>
            <Credits>Stiched together by PretendLiquid</Credits>
            <Mail onClick={() => { window.location.href = 'mailto:pretendliquid@gmail.com' }}>✉</Mail>
          </Credit>
        </Footer>
      </OverallContainer>
      {showInfo && (
        <Info>
          <p>The webapp tries to connect to localhost:8001. In the future this will be customizeable</p>
          <p>If it is not connected try refresing and check vtube studio for auth popup</p>
          <p>To start using it click the "start voice detection" button</p>
          <p>1. Select a hotkey</p>
          <p>2. Say a word</p>
          <p>3. Click the "Add" button</p>
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
    </div>
  );
}

export default App;
