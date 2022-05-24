import { IAudioItem } from './IAudioItem';

export interface PlayerT {
    playing: boolean,
    playingUrl: string,
    second: number,
    audioTitle: string,
    img_url: string,
    summary: string,
}

export interface Player extends PlayerT {
    play(item: IAudioItem): void,

    resume(): void,

    pause(): void,

    download(item: IAudioItem): void,

    delete(item: IAudioItem): void,
}
