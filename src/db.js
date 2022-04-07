// db.js
import Dexie from 'dexie';

export const db = new Dexie('audios');
db.version(1).stores({
    audios: 'id', // Primary key and indexed props
});

export default db