import { openDB } from "idb";

const dbPromise = openDB("audio-library", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("files")) {
      db.createObjectStore("files", { keyPath: "name" });
    }
  },
});

export async function saveFiles(files: File[]) {
  const db = await dbPromise;

  const tx = db.transaction("files", "readwrite");

  for (const file of files) {
    await tx.store.put({
      name: file.name,
      file,
    });
  }

  await tx.done;
}

export async function loadFiles() {
  const db = await dbPromise;

  return await db.getAll("files");
}
