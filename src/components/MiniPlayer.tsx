import { Pause, Play } from "lucide-react";
import type { AudioFile } from "../types";
interface MiniPlayerProps {
  currentFile: AudioFile | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onToggle: () => void;
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
        background: "#fffced",
        padding: "12px 16px",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      {/* <CircleChevronUp
        role="button"
        onClick={onExpand}
        size={32}
        strokeWidth={2}
        style={{
          position: "absolute",
          top: "-10%",
          left: "80%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          color: "#8e2800",
        }}
      /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/logo square.png`}
          height={75}
          width={75}
          style={{
            width: "75px",
            height: "75px",
            objectFit: "cover",
            cursor: "pointer",
          }}
          role="button"
          onClick={onExpand}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            paddingRight: "4px",
            paddingLeft: "4px",
            gap: 4,
          }}
        >
          <p
            style={{ color: "#333", fontWeight: "semibold", fontSize: "16px" }}
          >
            {currentFile.name}
          </p>
          <p
            style={{ color: "#333", fontWeight: "semibold", fontSize: "16px" }}
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>
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
      </div>
    </div>
  );
}
