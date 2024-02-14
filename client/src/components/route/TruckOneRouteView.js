import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const TruckOneRouteView = ({ routeId }) => {

  const [route, setRoute] = useState(null);

  // set the cursor at top of display
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [route]);


  // Display a route by providing its id
  useEffect(() => {
    fetch(`/carrier/route/view/${routeId}`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setRoute(jsonData.data);
        }
      });
  }, [routeId]);


  return (
    <>
      <div ref={topRef}></div>
      <SectionDiv>
        <TitleButtonDiv>
          <H1>Route</H1>
        </TitleButtonDiv>

        {route && (
          <>
            <div>
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
          </>
        )}
      </SectionDiv>
    </>
  )
}

export default TruckOneRouteView

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 46vw;
height: 90vh;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 0 1vw 1vh 1vw;
overflow-y: scroll;
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

const H1 = styled.h1`
color: #fff;
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