import { useEffect, useMemo, useState } from "react";
import Card from "./components/Card";
import FullPlayer from "./components/FullPlayer";
import MiniPlayer from "./components/MiniPlayer";
import { loadFiles, saveFiles } from "./db";
import { readAudioFiles } from "./fs";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import type { AudioFile } from "./types";

export default function App() {
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [search, setSearch] = useState("");
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  const {
    currentFile,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    play,
    toggle,
    next,
    previous,
    seek,
    changeSpeed,
  } = useAudioPlayer(files);

  useEffect(() => {
    async function restore() {
      const saved = await loadFiles();

      setFiles(saved);
    }

    restore();
  }, []);

  async function addFiles(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const audioFiles = readAudioFiles(event.target.files);

    try {
      await saveFiles(audioFiles.map((f) => f.file));
    } catch (e) {
      console.error(e);
    }

    setFiles((prev) => [...prev, ...audioFiles]);
  }

  function playFile(file: AudioFile) {
    play(file, files);
  }

  const filteredFiles = useMemo(() => {
    return files.filter((file) =>
      file.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [files, search]);

  return (
    <main
      style={{
        padding: 24,
        paddingBottom: 90,
        maxWidth: 600,
        margin: "auto",
      }}
    >
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

      {/* {currentFile && (
        <div>
          <strong>{currentFile.name}</strong>

          <br />

          <button onClick={previous}>⏮</button>

          <button onClick={toggle}>{isPlaying ? "⏸" : "▶️"}</button>

          <button onClick={next}>⏭</button>
        </div>
      )} */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {files.length > 0 && (
          <input
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "80%",
              padding: 10,
              backgroundColor: "#fffced",
              borderRadius: 10,
              borderColor: "none",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
        )}

        <label>
          <input
            type="file"
            accept="audio/*"
            multiple
            onChange={addFiles}
            style={{ display: "none" }}
          />

          <span
            style={{
              width: "20%",
              padding: 10,
              backgroundColor: "#8e2800",
              borderRadius: 10,
              borderColor: "none",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              color: "#fff",
              fontWeight: "semibold",
            }}
          >
            + Add
          </span>
        </label>
      </div>

      <h2 style={{ color: "#8E2800", paddingTop: 8, paddingBottom: 8 }}>
        Library
      </h2>

      <div
        style={{
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 8,
        }}
      >
        {filteredFiles.map((file) => (
          <Card
            name={file.name}
            onClick={() => playFile(file)}
            key={file.name}
          />
        ))}
      </div>

      <MiniPlayer
        currentFile={currentFile}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onToggle={toggle}
        onExpand={() => setShowFullPlayer(true)}
      />

      {showFullPlayer && currentFile && (
        <FullPlayer
          currentFile={currentFile}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          playbackRate={playbackRate}
          onToggle={toggle}
          onNext={next}
          onPrevious={previous}
          onSeek={seek}
          onChangeSpeed={changeSpeed}
          onClose={() => setShowFullPlayer(false)}
        />
      )}
    </main>
  );
}
