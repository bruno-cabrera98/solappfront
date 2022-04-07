import {useEffect, useRef, useState} from "react";
import service from './service/api'
import Player from "./components/Player";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import AudioCard from "./components/AudioCard";
import db from './db'
import {useDispatch, useSelector} from "react-redux";
import {initializeAudioListAction} from "./reducers/audioListReducer";

library.add(faPlay, faPause)

function App() {
    const programs = useSelector(state => state.audioList)
    const [page, setPage] = useState(1)

    const handlePage = async (event) => {
        event.preventDefault()
        setPage(event.target.value)
        console.log(page)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        service.getDarwin(page).then(
            res => {
                db.audios.orderBy('id').keys()
                    .then(keys => {
                        console.log(keys)
                        dispatch(
                            initializeAudioListAction(
                                res.data.records.map(record =>
                                   ({...record, downloaded:keys.includes(record.id)})
                                )
                            )
                        )
                    })
            }
        )
    }, [page])

    return (
        <div className="App">
            {programs && programs.map(program => <AudioCard key={program.id} item={program} /> )}

            <input type='number' onChange={handlePage} value={page}/>
            <footer style={{height: '100px'}}></footer>
            <Player/>
        </div>
    );
}

export default App;
