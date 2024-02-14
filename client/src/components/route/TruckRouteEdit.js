import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from '../users/UserContext'
import img from '../../assets/truck.jpg'
import styled from 'styled-components';

// This component allows to modify a route (PATCH).
// The id of the route is retrieved with the useParams().
// This component is tied with handleModifyRoute in TruckRouteView.js.

const TruckRouteEdit = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const { myRoute } = useParams();

  const [routeToMod, setRouteToMod] = useState(null);

  const navigate = useNavigate();

  // Allows to store the route document in the state routeToMod.
  // This is tied to displayRoute.js into the backend.
  useEffect(() => {
    fetch(`/carrier/route/view/${myRoute}`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setRouteToMod(jsonData.data);
        } else {
          setRouteToMod(null);
        }
        setMessage(jsonData.message);
      })
  }, [])

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

  // The three handlers below allow to update the routeToMod state with the values being inputted by the carrier in the input, select, and checkboxes.
  const handleChange = (e) => {
    setRouteToMod({ ...routeToMod, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (e) => {
    setRouteToMod({ ...routeToMod, [e.target.name]: getSelectValues(e.target) });
  };

  const handleTimeGuaranteeChange = (e) => {
    setRouteToMod({ ...routeToMod, [e.target.name]: e.target.checked });
  };

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

  const [message, setMessage] = useState('');

  // Allows to modify the route based on the id of the route.
  const patchModRoute = (routeToMod) => {
    fetch(`/carrier/route/mod/${myRoute}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(routeToMod)
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          alert(`Route ID=${myRoute}. Route updated.`);
          navigate('/carrier');
        }
      })
  }

  // This is the handler that will allow to trigger patchModRoute(routeToMod);
  // So, the route can be updated.
  const handleSubmit = (ev) => {
    ev.preventDefault();
    patchModRoute(routeToMod);
  }

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <PageDiv>
      <SectionDiv>
        <TitleButtonDiv>
          <H1>Modify your Route</H1>
        </TitleButtonDiv>
        <TitleButtonDiv>
          <PRED><strong>Update the fields you wish to update and submit your changes</strong></PRED>
        </TitleButtonDiv>
        <SectionDiv>
          {routeToMod && (
            <form onSubmit={handleSubmit}>
              <UL>
                <LI><Label><strong>Carrier Name:</strong></Label><PRED id='carrierNameMod' name='carrierNameMod'>{routeToMod.currentUser.fullName || ''}</PRED></LI>
                <LI><Label><strong>Route ID:</strong></Label><PRED id='routeIdMod' name='routeIdMod'>{routeToMod._id || ''}</PRED></LI>
                <LI><Label><strong>Pickup Date:</strong></Label><Input id='pickDateCarrier' name='pickDateCarrier' type='date' value={routeToMod.pickDateCarrier || ''} onChange={handleChange} /></LI>
                <LI><Label><strong>ETA - Estimated Time Arrival:</strong></Label><Input id='etaCarrier' name="etaCarrier" type='date' value={routeToMod.etaCarrier || ''} onChange={handleChange} /></LI>

                <LI>
                  <Label><strong>Unit Price:</strong></Label>
                  <DivSelect>
                    <Input id='unitPricePallet' name='unitPricePallet' type='number' min='0' value={routeToMod.unitPricePallet || ''} onChange={handleChange} />
                    <Select id='selectUnitPricePallet' name='selectUnitPricePallet' value={routeToMod.selectUnitPricePallet || ''} onChange={handleChange}><option>$USD</option><option>$CAD</option></Select>
                  </DivSelect>
                </LI>

                <LI>
                  <Label><strong>Unit Weight Price:</strong></Label>
                  <DivSelect>
                    <Input id='unitPriceWeight' name="unitPriceWeight" type='number' min='0' value={routeToMod.unitPriceWeight || ''} onChange={handleChange} />
                    <Select id='selectUnitPriceWeight' name='selectUnitPriceWeight' value={routeToMod.selectUnitPriceWeight || ''} onChange={handleChange}><option>$USD</option><option>$CAD</option></Select>
                  </DivSelect>
                </LI>

                <LI><Label><strong>Truck Type:</strong></Label><Select id='truckType' name='truckType' value={routeToMod.truckType || ''} onChange={handleChange}>{trucks.map((truck) => (<option key={truck} value={truck}>{truck}</option>))}</Select></LI>
                <LI><Label><strong>Services:</strong></Label><Select id='servicesType' name='servicesType' value={routeToMod.servicesType || ''} onChange={handleMultiSelectChange} multiple>{enabledServices.map((enabledService) => (<option key={enabledService} value={enabledService}>{enabledService}</option>))}</Select></LI>
                <LI><Label><strong>Pickup Site:</strong></Label><Input id='pickupsite' name='pickupsite' value={routeToMod.pickupsite || ''} onChange={handleChange} /></LI>
                <LI><Label><strong>Delivery Site:</strong></Label><Input id='deliverysite' name='deliverysite' value={routeToMod.deliverysite || ''} onChange={handleChange} /></LI>
                <LI><Label><strong>Time Guaranteed:</strong></Label><Input id='timeguarantee' name='timeguarantee' type='checkbox' checked={routeToMod.timeguarantee || ''} onChange={handleTimeGuaranteeChange} /></LI>
                <LI><Label><strong>Transit Time:</strong></Label><TextArea id='timetransit' name='timetransit' value={routeToMod.timetransit || ''} onChange={handleChange} /></LI>
                <LI><Label><strong>Other instructions:</strong></Label><TextArea id='otherinstructions' name='otherinstructions' value={routeToMod.otherinstructions || ''} onChange={handleChange} /></LI>

                <LI>
                  <Label><strong>Initial space:</strong></Label>
                  <DivSelect>
                    <Input id='maxSpace' name='maxSpace' type='number' min='0' value={routeToMod.maxSpace || ''} onChange={handleChange} />
                    <SelectUnit id='selectMaxSpace' name='selectMaxSpace' value={routeToMod.selectMaxSpace || ''} onChange={handleChange}><option>PALLET</option><option>SQ METER</option><option>SQ FEET</option><option>M3</option></SelectUnit>
                  </DivSelect>
                </LI>

                <LI>
                  <Label><strong>Remaining space:</strong></Label>
                  <DivSelect>
                    <Input id='remainingSpace' name='remainingSpace' type='number' min='0' value={routeToMod.remainingSpace || ''} onChange={handleChange} />
                    <SelectUnit id='selectRemainingSpace' name='selectRemainingSpace' value={routeToMod.selectRemainingSpace || ''} onChange={handleChange}><option>PALLET</option><option>SQ METER</option><option>SQ FEET</option><option>M3</option></SelectUnit>
                  </DivSelect>
                </LI>

                <LI>
                  <Label><strong>Initial Weight:</strong></Label>
                  <DivSelect>
                    <Input id='maxWeight' name='maxWeight' type='number' min='0' value={routeToMod.maxWeight || ''} onChange={handleChange} />
                    <SelectUnit id='selectMaxWeight' name='selectMaxWeight' value={routeToMod.selectMaxWeight || ''} onChange={handleChange}><option>KGM</option><option>LBS</option></SelectUnit>
                  </DivSelect>
                </LI>

                <LI>
                  <Label><strong>Remaining Weight:</strong></Label>
                  <DivSelect>
                    <Input id='remainingWeight' name='remainingWeight' type='number' min='0' value={routeToMod.remainingWeight || ''} onChange={handleChange} />
                    <SelectUnit id='selectRemainingWeight' name='selectRemainingWeight' value={routeToMod.selectRemainingWeight || ''} onChange={handleChange}><option>KGM</option><option>LBS</option></SelectUnit>
                  </DivSelect>
                </LI>
              </UL>

              <TitleButtonDiv1>
                <Btn>Submit Modifications</Btn>
                <Btn onClick={navigateMenu}>Back to Menu</Btn>
              </TitleButtonDiv1>
            </form>
          )}
        </SectionDiv>
      </SectionDiv>
    </PageDiv>
  )
}

export default TruckRouteEdit

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

const TitleButtonDiv1 = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-around;
width: 28vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 1vh 1vw;
`

const DivSelect = styled.div`
display: flex;
gap: 0.4vw;
`

const H1 = styled.h1`
color: #fff;
`

const PRED = styled.p`
color: #ED213A;
`

const UL = styled.ul`
border-radius: 8px;
padding: 1vh 0 1vh 0;
margin-bottom: 1vh;
`

const LI = styled.li`
color: #fff;
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

const TextArea = styled.textarea`
width: 14vw;
height: 10vh;
border-radius: 8px;
border: solid black 1px;
color: red;
font-weight: bold;
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
color: red;
font-weight: bold;
`

const Select = styled.select`
width: 10.5vw;
border-radius: 8px;
border: solid black 1px;
color: red;
font-weight: bold;
`

const SelectUnit = styled.select`
width: 4vw;
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
