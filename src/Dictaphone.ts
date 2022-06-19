import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Command } from "./common";

const appId = '80fedddb-c64d-4067-87be-50ca1cd84159';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

export function Dictaphone(commands: Command[]) {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
        interimTranscript,
        resetTranscript
    } = useSpeechRecognition({ commands });
    const startListening = () => SpeechRecognition.startListening({ continuous: true });
    const stopListening = () => SpeechRecognition.stopListening();

    if (!browserSupportsSpeechRecognition) {
        alert("Your browser does not support speech recognition.");
    }

    return { transcript, listening, startListening, interimTranscript, stopListening, resetTranscript };
};