"use client";

import { Button } from "@workspace/ui/components/button";
import { useVapi } from "@/modules/widget/hooks/use-vapi";

export default function Page() {
  const {
    isSpeaking,
    isConnected,
    isConnecting,
    transcript,
    startCall,
    endCall,
  } = useVapi();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto gap-4">

      <Button
        onClick={startCall}
        disabled={isConnecting || isConnected}
      >
        {isConnecting ? "Connecting..." : "Start Call"}
      </Button>

      <Button
        onClick={endCall}
        variant="destructive"
        disabled={!isConnected}
      >
        End Call
      </Button>

      <div className="text-sm space-y-1">
        <p>isConnected: {String(isConnected)}</p>
        <p>isConnecting: {String(isConnecting)}</p>
        <p>isSpeaking: {String(isSpeaking)}</p>
      </div>

      <pre className="w-full bg-muted p-2 rounded text-xs overflow-auto max-h-64">
        {JSON.stringify(transcript, null, 2)}
      </pre>

    </div>
  );
}
