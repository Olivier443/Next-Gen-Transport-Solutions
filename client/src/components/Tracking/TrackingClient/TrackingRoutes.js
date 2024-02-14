import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../users/UserContext'
import img from '../../../assets/truck.jpg'
import styled from 'styled-components';

const TrackingRoutes = () => {

  const { currentUser } = useContext(UserContext);

  const [canFindTrackingFeedback, setCanFindTrackingFeedback] = useState(false);
  const [allClientTrackingDocuments, setAllClientTrackingDocuments] = useState([]);
  const [feedback, setFeedback] = useState(null);
  // const [carrierId, setCarrierId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (canFindTrackingFeedback) {
      const fetchTrackingsFeedBacks = () => {
        fetch(`/tracking/client/${currentUser._id}`)
          .then((response) => response.json())
          .then((trackingArray) => {
            Promise.all(
              trackingArray.data.map(async (aTracking) => {
                const feedBackResponse = await fetch(`/feedback/${aTracking._id}`);
                const feedbackDocument = await feedBackResponse.json();
                if (feedbackDocument.status === 200) {
                  aTracking.feedback = feedbackDocument.data.feedback;
                } else {
                  aTracking.feedback = '0';
                }
                return aTracking;
              })
            ).then((trackingFeedbackArray) => {
              setAllClientTrackingDocuments(trackingFeedbackArray);
            });
          })
          .catch(error => {
            console.error('Error fetchTrackingsFeedBacks:', error);
          });
      };

      fetchTrackingsFeedBacks();
    }
  }, [feedback, canFindTrackingFeedback, currentUser._id]);

  const handleAllClientTrackingDocsSubmit = (ev) => {
    ev.preventDefault();
    setCanFindTrackingFeedback(true);
  }

  const retrieveTrackingDocumentFormId = (trackingDocumentId) => {
    const filteredTrackingDocuments = allClientTrackingDocuments.filter(function (trackingDocument) {
      return (trackingDocument._id === trackingDocumentId);
    })
    // only 1 tracking document can be found here (it is an unique _id and it exist in allClientTrackingDocuments), so return that one
    return filteredTrackingDocuments[0];
  }

  const postFeedback = (trackingDocumentId) => {
    if (feedback != null) {
      // retrieve trackingDocumentFormId()
      const trackingDocumentSelected = retrieveTrackingDocumentFormId(trackingDocumentId);

      // Post the feedback
      fetch('/feedback', {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback: feedback,
          clientId: currentUser._id, clientFullName: currentUser.fullName,
          carrierId: trackingDocumentSelected.currentUser._id, carrierFullName: trackingDocumentSelected.currentUser.fullName,
          routeId: trackingDocumentSelected.routeId, trackingId: trackingDocumentSelected._id
        })
      })
        .then(res => res.json())
        .then((jsonData) => {
          if (jsonData.status === 201) {
            alert('Feedback successfully sent!')
            setFeedback(null);
          }
        })
    }
  }

  const handleFeedbackChange = (ev) => {
    ev.preventDefault();
    setFeedback(ev.target.value);
  }

  const submitFeedback = (ev) => {
    ev.preventDefault();
    postFeedback(ev.target.id);
  }

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <PageDiv>
      <DivSecond>
        <Form1 onSubmit={handleAllClientTrackingDocsSubmit}>
          <TitleButtonDiv>
            <H1>Track your Shipments</H1>
            <DivBtn>
              <Btn1 type="submit">Display all tracking documents</Btn1>
              <Btn1 onClick={navigateMenu}>Back to Menu</Btn1>
            </DivBtn>
          </TitleButtonDiv>

          {allClientTrackingDocuments.map((aClientTrackingDocuments) => (
            <UL key={aClientTrackingDocuments._id}>
              <LI><PRED>Tracking Document ID:</PRED><div><PGREEN>{aClientTrackingDocuments._id}</PGREEN></div></LI>
              <LI><PRED>Route ID:</PRED><div><PGREEN>{aClientTrackingDocuments.routeId}</PGREEN></div></LI>
              <LI><PRED>Client ID:</PRED><PGREEN>{aClientTrackingDocuments.TrackingDocClientId}</PGREEN></LI>
              <LI><PRED>Client FullName:</PRED><PGREEN>{aClientTrackingDocuments.TrackingDocClientFullName}</PGREEN></LI>
              <LI><PRED>Carrier ID:</PRED><div><PGREEN id='carrierId'>{aClientTrackingDocuments.currentUser._id}</PGREEN></div></LI>
              <LI><PRED>Carrier FullName:</PRED><PGREEN>{aClientTrackingDocuments.currentUser.fullName}</PGREEN></LI>
              <LI><PRED>Current Tracking Status:</PRED><PGREEN>{aClientTrackingDocuments.TrackingDocTrackingStatus}</PGREEN></LI>
              <LI><PRED>Feedback:</PRED><PGREEN>{aClientTrackingDocuments.feedback}</PGREEN></LI>

              {(
                (aClientTrackingDocuments.feedback === '0') &&
                (
                  (aClientTrackingDocuments.TrackingDocTrackingStatus === 'Delivered') ||
                  (aClientTrackingDocuments.TrackingDocTrackingStatus === 'Damaged') ||
                  (aClientTrackingDocuments.TrackingDocTrackingStatus === 'Lost')
                )
              ) && (
                  <>
                    <LI>
                      <Label htmlFor='feedbackRating'>Rate the service received:</Label>
                      <Select id="feedbackRating" name="feedbackRating" defaultValue={aClientTrackingDocuments.feedback} onChange={handleFeedbackChange}>
                        <option value='0'>Rate this Route</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Unsatisfactory</option>
                        <option value='3'>3 - Satisfactory</option>
                        <option value='4'>4 - Very Satisfactory</option>
                        <option value='5'>5 - Outstanding</option>
                      </Select>
                    </LI>

                    <LI>
                      {(
                        (aClientTrackingDocuments.feedback === '0') &&
                        (
                          (aClientTrackingDocuments.TrackingDocTrackingStatus === 'Delivered') ||
                          (aClientTrackingDocuments.TrackingDocTrackingStatus === 'Damaged') ||
                          (aClientTrackingDocuments.TrackingDocTrackingStatus === 'Lost')
                        )
                      ) && (
                          <Btn id={aClientTrackingDocuments._id} onClick={submitFeedback}>Submit Feedback</Btn>
                        )
                      }
                    </LI>

                  </>
                )}
            </UL>
          ))}
        </Form1>
      </DivSecond>
    </PageDiv>
  )
}

export default TrackingRoutes

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

const Form1 = styled.form`
display: flex;
flex-direction: column;
align-items: center;
height: auto;
width: 40vw;
border-radius: 8px;
padding: 1vh 0 1vh 0;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
overflow: scroll;
`

const DivBtn = styled.div`
display: flex;
width: 36vw;
justify-content: space-between;
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

const TitleButtonDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
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

const Btn1 = styled.button`
margin-right: 4px;
font-weight: bold;
border-radius: 30px;
padding: 4px 4px 4px 4px;
text-decoration: none;
background-color: #480048;
width: 10vw;
height: 6vh;
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
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 36vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
`