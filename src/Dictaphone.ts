import { createSpeechlySpeechRecognition, MicrophoneNotAllowedError } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Command } from "./common";

// const appId = '80fedddb-c64d-4067-87be-50ca1cd84159';
// const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
// SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

// const speechRecognition = new SpeechlySpeechRecognition();

// speechRecognition.onerror = (event) => {
//     console.log("error error: " + event);
// }

export function Dictaphone(commands: Command[], language: string) {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
        interimTranscript,
        resetTranscript,
        finalTranscript,
        isMicrophoneAvailable
    } = useSpeechRecognition({ commands });
    const startListening = () => SpeechRecognition.startListening({ language: language, continuous: true });
    const stopListening = () => SpeechRecognition.stopListening();

    return { transcript, listening, startListening, interimTranscript, stopListening, resetTranscript, finalTranscript, isMicrophoneAvailable, browserSupportsSpeechRecognition};
};