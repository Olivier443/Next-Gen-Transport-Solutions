import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../users/UserContext'
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import img from '../../assets/truck.jpg'
import styled from 'styled-components';

const ProfileView = () => {
  const { currentUser } = useContext(UserContext);
  const { userIdFromUseParams } = useParams();

  // By default profile is for current user
  let userIdToSearch = currentUser._id;

  // This allow the client to see the full carrier profile including the feedback.
  if (userIdFromUseParams) {
    // but if another id is to search, it is found in the :userIdToSearch of the route
    userIdToSearch = userIdFromUseParams;
  }

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null); // Allows to store the profile of the user.
  const [message, setMessage] = useState(''); // Allows to store the messages received from the backend. Not used in this component.
  const [stars, setStars] = useState(null); // Allows to update the state with the feedback that the carrier received.

  // First fetch, get userIdToSearch profile
  // We get the user id from the UserContext and we store this id into a variable called userIdToSearch.
  // This useEffect will then be able to retrieve the user profile stored in the collection Profile in the backend with the handler getProfileFromUserId.js.
  useEffect(() => {
    fetch(`/user/profile/${userIdToSearch}`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setProfile(jsonData.data);
        } else {
          alert(jsonData.message);
          navigate(`/${currentUser.type.toLowerCase()}`);
        }
        setMessage(jsonData.message);
      })
  }, [currentUser._id, currentUser.type, navigate]);

  // Second fetch, get feedbacks if userIdToSearch have type 'Carrier'
  // This useEffect happens only if we already have the profile of the user, and that the type of this user is 'Carrier'.
  // It will get all the feedback documents in the collection Feedback only for the id of the carrier (that was obtained through the UserContext).
  // Those documents will be stored in the const feedbackArray. 
  // From there, we can display the feeback of the carrier and the number of stars.
  useEffect(() => {
    if (profile && (profile.User.type === 'Carrier')) {
      fetch(`/feedbacks/carrier/${userIdToSearch}`)
        .then(res => res.json())
        .then((jsonData) => {
          if (jsonData.status === 200) {
            const feedbackArray = jsonData.data;
            const nbFeedbacks = feedbackArray.length;
            let nbPoints = 0;
            feedbackArray.forEach((aFeedback) => {
              // note: Number is required to convert a string '4' to a number 4
              nbPoints += Number(aFeedback.feedback);
            });
            // The result will be integer rounded
            const nbOfStars = (nbPoints / nbFeedbacks).toFixed(0);
            let starImages = '';
            let i = 0;
            while (i < 5) {
              if (i < nbOfStars) {
                starImages += '⭐';
              } else {
                starImages += '';
              }
              i++;
            }
            setStars({ "nbFeedbacks": nbFeedbacks, "nbOfStars": nbOfStars, "starImages": starImages });
          }
        })
    }
  }, [profile]);

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <>
      <PageDiv>
        <SectionDiv>
          <TitleDiv>
            <H1><FontAwesomeIcon icon={faAddressCard} /> Company Profile</H1>
          </TitleDiv>

          {profile && (
            <>

              <UL>
                <LItitle><H3>Company Contact Information:</H3></LItitle>
                <LI><PRED>Company:</PRED><PGREEN>{profile.Company}</PGREEN></LI>
                <LI><PRED>Email:</PRED><PGREEN>{profile.Email}</PGREEN></LI>
                <LI><PRED>Phone:</PRED><PGREEN>{profile.Tel}</PGREEN></LI>
              </UL>

              <UL>
                <LItitle><H3>Company Address:</H3></LItitle>
                <LI><PRED>Number:</PRED><PGREEN>{profile.Number}</PGREEN></LI>
                <LI><PRED>Street/Ave Name 1:</PRED><PGREEN>{profile.Street1}</PGREEN></LI>
                <LI><PRED>Street/Ave Name 2:</PRED><PGREEN>{profile.Street2}</PGREEN></LI>
                <LI><PRED>Suite number:</PRED><PGREEN>{profile.SteNum}</PGREEN></LI>
                <LI><PRED>City:</PRED><PGREEN>{profile.City}</PGREEN></LI>
                <LI><PRED>province/state:</PRED><PGREEN>{profile.State}</PGREEN></LI>
                <LI><PRED>postal/zip code:</PRED><PGREEN>{profile.Zip}</PGREEN></LI>
                <LI><PRED>Country:</PRED><PGREEN>{profile.Country}</PGREEN></LI>
              </UL>

              <UL>
                <LItitle><H3>Other:</H3></LItitle>
                <LI><PRED>Year in service:</PRED><PGREEN>{profile.yearInService}</PGREEN></LI>
                <LI><PRED>Company Status:</PRED><PGREEN>{profile.status}</PGREEN></LI>
                {stars && (
                  <>
                    <LI><PRED>Number of Feedbacks Received:</PRED><PGREEN>{stars.nbFeedbacks}</PGREEN></LI>
                    <LI><PRED>Satisfaction:</PRED><PGREEN>{stars.starImages}</PGREEN></LI>
                  </>
                )}
              </UL>
              {/* <p>{message}</p> */}
              <Btn onClick={navigateMenu}>Back to Menu</Btn>
            </>
          )}
        </SectionDiv>
      </PageDiv>
    </>
  )
}

export default ProfileView

const PageDiv = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 82vh;
padding: 1vh 1vw 1vh 1vw;
background-image: url(${img});
background-size: 100vw 82vh;
margin: 6vh 0 0 0;
justify-content: center;
`

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
width: 40vw;
height: 80vh;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 0 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
overflow: scroll;
`

const TitleDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: center;
width: 32vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 2vh 1vw 2vh 1vw;
`

const H1 = styled.h1`
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

const LItitle = styled.li`
color: #fff;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 30vw;
height: auto;
border-radius: 8px;
margin: 0 0 0 1vw;
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