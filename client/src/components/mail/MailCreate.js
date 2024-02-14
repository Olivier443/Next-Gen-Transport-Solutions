import React, { useState, useContext } from 'react';
import { UserContext } from '../users/UserContext'
import styled from 'styled-components';

const MailCreate = ({ requestId }) => {

  const { currentUser } = useContext(UserContext);

  const [msg, setMsg] = useState('');

  const postMsg = (ev) => {
    ev.preventDefault();
    fetch('/mail/new', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromId: currentUser._id, fromFullName: currentUser.fullName, fromType: currentUser.type,
        toId: 'afaire', toFullName: 'afaire', toType: 'afaire',
        msg: msg,
        initialRequestId: requestId,
        fromStatus: 'SENT', toStatus: 'UNREAD'
      })
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 201) {
          alert('Your message has been successfully sent!');
          document.getElementById('msg').value = '';
        }
      })
  }

  return (
    <div>
      <TextAreaDiv>
        <Form>
          <H4>From: {currentUser.fullName} - ID: {currentUser._id} - Type: {currentUser.type}</H4>
          <H4>To: {currentUser.fullName} - ID: {currentUser._id} - Type: {currentUser.type}</H4>
          {requestId && (<H4>Request ID: {requestId}</H4>)}
          <Label htmlFor='msg'>Type your message:</Label>
          <TextArea id='msg' type='text' name='msg' placeholder='Type your message...' />
          <Btn type='button' onclick={postMsg}>Send your mail</Btn>
        </Form>
      </TextAreaDiv>
    </div>
  )
}

export default MailCreate

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

const H4 = styled.h4`
color: red;
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

const TextArea = styled.textarea`
width: 28vw;
height: 12vh;
border-radius: 8px;
border: solid black 1px;
margin-bottom: 1vh;
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
