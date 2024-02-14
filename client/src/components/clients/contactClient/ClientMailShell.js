import React, { useContext } from 'react'
import { UserContext } from '../../users/UserContext'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const ClientMailShell = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const currentClientId = currentUser._id;

  const navigate = useNavigate();

  const handleCheckBulkRequests = () => {
    navigate('/clientside/bulkrequest/view');
  }

  const handleBulkRequests = () => {
    navigate('/clientside/bulkrequest');
  }

  // The purpose of handleClientMails is to allow the client to access a page to send a message to a carrier that replied to his bulk request.
  // The mailbox is specific to the client as it takes in consideration the client ID that is unique.

  const handleClientMails = () => {
    navigate(`/clientside/bulk/clientmailbox/${currentClientId}`);
  }

  return (
    <SectionDiv>
      <TitleDiv>
        <H2>? Mailbox</H2>
      </TitleDiv>
      <CriteriaButtonDiv>
        <H3>Check your Bulk Requests</H3>
        <Btn onClick={handleCheckBulkRequests}>View Your Bulk Requests</Btn>
      </CriteriaButtonDiv>
      <CriteriaButtonDiv>
        <H3>Create your Bulk Requests</H3>
        <Btn onClick={handleBulkRequests}>Create Your Bulk Request</Btn>
      </CriteriaButtonDiv>
      <CriteriaButtonDiv>
        <H3>Send Messages</H3>
        <Btn onClick={handleClientMails}>Send Mails</Btn>
      </CriteriaButtonDiv>
    </SectionDiv>
  )
}

export default ClientMailShell

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
margin: 1vh 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`

const TitleDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
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