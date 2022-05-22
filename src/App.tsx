import Player from "./components/Player";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {Navigate, Route, Routes} from "react-router";
import DownloadedAudios from "./pages/DownloadedAudios";
import Navbar from "./components/stateless/Navbar";
import {useEffect} from "react";
import api from "./service/api"
import {initAction} from "./reducers/programsReducer";
import ProgramPage from "./pages/ProgramPage";
import {SideMenu} from "./components/SideMenu";
import {ContentWrapper, PageContainer} from "./components/stateless/ContentWrapper";
import theme from './parameters/theme'
import font from "./fonts/raleway.ttf"
import {db} from "./db";
import {initializeDownloadListAction} from "./reducers/downloadListReducer";
import PlayerMenu from "./components/PlayerMenu";
import React from "react";
import {useAppDispatch} from "./hooks/redux";

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

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        api.getProgramas().then(
            programs => dispatch(initAction(programs))
        )

        db.audios.toArray()
            .then(audios => {
                dispatch(initializeDownloadListAction(audios.map(
                    audio => ({
                            id: audio.id,
                            downloadState: 'downloaded'
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
                            <Route element={<DownloadedAudios/>} path="downloads"/>
                        </Routes>
                    </ContentWrapper>
                </PageContainer>
                <PlayerMenu/>
                <Player/>
            </ThemeProvider>
        </div>
    );
}

export default App;
