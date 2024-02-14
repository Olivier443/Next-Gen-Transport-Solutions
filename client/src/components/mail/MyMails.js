import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../users/UserContext'
import { getUserMailsOnOption } from './mailFetchFunctions';
import { useNavigate } from "react-router-dom";
import MailDetail from './MailDetail';
import styled from 'styled-components';

const MyMails = ({ mailOption, mails, setMails, setRequestId, setMailSelected, setRouteId }) => {

  // This allows to store the current user information
  const { currentUser } = useContext(UserContext);

  // This allows to view all the mails received and sent by the specific user.
  useEffect(() => {
    console.log(mails);
  }, [mails])

  // To store the message returned by the server
  const [message, setMessage] = useState('');


  // The value of mailOption is obtained from Mails.js.
  // mailOption is what was in the select (ALL, Unreaded, Received, Replied, Sent, Support).
  // setMails is obtained from Mails.js.
  // getUserMailsOnOption in mailFetchFunctions.js will allow to update the states of setMails and setMessage.
  useEffect(() => {
    setMessage('');
    if (mailOption != null) {
      getUserMailsOnOption(currentUser._id, mailOption, setMails, setMessage);
    }
  }, [mailOption])

  const navigate = useNavigate();

  return (
    <div>
      <Label>{message}</Label>
      {mails.map((aMail) => (
        <MailDetail key={aMail._id} id={aMail._id} aMail={aMail} setRequestId={setRequestId} setMailSelected={setMailSelected} setMessage={setMessage} setRouteId={setRouteId} />
      ))}
    </div>
  )
}

export default MyMails

const Label = styled.label`
color: #fff;
font-weight: bold;
width: 14vw;
padding: 0 0 1vh 0;
`