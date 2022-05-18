import Dexie from 'dexie';

class AppDb extends Dexie {
    audios!: Dexie.Table<IAudio, number>

    constructor() {
        super("AppDb");
        this.version(1).stores({
            audios: '++id, blob, titulo, duracion, icon'
        })
    }
}

export interface IAudio {
    id?: number,
    blob: any,
    title: string,
    length: string,
    icon_url: string,
}

export const db = new AppDb()