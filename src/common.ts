import { RGBColor } from "react-color";
import { Hotkey } from "vtubestudio";

export interface ActionCommand {
    displayWord: string;
    triggerWord: RegExp | string;
    action: Action;
}

export interface Command {
    command: RegExp | string;
    callback: () => void;
}

export interface Action {
    type: string;
    name: string;
    ids: string[];
    color?: RGBColor;
    time? : string; 
}