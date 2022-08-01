import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { CurrentModel, Hotkey } from "vtubestudio";
import { useVClient } from './vtubestudio';
import { Dictaphone } from './Dictaphone';
import { Action, ActionCommand, Command, CommandTrigger } from './common';
import { Credit, Credits, Footer, Mail, PersonalNote, Question } from './styles/Footer.styled';
import { CardContainer, Card } from './styles/Card.styled';
import { CircleGreen, CircleRed } from './styles/Circle.styled';
import { ConnectionStatus, ModelStatus, StatusContainer, VoiceStatus } from './styles/Status.styled';
import { AddPanel } from './styles/AddPanel.styled';
import { HorizontalSplit, SplitWrapper } from './styles/Split.styled';
import { OverallContainer } from './styles/Container.styled';
import { Chiplist } from './chiplist';
import { Close, Info } from './styles/Info.styled';
import { Helmet } from "react-helmet";
import { AudioContainer, AudioSelect, MicText } from './styles/Audio.styled';
import { ClickList } from './clickList';
import { Example, FlexStartText, TooltipBox, TooltipCard, WordButton, WordContainerInner, WordSaid, WordSelctionContainer, WordSelectionClose } from './styles/WordSelction.styled';
import LanguageDropdown from './languageDropdown';
import { ThemeProvider } from 'styled-components';
import { dark, light, mouse, Theme } from './styles/Theme.styled';
import { ActionPanel } from './command/effect/ActionPanel/ActionPanel';
import { BackgroundButton, HoverButtonShadow, ThemeButton } from './styles/common/Buttons.styled';
import Global from './styles/Global';
import { VoicePanel } from './command/voice/VoicePanel';


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
  const [currentVersion, setCurrentVersion] = useState<string>((JSON.parse(localStorage.getItem('currentVersion')!) ?? '0.2.0'));
  if (currentVersion === '0.2.0') {
    localStorage.removeItem('hotkeyCommands');
    localStorage.removeItem('actionCommands');
    setCurrentVersion(process.env.REACT_APP_VERSION ?? '0.3.0');
  }
  const [host, setHost] = useState<string>((JSON.parse(localStorage.getItem('host')!) ?? "localhost"));
  const [port, setPort] = useState<string>((JSON.parse(localStorage.getItem('port')!) ?? "8001"));

  const connection = useVClient({ host: host, port: port });

  useEffect(() => {
    localStorage.setItem('host', JSON.stringify(host));
  }, [host]);

  useEffect(() => {
    localStorage.setItem('port', JSON.stringify(port));
  }, [port]);

  useEffect(() => {
    refreshHotkeys();
  }, [connection?.connected]);

  const [actionCommands, setActionCommands] = useState<ActionCommand[]>((JSON.parse(localStorage.getItem('actionCommands')!) ?? []) as ActionCommand[]);
  const [commands, setCommands] = useState<Command[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentDevice, setCurrentDevice] = useState<MediaDeviceInfo>();
  const [currentTheme, setCurrentTheme] = useState((JSON.parse(localStorage.getItem('theme')!) ?? light) as Theme);

  useEffect(() => {
    localStorage.setItem('actionCommands', JSON.stringify(actionCommands));
  }, [actionCommands]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(currentTheme));
  }, [currentTheme])

  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [showLangDropDown, setShowLangDropDown] = useState<boolean>(false);
  const [hotkeys, setHotkeys] = useState<Hotkey[]>([]);
  const [artMeshes, setArtMeshes] = useState<string[]>([]);

  const [currentModel, setCurrentModel] = useState<CurrentModel | null>();
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showPersonalNote, setShowPersonalNote] = useState<boolean>(false);
  const [showSettingPanel, setShowSettingPanel] = useState<boolean>(false);
  const [showWordSelect, setShowWordSelect] = useState<boolean>(false);

  const [selectedLang, setSelectedLang] = useState<string>("en-GB");

  const [currentAction, setCurrentAction] = useState<Action>();
  const [currentCommandTrigger, setCurrentCommandTrigger] = useState<CommandTrigger>();
  const [currentDisplayWord, setCurrentDisplayWord] = useState<string>("");

  const [showActionPanel, setShowActionPanel] = useState<boolean>(false);

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowLangDropDown(false);
    }
  }

  const getMedia = async () => {
    setAudioDevices((await navigator.mediaDevices.enumerateDevices()).filter((value) => value.kind === 'audioinput'));
  }

  useEffect(() => {
    getMedia();
  }, [])


  const addCommand = () => {
    if (currentAction && currentCommandTrigger && currentModel && currentDisplayWord) {
      console.log("add command");
      console.log(currentAction + " " + currentCommandTrigger.triggerWord);
      setActionCommands([...actionCommands, {
        displayWord: currentDisplayWord, commandTrigger: currentCommandTrigger, action: currentAction, model: currentModel.id
      }]);
    }
  };

  useEffect(() => {
    if (connection.connected && currentModel) {
      setCommands(actionCommands.filter((command) => command.model == currentModel.id).map((command) => actionToCommand(command)));
    }
  }, [actionCommands, connection?.connected, hotkeys, artMeshes]);

  const actionToCommand = (actionCommand: ActionCommand): Command => {
    console.log("Generating command: " + actionCommand.displayWord + " : " + actionCommand.action.name + " : " + actionCommand.commandTrigger.triggerWord);
    switch (actionCommand.action.type) {
      case "hotkey":
        const hotkey = hotkeys.find((hotkey) => hotkey.id === actionCommand.action.ids[0]);
        if (hotkey) {
          console.log("Fuzzy: " + actionCommand.commandTrigger.fuzzy);
          console.log("Threshold: " + actionCommand.commandTrigger.threshold);
          if (actionCommand.commandTrigger.fuzzy) {
            const command: Command = {
              command: actionCommand.commandTrigger.triggerWord,
              matchInterim: actionCommand.commandTrigger.matchInter,
              isFuzzyMatch: actionCommand.commandTrigger.fuzzy,
              fuzzyMatchingThreshold: actionCommand.commandTrigger.threshold,
              callback: async (command, spokenPhrase, similarityRatio) => {
                console.log(`${command} and ${spokenPhrase} are ${similarityRatio! * 100}% similar`);
                await hotkey.trigger();
              },
            }
            return command;
          } else {
            const command: Command = {
              command: actionCommand.commandTrigger.triggerWord,
              matchInterim: actionCommand.commandTrigger.matchInter,
              callback: async () => await hotkey.trigger(),
            }
            return command;
          }
        } else {
          break;
        };
      case "colortint":
        const artmeshes = artMeshes.filter((artMesh) => { return actionCommand.action.ids.includes(artMesh) })
        const color = actionCommand.action.color;
        const time = Number(actionCommand.action.time);
        if (artmeshes.length > 0 && color) {
          if (time && time !== 0) {
            if (actionCommand.commandTrigger.fuzzy) {
              return {
                command: actionCommand.commandTrigger.triggerWord,
                matchInterim: actionCommand.commandTrigger.matchInter,
                isFuzzyMatch: actionCommand.commandTrigger.fuzzy,
                fuzzyMatchingThreshold: actionCommand.commandTrigger.threshold,
                callback: async () => {
                  currentModel?.colorTint({ r: color.r, g: color.g, b: color.b }, { nameExact: actionCommand.action.ids });
                  await new Promise(() => setTimeout(() => {
                    console.log("colortint done after " + time + " seconds")
                    currentModel?.colorTint({ r: 255, g: 255, b: 255, a: 255 }, { nameExact: actionCommand.action.ids });
                  }, time * 1000));
                }
              };
            } else {
              return {
                command: actionCommand.commandTrigger.triggerWord,
                callback: async () => {
                  currentModel?.colorTint({ r: color.r, g: color.g, b: color.b }, { nameExact: actionCommand.action.ids });
                  await new Promise(() => setTimeout(() => {
                    console.log("colortint done after " + time + " seconds")
                    currentModel?.colorTint({ r: 255, g: 255, b: 255, a: 255 }, { nameExact: actionCommand.action.ids });
                  }, time * 1000));
                }
              };
            }
          } else {
            return {
              command: actionCommand.commandTrigger.triggerWord,
              callback: async () => currentModel?.colorTint({ r: color.r, g: color.g, b: color.b }, { nameExact: actionCommand.action.ids }),
            }
          }
        };
    }
    return { command: actionCommand.commandTrigger.triggerWord, callback: () => console.log("Not implemented") };
  };


  const { interimTranscript, listening, startListening, stopListening, transcript, finalTranscript, isMicrophoneAvailable, browserSupportsSpeechRecognition } = Dictaphone(commands, selectedLang);

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
        const artMeshes = await currentModel?.artMeshNames();
        setArtMeshes(artMeshes!);
      })
    }
  }, [connection.connected]);

  let button;
  if (listening) {
    button = <HoverButtonShadow onClick={stopListening}>Stop voice detection</HoverButtonShadow>;
  } else {
    button = <HoverButtonShadow onClick={startListening}>Start voice detection</HoverButtonShadow>;
  }

  const actionFilter = (a1: ActionCommand, a2: ActionCommand) => {
    return !(a1.action.type === a2.action.type && a1.commandTrigger.triggerWord === a2.commandTrigger.triggerWord && a1.action.ids.length === a2.action.ids.length && a1.action.ids.every((id, index) => id === a2.action.ids[index]));
  }


  return (
    <ThemeProvider theme={currentTheme}>
      <Global />
      <div className="App">
        <Helmet>
          <title>Vtvoice</title>
        </Helmet>
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
                  <HoverButtonShadow
                    onClick={() => {
                      refreshHotkeys();
                      setShowActionPanel(true);
                      setShowWordSelect(false);
                    }} disabled={!connection.connected} onBlur={(event: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(event)} style={{ width: '100px', height: '25px' }}>
                    <div style={{ overflow: 'hidden', height: '17px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentAction ? currentAction.name : " . . ."} </div>
                  </HoverButtonShadow>
                </div>
                <div>
                  <p>Word</p>
                  <HoverButtonShadow onClick={() => {
                    setShowWordSelect(true);
                    setShowActionPanel(false);
                  }} style={{ width: '100px', height: '25px' }}>
                    <div style={{ overflow: 'hidden', height: '17px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {currentCommandTrigger?.triggerWord ? currentCommandTrigger.triggerWord.toString().replaceAll("\\b", "").replaceAll("/", "") : " . . ."}
                    </div>
                  </HoverButtonShadow>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={{ margin: '0px' }}>Command name:</p>
                  <input type={'text'} value={currentDisplayWord} onChange={(event) => setCurrentDisplayWord(event.target.value)} />
                  <HoverButtonShadow onClick={addCommand} disabled={currentDisplayWord === ""} style={{ width: '100px', height: '25px' }}>Add</HoverButtonShadow>
                </div>
              </AddPanel>
            </Card>
          </CardContainer>
          {!showWordSelect && !showActionPanel && (
            <Chiplist items={actionCommands.filter((action) => action.model === currentModel?.id)} onSelect={(element) => { }} onRemove={(element) => {
              setActionCommands(actionCommands.filter(hc => actionFilter(hc, element)));
            }} />)}
          <Footer>
            <div style={{ display: 'flex', gap: '5px' }}>
              <Question onClick={() => { setShowInfo(true) }}>?</Question>

              <Question onClick={() => { setShowPersonalNote(true) }}>♥</Question>

              <Question onClick={() => { setShowSettingPanel(true) }}>⚙</Question>

              <p style={{ color: 'white' }}>{process.env.REACT_APP_VERSION}</p>
            </div>
            <Credit>
              <Credits>Current language: {selectedLang}</Credits>
            </Credit>
            <Credit>
              <Credits>By PretendLiquid</Credits>
              <Mail onClick={() => { window.location.href = 'mailto:pretendliquid@gmail.com' }}>✉</Mail>
            </Credit>
          </Footer>
          <>
            {showWordSelect && !showActionPanel && (
                <VoicePanel transscript={interimTranscript} setPanel={setShowWordSelect} setCommandTrigger={setCurrentCommandTrigger} />
            )}
          </>
          <>
            {showActionPanel && !showWordSelect && (
                <ActionPanel hotkeys={hotkeys} artMeshes={artMeshes} setAction={setCurrentAction} setPanel={setShowActionPanel} />
            )}
          </>
          {!showWordSelect && !showActionPanel && (
            <>
              {(audioDevices.length !== 0 && audioDevices[0].label !== "") ?
                <AudioContainer>
                  <MicText>
                    <p style={{ marginTop: '0px' }}>Select a microphone</p>
                  </MicText>
                  <ClickList items={audioDevices} onSelect={(Element) => {
                    navigator.mediaDevices.getUserMedia({ audio: Element });
                    setCurrentDevice(Element);
                  }} onRemove={(Element) => { }} />
                </AudioContainer>
                : <BackgroundButton style={{ backgroundColor: "${({ theme }) => theme.colors.background.primary" }} onClick={() => navigator.mediaDevices.getUserMedia({ audio: true }).then((value) => {
                  console.log("Mic permission given");
                  getMedia();
                }).catch((error) => console.log("Error while trying to get mic permission: " + error))}>Select a microphone</BackgroundButton>
              }
            </>
          )}

        </OverallContainer>
        {showInfo && (
          <Info>
            <p>The webapp tries to connect to localhost:8001. This can be changed in settings</p>
            <p>If it is not connected try refresing and check vtube studio for auth popup</p>
            <p>To start using it click the "start voice detection" button</p>
            <p>1. Click the hotkey button</p>
            <p>2. Select a hotkey</p>
            <p>3. Click the word button</p>
            <p>4. Say a word</p>
            <p>5. Click the "Add" button</p>
            <p>To stop voice detection click the "stop voice detection" button</p>
            <Close onClick={() => { setShowInfo(false) }}>X</Close>
          </Info>
        )}
        {showPersonalNote && (
          <Info>
            <p>Thanks so much for using my webapp. I hope you have many fun moments with it. </p>
            <p>This project was a trainingground for me to practice typescript.</p>
            <p>I will continue to update and improve this project until I dont</p>
            <p>Hope you enjoy it</p>
            <p>- PretentLiquid (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧</p>
            <Close onClick={() => { setShowPersonalNote(false) }}>X</Close>
          </Info>
        )}
        {showSettingPanel && (
          <Info style={{ top: '250px', left: '400px', right: '400px', bottom: '250px' }}>
            <div>
              <div style={{ display: 'flex', height: '30px', alignItems: 'center', gap: '5px' }}>
                <p>Host:</p>
                <input type="text" placeholder={host} value={host} onChange={(event) => { setHost(event.target.value) }} />
                <p>ex: 0.0.0.0 or localhost</p>
              </div>
              <div style={{ display: 'flex', height: '30px', alignItems: 'center', gap: '8px' }}>
                <p>Port:</p>
                <input type="number" placeholder={port} value={port} onChange={(event) => { setPort(event.target.value) }} />
                <p>ex: 8001</p>
              </div>
              <p style={{ textAlign: 'left' }}>Please refresh the page to apply the changes.</p>
              <WordButton style={{ display: 'block', width: '100px' }} onClick={() => setShowLangDropDown(!showLangDropDown)} onBlur={(event: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(event)}>
                <div>{selectedLang}</div>
                {showLangDropDown && (
                  <LanguageDropdown values={['en-GB', 'en-US', 'da-DK', 'de-DE', 'ja', 'es-ES']} showDropDown={false} toggleDropDown={() => setShowLangDropDown(!showLangDropDown)} onSelection={(value: string) => { setSelectedLang(value); }} />
                )}
              </WordButton>
            </div>
            <Close onClick={() => { setShowSettingPanel(false) }}>X</Close>
          </Info>
        )}
        <div style={{ position: 'fixed', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <ThemeButton color={'white'} onClick={() => setCurrentTheme(light)} />
          <ThemeButton color={'grey'} onClick={() => setCurrentTheme(dark)} />
          <ThemeButton color={'#755E8C'} onClick={() => setCurrentTheme(mouse)} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
