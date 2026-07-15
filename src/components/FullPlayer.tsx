import { ChevronLeft, Pause, Play, SkipBack, SkipForward } from "lucide-react";
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
  const speeds = [1, 1.25, 1.5, 2];

  const handleSpeedChange = () => {
    const currentIndex = speeds.indexOf(playbackRate);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    onChangeSpeed(nextSpeed);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#fff0a5",
        zIndex: 2000,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div onClick={onClose} role="button" style={{ cursor: "pointer" }}>
        <ChevronLeft
          size={32}
          color="#8e2800"
          strokeWidth={2}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}icons/icon-192.png`}
          alt="Parayana Sangraham Logo"
        />
      </div>

      <img
        src={`${import.meta.env.BASE_URL}images/logo square.png`}
        alt="Default"
        height={350}
        width={350}
        style={{
          width: "350px",
          height: "350px",
          objectFit: "cover",
        }}
      />

      <p
        style={{
          color: "#333",
          fontWeight: "semibold",
          fontSize: "16px",
          paddingTop: "4px",
          paddingBottom: "16px",
        }}
      >
        {currentFile.name}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: 500,
          marginBottom: 30,
        }}
      >
        <div
          role="button"
          onClick={handleSpeedChange}
          style={{ cursor: "pointer" }}
        >
          {playbackRate}x
        </div>

        <div>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="audio-slider"
      />

      <div
        style={{
          marginTop: 30,
          display: "flex",
          gap: 25,
          alignItems: "center",
        }}
      >
        <SkipBack
          size={32}
          strokeWidth={2}
          role="button"
          onClick={onPrevious}
          style={{ cursor: "pointer" }}
          fill="#8e2800"
          color="#8e2800"
        />

        <div
          style={{
            borderRadius: "50%",
            backgroundColor: "#8e2800",
            width: "75px",
            height: "75px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          role="button"
          onClick={onToggle}
        >
          {isPlaying ? (
            <Pause size={32} color="#fffced" strokeWidth={2} />
          ) : (
            <Play size={32} color="#fffced" strokeWidth={2} />
          )}
        </div>

        <SkipForward
          size={32}
          color="#8e2800"
          strokeWidth={2}
          onClick={onNext}
          role="button"
          style={{ cursor: "pointer" }}
          fill="#8e2800"
        />
      </div>
    </div>
  );
}
