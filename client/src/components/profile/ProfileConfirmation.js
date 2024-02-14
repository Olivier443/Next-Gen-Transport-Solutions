import React from 'react'
import { useNavigate } from "react-router-dom";
import img from '../../assets/truck.jpg'
import styled from 'styled-components';

const ProfileConfirmation = ({ carriername, email, phone, yearinservice, status }) => {
  const navigate = useNavigate();

  const handleReview = () => {
    navigate('/carrier/profile/new');
  }

  const handleConfirm = () => {
    navigate('/carrier/');
  }

  return (
    <>
      <PageDiv>
        <SectionDiv>
          <TitleDiv>
            <H1>Profile Confirmation Page</H1>
          </TitleDiv>
          <H3>This is the profile that will be viewed on this website</H3>
          <SummaryDiv>
            <PGREEN>Carrier Name: {carriername}</PGREEN>
            <PGREEN>Email: {email}</PGREEN>
            <PGREEN>Phone: {phone}</PGREEN>
            <PGREEN>Year in Service: {yearinservice}</PGREEN>
            <PGREEN>Status: {status}</PGREEN>
          </SummaryDiv>
          <TitleDiv>
            <Btn onClick={handleConfirm}>Confirm</Btn>
            <Btn onClick={handleReview}>Review</Btn>
          </TitleDiv>
        </SectionDiv>
      </PageDiv>
    </>
  )
}

export default ProfileConfirmation

const PageDiv = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 94vh;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
background-image: url(${img});
background-size: 100vw 94vh;
`

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 36vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`

const SummaryDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 36vw;
height: auto;
padding: 2vh 1vw 2vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`

const TitleDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
width: 30vw;
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

const PGREEN = styled.p`
color: #93F9B9;
font-weight: bold;
`

const Btn = styled.button`
margin-right: 4px;
font-weight: bold;
border-radius: 30px;
padding: 4px 4px 4px 4px;
text-decoration: none;
background-color: #480048;
width: 6vw;
color: #fff;
&:hover {
  background-color: #E4E5E6;
  color: #00416A;
}
`