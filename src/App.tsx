import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import PlayerComponent from './components/PlayerComponent';
import DownloadedAudios from './pages/DownloadedAudios';
import Navbar from './components/stateless/Navbar';
import api from './service/api';
import { initAction } from './reducers/programsReducer';
import ProgramPage from './pages/ProgramPage';
import SideMenu from './components/SideMenu';
import { ContentWrapper, PageContainer } from './components/stateless/ContentWrapper';
import theme from './parameters/theme';
import font from './fonts/raleway.ttf';
import {db, IAudio} from './db';
import { initializeDownloadListAction } from './reducers/downloadListReducer';
import PlayerMenu from './components/PlayerMenu';
import { useAppDispatch } from './hooks/redux';
import AboutPage from "./pages/AboutPage";
import HomePage from './pages/HomePage';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to bottom, #0f031c 0%, #03031c 50%, #03031c 100%);
    margin: auto;
    position: relative;
    max-width: 1600px;
  }

  @font-face {
    font-family: 'Raleway';
    src: local('raleway'), url(${font}) format('truetype');
  }
`;

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        api.getProgramas().then(
            (programs) => dispatch(initAction(programs)),
        );

        db.audios.toArray()
            .then((audios : IAudio[]) => {
                dispatch(initializeDownloadListAction(audios.map(
                    (audio : IAudio) => ({
                            id: audio.id,
                            downloadState: 'downloaded',
                            percentage: 100,
                        }
                    ),
                )));
            });
    }, [dispatch]);
    console.log(process.env)
    return (
        <div className="App">
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Navbar />
                <PageContainer>
                    <SideMenu />
                    <ContentWrapper>
                        <Routes >
                            <Route element={<HomePage/>} path={process.env.PUBLIC_URL + "/"} />
                            <Route element={<ProgramPage />} path={process.env.PUBLIC_URL + "/programs/:id"} />
                            <Route element={<DownloadedAudios />} path={process.env.PUBLIC_URL + "/downloads"} />
                            <Route element={<AboutPage />} path={process.env.PUBLIC_URL + "/about"} />
                        </Routes>
                    </ContentWrapper>
                </PageContainer>
                <PlayerMenu />
                <PlayerComponent />
            </ThemeProvider>
        </div>
    );
}

export default App;
