import { useEffect, useRef, useState } from "react";
import { loadPlayerState, savePlayerState } from "../playerDb";
import type { AudioFile } from "../types";

export function useAudioPlayer(files: AudioFile[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const queueRef = useRef<AudioFile[]>([]);
  const currentIndexRef = useRef(-1);
  const currentFileRef = useRef<AudioFile | null>(null);
  const currentUrlRef = useRef("");

  const audioReadyRef = useRef(false);

  const [currentFile, setCurrentFile] = useState<AudioFile | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = new Audio();

    audioRef.current = audio;
    audioReadyRef.current = true;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);

      if (currentFileRef.current) {
        savePlayerState({
          fileName: currentFileRef.current.name,
          position: audio.currentTime,
          playbackRate: audio.playbackRate,
        });
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.src = "";

      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  function updateMediaSession(file: AudioFile) {
    if (!("mediaSession" in navigator)) {
      return;
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title: file.name,
      artist: "My Audio Library",
      album: "Personal Recordings",
      artwork: [
        {
          src: "/icons/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });

    navigator.mediaSession.setActionHandler("play", () => {
      audioRef.current?.play();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      audioRef.current?.pause();
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      next();
    });

    navigator.mediaSession.setActionHandler("previoustrack", () => {
      previous();
    });
  }

  useEffect(() => {
    async function restore() {
      const saved = await loadPlayerState();

      if (!saved || files.length === 0) {
        return;
      }

      const file = files.find((item) => item.name === saved.fileName);

      if (!file) {
        return;
      }

      const audio = audioRef.current;

      if (!audio || !audioReadyRef.current) {
        return;
      }

      queueRef.current = files;

      currentIndexRef.current = files.findIndex(
        (item) => item.name === file.name,
      );

      const url = URL.createObjectURL(file.file);

      currentUrlRef.current = url;

      audio.src = url;

      const restorePosition = () => {
        audio.currentTime = saved.position;
        audio.playbackRate = saved.playbackRate;

        setCurrentTime(saved.position);
        setPlaybackRate(saved.playbackRate);

        audio.removeEventListener("loadedmetadata", restorePosition);
      };

      audio.addEventListener("loadedmetadata", restorePosition);

      currentFileRef.current = file;

      setCurrentFile(file);

      updateMediaSession(file);
    }

    if (files.length > 0) {
      restore();
    }
  }, [files]);

  function loadTrack(file: AudioFile) {
    const audio = audioRef.current;

    if (!audio) return;

    if (currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current);
    }

    const url = URL.createObjectURL(file.file);

    currentUrlRef.current = url;

    audio.src = url;
    audio.playbackRate = playbackRate;

    currentFileRef.current = file;

    setCurrentFile(file);
    setCurrentTime(0);

    updateMediaSession(file);

    audio.play();
  }

  function play(file: AudioFile, allFiles: AudioFile[]) {
    queueRef.current = allFiles;

    currentIndexRef.current = allFiles.findIndex(
      (item) => item.name === file.name,
    );

    loadTrack(file);
  }

  function next() {
    const index = currentIndexRef.current + 1;

    if (index < queueRef.current.length) {
      currentIndexRef.current = index;
      loadTrack(queueRef.current[index]);
    }
  }

  function previous() {
    const index = currentIndexRef.current - 1;

    if (index >= 0) {
      currentIndexRef.current = index;
      loadTrack(queueRef.current[index]);
    }
  }

  function toggle() {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  function seek(time: number) {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = time;
  }

  function changeSpeed(rate: number) {
    const audio = audioRef.current;

    if (!audio) return;

    audio.playbackRate = rate;
    setPlaybackRate(rate);
  }

  return {
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
  };
}
