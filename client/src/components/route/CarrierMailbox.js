import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../users/UserContext'
import styled from 'styled-components';
import img from '../../assets/truck.jpg';
import MyMails from '../mail/MyMails';

// Carrier can view the various bulk requests and access the details of each of these specific requests with the component CarrierBulkRequest.js
// Carrier now will use his mailbox to send a message to the client referencing the bulk request ID. 
// The carrier will obviously know the name of the client in question as provided in the bulk request created by the client.
// Indeed, the ClientBulkRequest collection contains the id, fullname, type of the client that created the bulk request. So, from there, the carrier can reply directly to the client.

const CarrierMailbox = () => {

  // Lifting the State Up from MyMails.js
  const [mails, setMails] = useState([]);

  // This allows to store the current carrier information
  const { currentUser, setCurrentUser } = useContext(UserContext);

  let carrierId;
  let carrierFullName;
  let carrierType;

  useEffect((UserContext) => {
    carrierId = currentUser._id;
    carrierFullName = currentUser.fullName;
    carrierType = currentUser.type;
  }, [currentUser])

  carrierId = currentUser._id;
  carrierFullName = currentUser.fullName;
  carrierType = currentUser.type;

  // To store the ID of the bulk Request that the carrier type in the input
  const [storeBulkRequestId, setStoreBulkRequestId] = useState('');

  // To store the mesage being typed by the carrier.
  // This will allow to do a POST in the collection Mails.
  const [carrierMsg, setCarrierMsg] = useState('');

  // To store the bulk request being fetched into a state; so it can be accessible and displayed on the screen.
  // This is done by a fetch within a useEffect.
  const [bulkRequest, setBulkRequest] = useState([]);

  // Store the ID of the bulk Request into storeBulkRequestId by just typing it
  const inputBulkRequestId = (ev) => {
    setStoreBulkRequestId(ev.target.value);
  }

  // Store the message typed by the carrier in the textarea
  const inputCarrierReplyMsg = (ev) => {
    setCarrierMsg(ev.target.value);
  }

  // POST the message from the carrier to the collection Mails.
  // The message is stored in the useState carrierMsg.
  // The Carrier FullName, Carrier Id, and CarrierType are also sentto the collection Mails.
  // The ID of the bulk request is also sent to the collection Mails.
  const postCarrierMsg = (carrierMsg, carrierId, carrierFullName, carrierType, storeBulkRequestId) => {
    fetch('/mail/new', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ carrierMsg, carrierId, carrierFullName, carrierType, storeBulkRequestId })
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 201) {
          alert('Your message has been successfully sent!');
          document.getElementById('carrierReplyMsg').value = '';
        }
      })
  }

  const handleCarrierMsg = (ev) => {
    ev.preventDefault();
    postCarrierMsg(carrierMsg, carrierId, carrierFullName, carrierType, storeBulkRequestId);
  }

  return (
    <PageDiv>
      <SectionDiv>
        <TitleDiv>
          <H1>History Mailbox</H1>
        </TitleDiv>
      </SectionDiv>

      <SectionDiv>
        <TitleDiv>
          <H1>Carrier Mailbox</H1>
        </TitleDiv>
        <InputDiv>
          <Label htmlFor='bulkRequestId'>Reference the bulk Request ID:</Label>
          <Input id='bulkRequestId' name='bulkRequestId' type='text' onChange={inputBulkRequestId} placeholder='Type the bulk request ID...' />
        </InputDiv>
      </SectionDiv>

      <TextAreaDiv>
        <Form onSubmit={handleCarrierMsg}>
          <H4>From: {carrierFullName} - ID: {carrierId} - Type: {carrierType}</H4>
          <H4>Bulk Request ID: {storeBulkRequestId}</H4>
          <Label htmlFor='carrierReplyMsg'>Type your message:</Label>
          <TextArea id='carrierReplyMsg' type='text' name='carrierReplyMsg' onChange={inputCarrierReplyMsg} placeholder='Type your reply...' />
          <Btn type='submit'>Send your Message</Btn>
        </Form>
      </TextAreaDiv>

      <TextAreaDiv>
        <Form>
          <Label>Messages Received/Sent:</Label>
          {mails && (<MyMails mails={mails} setMails={setMails} />)}
        </Form>
      </TextAreaDiv>

      <TextAreaDiv>
        <Form>
          <H4>Bulk Request Received:</H4>
          <UL>
            <LI><PRED>Pickup Date:</PRED><PGREEN>{bulkRequest.pickDate}</PGREEN></LI>
            <LI><PRED>Pickup Site:</PRED><PGREEN>{bulkRequest.pickSite}</PGREEN></LI>
            <LI><PRED>Delivery Site:</PRED><PGREEN>{bulkRequest.delSite}</PGREEN></LI>
          </UL>
        </Form>
      </TextAreaDiv>
    </PageDiv>
  )
}

export default CarrierMailbox

const PageDiv = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 84vh;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
background-image: url(${img});
background-size: 100vw 94vh;
`

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 36vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 0 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`

const TitleDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: center;
width: 30vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 1vh 1vw;
`

const InputDiv = styled.div`
background-color: #414345;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 30vw;
height: 11vh;
padding: 1vh 1vw 9vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 1vh 1vw;
`

const TextAreaDiv = styled.div`
background-color: #232526;
display: flex;
align-items: center;
justify-content: center;
width: 36vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
`

const Form = styled.form`
display: flex;
flex-direction: column;
`

const Label = styled.label`
color: #fff;
font-weight: bold;
width: 14vw;
padding: 0 0 1vh 0;
`

const Input = styled.input`
width: 14vw;
border-radius: 8px;
border: solid black 1px;
margin: 0 0 1vh 0;
`

const TextArea = styled.textarea`
width: 28vw;
height: 12vh;
border-radius: 8px;
border: solid black 1px;
margin-bottom: 1vh;
`

const H1 = styled.h1`
color: #fff;
`

const H4 = styled.h4`
color: red;
`

const Btn = styled.button`
margin-right: 4px;
font-weight: bold;
border-radius: 30px;
padding: 4px 4px 4px 4px;
text-decoration: none;
background-color: #480048;
width: 8vw;
color: #fff;
&:hover {
  background-color: #E4E5E6;
  color: #00416A;
}
`

const PRED = styled.p`
color: #ED213A;
`

const PGREEN = styled.p`
color: #93F9B9;
`

const UL = styled.ul`
border: solid black 1px;
border-radius: 8px;
padding: 1vh 0 1vh 0;
margin-bottom: 1vh;
`

const LI = styled.li`
color: #fff;
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 30vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
`