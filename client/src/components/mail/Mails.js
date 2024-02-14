import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../users/UserContext'
import MyMails from './MyMails';
import Request from '../request/Request';
import CurrencyConverter from '../currency/CurrencyConverter';
import { patchMail } from './mailFetchFunctions';
import TruckOneRouteView from '../route/TruckOneRouteView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopesBulk } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import img from '../../assets/truck.jpg';

// Carrier can view the various bulk requests and access the details of each of these specific requests with the component CarrierBulkRequest.js
// Carrier now will use his mailbox to send a message to the client referencing the bulk request ID. 
// The carrier will obviously know the name of the client in question as provided in the bulk request created by the client.
// Indeed, the ClientBulkRequest collection contains the id, fullname, type of the client that created the bulk request. So, from there, the carrier can reply directly to the client.

const Mails = () => {

  const [mailOption, setMailOption] = useState(null);

  // Lifting the State Up from MyMails.js
  const [mails, setMails] = useState([]);
  const [mailSelected, setMailSelected] = useState(null);

  // This allows to store the current carrier information
  const { currentUser } = useContext(UserContext);

  // To store the ID of the bulk Request that the carrier type in the input
  const [requestId, setRequestId] = useState(null);

  // To store the ID of the route that the carrier type in the input
  const [routeId, setRouteId] = useState(null);
  const [routeSelected, setRouteSelected] = useState(null);

  const [message, setMessage] = useState('');

  // set the cursor at top of display when contacting carrier
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  })

  useEffect(() => {
    console.log(`Mail.js useEffect on requestId=`, requestId, `  routeId=`, routeId, ` mailOption=`, mailOption, ` or message=`, message);
  }, [requestId, routeId, mailOption, message]);

  const navigate = useNavigate();

  // Allows to get the value of the option in the select.
  // This will update the state of mailOption with the value of the option selected in the select. 
  // This will update the other useStates to null as well.
  // Those states are passed down to the component MyMails.js
  const onChangeMailOption = (ev) => {
    ev.preventDefault();
    // Reset mails screen
    setMails([]);
    // Reset request screen
    setRequestId(null);
    // Reset reply screen
    setMailSelected(null);
    // Reset route screen
    setRouteId(null);
    setRouteSelected(null);
    // To execute new option mail search
    setMailOption(ev.target.value);
  }

  // To store the mesage being typed by the carrier.
  // This will allow to do a POST in the collection Mails.
  const [msg, setMsg] = useState('');

  // Store the message typed by the carrier in the textarea
  const inputCarrierReplyMsg = (ev) => {
    setMsg(ev.target.value);
  }

  // POST the message from the carrier to the collection Mails.
  // The message is stored in the useState carrierMsg.
  // The Carrier FullName, Carrier Id, and CarrierType are also sent to the collection Mails.
  // The ID of the bulk request is also sent to the collection Mails.
  const postMsg = () => {
    fetch('/mail/new', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromId: currentUser._id, fromFullName: currentUser.fullName, fromType: currentUser.type,
        toId: mailSelected.fromId, toFullName: mailSelected.fromFullName, toType: mailSelected.fromType,
        repliedMailId: mailSelected._id,
        msg: msg,
        initialRequestId: requestId,
        routeId: routeId,
        fromStatus: 'SENT', toStatus: 'UNREAD'
      })
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 201) {
          patchMail(mailSelected._id, { ...mailSelected, fromStatus: 'REPLIED' }, setMessage);
          alert('Your message has been successfully sent!');

          switch (currentUser.type) {
            case 'admin':
              navigate('/');
              break;

            case 'support':
              navigate('/supportSide');
              break;

            case 'client':
            case 'carrier':
              navigate(`/${currentUser.type}`);
              break;

            default:
              navigate('/');
              break;
          }

        }
      })
  }

  const sendMsg = (ev) => {
    ev.preventDefault();
    postMsg();
  }

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <PageDiv>
      <SectionDiv>
        <TitleDiv ref={ref}>
          <H1><FontAwesomeIcon icon={faEnvelopesBulk} /> Mailbox</H1>
          <Btn onClick={navigateMenu}>Back to Menu</Btn>
        </TitleDiv>

        <Select id='mailOption' name='mailOption' onChange={onChangeMailOption} required>
          <option value=''>Select Mail Type</option>
          <option value='SENT&REPLIED'>ALL</option>
          <option value='UNREAD'>Unreaded</option>
          <option value='RECEIVED'>Received</option>
          <option value='REPLIED'>Replied</option>
          <option value='SENT'>Sent</option>
          <option value='SUPPORT'>Support</option>
        </Select>

        {mailSelected && (
          <ClientCriteria>
            <div>
              <div>
                <H3>Reply to message:</H3>
              </div>
              <form onSubmit={sendMsg}>
                <ClientInsideCriteria>
                  <H3>Request ID: {requestId}</H3>
                </ClientInsideCriteria>
                <ClientInsideCriteria>
                  <H3>From: {currentUser.fullName}</H3>
                </ClientInsideCriteria>
                <ClientInsideCriteria>
                  <H3>To: {mailSelected.fromFullName}</H3>
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='textReply'>Reply:</Label>
                  <Textarea id='textReply' type='text' name='textReply' onChange={inputCarrierReplyMsg}
                    placeholder='Reply to the client/Ask questions/Provides Pricing...' />
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  {currentUser.type === 'Carrier' && (<CurrencyConverter />)}
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Btn type="submit" id='btnReply'>Send Reply</Btn>
                </ClientInsideCriteria>
              </form>
            </div>
          </ClientCriteria>
        )}

        <TextAreaDiv>
          <Form>
            {mails && (<MyMails mailOption={mailOption} mails={mails} setMails={setMails} setRequestId={setRequestId} setMailSelected={setMailSelected} setRouteId={setRouteId} />)}
          </Form>
        </TextAreaDiv>
      </SectionDiv>

      {(requestId && (requestId !== undefined) && (currentUser.type !== 'Support')) && (
        <SectionDiv1>
          <Request requestId={requestId} />
        </SectionDiv1>
      )}
      {(routeId && (routeId !== undefined) && (currentUser.type !== 'Support')) && (
        <SectionDiv2>
          <TruckOneRouteView routeId={routeId} />
        </SectionDiv2>
      )}
    </PageDiv>
  )
}

export default Mails

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

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
width: 40vw;
height: auto;
max-height: 80vh;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 0 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
overflow: scroll;
`

const SectionDiv1 = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
width: auto;
height: auto;
max-height: 80vh;
border-radius: 8px;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
overflow: scroll;
`

const SectionDiv2 = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
width: 40vw;
height: auto;
max-height: 80vh;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 0 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
overflow: scroll;
border: solid yellow 1px;
`

const TitleDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-around;
width: 32vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 2vh 1vw 2vh 1vw;
`

const TextAreaDiv = styled.div`
background-color: #232526;
display: flex;
align-items: center;
justify-content: center;
width: auto;
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

const H1 = styled.h1`
color: #fff;
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

const ClientCriteria = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 26vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 0 1vh 0;
`

const ClientInsideCriteria = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 24vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 0 1vh 0;
`

const H3 = styled.h3`
color: #fff;
`

const Select = styled.select`
border-radius: 8px;
border: solid black 1px;
`

const Textarea = styled.textarea`
width: 80vw;
height: 20vh;
border-radius: 8px;
border: solid black 1px;
`