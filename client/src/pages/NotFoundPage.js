import React from 'react'
import { useNavigate } from "react-router-dom";
import img from '../assets/truck.jpg';
import styled from 'styled-components';

const NotFoundPage = () => {

  const navigate = useNavigate();

  const navigateMenu = (() => {
    navigate(`/`);
  })

  return (
    <PageDiv>
      <TitleButtonDiv>
        <H1>Page not found</H1>
        <Btn1 onClick={navigateMenu}>Back to Menu</Btn1>
      </TitleButtonDiv>
    </PageDiv>
  )
}

export default NotFoundPage

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

const TitleButtonDiv = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 24vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 36vh 1vw 2vh 1vw;
`

const H1 = styled.h2`
color: #fff;
`

const Btn1 = styled.button`
margin-right: 4px;
font-weight: bold;
border-radius: 30px;
padding: 4px 4px 4px 4px;
text-decoration: none;
background-color: #480048;
width: 10vw;
height: 3vh;
color: #fff;
&:hover {
  background-color: #E4E5E6;
  color: #00416A;
}
`