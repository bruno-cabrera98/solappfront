import Dexie from 'dexie';
import { IAudioItem } from './types/IAudioItem';

export interface IAudio extends IAudioItem{
    id: number,
    blob: any,
    title: string,
    length: string,
    iconUrl: string,
    imgUrl: string,
    date: string,
}

class AppDb extends Dexie {
  audios!: Dexie.Table<IAudio, number>;

  constructor() {
    super('AppDb');
    this.version(1).stores({
      audios: '++id, blob, title, length, iconUrl, imgUrl, date',
    });
  }
}

export const db = new AppDb();
