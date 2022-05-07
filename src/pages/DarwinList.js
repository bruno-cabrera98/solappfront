import AudioCard from "../components/AudioCard";
import Pager from "../components/stateless/Pager";
import {useEffect, useState} from "react";
import service from "../service/api";
import db from "../db";
import {useDispatch, useSelector} from "react-redux";


const DarwinList = () => {

    const programs = useSelector(state => state.audioList)
    const [page, setPage] = useState(1)

    const dispatch = useDispatch()

    useEffect(() => {
        service.getAudioSection('ntn', 'darwincolumna', page).then(
            res => {
                db.audios.orderBy('id').keys()
                    .then(keys => {
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
        <div>
            {programs && programs.map(program => <AudioCard key={program.id} item={program} /> )}
            <Pager page={page}
                   nextPage={() => setPage(page + 1)}
                   previousPage={() => setPage(page - 1)}
            />
            <footer style={{height: '100px'}}></footer>
        </div>
    )
}

export default DarwinList