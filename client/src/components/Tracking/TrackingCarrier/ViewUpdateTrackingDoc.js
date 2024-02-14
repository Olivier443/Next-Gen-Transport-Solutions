import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../users/UserContext'
import img from '../../../assets/truck.jpg'
import styled from 'styled-components';

const ViewUpdateTrackingDoc = ({ myRoute, setMyRouteId }) => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [allTrackingDocuments, setAllTrackingDocuments] = useState([]); //

  const navigate = useNavigate();

  const [trackingStatus, setTrackingStatus] = useState('');

  // This allows to update the state of allTrackingDocuments with all the tracking documents created by the carrier.
  // These documents will be stored in the state allTrackingDocuments.
  const listTrackingAllTrackingDocuments = (ev) => {
    fetch(`/tracking/alltrackingdocs/${currentUser._id}`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setAllTrackingDocuments(jsonData.data);
        }
      })
  }

  // This allows to update the tracking status with the new value stored in the useRef.
  // The PATCH happens only if the useRef is not null.
  const documentTrackingStatusUpdate = (ev) => {
    if (trackingStatus.length) {
      fetch('/tracking/alltrackingdocs', {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingDocumentId: ev.target.id, trackingStatus: trackingStatus })
      })
        .then(res => res.json())
        .then((jsonData) => {
          if (jsonData.status === 200) {
            alert('Tracking Status updated.')
            navigate(`/carrier`);
          }
        })
    }
  }

  // Allows to delete a tracking document.
  const documentTrackingDelete = (ev) => {

    const trackingDocId = ev.target.id.slice(1);

    fetch(`/tracking/alltrackingdocs/${trackingDocId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          alert(`Tracking Document ${trackingDocId} deleted`)
          navigate(`/carrier`);
        }
      })
  }

  // Handler for displaying all the tracking documents
  const handleAllTrackingDocumentsSubmit = (ev) => {
    ev.preventDefault();
    listTrackingAllTrackingDocuments(ev);
  }

  // Handler to update the tracking status
  const handleTrackingStatusChange = (ev) => {
    ev.preventDefault();
    documentTrackingStatusUpdate(ev);
  }

  // Handler to delete a tracking document
  const handleDeleteTrackingChange = (ev) => {
    ev.preventDefault();
    documentTrackingDelete(ev);
  }

  // Allows to store the value of the select (for the tracking status) into trackingStatusRef.
  const handleChange = (e) => {
    setTrackingStatus(e.target.value);
  };

  return (
    <PageDiv>

      <SectionDivList>
        <form onSubmit={handleAllTrackingDocumentsSubmit}>
          <SecDivList>
            <TitleButtonDiv>
              <H1>List of the tracking documents</H1>
              <Btn type="submit" >Display all tracking documents</Btn>
            </TitleButtonDiv>
          </SecDivList>
          <SectionDivScroll>
            {allTrackingDocuments.map((aTrackingDocument) => (
              <UL key={aTrackingDocument._id}>
                <LI><PRED>Tracking Document ID:</PRED><div><PGREEN>{aTrackingDocument._id}</PGREEN></div></LI>
                <LI><PRED>Route ID:</PRED><div><PGREEN>{aTrackingDocument.routeId}</PGREEN></div></LI>
                <LI><PRED>Client ID:</PRED><PGREEN>{aTrackingDocument.TrackingDocClientId}</PGREEN></LI>
                <LI><PRED>Client FullName:</PRED><PGREEN>{aTrackingDocument.TrackingDocClientFullName}</PGREEN></LI>
                <LI><PRED>Current Tracking Status:</PRED><PGREEN>{aTrackingDocument.TrackingDocTrackingStatus}</PGREEN></LI>

                {(currentUser.type === 'Carrier') && (
                  <LI>
                    <Label htmlFor='TrackingDocTrackingStatus'>Update Tracking Status to: </Label>
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
                  </LI>
                )}

                <LI>
                  <>
                    {/* Only carriers may delete tracking */}
                    {(currentUser.type === 'Carrier') && (<Btn id={`D${aTrackingDocument._id}`} onClick={handleDeleteTrackingChange}>Delete Tracking Document</Btn>)}
                    {/* Only clients may vote rating for a carrier, but only whan the status is not 'Select',that is when trackingStatus.length > 0 */}
                    {((currentUser.type === 'Carrier') && trackingStatus && trackingStatus.length) && (<Btn id={aTrackingDocument._id} onClick={handleTrackingStatusChange}>Update Tracking Status</Btn>)}
                  </>
                </LI>

              </UL>
            ))}
          </SectionDivScroll>
        </form>
      </SectionDivList>

    </PageDiv>
  )
}

export default ViewUpdateTrackingDoc

const PageDiv = styled.div`
display: flex;
flex-direction: row;
width: 100vw;
height: 94vh;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
background-image: url(${img});
background-size: 100vw 94vh;
margin: 6vh 0 0 0;
`

const Label = styled.label`
color: #fff;
font-weight: bold;
width: 14vw;
font-size: 16px;
color: red;
`

const Select = styled.select`
width: 10.5vw;
border-radius: 8px;
border: solid black 1px;
`

const SectionDivList = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 46vw;
height: auto;
max-height:92vh;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 0 1vw 1vh 1vw;
overflow-y: scroll;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`

const SecDivList = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-self: center;
align-content: center;
align-items: center;
justify-content: space-between;
width: 44vw;
height: auto;
max-height:92vh;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 0 0 0 0;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
overflow-y: scroll;
`

const SectionDivScroll = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
align-self: center;
align-content: center;
width: 44vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
margin: 0 0 0 0;
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

const H1 = styled.h1`
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
margin: 0 1vw 0 1vw;
`