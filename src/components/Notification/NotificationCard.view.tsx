import { decodeWord, timeAgo } from "@/helpers/commonFunction";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  profileImage: string;
  title: string;
  preview: string;
  timestamp: string;
  isRead?: boolean;
  className?: string;
  makeUnread:(id:number)=>void;
  id:number
}

export function NotificationCard({
  profileImage,
  title,
  preview,
  timestamp,
  isRead = true,
  className,
  makeUnread,
  id
}: NotificationCardProps) {

    const handleMakeUnread=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        e.stopPropagation();
        makeUnread(id)
    }
  return (
    <div
      className={cn(
        "flex w-full px-3 py-1 cursor-pointer sm:px-4 items-start gap-3 sm:gap-4 flex-shrink-0 rounded-[5px] bg-white/[0.04] relative ",
        className
      )}
    >
      {/* Profile Image */}
      <img
        loading="lazy"
        src={profileImage}
        alt=""
        className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full"
      />

      {/* Content Area */}
      <div className="flex w-full flex-col items-start gap-1 sm:gap-2 flex-shrink-0 min-w-0">
        {/* Header with title and unread indicator */}
        <div className="flex w-full justify-between items-start flex-shrink-0 gap-2">
          <div className="flex flex-col items-start gap-1 flex-shrink-0 min-w-0 flex-1">
            {/* Main notification text */}
            <div className="flex items-center flex-shrink-0 w-full">
              <span className="font-normal text-sm text-white font-inter leading-tight break-words">
                {decodeWord(title)}
              </span>
            </div>
            {/* Preview text */}
            <div className="flex items-center flex-shrink-0 w-full">
              <span className="font-normal text-xs text-white font-inter leading-tight break-words text-white/90">
                {decodeWord(preview)}
              </span>
            </div>
          </div>

          {/* Unread indicator */}
          {!isRead && (
            <div className="w-2 h-2 flex-shrink-0 rounded-full bg-[#3182CE] mt-1" />
          )}
        </div>

        {/* Footer with timestamp and mark as read */}
        <div className="flex w-full items-center gap-3 sm:gap-4 flex-shrink-0 flex-wrap">
          <div className="flex items-center">
            <span className="font-normal text-xs text-white font-inter">
              {timeAgo(timestamp)}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={handleMakeUnread} className="font-normal text-xs text-[#3182CE] font-inter hover:underline focus:outline-none focus:ring-2 focus:ring-[#3182CE]/50 rounded-sm px-1 py-0.5">
              Mark as read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
