export interface AudioFile {
  name: string;
  file: File;
}

export type PlayerState = {
  currentFile: AudioFile | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
};
