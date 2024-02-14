import React, { useContext } from 'react';
import { UserContext } from '../users/UserContext'
import { showObjectIdDateTime } from '../../utils/dateUtils';
import { patchMail } from './mailFetchFunctions';
import styled from 'styled-components';

const MailDetail = ({ aMail, setRequestId, setMailSelected, setMessage, setRouteId }) => {
  const { currentUser } = useContext(UserContext);

  const requestDetailsHandler = (ev) => {
    ev.preventDefault();
    if (aMail.initialRequestId) {
      setRouteId(null);
      setRequestId(ev.target.id.slice(1));
    }
    patchUnreadToReaded(aMail);
  }

  const routeDetailsHandler = (ev) => {
    ev.preventDefault();
    if (aMail.routeId) {
      setRequestId(null);
      setRouteId(ev.target.id.slice(1));
    }
    patchUnreadToReaded(aMail);
  }

  const patchUnreadToReaded = (aMail) => {
    // Change email status to READED if it was UNREAD and the current user is NOT the user the email owner
    if (aMail.fromId !== currentUser._id && aMail.toStatus === 'UNREAD') {
      aMail.toStatus = 'READED';
      // Update the mail in mongoDB
      patchMail(aMail._id, { ...aMail, toStatus: 'READED' }, setMessage);
    }
  }

  const onClickReplyHandler = (ev) => {
    ev.preventDefault();
    setMailSelected(aMail);
    setRequestId(ev.target.id.slice(1));
  }

  return (
    <div>
      <UL>
        <LI><PRED>Mail ID:</PRED><PGREEN>{aMail._id}</PGREEN></LI>

        {(aMail.initialRequestId && aMail.initialRequestId !== 'undefined') && (
          <LI><PRED>Bulk Request ID:</PRED><PGREEN>{aMail.initialRequestId}</PGREEN></LI>
        )}

        {aMail.routeId && aMail.routeId !== 'undefined' && (
          <LI><PRED>Route ID:</PRED><PGREEN>{aMail.routeId}</PGREEN></LI>
        )}

        <LI><PRED>From:</PRED><PGREEN>{aMail.fromFullName}</PGREEN></LI>
        <LI><PRED>To:</PRED><PGREEN>{aMail.toFullName}</PGREEN></LI>
        <LI><PRED>Received:</PRED><PGREEN>{showObjectIdDateTime(aMail._id)}</PGREEN></LI>
        <LI><PRED>FromStatus:</PRED><PGREEN>{aMail.fromStatus}</PGREEN></LI>
        <LI><PRED>ToStatus:</PRED><PGREEN>{aMail.toStatus}</PGREEN></LI>
        <LI><PRED>Message:</PRED><PGREEN>{aMail.msg}</PGREEN></LI>

        {(aMail.initialRequestId && aMail.initialRequestId !== 'undefined') && (
          <LI><Btn id={`I${aMail.initialRequestId}`} onClick={requestDetailsHandler}>Request details</Btn></LI>
        )}

        {aMail.routeId && aMail.routeId !== 'undefined' && (
          <LI><Btn id={`R${aMail.routeId}`} onClick={routeDetailsHandler}>Route details</Btn></LI>
        )}

        <LI><Btn id={`R${aMail.initialRequestId}`} onClick={onClickReplyHandler}>Reply</Btn></LI>
      </UL>
    </div>
  )
}

export default MailDetail

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
margin: 1vh 0 1vh 0;
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