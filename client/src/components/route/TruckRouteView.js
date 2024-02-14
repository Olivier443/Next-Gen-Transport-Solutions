import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../users/UserContext'
import img from '../../assets/truck.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const TruckRouteView = ({ myRoute, setMyRouteId }) => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [route, setRoute] = useState({}); // Will be updated with a single document.
  const [allRoutes, setAllRoutes] = useState([]); // Will be updated with all the routes.

  // const [myRoute, setMyRouteId] = useState(); // Lifting the State Up *****
  const [message, setMessage] = useState('');

  // Display a route by providing its id and store this specific route into the state route.
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

  // Allows to get the list of all the routes stored in the collection Routes based on the ID of the carrier.
  // All these routes will be sorted from the most recent to the oldest.
  // The state allRoutes will be updated with all the routes.
  const listRoutes = (ev) => {
    let carrierId = currentUser._id;
    fetch(`/carrier/route/views/allroutes/${carrierId}`)
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

  // Handler for displaying a specific route
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const routeId = ev.target.elements.routeId.value;
    setMyRouteId(routeId);
    displayRoute(routeId);
    setMessage('');
  }

  // This allows to delete the route based on the id of the route.
  const deleteRoute = (myRoute) => {
    fetch(`/carrier/route/del/${myRoute}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setRoute(jsonData.data);
          alert(`route ID: ${myRoute}. Successfully deleted.`)
        }
      })
  }

  // Handler allowing to modify a route based on its id.
  // Since we have the id stored in the state route, we can directly modify this specic route.
  // The modification will happen in the component TruckRouteEdit.js
  const handleModifyRoute = (ev) => {
    navigate(`/carrier/route/edit/${route._id}`);
  }

  // Handler allowing to delete a route based on its id.
  const handleDeleteRoute = (ev) => {
    deleteRoute(myRoute);
  }

  // Handler allowing to create a tracking document.
  const handleCreateTrackingDoc = (ev) => {
    navigate(`/carrier/tracking/trackingdoc/${myRoute}`)
  }

  // This handler allows to access the properties of a specific route.
  const handleDetailsRoute = (ev) => {
    ev.preventDefault();
    const routeId = ev.target.id;
    setMyRouteId(routeId);
    displayRoute(routeId);
    setMessage('');
  };

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <PageDiv>
      <DIVLEFT>
        <DivSecond>
          <Form1 onSubmit={handleAllRoutesSubmit}>

            <TitleButtonDiv>
              <H1>List of the routes</H1>
              <Btn type="submit" >Display all route</Btn>
              <Btn onClick={navigateMenu}>Back to Menu</Btn>
            </TitleButtonDiv>

            {allRoutes.map((allroute) => (
              <UL key={allroute._id}>
                <LI><PRED>Route ID:</PRED><div><PGREEN>{allroute._id}</PGREEN></div></LI>
                <LI><PRED>Pickup Site:</PRED><PGREEN>{allroute.pickupsite}</PGREEN></LI>
                <LI><PRED>Delivery Site:</PRED><PGREEN>{allroute.deliverysite}</PGREEN></LI>
                <LI><PRED>Access the Properties of this Route:</PRED><Btn id={`${allroute._id}`} onClick={handleDetailsRoute}>Route Details</Btn></LI>
              </UL>
            ))}
          </Form1>
        </DivSecond>
      </DIVLEFT>

      <DIVRIGHT>
        <DivSecond>
          <TitleButtonDiv>
            <H1><FontAwesomeIcon icon={faRoute} /> View your route</H1>
          </TitleButtonDiv>

          <Form1 onSubmit={handleSubmit}>
            <UL>
              <LI><H2>Enter the route id:</H2></LI>
              <LI><Input type='text' id='routeId' placeholder='Your Route id' name="routeId" minlength="24" maxlength="24" required /></LI>
              <LI><Btn type="submit">Display route</Btn></LI>
            </UL>
          </Form1>

          {route && route._id && <div>
            <UL>
              <LI><PRED>Carrier Name:</PRED><PGREEN>{route.currentUser.fullName}</PGREEN></LI>
              <LI><PRED>Route ID:</PRED><PGREEN>{route._id}</PGREEN></LI>
              <LI><PRED>Pickup Date:</PRED><PGREEN>{route.pickDateCarrier}</PGREEN></LI>
              <LI><PRED>ETA - Estimated Time Arrival:</PRED><PGREEN>{route.etaCarrier}</PGREEN></LI>
              <LI><PRED>Unit Price:</PRED><PGREEN>{route.unitPricePallet}</PGREEN></LI>
              <LI><PRED>Unit Weight Price:</PRED><PGREEN>{route.unitPriceWeight}</PGREEN></LI>
              <LI><PRED>Truck Type:</PRED><PGREEN>{route.truckType}</PGREEN></LI>
              <LI><PRED>Services:</PRED>{route.servicesType && route.servicesType.map((service) => (<PGREEN key={service}>{service}</PGREEN>))}</LI>
              <LI><PRED>Pickup Site:</PRED><PGREEN>{route.pickupsite}</PGREEN></LI>
              <LI><PRED>Delivery Site:</PRED><PGREEN>{route.deliverysite}</PGREEN></LI>
              <LI><PRED>Time Guaranteed:</PRED>{route.timeguarantee && (<PGREEN>X</PGREEN>)}</LI>
              <LI><PRED>Transit Time:</PRED><PGREEN>{route.timetransit}</PGREEN></LI>
              <LI><PRED>Other instructions:</PRED><PGREEN>{route.otherinstructions}</PGREEN></LI>
              <LI><PRED>Initial space:</PRED><PGREEN>{route.maxSpace}</PGREEN></LI>
              <LI><PRED>Remaining space:</PRED><PGREEN>{route.remainingSpace}</PGREEN></LI>
              <LI><PRED>Truck Utilization:</PRED><PGREEN>{(route.maxSpace) - (route.remainingSpace)}</PGREEN></LI>
              <LI><PRED>Truck Utilization:</PRED><PGREEN>Empty</PGREEN><progress id="progress-bar" value={(route.maxSpace) - (route.remainingSpace)} max={route.maxSpace}>{(route.maxSpace) - (route.remainingSpace)}</progress><PGREEN>Full</PGREEN></LI>
              <LI><PRED>Initial Weight:</PRED><PGREEN>{route.maxWeight}</PGREEN></LI>
              <LI><PRED>Remaining Weight:</PRED><PGREEN>{route.remainingWeight}</PGREEN></LI>
              <LI><PRED>Weight Utilization:</PRED><PGREEN>0</PGREEN><progress id="progress-bar" value={(route.maxWeight) - (route.remainingWeight)} max={route.maxWeight}>{(route.maxWeight) - (route.remainingWeight)}</progress><PGREEN>Max</PGREEN></LI>
            </UL>
          </div>
          }

          <TitleButtonDiv>
            <Btn onClick={handleModifyRoute}>Modify route</Btn>
            <Btn onClick={handleCreateTrackingDoc}>Create Tracking Doc</Btn>
            <Btn onClick={handleDeleteRoute}>Delete route</Btn>
          </TitleButtonDiv>
        </DivSecond>
      </DIVRIGHT>
    </PageDiv>
  )
}

export default TruckRouteView

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
justify-content: space-around;
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
margin: 0 1vw 0 1vw;
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

const H2 = styled.h2`
color: #fff;
`

const Input = styled.input`
width: 14vw;
border-radius: 8px;
border: solid black 1px;
`
