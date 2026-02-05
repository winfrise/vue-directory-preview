import { DirectoryItem } from "@/api/directory";

export interface ImageItem extends DirectoryItem {
  src: string;
}

export interface VideoItem extends DirectoryItem {
    src: string
}

