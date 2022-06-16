import { Hotkey } from "vtubestudio";

export interface HotkeyCommand {
    hotkey: Hotkey;
    command: Command;
}

export interface Command {
    command: string;
    callback: () => void;
}