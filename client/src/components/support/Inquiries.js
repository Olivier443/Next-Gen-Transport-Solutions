import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../users/UserContext'
import { useNavigate } from "react-router-dom";
import { postMail } from '../mail/mailFetchFunctions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const Inquiries = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  // This useEffect is triggered every time that the state of message is changing.
  // In other words an alert will pop up every time a message is sent.
  useEffect(() => {
    if (message) {
      alert(`Your request has been sent to Support. Note your Reference ID: ${message}`);
    }
  }, [message]);

  // This handler allows the user to send a mail to the support.
  // postMail contained in mailFetchFunction.js is used to send the mail and have this mail stored in the collection Mails.
  const handleMailToSupport = (ev) => {
    ev.preventDefault();
    const data = postMail({
      fromId: currentUser._id, fromFullName: currentUser.fullName, fromType: currentUser.type,
      toId: 'support', toFullName: 'support', toType: 'Support',
      msg: document.getElementById('questionToSupport').value,
      fromStatus: 'SENT', toStatus: 'UNREAD'
    }, setMessage);
    document.getElementById('questionToSupport').value = '';
  }

  const getMsgsHandler = (ev) => {
    navigate(`/mailbox/${currentUser._id}`);
  }

  return (
    <>
      <SectionDiv>
        <H1><FontAwesomeIcon icon={faHeadset} /> Inquiries</H1>
        <Btn onClick={getMsgsHandler}>View your messages</Btn>
        <Form onSubmit={handleMailToSupport}>
          <Label htmlFor='questionToSupport'>Contact our support team. They will recontact you within 4 hours.</Label>
          <TextArea id='questionToSupport' type='text' name='questionToSupport' placeholder='Type your question...' />
          <Btn type='submit' id='btnMail'>Send</Btn>
        </Form>
      </SectionDiv>
    </>
  )
}

export default Inquiries

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
font-family: 'Nunito Sans', sans-serif;
`

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
width: 30vw;
height: 40vh;
border: solid black 1px;
margin: 2vh 0 0 0;
border-radius: 8px;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`

const H1 = styled.h1`
color: #fff;
`

const Label = styled.label`
color: #fff;
font-weight: bold;
width: auto;
margin: 0 0 1vh 0;
`

const TextArea = styled.textarea`
width: 26vw;
height: 14vh;
border-radius: 8px;
border: solid black 1px;
margin: 0 0 1vh 0;
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