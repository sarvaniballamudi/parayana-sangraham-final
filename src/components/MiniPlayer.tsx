import type { AudioFile } from "../types";

interface MiniPlayerProps {
  currentFile: AudioFile | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onToggle: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onExpand: () => void;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export default function MiniPlayer({
  currentFile,
  isPlaying,
  currentTime,
  duration,
  onToggle,
  onNext,
  onPrevious,
  onSeek,
  onExpand,
}: MiniPlayerProps) {
  if (!currentFile) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#111827",
        color: "white",
        padding: "12px 16px",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
      onClick={onExpand}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginBottom: 8,
        }}
      >
        🎵 {currentFile.name}
      </div>

      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        style={{
          width: "100%",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          opacity: 0.8,
        }}
      >
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginTop: 8,
        }}
      >
        <button onClick={onPrevious}>⏮</button>

        <button onClick={onToggle}>{isPlaying ? "⏸" : "▶️"}</button>

        <button onClick={onNext}>⏭</button>
      </div>
    </div>
  );
}
