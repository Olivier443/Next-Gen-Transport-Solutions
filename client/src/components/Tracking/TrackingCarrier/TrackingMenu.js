import React from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartGantt } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

// This is the component that is the Tracking menu for the carrier. 
// This menu will give access to the features that allow to view, delete, and update the tracking status of a specific route by the carrier.

const TrackingMenu = () => {
  const navigate = useNavigate();

  const handleViewUpdateTrackingDoc = () => {
    navigate('/carrier/tracking/viewupdtrackingdoc');
  }

  return (
    <SectionDiv>
      <TitleDiv>
        <H2><FontAwesomeIcon icon={faChartGantt} /> Tracking</H2>
      </TitleDiv>
      <CriteriaButtonDiv>
        <H3>Access and Update Tracking Documents</H3>
        <Btn onClick={handleViewUpdateTrackingDoc}>View / Update</Btn>
      </CriteriaButtonDiv>
    </SectionDiv>
  )
}

export default TrackingMenu

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 30vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
margin: 1vh 1vw 1vh 1vw;
`

const TitleDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: center;
width: 28vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 1vh 1vw;
`

const CriteriaButtonDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 28vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
`

const H2 = styled.h2`
color: #fff;
`

const H3 = styled.h3`
color: #fff;
`

const Btn = styled.button`
margin-right: 4px;
font-weight: bold;
border-radius: 30px;
padding: 4px 4px 4px 4px;
text-decoration: none;
background-color: #480048;
width: 6vw;
color: #fff;
&:hover {
  background-color: #E4E5E6;
  color: #00416A;
}
`