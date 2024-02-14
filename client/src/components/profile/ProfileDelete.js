import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../users/UserContext'
import img from '../../assets/truck.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const ProfileDelete = () => {

  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Allows to delete the profile of the user based on its user id that we retrieved from the UserContext.
  // This is the deleteProfile.js that will be triggered in the backend.
  const deleteProfile = () => {
    fetch(`/carrier/profile/${currentUser._id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((jsonData) => {
        alert(`${jsonData.message}`);
        if (jsonData.status === 200) {
        }
        navigate(`/${currentUser.type}`);
      })
  }

  // This handler is triggered when the user click on the button to delete his profile.
  // This is calling deleteProfile().
  const handleDeleteProfile = (ev) => {
    deleteProfile();
  }

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <PageDiv>
      <CriteriaButtonDiv>
        <H2RED><FontAwesomeIcon icon={faTrashCan} /> Your Identifiant: {currentUser._id}</H2RED>
        <Btn onClick={handleDeleteProfile}>Delete Profile</Btn>
        <Btn onClick={navigateMenu}>Back to Menu</Btn>
      </CriteriaButtonDiv>
    </PageDiv>
  )
}

export default ProfileDelete

const PageDiv = styled.div`
width: 100vw;
height: 82vh;
background-image: url(${img});
display: flex;
margin: 6vh 0 0 0;
background-size: 100vw 82vh;
`

const CriteriaButtonDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 40vw;
height: 10vh;
border: solid black 6px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 20vh 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
color: #fff;
`

const H2RED = styled.h2`
color: #ED213A;
`

const Btn = styled.button`
margin-right: 4px;
height: 4vh;
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
