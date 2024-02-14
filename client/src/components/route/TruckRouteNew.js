import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../users/UserContext'
import TruckAvailabilityNew from './TruckAvailabilityNew';
import TruckPriceNew from './TruckPriceNew';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import img from '../../assets/truck.jpg';


const TruckAddRoute = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const trucks = [
    "Car Transporter",
    "Cement Truck",
    "Reefer",
    "Crane Truck",
    "Flatbed Truck",
    "Livestock Truck",
    "Logging Truck",
    "Tanker",
    "Dump Truck",
    "Semi-trailer Truck",
    "Container Truck",
    "Van",
    "Straight Truck"
  ];

  const enabledServices = [
    "LTL - Less-than-truckload",
    "FTL - Full truckload",
    "Expedited",
    "Delivery on Appointment",
    "Tailgate available",
    "Temperature Controlled",
    "Team Drivers",
    "Cross Docking",
    "Construction sites delivery",
    "Bonded",
    "Pharmaceutical",
    "Dangerous Goods"
  ]

  // We initialize route with the currentUser obtained from the UserContext.
  const [route, setRoute] = useState({ currentUser });

  // Those three handlers below allow to update the route state with the values inputted in the various fields (inputs, selects, checkbox) of the user.
  const handleChange = (e) => {
    setRoute({ ...route, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (e) => {
    setRoute({ ...route, [e.target.name]: getSelectValues(e.target) });
  };

  const handleTimeGuaranteeChange = (e) => {
    setRoute({ ...route, [e.target.name]: e.target.checked });
  };

  // This allows to send the route state to the backend that will add this route into the collection Routes.
  const postNewRoute = (route) => {

    fetch('/carrier/route', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(route)
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 201) {
          alert(`Route created: ID=${jsonData.data.insertedId}`);
          navigate('/carrier')
        }
      })
  }


  // Return an array of the selected option values
  function getSelectValues(select) {
    let result = [];
    let options = select && select.options;
    let opt;

    for (let i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }

  // This handler allows to pass the route state updated with the values inputed by the carrier in the function postNewRoute().
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const data = postNewRoute(route);
  }


  // This allows to clear the form without submitting it (e.g., carrier just want to re-do it).
  const handleClear = (ev) => {
    ev.preventDefault();

    document.getElementById('pickDateCarrier').value = '';
    document.getElementById('etaCarrier').value = '';
    document.getElementById('truckType').value = '';
    document.getElementById('servicesType').value = '';
    document.getElementById('pickupsite').value = '';
    document.getElementById('deliverysite').value = '';
    document.getElementById('timeguarantee').value = '';
    document.getElementById('timetransit').value = '';
    document.getElementById('otherinstructions').value = '';
    document.getElementById('maxSpace').value = '';
    document.getElementById('remainingSpace').value = '';
    document.getElementById('maxWeight').value = '';
    document.getElementById('remainingWeight').value = '';
    document.getElementById('maxHeight').value = '';
    document.getElementById('maxLength').value = '';
    document.getElementById('unitPricePallet').value = '';
    document.getElementById('unitPriceWeight').value = '';
    document.getElementById('selectUnitPricePallet').value = '';
    document.getElementById('selectUnitPriceWeight').value = '';
  }

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <PageDiv>
      {route && (
        <SectionDiv>
          <form onSubmit={handleSubmit}>
            <TitleButtonDiv>
              <H2><FontAwesomeIcon icon={faWarehouse} /> Create a new route</H2>
            </TitleButtonDiv>

            <RouteCriteria>
              <ul>
                <LI>{currentUser.fullName}</LI>
              </ul>
            </RouteCriteria>

            <RouteCriteria>
              <ul>
                <LI>{currentUser._id}</LI>
              </ul>
            </RouteCriteria>

            <RouteCriteria>
              <Label htmlFor='pickDateCarrier'>Pickup Date:</Label>
              <Input id='pickDateCarrier' type='date' onChange={handleChange} name='pickDateCarrier' min={new Date()} />
            </RouteCriteria>

            <RouteCriteria>
              <Label htmlFor='etaCarrier'>ETA - Estimated Time of Arrival:</Label>
              <Input id='etaCarrier' type='date' onChange={handleChange} name='etaCarrier' min={route.pickDateCarrier} />
            </RouteCriteria>

            <RouteCriteria>
              <Label>Select a truck type:</Label>
              <Select id="truckType" name="truckType" onChange={handleChange}>
                <option value="">Select a Truck</option>
                {trucks.map((truck) => (
                  <option key={truck} value={truck}>{truck}</option>
                ))}
              </Select>
            </RouteCriteria>

            <RouteCriteria>
              <Label>Select the services:</Label>
              <Select id="servicesType" name="servicesType" onChange={handleMultiSelectChange} multiple> {/* React does not recognize the `servicesType` prop on a DOM element */}
                {enabledServices.map((enabledService) => (
                  <option key={enabledService} value={enabledService}>{enabledService}</option>
                ))}
              </Select>
            </RouteCriteria>

            <RouteCriteria>
              <Label>Enter a pickup location:</Label>
              <Input id='pickupsite' name="pickupsite" type="text" onChange={handleChange} placeholder='Enter a pickup site!' />
            </RouteCriteria>

            <RouteCriteria>
              <Label>Enter a delivery location:</Label>
              <Input id='deliverysite' name="deliverysite" type="text" onChange={handleChange} placeholder='Enter a delivery site!' />
            </RouteCriteria>

            <RouteCriteria>
              <Label>Check if transit time is guaranteed:</Label>
              <input id='timeguarantee' name="timeguarantee" type='checkbox' onChange={handleTimeGuaranteeChange} />
            </RouteCriteria>

            <RouteCriteria>
              <Label>Indicate the transit time:</Label>
              <TextArea id='timetransit' name="timetransit" onChange={handleChange} placeholder='List your transit time between the various stops' />
            </RouteCriteria>

            <RouteCriteria>
              <Label>Other instructions:</Label>
              <TextArea id='otherinstructions' name="otherinstructions" onChange={handleChange} placeholder='Additional instructions for this route' />
            </RouteCriteria>

            <RouteCriteria>
              <P>Availability:</P>
              <TruckAvailabilityNew handleChange={handleChange} />
            </RouteCriteria>

            <RouteCriteria>
              <P>Pricing:</P>
              <TruckPriceNew handleChange={handleChange} />
            </RouteCriteria>

            <RouteCriteria>
              <Btn type="submit">Create route</Btn>
              <Btn onClick={handleClear}>Clear</Btn>
              <Btn onClick={navigateMenu}>Back to Menu</Btn>
            </RouteCriteria>
          </form>
        </SectionDiv>
      )}
    </PageDiv>
  )
}

export default TruckAddRoute

const PageDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
width: 100vw;
height: 82vh;
padding: 1vh 1vw 1vh 1vw;
background-image: url(${img});
background-size: 100vw 82vh;
margin: 6vh 0 0 0;
`

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 30vw;
height: auto;
max-height: 80vh;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
overflow: scroll;
`

const TitleButtonDiv = styled.div`
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

const H2 = styled.h2`
color: #fff;
`

const P = styled.p`
color: #fff;
`

const LI = styled.li`
color: #fff;
`

const Label = styled.label`
color: #fff;
font-weight: bold;
width: 14vw;
`

const Input = styled.input`
width: 10vw;
border-radius: 8px;
border: solid black 1px;
`

const Select = styled.select`
width: 10.5vw;
border-radius: 8px;
border: solid black 1px;
`

const TextArea = styled.textarea`
width: 14vw;
height: 10vh;
border-radius: 8px;
border: solid black 1px;
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
