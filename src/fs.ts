import type { AudioFile } from "./types";

export function readAudioFiles(fileList: FileList): AudioFile[] {
  const files: AudioFile[] = [];

  for (const file of Array.from(fileList)) {
    files.push({
      name: file.name,
      file,
    });
  }

  return files;
}
