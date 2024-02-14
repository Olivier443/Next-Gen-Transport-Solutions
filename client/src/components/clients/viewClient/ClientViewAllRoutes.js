import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../users/UserContext'
import { useNavigate } from "react-router-dom";
import img from '../../../assets/truck.jpg';
import styled from 'styled-components';
import TruckOneRouteView from '../../route/TruckOneRouteView';

const ClientViewAllRoutes = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [route, setRoute] = useState({});
  const [carrierId, setCarrierId] = useState(null);
  const [allRoutes, setAllRoutes] = useState([]);
  const [myRoute, setMyRouteId] = useState();
  const [message, setMessage] = useState('');
  const [contactCarrier, setContactCarrier] = useState(false);

  // set the cursor at top of display when contacting carrier
  const topRef = useRef(null);
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Display a route by providing its id
  // The state route is updated with the details of the route
  const displayRoute = (routeId) => {
    fetch(`/carrier/route/view/${routeId}`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setRoute(jsonData.data);
        } else {
          setRoute(null);
        }
        setMessage(jsonData.message);
      })
  }

  // Display all the routes
  // Update the state allRoutes
  const listRoutes = (ev) => {
    fetch(`/client/route/views/allroutes`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setAllRoutes(jsonData.data);
        }
        setMessage(jsonData.message);
      })
  }

  // Handler for displaying all the routes
  const handleAllRoutesSubmit = (ev) => {
    ev.preventDefault();
    listRoutes(ev);
  }

  // This handler allows to display the details of a route based on the id of the route inputted by the client in the input field.
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const routeId = ev.target.elements.routeId.value;
    setMyRouteId(routeId);
    displayRoute(routeId);
    setMessage('');
  }

  // This handler allows to provide the details of a specific route.
  // The id of the route will be stored in the state myRoute.
  // This handler will also trigger displayRoute and pass the parameter routeId that is the if of the route.
  const handleDetailsRoute = (ev) => {
    ev.preventDefault();
    const routeId = ev.target.id;
    setMyRouteId(routeId);
    displayRoute(routeId);
    setMessage('');
  };

  // This handler allows the client to contact the carrier.
  // This is allowing to make the textarea appearing on the screen by updating the state setContactCarrier(!contactCarrier) that was initially initialized at false at the first render.
  const contactCarrierHandler = (ev) => {
    ev.preventDefault();
    setContactCarrier(!contactCarrier);
  }

  // This allows to add the message from the client to the collection Mails. The id of the client and carrier are included in the mail.
  const sendMessageToCarrier = (ev) => {
    fetch('/mail/new', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromId: currentUser._id, fromFullName: currentUser.fullName, fromType: currentUser.type,
        toId: route.currentUser._id, toFullName: route.currentUser.fullName, toType: route.currentUser.type,
        msg: document.getElementById('textReply').value,
        routeId: route._id,
        fromStatus: 'SENT', toStatus: 'UNREAD'
      })
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 201) {
          alert('Your message has been successfully sent!');
          document.getElementById('textReply').value = '';
          navigate('/carrier');
        }
      })
  }

  // This handler allows the client to send a message to the carrier though sendMessageToCarrier(ev).
  const handleNewMailToCarrier = (ev) => {
    ev.preventDefault();
    sendMessageToCarrier(ev);
  }

  useEffect(() => {
    let a = route;
    setCarrierId(a.currentUser);
  }, [route])

  // This handler allows the client to access the profile of a carrier.
  // This is possible since the id of the carrier is provided in the state route.
  const viewCarrierProfileHandler = (ev) => {
    ev.preventDefault();
    navigate(`/profile/view/${route.currentUser._id}`);
  }

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <>
      <div ref={topRef}></div>
      <PageDiv>

        <DIVLEFT>
          <DivSecond>

            {/* This part is appearing only if the client contact the carrier. The state of contactCarrier is initially set to false at the first render. */}
            {contactCarrier && (
              <ClientCriteria1>
                <div>
                  <TitleButtonDiv1>
                    <H3>Client Mail to the Carrier:</H3>
                  </TitleButtonDiv1>
                  <Form2 onSubmit={handleNewMailToCarrier}>
                    <UL1>
                      <LI1>
                        <H3>Route ID: {route._id}</H3>
                      </LI1>
                      <LI1>
                        <H3>From: {currentUser.fullName}</H3>
                      </LI1>
                      <LI1>
                        <H3>To: {route.currentUser.fullName}</H3>
                      </LI1>

                      <LI1>
                        <Label htmlFor='textReply'>Reply:</Label>
                        <Textarea id='textReply' type='text' name='textReply' placeholder='Send message to the carrier...' />
                      </LI1>

                      <LI1>
                        <Btn type="submit" id='btnReply'>Send Mail</Btn>
                      </LI1>
                    </UL1>
                  </Form2>
                </div>
              </ClientCriteria1>
            )}

            <Form1 onSubmit={handleAllRoutesSubmit}>
              <SectionDiv>
                <TitleButtonDiv>
                  <H1>Route List</H1>
                  <Btn type="submit" >Display Routes</Btn>
                  <Btn onClick={navigateMenu}>Back to Menu</Btn>
                </TitleButtonDiv>
              </SectionDiv>
              <div>
                {allRoutes.map((allroute) => (
                  <UL key={allroute._id}>
                    <LI><PRED>Route ID:</PRED><PGREEN>{allroute._id}</PGREEN></LI>
                    <LI><PRED>Pickup Site:</PRED><PGREEN>{allroute.pickupsite}</PGREEN></LI>
                    <LI><PRED>Delivery Site:</PRED><PGREEN>{allroute.deliverysite}</PGREEN></LI>
                    <LI><PRED>Access the Properties of this Route:</PRED><Btn id={`${allroute._id}`} onClick={handleDetailsRoute}>Route Details</Btn></LI>
                  </UL>
                ))}
              </div>
            </Form1>
          </DivSecond>
        </DIVLEFT>


        <DIVRIGHT>
          <DivSecond>
            <TitleButtonDiv>
              <H1>View your route</H1>
            </TitleButtonDiv>

            <form onSubmit={handleSubmit}>
              <TitleButtonDiv>
                <H2>Enter the route id:</H2>
                <Input type='text' id='routeId' placeholder='Your Route id' name="routeId" required />
                <Btn type="submit">Display route</Btn>
              </TitleButtonDiv>
            </form>
            {route._id && <div>
              <ButtonDiv>
                <Btn onClick={contactCarrierHandler}>Contact Carrier</Btn>
                <Btn id='btnViewCarrierProfile' onClick={viewCarrierProfileHandler}>View Carrier Profile</Btn>
              </ButtonDiv>

              <TruckOneRouteView routeId={route._id} />
            </div>
            }

          </DivSecond>
        </DIVRIGHT>
      </PageDiv>
    </>
  )
}

