"use client";
import { WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-2xl mx-auto w-full flex flex-col items-center gap-8">
        <div className="flex items-center justify-center p-4">
          <WifiOff size={64} className="text-muted-foreground" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-4xl font-light text-center tracking-tight">
            You're Offline
          </p>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            It looks like you've lost your internet connection. Please check
            your network and try again.
          </p>
        </div>

        <div className="p-4 bg-muted/30 rounded-lg max-w-md w-full">
          <p className="text-sm font-medium mb-2">What you can do:</p>
          <ul className="text-xs text-muted-foreground leading-relaxed space-y-1">
            <li>• Check your WiFi or mobile data connection</li>
            <li>• Make sure airplane mode is turned off</li>
            <li>• Try moving to a location with better signal</li>
          </ul>
        </div>

        <Button
          onClick={handleRefresh}
          variant="outline"
          className="hover:cursor-pointer mt-4"
        >
          <RefreshCw size={18} className="mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
