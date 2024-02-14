import { useEffect, useState, React } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import img from '../../assets/truck.jpg';

const TruckRouteConfirmation = () => {

  const [route, setRoute] = useState(null);

  const navigate = useNavigate();

  const handleRouteConfirm = () => {
    navigate('/carrier');
  }

  const handleRouteReview = () => {
    navigate('/carrier/route/new');
  }

  const { routeId } = useParams(); // come from endpoint /carrier/route/new/:routeId

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const dbRes = await fetch(`/carrier/route/view/${routeId}`);
        const jsonData = await dbRes.json();
        if (jsonData.status === 200) {
          setRoute(jsonData.data)
        } else if (jsonData.status === 404) {
          alert(`non-existent route with id ${routeId}`)
        }
      } catch (err) {
        alert(err);
      }
    }

    fetchRoute();
  }, []);

  return (
    <PageDiv>
      <SectionDiv>
        <TitleButtonDiv>
          <H2>Summary of your new route:</H2>
        </TitleButtonDiv>
        {route && (
          <>
            <ul>
              <LI>Type of truck assigned to this route: <strong>{route.truckType}</strong></LI>
              <LI>Services offered on this route: <strong>{route.servicesType}</strong></LI>
              <LI>Pickup site for this route:<strong>{route.pickupsite}</strong></LI>
              <LI>Delivery sites for this route:<strong>{route.deliverysite}</strong></LI>
              <LI>Time garantee for this route: <strong>{route.timegarantee}</strong></LI>
              <LI>Transit time for this route:<strong>{route.timetransit}</strong></LI>
              <LI>Other instructions for this route:<strong>{route.otherinstructions}</strong></LI>
            </ul>
          </>
        )}
        <TitleButtonDiv>
          <H2>Validate to advertise your new route:</H2>
        </TitleButtonDiv>
        <RouteCriteria>
          <Btn onClick={handleRouteConfirm}>Confirm route</Btn>
          <Btn onClick={handleRouteReview}>Review route</Btn>
        </RouteCriteria>
      </SectionDiv>
    </PageDiv>
  )
}

export default TruckRouteConfirmation

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
width: 30vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`

const TitleButtonDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
width: 24vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 1vh 1vw;
`

const RouteCriteria = styled.div`
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

const LI = styled.li`
color: #fff;
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 18vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
`

const H2 = styled.h2`
color: #fff;
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