export default ClientViewAllRoutes

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

const ButtonDiv = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 36vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
margin-left: 6vw;
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

const Form1 = styled.form`
display: flex;
flex-direction: column;
align-items: center;
height: auto;
width: 40vw;
border-radius: 8px;
padding: 1vh 0 1vh 0;
overflow: scroll;
`

const Form2 = styled.form`
display: flex;
flex-direction: column;
align-items: center;
height: auto;
width: 32vw;
border-radius: 8px;
padding: 1vh 0 1vh 0;
overflow: scroll;
`

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 46vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 0 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`

const TitleButtonDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-around;
width: 38vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 2vh 1vw;
border: solid black 1px;
`

const TitleButtonDiv1 = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-around;
width: 32vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 2vh 1vw;
border: solid black 1px;
`

const ClientCriteria1 = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 36vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 0 1vh 0;
`

const H1 = styled.h2`
color: #fff;
`

const H2 = styled.h2`
color: #fff;
`

const H3 = styled.h3`
color: #fff;
`

const PRED = styled.p`
color: #ED213A;
`

const PGREEN = styled.p`
color: #93F9B9;
`

const Input = styled.input`
width: 14vw;
border-radius: 8px;
border: solid black 1px;
`

const Label = styled.label`
color: #fff;
font-weight: bold;
width: auto;
align-self: center;
justify-content: start;
`

const Textarea = styled.textarea`
width: 26vw;
height: 20vh;
border-radius: 8px;
border: solid black 1px;
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
  background - color: #E4E5E6;
color: #00416A;
}
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

const UL1 = styled.ul`
border-radius: 8px;
padding: 1vh 0 1vh 0;
margin-bottom: 1vh;
width: 32vw;
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
margin: 0 1vw 0 1vw;
`

const LI1 = styled.li`
color: #fff;
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 32vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 0 1vw 0 1vw;
`