import type { AudioFile } from "../types";

interface FullPlayerProps {
  currentFile: AudioFile;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onToggle: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onClose: () => void;
  playbackRate: number;
  onChangeSpeed: (rate: number) => void;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export default function FullPlayer({
  currentFile,
  isPlaying,
  currentTime,
  duration,
  playbackRate,
  onToggle,
  onNext,
  onPrevious,
  onSeek,
  onClose,
  onChangeSpeed,
}: FullPlayerProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#111827",
        color: "white",
        zIndex: 2000,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
        }}
      >
        ↓
      </button>

      <h2
        style={{
          textAlign: "center",
          maxWidth: 350,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        🎵 {currentFile.name}
      </h2>

      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        style={{
          width: "100%",
          maxWidth: 500,
        }}
      />

      <div style={{ marginTop: 20 }}>
        Speed:
        {[1, 1.25, 1.5, 2].map((speed) => (
          <button
            key={speed}
            onClick={() => onChangeSpeed(speed)}
            style={{
              marginLeft: 8,
              fontWeight: playbackRate === speed ? "bold" : "normal",
            }}
          >
            {speed}x
          </button>
        ))}
      </div>

      <div>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      <div
        style={{
          marginTop: 30,
          display: "flex",
          gap: 25,
        }}
      >
        <button onClick={onPrevious}>⏮</button>

        <button
          onClick={onToggle}
          style={{
            fontSize: 24,
          }}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button onClick={onNext}>⏭</button>
      </div>
    </div>
  );
}
