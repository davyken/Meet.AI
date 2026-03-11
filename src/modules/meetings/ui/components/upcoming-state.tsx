import Link from "next/link"
import { VideoIcon, Copy, Check } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"

interface Props {
  meetingId: string;
}

export const UpcomingState = ({
  meetingId,
}: Props) => {
  const [copied, setCopied] = useState(false);

  const meetingUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/call/${meetingId}`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(meetingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Not started yet"
        description="Once you start this meeting, a summary will appear here"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start meeting
          </Link>
        </Button>
        <Button 
          variant="outline" 
          className="w-full lg:w-auto"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
          {copied ? "Copied!" : "Copy invite link"}
        </Button>
      </div>
    </div>
  )
}