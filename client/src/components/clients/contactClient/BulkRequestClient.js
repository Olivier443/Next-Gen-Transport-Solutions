import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../users/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodePullRequest } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import img from '../../../assets/truck.jpg';


const BulkRequestClient = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [bulkRequestClientNeeds, setBulkRequestClientNeeds] = useState({ currentUser });


  const [carrierList, setCarrierList] = useState([]); // Store the carrier list

  // Update the state of carrierList that was initially initialized as an empty array with the carriers
  useEffect(() => {
    fetch(`/carriers/all`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setCarrierList(jsonData.data);
        }
      })
  }, [])

  // The three handlers below allow to update the state of bulkRequestClientNeeds with the values inputted by the client on the textarea, inputs, checkboxes, and select elements.
  const handleClientNeedChange = (e) => {
    setBulkRequestClientNeeds({ ...bulkRequestClientNeeds, [e.target.name]: e.target.value });
  };

  const handleClientNeedMultiSelectChange = (e) => {
    setBulkRequestClientNeeds({ ...bulkRequestClientNeeds, [e.target.name]: getSelectValues(e.target) });
  };

  const handleClientNeedCheckboxChange = (e) => {
    setBulkRequestClientNeeds({ ...bulkRequestClientNeeds, [e.target.name]: e.target.checked });
  };

  const getCarrierFromList = (id) => {
    return (carrierList.filter(function (carrier) {
      return carrier._id === id;
    }))
  }

  // Return an array of the selected opion values
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

  // This allows to add a mail in the collection Mails.
  const postMsg = (requestCreatedId, carrier) => {
    fetch('/mail/new', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromId: currentUser._id, fromFullName: currentUser.fullName, fromType: currentUser.type,
        toId: carrier._id, toFullName: carrier.fullName, toType: carrier.type,
        msg: document.getElementById('message').value,
        initialRequestId: requestCreatedId,
        fromStatus: 'SENT', toStatus: 'UNREAD'
      })
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 201) {
          console.log('Your message has been successfully sent!');
        }
        return jsonData;
      })
  }

  // This allows to POST the request from the client into the collection ClientBulkRequest.
  // After the POST is being done, the request will be sent to the carriers selected by the client in the carrierList (see the select in the return).
  // This will be triggered with the postMsg(requestCreatedId, carrier).
  const postClientBulkRequest = (bulkRequestClientNeeds) => {
    fetch('/carrier/bulk/request', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bulkRequestClientNeeds)
    })
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 201) {
          const requestCreatedId = jsonData.data.insertedId;
          // request created, send request to carriers with mail
          const carriersSelected = bulkRequestClientNeeds.selectCarriers;
          carriersSelected.map((aCarrierId) => {
            const carrier = getCarrierFromList(aCarrierId)[0];
            const jsonData = postMsg(requestCreatedId, carrier);
            alert(`Request created and sent to the carrier(s): ${requestCreatedId}`);
            navigate('/client');
          })
        }
      })
  }

  const handleBulkRequestSubmit = (ev) => {
    ev.preventDefault();
    const data = postClientBulkRequest(bulkRequestClientNeeds);
  }

  const handleBulkClientNeedsClear = (ev) => {
    document.getElementById('message').value = '';
    document.getElementById('pickDate').value = '';
    document.getElementById('delDate').value = '';
    document.getElementById('GuaranteeDeliveryDate').checked = false;
    document.getElementById('flexDate').checked = false;
    document.getElementById('flexRangeDate').value = '';
    document.getElementById('pickSite').value = '';
    document.getElementById('delSite').value = '';
    document.getElementById('loadingDockPick').value = '';
    document.getElementById('loadingDockDel').value = '';
    document.getElementById('truckLocationRestriction').value = '';
    document.getElementById('truckSizeRestriction').value = '';
    document.getElementById('truckInsideDel').value = '';
    document.getElementById('truckMove').value = '';
    document.getElementById('commodityPicked').value = '';
    document.getElementById('dGRestriction').value = '';
    document.getElementById('qtyPicked').value = '';
    document.getElementById('merchandiseHandled').value = '';
    document.getElementById('qtyTotalWeight').value = '';
    document.getElementById('unitWeight').value = '';
    document.getElementById('qtyTotalDimensions').value = '';
    document.getElementById('unitDimensions').value = '';
    document.getElementById('textInstructions').value = '';
  }

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <PageDiv>
      <SectionDiv>
        <TitleDiv>
          <H1><FontAwesomeIcon icon={faCodePullRequest} /> Bulk Request</H1>
        </TitleDiv>

        <ClientCriteria>
          <H3>Create and send your transporation needs to the carriers located in the area of pickup</H3>
        </ClientCriteria>

        <div>
          <form onSubmit={handleBulkRequestSubmit}>
            <ClientCriteria>
              <div>
                <div>
                  <H3>Client:</H3>
                </div>
                <ClientInsideCriteria>
                  <H3>Client Name: {currentUser.fullName}</H3>
                </ClientInsideCriteria>
                <ClientInsideCriteria>
                  <H3>Client ID: {currentUser._id}</H3>
                </ClientInsideCriteria>
                <ClientInsideCriteria>
                  <H3>Type: {currentUser.type}</H3>
                </ClientInsideCriteria>
              </div>
            </ClientCriteria>

            <ClientCriteria>
              <div>
                <div>
                  <H3>Who:</H3>
                </div>
                <ClientInsideCriteria>
                  <Label htmlFor='selectCarriers'>Select Carrier(s) to Send Your Request:</Label>
                  <Select id="selectCarriers" name="selectCarriers" onChange={handleClientNeedMultiSelectChange} required multiple> {/* React does not recognize the `servicesType` prop on a DOM element */}
                    {carrierList.map((aCarrier) => (
                      <option key={aCarrier._id} value={aCarrier._id}>{aCarrier.fullName}</option>
                    ))}
                  </Select>
                </ClientInsideCriteria>
                <ClientInsideCriteria>
                  <Label htmlFor='message'>Message the carrier(s) selected:</Label>
                  <Textarea type='text' id='message' name='message' placeholder='Message the carrier(s)...' required></Textarea>
                </ClientInsideCriteria>
              </div>
            </ClientCriteria>

            <ClientCriteria>
              <div>
                <div>
                  <H3>When:</H3>
                </div>
                <ClientInsideCriteria>
                  <Label htmlFor='pickDate'>Pickup Date:</Label>
                  <Input id='pickDate' type='date' name='pickDate' min={new Date()} required onChange={handleClientNeedChange} />
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='delDate'>Delivery Date:</Label>
                  <Input id='delDate' type='date' name='delDate' min={bulkRequestClientNeeds.pickDate} required onChange={handleClientNeedChange} />
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='GuaranteeDeliveryDate'>Delivery Date Guaranteed:</Label>
                  <input id='GuaranteeDeliveryDate' type='checkbox' name='GuaranteeDeliveryDate' onChange={handleClientNeedCheckboxChange} />
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='flexDate'>Flexible Date:</Label>
                  <input id='flexDate' type='checkbox' name='flexDate' onChange={handleClientNeedCheckboxChange} />
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='flexRangeDate'>Flexible Range Date:</Label>
                  <Select id='flexRangeDate' name='flexRangeDate' onChange={handleClientNeedChange}>
                    <option value=''>Select Date Range</option>
                    <option>1-day</option>
                    <option>2-day</option>
                    <option>3-day</option>
                    <option>4-day</option>
                    <option>5-day</option>
                  </Select>
                </ClientInsideCriteria>

              </div>
            </ClientCriteria>

            <ClientCriteria>
              <div>
                <div>
                  <H3>Where:</H3>
                </div>
                <ClientInsideCriteria>
                  <Label htmlFor='pickSite'>Pickup Site:</Label>
                  <Input id='pickSite' type='text' name='pickSite' placeholder='enter pickup site...' required onChange={handleClientNeedChange} />
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='delSite'>Delivery Site:</Label>
                  <Input id='delSite' type='text' name='delSite' placeholder='enter delivery site...' required onChange={handleClientNeedChange} />
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='loadingDockPick'>Loading Dock - Pickup Site:</Label>
                  <Select id='loadingDockPick' name='loadingDockPick' required onChange={handleClientNeedChange}>
                    <option value=''>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='loadingDockDel'>Loading Dock - Delivery Site:</Label>
                  <Select id='loadingDockDel' name='loadingDockDel' required onChange={handleClientNeedChange}>
                    <option value=''>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='truckLocationRestriction'>City Center/Difficult Access:</Label>
                  <Select id='truckLocationRestriction' name='truckLocationRestriction' required onChange={handleClientNeedMultiSelectChange} multiple>
                    <option value=''>Select</option>
                    <option>Limited Space - Yes</option>
                    <option>Limited Space - No</option>
                    <option>Construction Site</option>
                    <option>Hospital/Medical Facility</option>
                  </Select>
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='truckSizeRestriction'>Truck Size Restricted:</Label>
                  <Select id='truckSizeRestriction' name='truckSizeRestriction' required onChange={handleClientNeedChange}>
                    <option value=''>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='truckInsideDel'>Inside Delivery:</Label>
                  <Select id='truckInsideDel' name='truckInsideDel' required onChange={handleClientNeedChange}>
                    <option value=''>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='truckMove'>Move:</Label>
                  <Select id='truckMove' name='truckMove' required onChange={handleClientNeedChange}>
                    <option value=''>Select</option>
                    <option>Business to business</option>
                    <option>Business to consumer</option>
                  </Select>
                </ClientInsideCriteria>

              </div>
            </ClientCriteria>

            <ClientCriteria>
              <div>
                <div>
                  <H3>What:</H3>
                </div>
                <ClientInsideCriteria>
                  <Label htmlFor='commodityPicked'>Commodity:</Label>
                  <Input id='commodityPicked' type='text' name='commodityPicked' required placeholder='enter commodity description...' onChange={handleClientNeedChange} />
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='dGRestriction'>Dangerous Good:</Label>
                  <Select id='dGRestriction' name='dGRestriction' required onChange={handleClientNeedChange}>
                    <option value=''>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='qtyPicked'>Quantity:</Label>
                  <Input id='qtyPicked' type='number' name='qtyPicked' required placeholder='enter qty of pieces...' onChange={handleClientNeedChange} />
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='merchandiseHandled'>Merchandise handled:</Label>
                  <Select id='merchandiseHandled' name='merchandiseHandled' required onChange={handleClientNeedChange}>
                    <option value=''>Select</option>
                    <option>bulk</option>
                    <option>overload charge</option>
                    <option>small packages</option>
                    <option>crate</option>
                    <option>container - 20'</option>
                    <option>container - 40'</option>
                    <option>container - 40' - high cube</option>
                    <option>pallet size - 40" x 48"</option>
                    <option>pallet size - 42" x 42"</option>
                    <option>pallet size - 48" x 48"</option>
                    <option>pallet size - 48" x 40"</option>
                    <option>pallet size - 48" x 42"</option>
                    <option>pallet size - 40" x 40"</option>
                    <option>pallet size - 48" x 45"</option>
                    <option>pallet size - 44" x 44"</option>
                    <option>pallet size - 36" x 36"</option>
                    <option>pallet size - 48" x 36"</option>
                    <option>pallet size - 35" x 46"</option>
                    <option>pallet size - 48" x 20"</option>
                    <option>pallet size - other</option>
                  </Select>
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='qtyTotalWeight'>Weight</Label>
                  <Input id='qtyTotalWeight' type='number' name='qtyTotalWeight' placeholder='enter total weight...' required onChange={handleClientNeedChange} />
                  <Select id='unitWeight' name='unitWeight' onChange={handleClientNeedChange}>
                    <option value=''>Select</option>
                    <option>KGM</option>
                    <option>LBS</option>
                    <option>M3</option>
                  </Select>
                </ClientInsideCriteria>

                <ClientInsideCriteria>
                  <Label htmlFor='qtyTotalDimensions'>Dimensions</Label>
                  <Input id='qtyTotalDimensions' type='number' name='qtyTotalDimensions' placeholder='enter total dimensions...' onChange={handleClientNeedChange} />
                  <Select id='unitDimensions' name='unitDimensions' onChange={handleClientNeedChange}>
                    <option value=''>Select</option>
                    <option>cm</option>
                    <option>inch</option>
                  </Select>
                </ClientInsideCriteria>
              </div>
            </ClientCriteria>

            <ClientCriteria>
              <div>
                <div>
                  <H3>Special Instructions:</H3>
                </div>
                <ClientInsideCriteria>
                  <Label htmlFor='textInstructions'>Details:</Label>
                  <Textarea id='textInstructions' type='text' name='textInstructions' placeholder='describe needs / enter instructions...' onChange={handleClientNeedChange} />
                </ClientInsideCriteria>
              </div>
            </ClientCriteria>

            <ClientCriteria>
              <Btn type="submit" id='btnPost'>Create Request</Btn>
              <Btn onClick={handleBulkClientNeedsClear}>Clear</Btn>
              <Btn onClick={navigateMenu}>Back to Menu</Btn>
            </ClientCriteria>
          </form>
        </div>
      </SectionDiv>
    </PageDiv>
  )
}

export default BulkRequestClient

const PageDiv = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 82vh;
padding: 1vh 1vw 1vh 1vw;
background-image: url(${img});
background-size: 100vw 82vh;
margin: 6vh 0 0 0;
justify-content: center;
`

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 30vw;
height: 84vh;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
overflow-y: auto;
overflow-x: hidden;
`

const TitleDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: center;
width: 26vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 1vh 1vw;
border: solid black 1px;
`

const ClientCriteria = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 26vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 0 1vh 0;
`

const ClientInsideCriteria = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 24vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 0 1vh 0;
`

const H1 = styled.h1`
color: #fff;
`

const H3 = styled.h3`
color: #fff;
`

const Label = styled.label`
color: #fff;
font-weight: bold;
width: 14vw;
`

const Input = styled.input`
width: 20vw;
border-radius: 8px;
border: solid black 1px;
`

const Select = styled.select`
border-radius: 8px;
border: solid black 1px;
`

const Textarea = styled.textarea`
width: 80vw;
height: 20vh;
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
width: 6vw;
color: #fff;
&:hover {
  background-color: #E4E5E6;
  color: #00416A;
}
`