interface Navigator {
  mediaSession: MediaSession;
}

interface MediaSession {
  metadata: MediaMetadata | null;

  setActionHandler(action: string, handler: (() => void) | null): void;
}

declare class MediaMetadata {
  constructor(init?: {
    title?: string;
    artist?: string;
    album?: string;
    artwork?: Array<{
      src: string;
      sizes?: string;
      type?: string;
    }>;
  });
}
