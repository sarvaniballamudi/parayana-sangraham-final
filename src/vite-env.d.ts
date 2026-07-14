/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface Window {
  showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
}
