import React from 'react'
import img from '../assets/truck.jpg'
import styled from 'styled-components';
import Inquiries from '../components/support/Inquiries';
import Faq from '../components/support/Faq';

// The purpose of this component is to offer a support to the users who have an account created.
// There is a mailbox where the user (client or carrier) can ask questions and the support will get back to him.

const SupportSide = () => {
  return (
    <PageDiv>
      <H1>Support</H1>
      <SecDiv>
        <Inquiries />
        <Faq />
      </SecDiv>
    </PageDiv>
  )
}

export default SupportSide

const PageDiv = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 82vh;
padding: 1vh 1vw 1vh 1vw;
background-image: url(${img});
background-size: 100vw 82vh;
margin: 6vh 0 0 0;
`

const SecDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
width: 98vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
`

const H1 = styled.h1`
color: #fff;
padding: 2vh 0 2vh 2vw;
`