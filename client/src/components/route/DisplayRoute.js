import React, { useState } from 'react';
import img from './assets/truck.jpg';
import styled from 'styled-components';

const DisplayRoute = () => {
  const [route, setRoute] = useState({});
  const [allRoutes, setAllRoutes] = useState([]);
  const [myRoute, setMyRouteId] = useState();
  const [message, setMessage] = useState('');

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

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const routeId = ev.target.elements.routeId.value;
    setMyRouteId(routeId);
    displayRoute(routeId);
    setMessage('');
  }

  const handleAllRoutesSubmit = (ev) => {
    ev.preventDefault();
    listRoutes(ev);
  }

  const listRoutes = (ev) => {
    fetch(`/carrier/route/views/allroutes`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setAllRoutes(jsonData.data);
        }
      })
  }

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
        }
      })
  }

  const handleDeleteRoute = (ev) => {
    deleteRoute(myRoute);
  }

  return (
    <PageDiv>
      <SectionDiv>
        <SectionDiv>
          <TitleButtonDiv>
            <H1>View your route</H1>
          </TitleButtonDiv>
        </SectionDiv>
        <form onSubmit={handleSubmit}>
          <TitleButtonDiv>
            <H2>Enter the route id:</H2>
            <Input type='text' id='routeId' placeholder='Your Route id' name="routeId" required />
            <Btn type="submit">Display route</Btn>
          </TitleButtonDiv>
        </form>
        <div>
          <ul>
            <LI><PRED>Route ID:</PRED><PGREEN>{route._id}</PGREEN></LI>
            <LI><PRED>Truck Type:</PRED><PGREEN>{route.truckType}</PGREEN></LI>
            <LI><PRED>Services:</PRED><PGREEN>{route.servicesType}</PGREEN></LI>
            <LI><PRED>Pickup Site:</PRED><PGREEN>{route.pickupsite}</PGREEN></LI>
            <LI><PRED>Delivery Site:</PRED><PGREEN>{route.deliverysite}</PGREEN></LI>
            <LI><PRED>Time Guaranteed:</PRED><PGREEN>{route.timeguarantee}</PGREEN></LI>
            <LI><PRED>Transit Time:</PRED><PGREEN>{route.timetransit}</PGREEN></LI>
            <LI><PRED>Other instructions:</PRED><PGREEN>{route.otherinstructions}</PGREEN></LI>
          </ul>
        </div>
        <ButtonDiv>
          <Btn>Modify route</Btn>
          <Btn onClick={handleDeleteRoute}>Delete route</Btn>
        </ButtonDiv>
      </SectionDiv>

      <SectionDiv>

        <form onSubmit={handleAllRoutesSubmit}>
          <SectionDiv>
            <TitleButtonDiv>
              <H1>List of the routes</H1>
              <Btn type="submit">Display all route</Btn>
            </TitleButtonDiv>
          </SectionDiv>
          <SectionDiv>
            {allRoutes.map((allroute) => (
              <UL key={allroute}>
                <LI><PRED>Route ID:</PRED><PGREEN>{allroute._id}</PGREEN></LI>
                <LI><PRED>Pickup Site:</PRED><PGREEN>{allroute.pickupsite}</PGREEN></LI>
                <LI><PRED>Delivery Site:</PRED><PGREEN>{allroute.deliverysite}</PGREEN></LI>
              </UL>
            ))}
          </SectionDiv>
        </form>
        <div>

        </div>
      </SectionDiv>
      <p>{message}</p>
    </PageDiv>
  )
}

export default DisplayRoute

const PageDiv = styled.div`
width: 100vw;
height: auto;
background-image: url(${img});
display: flex;
flex-direction: row;
background-size: 100vw 94vh;
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
justify-content: space-between;
width: 40vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 1vh 1vw;
`

const ButtonDiv = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 30vw;
height: auto;
padding: 2vh 0 2vh 0;
`

const H1 = styled.h1`
color: #fff;
`

const H2 = styled.h2`
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