import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../users/UserContext'
import styled from 'styled-components';
import img from '../../../assets/truck.jpg';

const ClientMailbox = () => {

  // This allows to store the current client information
  const { currentUser, setCurrentUser } = useContext(UserContext);

  let clientId;
  let clientFullName;
  let clientType;

  useEffect((UserContext) => {
    clientId = currentUser._id;
    clientFullName = currentUser.fullName;
    clientType = currentUser.type;
  }, [currentUser]);

  clientId = currentUser._id;
  clientFullName = currentUser.fullName;
  clientType = currentUser.type;

  // To store the ID of the bulk Request that the client type in the input
  const [storeBulkRequestId, setStoreBulkRequestId] = useState('');

  // To store the mesage being typed by the client.
  // This will allow to do a POST in the collection Mails.
  const [clientMsg, setClientMsg] = useState('');

  // To store the reply received from the carrier being fetched and stored into a state; so it can be accessible and displayed on the screen.
  // This is done by a fetch within a useEffect.
  // This actually stored alls the documents that include the ID of the bulk from the collection Mails.
  // Since, this is an array of objects, the map method can be used to return all those messages.
  const [replyFromCarriersReceived, setReplyFromCarriersReceived] = useState([]);

  Object.entries(replyFromCarriersReceived).forEach(([key, value]) => {
    console.log(`${key} ${value}`);
  });

  useEffect(() => {
    console.log(`?`, replyFromCarriersReceived);
  }, [replyFromCarriersReceived])

  // Store the ID of the bulk Request into storeBulkRequestId by just typing it
  const inputBulkRequestId = (ev) => {
    setStoreBulkRequestId(ev.target.value);
  }

  // Store the message typed by the client in the textarea
  const inputClientReplyMsg = (ev) => {
    setClientMsg(ev.target.value);
  }

  // POST the message from the client to the collection Mails.
  // The message is stored in the useState clientMsg.
  // The Client FullName, Client Id, and Client Type are also sent to the collection Mails.
  // The ID of the bulk request is also sent to the collection Mails.

  // postMail({ clientMsg, clientId, clientFullName, clientType, storeBulkRequestId }, setMessage);

  const postClientMsg = (clientMsg, clientId, clientFullName, clientType, storeBulkRequestId) => {
    fetch('/mail/new', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientMsg, clientId, clientFullName, clientType, storeBulkRequestId })
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 201) {
          alert('Your message has been successfully sent!');
          document.getElementById('clientReplyMsg').value = '';
        }
      })
  }

  const handleClientMsg = (ev) => {
    ev.preventDefault();
    postClientMsg(clientMsg, clientId, clientFullName, clientType, storeBulkRequestId);
  }

  // Get any eventual messages sent by the various carriers that would have replied to the client
  useEffect(() => {
    fetch(`/mail/client/carrierreply/${storeBulkRequestId}`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setReplyFromCarriersReceived(jsonData);
        }
      })
  }, [storeBulkRequestId])

  return (
    <PageDiv>
      <SectionDiv>
        <TitleDiv>
          <H1>Client Mailbox</H1>
        </TitleDiv>
        <InputDiv>
          <Label htmlFor='bulkRequestId'>Reference the bulk Request ID:</Label>
          <Input id='bulkRequestId' name='bulkRequestId' type='text' onChange={inputBulkRequestId} placeholder='Type the bulk request ID...' />
        </InputDiv>
      </SectionDiv>

      <TextAreaDiv>
        <Form onSubmit={handleClientMsg}>
          <H4>From: {clientFullName} - ID: {clientId} - Type: {clientType}</H4>
          <H4>Bulk Request ID: {storeBulkRequestId}</H4>
          <Label htmlFor='clientReplyMsg'>Type your message:</Label>
          <TextArea id='clientReplyMsg' type='text' name='clientReplyMsg' onChange={inputClientReplyMsg} placeholder='Type your reply...' />
          <Btn type='submit'>Send your Message</Btn>
        </Form>
      </TextAreaDiv>

      <TextAreaDiv>
        <Form>
          <H4>Message Received:</H4>
        </Form>
      </TextAreaDiv>
    </PageDiv>
  )
}

export default ClientMailbox

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
