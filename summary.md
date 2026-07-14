# Audio Library PWA - Project Summary

## Overview

A personal offline-first music/audio player PWA built with React + Vite.

Purpose:

- Store and play personal WhatsApp audio recordings.
- Run mainly on Android as an installed PWA.
- Keep all audio files private and local to the device.
- Provide a music-app-like experience.

---

# Tech Stack

- React
- Vite
- TypeScript
- IndexedDB using `idb`
- vite-plugin-pwa
- Service Worker / PWA support

---

# Current Features

## Audio Library

Implemented:

- Select multiple audio files using browser file picker.
- Store audio files in IndexedDB.
- Restore library after refresh.
- Search recordings.

Storage:

Database:

```
audio-library
```

Object store:

```
files
```

Stored object:

```ts
{
  name: string,
  file: File
}
```

---

# Audio Player

Implemented:

- Play audio
- Pause audio
- Next track
- Previous track
- Seek slider
- Mini player
- Full player screen
- Playback speed control

Playback speeds:

```
1x
1.25x
1.5x
2x
```

---

# Player Persistence

Implemented:

Database:

```
audio-player
```

Object store:

```
player
```

Saved state:

```ts
{
  fileName: string,
  position: number,
  playbackRate: number
}
```

Current behavior:

- Last played file restored after refresh.
- Playback position restored.
- Playback speed restored.
- Mini player returns after reload.

---

# Audio Architecture

Main player logic:

```
src/hooks/useAudioPlayer.ts
```

Responsibilities:

- Audio element management.
- Queue handling.
- Playback controls.
- Persistence.
- Media Session integration.

Audio element:

```ts
new Audio();
```

No HTML audio element is permanently rendered.

---

# Components

Current UI structure:

```
src
 ├── App.tsx
 ├── components
 │    ├── MiniPlayer.tsx
 │    └── FullPlayer.tsx
 ├── hooks
 │    └── useAudioPlayer.ts
 ├── db.ts
 ├── playerDb.ts
 ├── types.ts
 └── main.tsx
```

---

# PWA Setup

Implemented:

- vite-plugin-pwa
- Manifest
- Service worker registration
- Offline app shell
- Installable app

Manifest:

Name:

```
Audio Library
```

Short name:

```
Audio
```

Theme:

```
#111827
```

Icons:

```
public/icons/

icon-192.png
icon-512.png
```

---

# Offline Behavior

Goal:

```
Open installed app
        ↓
Load cached React app
        ↓
Load recordings from IndexedDB
        ↓
Play without internet
```

Audio files are NOT hosted online.

They remain local:

```
Device
 └── IndexedDB
      └── audio files
```

---

# Media Session

Implemented:

- Lock screen metadata
- Play/pause control
- Next track
- Previous track

Uses:

```ts
navigator.mediaSession;
```

Artwork:

```
/icons/icon-512.png
```

---

# Deployment Plan

Target:

GitHub Pages

Expected flow:

```
React/Vite
    ↓
npm run build
    ↓
dist/
    ↓
GitHub Pages
    ↓
Install as PWA
```

Important:

When deploying to GitHub Pages:

Update Vite:

```ts
base: "/repository-name/";
```

Use relative icon paths in manifest:

```ts
icons/icon-512.png
```

instead of:

```ts
/icons/icon-512.png
```

---

# Future Improvements

## High Priority

### Auto play next

When one recording finishes:

```
Track A ends
    ↓
Track B starts automatically
```

---

### Repeat / Shuffle

Add:

- Repeat all
- Repeat one
- Shuffle

---

### Better Library

Add:

- Favorites
- Rename recordings
- Recently played
- Sorting by date

---

### Backup

Export/import metadata:

Example:

```json
{
  "name": "Family call",
  "favorite": true
}
```

---

### Performance

Improve:

- Throttle IndexedDB writes.
- Save playback position every few seconds instead of every `timeupdate`.

---

# Development Notes

Important:

PWA features should be tested using:

```bash
npm run build
npm run preview -- --host
```

Not only:

```bash
npm run dev
```

because service worker behavior differs.

---

# Current Status

Version:

```
1.0.0
```

The app is functional as a personal offline audio player.

Main remaining work is polish and additional music-app features.
