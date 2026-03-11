"use client"

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table"
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
  Copy,
  Check,
} from "lucide-react"
import { useState } from "react"

import { cn, formatDuration } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { Button } from "@/components/ui/button"

import { MeetingGetMany } from "../../types"

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
  processing: "bg-gray-300/20 text-gray-800 border-gray-800/5",
}

// Copy button component - extracted to avoid useState in cell
const CopyLinkButton = ({ meetingId }: { meetingId: string }) => {
  const [copied, setCopied] = useState(false);
  const meetingUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/call/${meetingId}`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(meetingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        copyToClipboard();
      }}
    >
      {copied ? (
        <>
          <Check className="size-4 mr-1" />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-4 mr-1" />
          Copy Link
        </>
      )}
    </Button>
  );
};

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize">{row.original.name}</span>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
              {row.original.agent.name}
            </span>
          </div>
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.agent.name}
            className="size-4"
          />
          <span className="text-sm text-muted-foreground">
            {row.original.startedAt ? format(row.original.startedAt, "MMM d") : ""}
          </span>
        </div>
      </div>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon = statusIconMap[row.original.status as keyof typeof statusIconMap];

      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize [&>svg]:size-4 text-muted-foreground",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )}
        >
          <Icon
            className={cn(
              row.original.status === "processing" && "animate-spin"
            )}
          />
          {row.original.status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "duration",
    header: "duration",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="capitalize [&>svg]:size-4 flex items-center gap-x-2"
      >
        <ClockFadingIcon className="text-blue-700" />
        {row.original.duration ? formatDuration(row.original.duration) : "No duration"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Invite",
    cell: ({ row }) => (
      <CopyLinkButton meetingId={row.original.id} />
    ),
  },
];
