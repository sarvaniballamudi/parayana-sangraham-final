import { useEffect, useMemo, useState } from "react";
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
      <h1>🎧 My Audio Library</h1>

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
            display: "inline-block",
            padding: 12,
            background: "#2563eb",
            color: "white",
            borderRadius: 8,
          }}
        >
          + Add Audio Files
        </span>
      </label>

      <br />
      <br />

      {currentFile && (
        <div>
          <strong>{currentFile.name}</strong>

          <br />

          <button onClick={previous}>⏮</button>

          <button onClick={toggle}>{isPlaying ? "⏸" : "▶️"}</button>

          <button onClick={next}>⏭</button>
        </div>
      )}

      <br />

      {files.length > 0 && (
        <input
          placeholder="Search recordings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
          }}
        />
      )}

      <ul
        style={{
          padding: 0,
          listStyle: "none",
        }}
      >
        {filteredFiles.map((file) => (
          <li key={file.name}>
            <button
              onClick={() => playFile(file)}
              style={{
                width: "100%",
                padding: 12,
                marginTop: 8,
              }}
            >
              ▶ {file.name}
            </button>
          </li>
        ))}
      </ul>

      <MiniPlayer
        currentFile={currentFile}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onToggle={toggle}
        onNext={next}
        onPrevious={previous}
        onSeek={seek}
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
