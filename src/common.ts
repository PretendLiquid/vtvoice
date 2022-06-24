import { Hotkey } from "vtubestudio";

export interface HotkeyCommand {
    hotkey: Hotkey;
    command: Command;
    word: String;
}

export interface Command {
    command: RegExp | string;
    callback: () => void;
}