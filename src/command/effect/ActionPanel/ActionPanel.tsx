import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BlockPicker, Color, ColorChangeHandler, RGBColor, SketchPicker } from "react-color";
import { Scrollbars } from "react-custom-scrollbars-2";
import { CurrentModel, Hotkey, Plugin } from "vtubestudio";
import { CheckBox } from "../../../buttons/Button";
import { Action } from "../../../common";
import { HoverButtonShadow, HoverButtonTransparentInverted } from "../../../styles/common/Buttons.styled";
import { Modal } from "../../../styles/common/Modal.styled";
import { ActionDescription } from "../../../styles/common/Text.styled";
import Tab from "../../../tabs/tab";
import Tabs from "../../../tabs/tabs";
import { VClient } from "../../../vtubestudio";


type props = {
    hotkeys: Hotkey[];
    artMeshes: string[];
    setAction: Dispatch<SetStateAction<Action | undefined>>;
    setPanel: Dispatch<SetStateAction<boolean>>;
}

export function ActionPanel({ hotkeys, setAction, setPanel, artMeshes }: props) {
    return (
        <Modal style={{ height: '450px', width: '600px', top: '0', bottom: '0', left: '0', right: '0', margin: 'auto', overflow: 'hidden', backgroundColor: 'transparent' }}>
            <Tabs title="ACTIONS">
                <Tab title={"Hotkey"}>
                    <HotkeySelection hotkeys={hotkeys} setAction={setAction} />
                </Tab>
                <Tab title={"ColorTint"}>
                    <ColorTintSelection artMeshes={artMeshes} setAction={setAction} />
                </Tab>
            </Tabs>
            <HoverButtonShadow onClick={() => setPanel(false)} style={{ position: 'absolute', width: '60px', height: '30px', bottom: '15px', right: '80px' }}>Close</HoverButtonShadow>
            <HoverButtonShadow onClick={() => setPanel(false)} style={{ position: 'absolute', width: '60px', height: '30px', bottom: '15px', right: '15px' }}>Add</HoverButtonShadow>
        </Modal >
    );
}

type HotkeySelectionProps = {
    hotkeys: Hotkey[];
    setAction: Dispatch<SetStateAction<Action | undefined>>;
}

function HotkeySelection(props: HotkeySelectionProps) {
    const [selectedHotkey, setSelectedHotkey] = useState<number>(0);

    const getAction = (index: number) => {
        setSelectedHotkey(index);
        props.setAction({ type: 'hotkey', name: props.hotkeys[index].name, ids: [props.hotkeys[index].id] });
    };

    return (
        <div style={{ flex: '1', display: 'flex' }}>
            <div style={{ flex: '1', height: '400px' }}>
                <Scrollbars>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                        {props.hotkeys.map((hotkey, index) => {
                            return <HoverButtonTransparentInverted key={index} className={index === selectedHotkey ? "active" : ""} style={{ width: '90%', height: '30px' }}
                                onClick={() => {
                                    getAction(index);
                                }}>{hotkey.name}</HoverButtonTransparentInverted>
                        })}
                    </div>
                </Scrollbars>
            </div>
            <div style={{ flex: '1' }}>
                <ActionDescription inverted={true} style={{ textAlign: 'left', paddingLeft: '10px', marginBottom: '0px' }}>{props.hotkeys[selectedHotkey]?.name}</ActionDescription>
                <div style={{ width: '170px', height: '150px' }}>
                    <ActionDescription inverted={true} style={{ fontSize: '12px', textAlign: 'left', paddingLeft: '10px', paddingRight: '10px', marginBottom: '0px', overflowWrap: 'break-word' }}>
                        {props.hotkeys[selectedHotkey]?.description}
                    </ActionDescription>
                </div>
            </div>
        </div>
    );
}

type ColorTintSelectionProps = {
    artMeshes: string[];
    setAction: Dispatch<SetStateAction<Action | undefined>>;
}

function ColorTintSelection({ artMeshes, setAction }: ColorTintSelectionProps) {
    const [selectedArtMesh, setSelectedArtMesh] = useState<number[]>([]);
    const [selectedAll, setSelectedAll] = useState<boolean>(true);
    const [selectedColor, setSelectedColor] = useState<RGBColor>({ r: 1, g: 1, b: 1, a: 1 });

    const getAction = (index: number) => {
        if (selectedAll) {
            setAction({ name: `ColorTint: Multiple`, type: 'colortint', ids: artMeshes, color: selectedColor });
        } else {
            if (!selectedArtMesh.includes(index)) {
                setSelectedArtMesh([...selectedArtMesh, index]);
            } else {
                setSelectedArtMesh(selectedArtMesh.filter(i => i !== index));
            }
            const list = selectedArtMesh.map(i => artMeshes[i]);
            console.log(list + " : " + selectedColor.b + " : " + selectedColor.g + " : " + selectedColor.r);
            setAction({ name: "ColorTint: Multiple", type: 'colortint', ids: list, color: selectedColor });
        }
    }

    useEffect(()=> {
        const list = selectedArtMesh.map(i => artMeshes[i]);
        console.log(list + " : " + selectedColor.b + " : " + selectedColor.g + " : " + selectedColor.r);
        setAction({ name: "ColorTint: Multiple", type: 'colortint', ids: list, color: selectedColor });
    }, [selectedColor, selectedArtMesh])

    useEffect(() => {
        setAction({ name: `ColorTint: Multiple`, type: 'colortint', ids: artMeshes, color: selectedColor });
    }, [selectedAll])

    return (
        <div style={{ flex: '1', display: 'flex' }}>
            <div style={{ flex: '1', height: '400px' }}>
                <Scrollbars>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                        {artMeshes.map((mesh, index) => {
                            return <HoverButtonTransparentInverted key={index} className={selectedArtMesh.includes(index) || selectedAll ? "active" : ""} style={{ width: '90%', height: '30px' }}
                                onClick={() => {
                                    getAction(index);
                                }}>{mesh}</HoverButtonTransparentInverted>
                        })}
                    </div>
                </Scrollbars>
            </div>
            <div style={{ flex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%', gap: '5px'}}>
                    <BlockPicker color={selectedColor} onChangeComplete={(color, event) => setSelectedColor(color.rgb)} />
                    <div style={{height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'}}>Select all: <CheckBox state={selectedAll} onCheck={() => setSelectedAll(!selectedAll)} /></div>
                </div>

                {/* <ActionDescription inverted={true} style={{ textAlign: 'left', paddingLeft: '10px', marginBottom: '0px' }}>{props.hotkeys[selectedHotkey]?.name}</ActionDescription> */}
                <div style={{ width: '170px', height: '150px' }}>

                </div>
            </div>
        </div>
    );
}
{/* {props.hotkeys.map((hotkey, index) => {
                        return <button onClick={() => setSelectedHotkey(hotkey)}>{hotkey.name}</button>
                    })}
{/* <Scrollbars width={'100px'} height={'100px'} style={{ backgroundColor: 'blue' }}>
                <button>test</button>
            </Scrollbars> */}
{/* <div style={{ display: 'flex', flexDirection: 'column', gap: '3px'}}>
                    {props.hotkeys.map((hotkey, index) => {
                        return <HoverButtonTransparentInverted className={selectedHotkey === index ? "active" : ""}  onClick={() => setSelectedHotkey(index)} style={{height: '30px'}}>{hotkey.name}</HoverButtonTransparentInverted>
                    })}
                    </div> */}
{/* <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p>{props.hotkeys[selectedHotkey].name}</p>
                    <p>{props.hotkeys[selectedHotkey].description}</p>
                </div> */}