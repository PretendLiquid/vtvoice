import { RGBColor } from "react-color";
import { Hotkey } from "vtubestudio";

export interface ActionCommand {
    displayWord: string;
    commandTrigger: CommandTrigger;
    action: Action;
    model: string;
}

export interface CommandTrigger {
    triggerWord: RegExp | string;
    matchInter? : boolean;
    fuzzy? : boolean;
    threshold? : number;
}

export interface Command {
    command: RegExp | string;
    matchInterim? : boolean;
    isFuzzyMatch? : boolean;
    fuzzyMatchingThreshold? : number;
    callback: (command?: string, spokenPhrase?: string, similarityRation?: number) => void;
}

export interface Action {
    type: string;
    name: string;
    ids: string[];
    color?: RGBColor;
    time? : string; 
}