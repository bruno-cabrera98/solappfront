import React from "react"
import styled from "styled-components"
import BoxCarouselItem from "./BoxCarouselItem"

const BoxCarouselContainer = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    position: relative;
    overflow: hidden;
`

const BoxCarousel = () => 
{
    return <BoxCarouselContainer>

        <BoxCarouselItem />
        <BoxCarouselItem />
        <BoxCarouselItem />
        <BoxCarouselItem />
        <BoxCarouselItem />
        



    </BoxCarouselContainer>



}

export default BoxCarousel