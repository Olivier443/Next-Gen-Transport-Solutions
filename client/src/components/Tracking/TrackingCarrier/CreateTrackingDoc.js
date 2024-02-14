import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../users/UserContext'
import { useParams, useNavigate } from "react-router-dom";
import img from '../../../assets/truck.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoad } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

// This component has for purpose to provide the tracking status of a shipment to a client.
// This is specific to a route id, client id, and carrier id.
// So, only a specific client can see the tracking status of his route (that is updated by the carrier that created that route)

const CreateTrackingDoc = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const { routeid } = useParams();

  // The carrier starts to update the form but for some reasons, he just wants to re-do it.
  // So, all the fields to fill out are "empty" again.
  const onClearFormHandler = (ev) => {
    ev.preventDefault();
    document.getElementById('TrackingDocClientId').value = '';
    document.getElementById('TrackingDocClientFullName').value = '';
    document.getElementById('TrackingDocTrackingStatus').value = '';
  }

  const [trackingDoc, setTrackingDoc] = useState({ currentUser });
  const [routeId, setRouteId] = useState(routeid);

  // This handler allows to update the state with the values inputed in the various fields by the carrier.
  const handleChange = (e) => {
    setTrackingDoc({ ...trackingDoc, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  // Allows to create the tracking document.
  // The routeid was retrieved with the useParams().
  const postNewTrackingDoc = (trackingDoc, routeid) => {

    fetch('/tracking/trackingDoc', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...trackingDoc, routeId: routeId })
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 201) {
          navigate(`/carrier`);
        }
      })
  }

  // This is the handler that will trigger postNewTrackingDoc(trackingDoc) that will have for purpose to create and provide the client with the tracking status of his shipment.
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const data = postNewTrackingDoc(trackingDoc);
  }

  return (
    <PageDiv>
      <MenuDiv>
        <TitleDiv>
          <H1><FontAwesomeIcon icon={faRoad} style={{ color: "#fff" }} /> Create Tracking Doc</H1>
        </TitleDiv>

        <CriteriaDiv>
          <H3>Allows to give the tracking status of the shipment to your customer</H3>
        </CriteriaDiv>

        <form onSubmit={handleSubmit}>
          <CriteriaDiv>
            <Label htmlFor='TrackingDocRouteId'>Route ID: </Label>
            <Input id='TrackingDocRouteId' type='text' name='TrackingDocRouteId' onChange={handleChange} value={routeid} placeholder='Add Route ID...' />
          </CriteriaDiv>

          <CriteriaDiv>
            <PRED>Carrier ID: </PRED><PGREEN>{currentUser._id}</PGREEN>
          </CriteriaDiv>

          <CriteriaDiv>
            <PRED>Carrier Name: </PRED><PGREEN>{currentUser.fullName}</PGREEN>
          </CriteriaDiv>

          <CriteriaDiv>
            <Label htmlFor='TrackingDocClientId'>Client ID: </Label>
            <Input id='TrackingDocClientId' type='text' name='TrackingDocClientId' onChange={handleChange} placeholder='Add Client ID...' />
          </CriteriaDiv>

          <CriteriaDiv>
            <Label htmlFor='TrackingDocClientFullName'>Client FullName: </Label>
            <Input id='TrackingDocClientFullName' type='text' name='TrackingDocClientFullName' onChange={handleChange} placeholder='Add Client FullName...' />
          </CriteriaDiv>

          <CriteriaDiv>
            <Label htmlFor='TrackingDocTrackingStatus'>Tracking Status: </Label>
            <Select id='TrackingDocTrackingStatus' name='TrackingDocTrackingStatus' onChange={handleChange}>
              <option value="">Select Tracking Status</option>
              <option>Inquiry</option>
              <option>Signed</option>
              <option>At Picked up Site</option>
              <option>Picked</option>
              <option>In Transit</option>
              <option>At Delivery Site</option>
              <option>Delivered</option>
              <option>Clearance Delay</option>
              <option>Customs Inspection</option>
              <option>Damaged</option>
              <option>Lost</option>
              <option>Delayed</option>
            </Select>
          </CriteriaDiv>

          <CriteriaDiv>
            <Btn type="submit">Create Document</Btn>
            <Btn onClick={onClearFormHandler}>Clear</Btn>
          </CriteriaDiv>
        </form>

      </MenuDiv>
    </PageDiv>
  )
}

export default CreateTrackingDoc

const PageDiv = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 94vh;
padding: 1vh 1vw 1vh 1vw;
background-image: url(${img});
background-size: 100vw 94vh;
margin: 6vh 0 0 0;
`

const Select = styled.select`
width: 10.5vw;
border-radius: 8px;
border: solid black 1px;
`

const TitleDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: center;
align-content: center;
width: 28vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 1vh 1vw;
`

const MenuDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
align-content: center;
width: 30vw;
height: auto;
background-color: #232526;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
margin: 0 0 0 0;
`

const H1 = styled.h1`
color: #fff;
`

const H3 = styled.h3`
color: red;
`

const PRED = styled.p`
color: #ED213A;
font-size: 16px;
`

const PGREEN = styled.p`
color: #93F9B9;
font-size: 16px;
`

const CriteriaDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
align-content: center;
font-weight: bold;
width: 28vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 0 1vw 0 1vw;
`

const Label = styled.label`
color: #fff;
font-weight: bold;
width: 14vw;
font-size: 16px;
color: red;
`

const Input = styled.input`
width: 20vw;
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