import Player from "./components/Player";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {Navigate, Route, Routes} from "react-router";
import DownloadedAudios from "./pages/DownloadedAudios";
import Navbar from "./components/stateless/Navbar";
import {useEffect} from "react";
import api from "./service/api"
import {useDispatch} from "react-redux";
import {initAction} from "./reducers/programsReducer";
import ProgramPage from "./pages/ProgramPage";
import SectionAudios from "./pages/SectionAudios";
import {SideMenu} from "./components/SideMenu";
import {ContentWrapper, PageContainer} from "./components/stateless/ContentWrapper";
import theme from './parameters/theme'
import font from "./fonts/raleway.ttf"
import db from "./db";
import {initializeDownloadListAction} from "./reducers/downloadListReducer";

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to bottom, #0f031c 0%, #03031c 50%, #03031c 100%);
    margin:auto;
    position: relative;
    max-width: 1600px;
  }

  @font-face {
    font-family: 'Raleway';
    src: local('raleway'), url(${font}) format('truetype');
  }
`


library.add(faPlay, faPause)

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        api.getProgramas().then(
            res => dispatch(initAction(res.data.programas))
        )

        db.audios.toArray()
            .then(audios => {
                dispatch(initializeDownloadListAction(audios.map(
                    audio => ({
                            id: audio.id,
                            titulo: audio.titulo,
                            duracion: audio.duracion,
                            icon: audio.icon,
                            state: 'downloaded'
                        }
                    )
                )))
            })
    }, [])

    return (
        <div className="App">
            <GlobalStyle/>
            <ThemeProvider theme={theme}>
                <Navbar/>
                <PageContainer>
                    <SideMenu/>
                    <ContentWrapper>
                        <Routes>
                            <Route element={<Navigate to="/programs/dar" />} path="/"/>
                            <Route element={<ProgramPage/>} path="/programs/:id"/>
                            <Route element={<SectionAudios/>} path="/programs/:id/:section"/>
                            <Route element={<DownloadedAudios/>} path="downloads"/>
                        </Routes>
                    </ContentWrapper>
                </PageContainer>
                <Player/>
            </ThemeProvider>
        </div>
    );
}

export default App;
