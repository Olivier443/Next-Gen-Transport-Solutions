import React, { useState, useContext } from 'react';
import { UserContext } from '../users/UserContext';
import { useNavigate } from "react-router-dom";
import img from '../../assets/truck.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const RouteDelete = () => {

  const { currentUser } = useContext(UserContext);

  const [route, setRoute] = useState({});
  const [routeId, setRouteId] = useState();

  const navigate = useNavigate();

  // Allows to delete the route from the collection Routes.
  // routeId is the value of the that the user put in the input.
  const deleteRoute = (routeId) => {
    fetch(`/carrier/route/del/${routeId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          alert(`route ${routeId} successfully deleted.`)
          navigate('/carrier');
        }
      })
  }

  // Get the value of the input, store this value in routeId, and pass it to the function deleteRoute(routeId).
  const handleDeleteRoute = (ev) => {
    const routeId = document.getElementById('routeId').value;
    deleteRoute(routeId);
  }

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <PageDiv>
      <CriteriaButtonDiv>
        <H2RED><FontAwesomeIcon icon={faTrashCan} /> Route Id: {currentUser._id}</H2RED>
        <CntrDiv>
          <Input type='text' id='routeId' placeholder='Your Route Id' name="routeId" required />
          <Btn onClick={handleDeleteRoute}>Remove Route</Btn>
          <Btn onClick={navigateMenu}>Back to Menu</Btn>
        </CntrDiv>
      </CriteriaButtonDiv>
    </PageDiv>
  )
}

export default RouteDelete

const PageDiv = styled.div`
width: 100vw;
height: 82vh;
background-image: url(${img});
display: flex;
margin: 6vh 0 0 0;
background-size: 100vw 82vh;
`

const CntrDiv = styled.div`
width: 32vw;
display: flex;
justify-content: space-between;
`

const CriteriaButtonDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 50vw;
height: 10vh;
border: solid black 6px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 4vh 0 0 2vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
color: #fff;
`

const Input = styled.input`
width: 14vw;
border-radius: 8px;
border: solid black 1px;
`

const H2RED = styled.h2`
color: #ED213A;
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
