import React, { useContext } from 'react'
import { UserContext } from '../components/users/UserContext'
import LoginButton from '../buttons/LoginButton'
import LogoutButton from '../buttons/LogoutButton'
import SignupButton from '../buttons/SignupButton'
import HomeButton from '../buttons/HomeButton'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'

const Banner = () => {

  const { currentUser } = useContext(UserContext);

  return (
    <BannerDiv>
      <H1><FontAwesomeIcon icon={faShuffle} /> Next-Gen Transport Solutions</H1>
      {currentUser && (<H2>Welcome {currentUser.fullName}</H2>)}
      <BtnDiv>
        <HomeButton id="home" type='button'>Home</HomeButton>
        {!currentUser && <LoginButton id="signin" type='button' />}
        {currentUser && <LogoutButton id="signout" type='button' />}
        {!currentUser && <SignupButton id="signup" type='button' />}
      </BtnDiv>
      <Outlet />
    </BannerDiv>
  )
}

export default Banner

const BannerDiv = styled.div`
background-color: #000;
display: flex;
align-items: center;
justify-content: space-between;
width: 100vw;
height: 6vh;
border: solid black 1px;
padding: 0px 30px 0px 30px;
position: fixed;
margin: 0 0 0 0;
`

const BtnDiv = styled.div`
background-color: purple;
display: flex;
align-items: center;
justify-content: space-between;
width: 14vw;
border: solid black 1px;
padding: 4px 14px 4px 14px;
border-radius: 8px;
`

const H1 = styled.h1`
color: #fff;
`

const H2 = styled.h2`
color: purple;
`