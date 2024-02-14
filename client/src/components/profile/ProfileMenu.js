import React from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

// This is the component that is the Profile menu. 
// This menu will give access to the various features related to the profile.
// These features are about creating, viewing, updating, and deleting the profile.

const ProfileMenu = () => {
  const navigate = useNavigate();

  // Allows to create the user to create his profile.
  const handleCreateProfile = () => {
    navigate('/profile/new');
  }

  // Allows the user to view the profile that he created.
  const handleViewProfile = () => {
    navigate('/profile/view');
  }

  // Allows the user to update his profile.
  const handleUpdateProfile = () => {
    navigate('/profile/edit');
  }

  // Allows the user to delete his profile.
  const handleDeleteProfile = () => {
    navigate('/profile/delete');
  }

  return (
    <SectionDiv>
      <TitleDiv>
        <H2><FontAwesomeIcon icon={faAddressCard} /> Profile</H2>
      </TitleDiv>
      <CriteriaButtonDiv>
        <H3>Create your Profile</H3>
        <Btn onClick={handleCreateProfile}>Create Profile</Btn>
      </CriteriaButtonDiv>
      <CriteriaButtonDiv>
        <H3>View your Profile</H3>
        <Btn onClick={handleViewProfile}>View Profile</Btn>
      </CriteriaButtonDiv>
      <CriteriaButtonDiv>
        <H3>Update your Profile</H3>
        <Btn onClick={handleUpdateProfile}>Update Profile</Btn>
      </CriteriaButtonDiv>

      <CriteriaButtonDiv>
        <H3>Delete your Profile</H3>
        <Btn onClick={handleDeleteProfile}>Delete Profile</Btn>
      </CriteriaButtonDiv>
    </SectionDiv>
  )
}

export default ProfileMenu

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 30vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`

const TitleDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: center;
width: 28vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 1vh 1vw;
`

const CriteriaButtonDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 28vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
`

const H2 = styled.h2`
color: #fff;
`

const H3 = styled.h3`
color: #fff;
`

const Btn = styled.button`
margin-right: 4px;
font-weight: bold;
border-radius: 30px;
padding: 4px 4px 4px 4px;
text-decoration: none;
background-color: #480048;
width: 12vw;
color: #fff;
&:hover {
  background-color: #E4E5E6;
  color: #00416A;
}
`