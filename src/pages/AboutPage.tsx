import {H1, H3, P} from '../components/stateless/Atoms/Fonts'
import styled from "styled-components";

const AboutPageTextContainer = styled.div`
  padding: 0 20px;
`

const AboutPage = () => {

    return <AboutPageTextContainer>
        <H1>Sobre el proyecto</H1>

        <H3>Tecnologías</H3>
        <P>Creé (y estoy creando) esta página principalmente para poder aplicar tecnologías de desarrollo web. Está implementada principalemente usando <b>React</b>, <b>Redux</b>, <b>Typescript</b> y <b>Styled Components</b>. El backend está hecho usando <b>Express</b>, principalmente es usado como proxy entre la api de Del Sol y la aplicación. Además se usa para servir el frontend</P>

        <H3>Funcionalidades</H3>
        <P>Se pueden reproducir todos los audios publicados por Del Sol, como además también descargarlos en el storage del navegador, permitiendo luego poder reproducirlos sin consumir datos de internet</P>

        <H3>Errores conocidos</H3>
        <P>Actualmente la web no es usable desde un navegador en modo incognito</P>
    </AboutPageTextContainer>


}

export default AboutPage