import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { CurrentModel, Hotkey } from "vtubestudio";
import { useVClient } from './vtubestudio';
import { Dictaphone } from './Dictaphone';
import DropDown from './dropdown';
import { ClickableList } from './clickableList';
import { HotkeyCommand } from './common';
import { Footer } from './styles/Footer.styled';
import { GlobalStyles } from './styles/Global';
import { CarcContainer, Card } from './styles/Card.styled';
import { CircleGreen, CircleRed } from './styles/Circle.styled';
import { ConnectionStatus, ModelStatus, StatusContainer, VoiceStatus } from './styles/Status.styled';
import { AddPanel } from './styles/AddPanel.styled';
import { HorizontalSplit, SplitWrapper } from './styles/Split.styled';
import { UnderlinedWord, UnderlinedWordContainer } from './styles/Word.styled';
import { OverallContainer } from './styles/Container.styled';
import { Chiplist } from './chiplist';


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
      <GlobalStyles />
      <OverallContainer>
        <CarcContainer>
          <Card>
            <ConnectionStatus>
              <div>
                <button disabled={connection.connected} onClick={async () => {
                  await connection.runCommand(async () => {
                    const stats = await connection.client.plugin.statistics();
                    console.log("VTube Studio verison:", stats.vTubeStudioVersion);
                  })
                }}>Connect</button>
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
        </CarcContainer>
        <Chiplist items={hotkeyCommands} onSelect={(element) => { }} onRemove={(element) => {
          setHotkeyCommands(hotkeyCommands.filter(hc => hc.command.command !== element.command.command))
        }} />
      </OverallContainer>
    </div>
  );
}

export default App;
