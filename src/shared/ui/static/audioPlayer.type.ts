export type GradientAudioPlayerProps = {
  src: string;
  /** colors & appearance */
  toogleForWard: () => void;
  toogleBackWard?: () => void;
  isLast?: boolean;
  isFirst?: boolean;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  gradientFrom?: string;
  gradientTo?: string;
  thumbColor?: string;
  trackBg?: string;
  accent?: string;
  className?: string;
  bookId?:number | string;
  episodeId?: number | string;
  currentTime:number;
  setCurrentTime: (currentTime: number) => void;
  /** behavior */
  skipSeconds?: number; // amount for ± buttons
  speeds?: number[];
  timerOptions?: number[]; // in minutes; include 0 for Off
  defaultSpeed?: number;
  defaultTimerMin?: number; // 0 = Off
  startMuted?: boolean;
  resumeTimeRef?: React.MutableRefObject<number | null>;
  onLoadingChange?: (loading: boolean) => void;
  setPlaybackRate:(val: number) => void;
  setTimerMin:(val: number) => void;
  playbackRate: number;
  timerMin: number;
};
