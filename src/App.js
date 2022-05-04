import Player from "./components/Player";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import styled, {createGlobalStyle} from "styled-components";
import {Route, Routes} from "react-router";
import DarwinList from "./pages/DarwinList";
import DownloadedAudios from "./pages/DownloadedAudios";
import Navbar from "./components/stateless/Navbar";
import {useEffect} from "react";
import api from "./service/api"
import {useDispatch} from "react-redux";
import {initAction} from "./reducers/programsReducer";
import ProgramList from "./pages/ProgramList";
import ProgramPage from "./pages/ProgramPage";
import SectionAudios from "./pages/SectionAudios";
import {OtherMenu, SideMenu} from "./components/SideMenu";
import {ContentWrapper, PageContainer} from "./components/stateless/ContentWrapper";

import font from "./fonts/raleway.ttf"

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
    }, [])

    return (
        <div className="App">
            <GlobalStyle/>
            <Navbar/>
            <PageContainer>
                <SideMenu/>
                <ContentWrapper>
                    <Routes>
                        <Route element={<DarwinList/>} path="/"/>
                        <Route element={<ProgramList/>} path="/programs"/>
                        <Route element={<ProgramPage/>} path="/programs/:id"/>
                        <Route element={<SectionAudios/>} path="/programs/:id/:section"/>
                        <Route element={<DownloadedAudios/>} path="downloads"/>
                    </Routes>
                </ContentWrapper>
            </PageContainer>
            <Player/>
        </div>
    );
}

export default App;
