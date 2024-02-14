import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

const questions = [
  {
    title: "Billing",
    text: "100% Free for clients. 35$/month for carrier."
  },
  {
    title: "What is included in my subscription?",
    text: "Unlimited routes. Our technical staff is here to help you."
  },
  {
    title: "Resiliation",
    text: "You can resiliate at any time. Your account will be closed at the end of the monthly period."
  },
  {
    title: "Liabilities",
    text: "Carriers are responsible for the routes advertised. Clients are responsible for the routes booked."
  },
  {
    title: "Discount",
    text: "Get a free month on us for every new carriers opening an account with us."
  },
];

const Faq = () => {
  return (
    <div>
      <Accordeondata />
    </div>
  )
}

const Accordeondata = () => {
  return (
    <SectionDiv>
      <H1><FontAwesomeIcon icon={faCircleQuestion} /> FAQ</H1>
      <DivAccordeonCntr>
        {questions.map((ev, i) => (<AccordeonItem title={ev.title} text={ev.text} key={ev.title} />))}
      </DivAccordeonCntr>
    </SectionDiv>
  )
}

const AccordeonItem = ({ title, text }) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <>
      <div onClick={handleToggle}>
        <DivQuestionCntr>
          <P1>{title}</P1>
          <P2>{isOpen ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}</P2>
        </DivQuestionCntr>
        {isOpen && <DivText>{text}</DivText>}
      </div>
    </>
  )
}

export default Faq

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
width: 50vw;
max-height: 78vh;
height: auto;
border: solid black 1px;
padding: 1vh 0 1vh 0;
border-radius: 8px;
margin: -7vh 0 0 0;
font-family: 'Nunito Sans', sans-serif;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
overflow: scroll;
`

const H1 = styled.h1`
color: #fff;
margin: 0 0 -6vh 0;
`

// This is the container of the component
const DivAccordeonCntr = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-content: center;
height: auto;
max-height: 72vh;
min-width: 46vw;
border-radius: 20px;
padding: 0 0 0 0;
overflow: scroll;
  
  @media (max-width: 800px) {
    width: 90vw;
    margin: 8vh 0 8vh 0;
  }

  @media (min-width: 801px) {
    width: 40vw;
    margin: 8vh 0 0 0;
  }
`

// container including the question and the triangle
const DivQuestionCntr = styled.div`
display: flex;
justify-content: center;
align-content: center;
align-self: center;
font-weight: bold;
font-size: 1.6rem;
height: auto;
min-width: 44vw;
border: solid black 1px;
border-radius: 20px;
padding: 1vh 0 1vh 0;
margin: 0 0 1vh 0;

  @media (max-width: 800px) {
    width: 80vw;
  }

  @media (min-width: 801px) {
    width: 39.8vw;
  }
`

// Color of the text for the question
const P1 = styled.p`
display: flex;
flex-direction: row;
justify-content: center;
align-content: center;
text-align: center;
font-weight: bold;
font-size: 1.6rem;
height: auto;
border-radius: 8px;
padding: 1vh 0 1vh 0;
background-color: #414345;
border: solid black 1px;
color: #fff;

  @media (max-width: 800px) {
    width: 80vw;
  }

  @media (min-width: 801px) {
    width: 38vw;
  }
`

// container containing the answer
const DivText = styled.div`
display: flex;
justify-content: center;
text-align: center;
font-weight: bold;
font-size: 0.9rem;
height: auto;
border-radius: 8px;
padding: 1vh 0 1vh 0;
margin: 0 0 1vh 4vw;
background-color: azure;

  @media (max-width: 800px) {
    width: 80vw;
  }

  @media (min-width: 801px) {
    width: 35.6vw;
  }
`

// This is the triangle
const P2 = styled.p`
display: flex;
flex-direction: column;
justify-content: center;
align-content: center;
width: 4vw;
height: auto;
`
