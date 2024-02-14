import React from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

// This is the menu for Request.
// It has for purposes to let the client deciding if he wants to create, view, update, or delete one of the requests that he created.
// Note that the client won't have the possibility to update his request. His request should be unique and representative of his needs.
// If th client want to change some of his requirements, he will have to discuss with the carrier through the mailbox.
// Same for deleting his request. After having posted his request, and sent it to multiple carriers, he won't have the possibility to just delete it.

const RequestMenu = () => {
  const navigate = useNavigate();

  const handleCreateRequest = () => {
    navigate('/client/request/new');
  }

  const handleViewRequest = () => {
    navigate('/client/request/view');
  }

  // Has been removed as this would not make sense to let the client to update his own request after having sent it to multiple carriers.
  // He will have to deal through the mailbox if some carriers contacted him.
  // const handleUpdateRequest = () => {
  //   navigate('/client/request/edit');
  // }

  // Has been removed as this would not make sense to let the client to delete his own request after having sent it to multiple carriers.
  // He will have to deal through the mailbox if some carriers contacted him.
  // const handleDeleteRequest = () => {
  //   navigate('/client/request/delete');
  // }

  return (
    <SectionDiv>
      <TitleDiv>
        <H2><FontAwesomeIcon icon={faPersonCircleQuestion} /> Request</H2>
      </TitleDiv>
      <CriteriaButtonDiv>
        <H3>Create your Request</H3>
        <Btn onClick={handleCreateRequest}>Create Request</Btn>
      </CriteriaButtonDiv>
      <CriteriaButtonDiv>
        <H3>View your Requests</H3>
        <Btn onClick={handleViewRequest}>View Request</Btn>
      </CriteriaButtonDiv>

      {/* <CriteriaButtonDiv>
        <H3>Update your Request</H3>
        <Btn onClick={handleUpdateRequest}>Update Request</Btn>
      </CriteriaButtonDiv> */}

      {/* <CriteriaButtonDiv>
        <H3>Delete your Request</H3>
        <Btn onClick={handleDeleteRequest}>Delete Request</Btn>
      </CriteriaButtonDiv> */}

    </SectionDiv>
  )
}

export default RequestMenu

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
width: 12vw;
color: #fff;
&:hover {
  background-color: #E4E5E6;
  color: #00416A;
}
`