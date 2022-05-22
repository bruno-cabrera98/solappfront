
export interface PlayerT {
    playing : boolean,
    playingUrl: string,
    second: number,
    audioTitle: string,
    img_url: string,
    summary: string,
}

export interface Player extends PlayerT {
    play(item : AudioItem) : void,
    resume() : void,
    pause(): void,
    download(item : AudioItem) : void,
    delete(item : AudioItem) : void,
}
