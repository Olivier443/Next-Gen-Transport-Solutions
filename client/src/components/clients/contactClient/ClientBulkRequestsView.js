import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../users/UserContext'
import { useNavigate } from "react-router-dom";
import img from '../../../assets/truck.jpg';
import styled from 'styled-components';
import Request from '../../request/Request';

const ClientBulkRequestsView = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [bulkRequests, setBulkRequests] = useState([]);

  const [myBulkRequestId, setMyBulkRequestId] = useState(); // When you type physically the bulk request id in the input field to display all the details.
  const [bulkRequest, setBulkRequest] = useState(null);
  const [carrierReplyToClient, setCarrierReplyToClient] = useState([]);
  const [carrierReplyToClientMod, setCarrierReplyToClientMod] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // Allows to displays all the requests
  const handleAllBulkRequestSubmit = (ev) => {
    ev.preventDefault();
    listBulkRequests(ev);
  }

  // Allows to retrieve all the requests from the collection ClientBulkRequest. This is filtered by the id of the user and sorted.
  // The state bulkRequests is updated with the data received from the backend.
  const listBulkRequests = (ev) => {
    const clientid = currentUser._id;
    fetch(`/mail/client/mybulkrequest/view/${clientid}`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setBulkRequests(jsonData.data);
        }
      })
  }

  // The parameter is the ID of the request and the handler allows to retrieve a specific request based on its ObjectId in the collection ClientBulkRequest.
  // The state of setBulkRequest is updated with the request retrieved from the backend.
  const displayBulkRequest = (bulkRequestId) => {
    fetch(`/carrier/bulks/${bulkRequestId}`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setBulkRequest(jsonData.data);
        } else {
          setBulkRequest(null);
        }
        setMessage(jsonData.message);
      })
  }

  // This handler allows to display the details of a specific request.
  const handleBulkRequestDetails = (ev) => {
    ev.preventDefault();
    const bulkRequestId = ev.target.id;
    displayBulkRequest(bulkRequestId);
    carrierReply(bulkRequestId);
  }

  // const carrierReply = async (bulkRequestId) => { // +++
  // The parameter is the ID of the request and the handler allows to get all the mails sorted from the most recent to the oldest from the Mails collection in the backend.
  // This will allow to update the state of carrierReplyToClient with all the mails and the state (message) returned by the backend for carrierReplyToClientMod.
  const carrierReply = (bulkRequestId) => {
    fetch(`/mail/carrierreply/${bulkRequestId}`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setCarrierReplyToClient(jsonData.data);
          setCarrierReplyToClientMod(jsonData.data.message);
        } else {
          setCarrierReplyToClient(null);
        }
        setMessage(jsonData.message);
      })
  }

  useEffect(() => {
  }, [carrierReplyToClient, carrierReplyToClientMod])

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <PageDiv>
      {/* This form allows to get the list of all the bulk requests created by the client */}
      <DIVLEFT>
        <DivSecond>
          <Form1 onSubmit={handleAllBulkRequestSubmit}>

            <TitleButtonDiv>
              <H1>List of the bulk requests created</H1>
              <Btn1 type="submit">Display all bulk requests</Btn1>
              <Btn1 onClick={navigateMenu}>Back to Menu</Btn1>
            </TitleButtonDiv>

            {bulkRequests.map((bulkRequest) => (
              <UL key={bulkRequest._id}>
                <LI><PRED>Bulk Request ID:</PRED><PGREEN>{bulkRequest._id}</PGREEN></LI>
                <LI><PRED>Pickup Site:</PRED><PGREEN>{bulkRequest.pickSite}</PGREEN></LI>
                <LI><PRED>Delivery Site:</PRED><PGREEN>{bulkRequest.delSite}</PGREEN></LI>
                <LI><PRED>Access the Properties of this Bulk Request:</PRED><Btn id={`${bulkRequest._id}`} onClick={handleBulkRequestDetails}>Bulk Request Details</Btn></LI>
              </UL>
            ))}
          </Form1>
        </DivSecond>
      </DIVLEFT>

      <DIVRIGHT>
        {bulkRequest && (
          <DivSecond>
            <TitleButtonDiv>
              <H1>View the details of your Bulk Request</H1>
            </TitleButtonDiv>

            <Request requestId={bulkRequest._id} />

          </DivSecond>
        )}
      </DIVRIGHT>
    </PageDiv>
  )
}

export default ClientBulkRequestsView

const PageDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
width: 100vw;
height: 82vh;
padding: 1vh 1vw 1vh 1vw;
background-image: url(${img});
background-size: 100vw 82vh;
margin: 6vh 0 0 0;
`

const DIVLEFT = styled.div`
display: flex;
flex-direction: column;
width: 40vw;
height: auto;
max-height: 80vh;
overflow: scroll;
`

const DIVRIGHT = styled.div`
display: flex;
flex-direction: column;
width: 40vw;
height: auto;
overflow: scroll;
`

const Form1 = styled.form`
display: flex;
flex-direction: column;
align-items: center;
height: auto;
width: 40vw;
background-color: #232526;
border-radius: 8px;
padding: 1vh 0 1vh 0;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
overflow: scroll;
`

const DivSecond = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: auto;
width: 40vw;
background-color: #232526;
border-radius: 8px;
padding: 1vh 0 1vh 0;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
overflow: scroll;
`

const TitleButtonDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: center;
width: 38vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 2vh 1vw;
border: solid black 1px;
`

const UL = styled.ul`
border: solid black 1px;
border-radius: 8px;
padding: 1vh 0 1vh 0;
margin-bottom: 1vh;
width: 38vw;
display: flex;
flex-direction: column;
align-items: center;
`

const LI = styled.li`
color: #fff;
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 36vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
`

const H1 = styled.h2`
color: #fff;
`

const PRED = styled.p`
color: #ED213A;
`

const PGREEN = styled.p`
color: #93F9B9;
`

const Btn = styled.button`
margin-right: 4px;
font-weight: bold;
border-radius: 30px;
padding: 4px 4px 4px 4px;
text-decoration: none;
background-color: #480048;
width: 10vw;
color: #fff;
&:hover {
  background-color: #E4E5E6;
  color: #00416A;
}
`

const Btn1 = styled.button`
margin-right: 4px;
font-weight: bold;
border-radius: 30px;
padding: 4px 4px 4px 4px;
text-decoration: none;
background-color: #480048;
width: 10vw;
height: 6vh;
color: #fff;
&:hover {
  background-color: #E4E5E6;
  color: #00416A;
}
`
