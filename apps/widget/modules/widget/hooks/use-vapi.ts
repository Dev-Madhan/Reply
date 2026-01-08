import {useEffect, useState} from "react";
import Vapi from "@vapi-ai/web"

interface TranscriptMessage {
    role: 'user' | 'assistant';
    text: string;
}

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {
        // Only for testing purpose of Vapi API, otherwise customers will provide their own API keys.
        const vapiInstance = new Vapi("311ec169-5c96-44c7-8262-c0e9510d1a20")
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnecting(true);
            setIsConnected(false);
            setTranscript([]);
        });

        vapiInstance.on("call-end", () => {
            setIsConnecting(false);
            setIsConnected(false);
            setIsSpeaking(false);
        });

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        });

        vapiInstance.on("error", (error) => {
            console.error(error, "Vapi Error");
            setIsConnecting(false);
        });

        vapiInstance.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prevTranscript) => [...prevTranscript, {
                    role: message.role === "user" ? "user" : "assistant",
                    text: message.transcript,
                }]);
            }
        });

        return () => {
            vapiInstance?.stop();
        }
    }, [])

    const startCall = () => {
        setIsConnecting(true);

        if (vapi) {
            // Only for testing purpose of Vapi API, otherwise customers will provide their own API keys.
            vapi.start("950b93ab-9d02-4622-b889-adb8f25002ad");
        }
    }

    const endCall = () => {
        if (vapi) {
            vapi.stop();
        }
    };

    return {
        isSpeaking,
        isConnected,
        isConnecting,
        transcript,
        startCall,
        endCall,
    }
};


