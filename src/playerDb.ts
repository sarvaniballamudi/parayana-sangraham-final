import { openDB } from "idb";

const dbPromise = openDB("audio-player", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("player")) {
      db.createObjectStore("player");
    }
  },
});

export async function savePlayerState(state: {
  fileName: string;
  position: number;
  playbackRate: number;
}) {
  const db = await dbPromise;

  await db.put("player", state, "current");
}

export async function loadPlayerState() {
  const db = await dbPromise;

  return await db.get("player", "current");
}
