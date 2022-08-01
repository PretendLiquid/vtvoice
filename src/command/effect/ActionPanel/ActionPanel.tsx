import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BlockPicker, RGBColor } from "react-color";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Hotkey } from "vtubestudio";
import { CheckBox } from "../../../buttons/CheckBox";
import { Action } from "../../../common";
import { HoverButtonShadow, HoverButtonTransparentInverted } from "../../../styles/common/Buttons.styled";
import { ModalDiv } from "../../../styles/common/Modal.styled";
import { ActionDescription } from "../../../styles/common/Text.styled";
import Tab from "../../../tabs/tab";
import Tabs from "../../../tabs/tabs";


type props = {
    hotkeys: Hotkey[];
    artMeshes: string[];
    setAction: Dispatch<SetStateAction<Action | undefined>>;
    setPanel: Dispatch<SetStateAction<boolean>>;
}

export function ActionPanel({ hotkeys, setAction, setPanel, artMeshes }: props) {
    return (
        <ModalDiv style={{ position: 'relative', height: '450px', width: '600px', margin: 'auto', overflow: 'hidden', backgroundColor: 'transparent' }}>
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
        </ModalDiv >
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

    useEffect(() => {
        if (props.hotkeys) {
            getAction(0);
        }
    }, [])


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
    const [permanent, setPermanent] = useState<boolean>(true);
    const [time, setTime] = useState<string>("0");

    const toggleAction = (index: number) => {
        if (!selectedArtMesh.includes(index)) {
            setSelectedArtMesh([...selectedArtMesh, index]);
        } else {
            setSelectedArtMesh(selectedArtMesh.filter(i => i !== index));
        }
        action();
    }

    const action = () => {
        if (selectedAll) {
            if (permanent || time === "0") {
                setAction({ name: `ColorTint: Multiple`, type: 'colortint', ids: artMeshes, color: selectedColor });
                return;
            } else {
                setAction({ name: `ColorTint: Multiple`, type: 'colortint', ids: artMeshes, color: selectedColor, time: time });
                return;
            }
        } else {
            const list = selectedArtMesh.map(i => artMeshes[i]);
            if (permanent || time === "0") {
                setAction({ name: "ColorTint: Multiple", type: 'colortint', ids: list, color: selectedColor });
                return
            } else {
                const action: Action = { name: "ColorTint: Multiple", type: 'colortint', ids: list, color: selectedColor, time: time };
                setAction(action);
            }
        }
    }

    useEffect(() => {
        action();
    }, [selectedColor, selectedArtMesh, time, selectedAll, permanent]);

    return (
        <div style={{ flex: '1', display: 'flex' }}>
            <div style={{ flex: '1', height: '400px' }}>
                <Scrollbars>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                        {artMeshes.map((mesh, index) => {
                            return <HoverButtonTransparentInverted key={index} className={selectedArtMesh.includes(index) || selectedAll ? "active" : ""} style={{ width: '90%', height: '30px' }}
                                onClick={() => {
                                    toggleAction(index);
                                }}>{mesh}</HoverButtonTransparentInverted>
                        })}
                    </div>
                </Scrollbars>
            </div>
            <div style={{ flex: '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%', gap: '5px' }}>
                    <BlockPicker color={selectedColor} onChangeComplete={(color, event) => setSelectedColor(color.rgb)} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '5px' }}>
                        <div style={{ height: '30px', width: '170px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '5px' }}>Select all: <CheckBox state={selectedAll} onCheck={() => setSelectedAll(!selectedAll)} /></div>
                        <div style={{ height: '30px', width: '170px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '5px' }}>Permanent: <CheckBox state={permanent} onCheck={() => setPermanent(!permanent)} /></div>
                        {!permanent && (
                            <div style={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                Set time:
                                <input type={"number"} value={time} onChange={(event) => {
                                    const value = Math.max(0, Math.min(10000, Number(event.target.value)));
                                    setTime("" + value);
                                }} style={{ width: '50px' }} />
                                sec
                            </div>
                        )}
                    </div>
                </div>

                {/* <ActionDescription inverted={true} style={{ textAlign: 'left', paddingLeft: '10px', marginBottom: '0px' }}>{props.hotkeys[selectedHotkey]?.name}</ActionDescription> */}
                <div style={{ width: '170px', height: '150px' }}>

                </div>
            </div>
        </div>
    );
}