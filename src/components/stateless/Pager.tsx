import styled from "styled-components";
import {findIconDefinition, IconDefinition, library} from "@fortawesome/fontawesome-svg-core";

import {faAnglesLeft, faAnglesRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

library.add(faAnglesLeft, faAnglesRight)

const PagerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`


const PagerWrapper = styled.div`
  display: flex;
  width: auto;
  border-radius: 10px;
  background-image: linear-gradient(67deg,#e8154a 0%,#e87630 45%,#e8d615 100%);
  overflow: hidden;
`

const PagerButton = styled.button`
  background: transparent;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  border: none;
  cursor: pointer;
  text-shadow: 0 0 10px #070c13;
  :hover {
    background: rgba(0,0,0,.2);
  }
  :active {
    background: rgba(0,0,0,.4);
  }
`

const PagerPage = styled.div`
  background: transparent;
  padding: 10px;
  font-size: 18px;
  height: 40px;
  box-sizing: border-box;
  line-height: 20px;
  font-family: Raleway, sans-serif;
  font-weight: 700;
  color:white;
  text-shadow: 0 0 10px #070c13;
`

const FaAnglesRightIcon: IconDefinition = findIconDefinition({prefix: "fas", iconName: 'angles-right'})
const FaAnglesLeftIcon: IconDefinition = findIconDefinition({prefix: "fas", iconName: 'angles-left'})
const Pager = ({page, nextPage, previousPage} : {page: number, nextPage: () => void, previousPage: () => void}) => {
    const handlePreviousPage = async (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        previousPage()
    }

    const handleNextPage = async (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        nextPage()
    }

    return (
        <PagerContainer>
            <PagerWrapper>
                <PagerButton onClick={handlePreviousPage}>
                    <FontAwesomeIcon icon={FaAnglesLeftIcon} size="sm"/>
                </PagerButton>
                <PagerPage>
                    {page}
                </PagerPage>
                <PagerButton onClick={handleNextPage}>
                    <FontAwesomeIcon icon={FaAnglesRightIcon} size="xs"/>
                </PagerButton>
            </PagerWrapper>
        </PagerContainer>
    )
}

export default Pager