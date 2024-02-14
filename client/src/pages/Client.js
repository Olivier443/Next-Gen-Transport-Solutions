import React from 'react'
import styled from 'styled-components';
import ProfileMenu from '../components/profile/ProfileMenu';
import img from '../assets/truck.jpg';
import BulkRequests from '../components/route/BulkRequests';
import RequestMenu from '../components/request/RequestMenu';
import RoutesMenu from '../components/clients/viewClient/RoutesMenu';

const Client = () => {

  return (
    <PageDiv>
      <CntrDiv>

        <ColDiv>
          <ProfileMenu />
          <RequestMenu />
        </ColDiv>

        <ColDiv1>
          <BulkRequests />
          <RoutesMenu />
        </ColDiv1>

      </CntrDiv>
    </PageDiv>
  )
}

export default Client

const PageDiv = styled.div`
width: 100vw;
height: 82vh;
background-image: url(${img});
background-size: 100vw 82vh;
align-items: center;
justify-content: center;
margin: 6vh 0 0 0;
`

const CntrDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: space-around;
width: 100vw;
height: 82vh;
`

const ColDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 40vw;
`

const ColDiv1 = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: start;
margin-top: 8vh;
width: 40vw;
`
