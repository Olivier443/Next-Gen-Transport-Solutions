import React from 'react'
import styled from 'styled-components';
import ProfileMenu from '../components/profile/ProfileMenu';
import img from '../assets/truck.jpg';
import TruckRoute from '../components/route/TruckRoute';
import BulkRequests from '../components/route/BulkRequests';
import TrackingMenu from '../components/Tracking/TrackingCarrier/TrackingMenu';

// This component is the page that includes the different menus Profile, Route, Mailbox, and Tracking.

const Carrier = () => {

  return (
    <PageDiv>

      <CntrDiv>
        <ProfViewDiv>
          <ProfileMenu />
          <TruckRoute />
        </ProfViewDiv>

        <ProfViewDiv>
          <BulkRequests />
          <TrackingMenu />
        </ProfViewDiv>
      </CntrDiv>

    </PageDiv>
  )
}

export default Carrier

const PageDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
width: 100vw;
height: 82vh;
padding: 1vh 1vw 1vh 1vw;
background-image: url(${img});
background-size: 100vw 82vh;
margin: 6vh 0 0 0;
`

const ProfViewDiv = styled.div`
display: flex;
flex-direction: column;
align-self: stretch;
`

const CntrDiv = styled.div`
display: flex;
flex-direction: row;
align-items: space-between;
justify-content: space-between;
width: 66vw;
`
