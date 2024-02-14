import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faAt, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <>
      <PageDiv>
        <CompanyDiv>
          <H2><FontAwesomeIcon icon={faShuffle} /> Next-Gen Transport Solutions</H2>
          <ContactIconsDiv>
            <ContactDiv>
              <H4><FontAwesomeIcon icon={faPhone} /> 999-999-9999</H4>
              <H4><FontAwesomeIcon icon={faAt} /> support@nts.com</H4>
            </ContactDiv>
            <IconsDiv>
              <H4><FontAwesomeIcon icon={faGithub} size='2xl' /></H4>
              <H4><FontAwesomeIcon icon={faLinkedin} size='2xl' /></H4>
            </IconsDiv>
          </ContactIconsDiv>
        </CompanyDiv>
        <AnchorDiv>
          <AnchorElt href='/'><H4>Home</H4></AnchorElt>
          <AnchorElt href='/SupportSide'><H4>Help</H4></AnchorElt>
          <AnchorElt href='/SupportSide'><H4>FAQ</H4></AnchorElt>
        </AnchorDiv>
      </PageDiv>
      <Outlet />
    </>
  )
}

export default Footer

const PageDiv = styled.div`
display: flex;
flex-direction: row;
width: 100vw;
height: 12vh;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
background: #000;
color: #fff;
font-weight: bold;
`

const CompanyDiv = styled.div`
display: flex;
flex-direction: column;
width: 30vw;
justify-content: center;
`

const ContactIconsDiv = styled.div`
display: flex;
justify-content: space-between;
align-content: center;
width: 23.4vw;
`

const ContactDiv = styled.div`
display: flex;
flex-direction: column;
`

const IconsDiv = styled.div`
display: flex;
padding: 0 1vw 0 1vw;
gap: 2vh;
align-self: center;
`

const AnchorDiv = styled.div`
display: flex;
justify-content: center;
align-self: center;
gap: 4vw;
width: 50vw;
decoration: none;
`

const AnchorElt = styled.a`
display: flex;
align-self: center;
font-family: "Nunito", sans-serif;
text-decoration: none;
`

const H2 = styled.h2`
color: #fff;
padding: 0.5vh 0 0.5vh 0;
`

const H4 = styled.h4`
color: #fff;
padding: 0.5vh 0 0.5vh 0;
`
