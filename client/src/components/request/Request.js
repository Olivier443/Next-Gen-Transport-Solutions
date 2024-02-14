import React, { useState, useContext, useEffect, useRef } from 'react'
import { UserContext } from '../users/UserContext'
import { showObjectIdDateTime } from '../../utils/dateUtils';
import styled from 'styled-components';

const Request = ({ requestId }) => {

  const { currentUser } = useContext(UserContext);

  const [bulkRequest, setBulkRequest] = useState(null);

  // set the cursor at top of display
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bulkRequest]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (requestId != 'null' && requestId !== 'undefined') {
      fetch(`/carrier/bulks/${requestId}`)
        .then(res => res.json())
        .then((jsonData) => {
          if (jsonData.status === 200) {
            setBulkRequest(jsonData.data);
          } else {
            setBulkRequest(null);
          }
          setMessage(jsonData.message);
        })
    } else {
      setBulkRequest(null);
    }
  }, [requestId])

  return (
    <>
      <div ref={topRef}></div>
      {bulkRequest && (
        <SectionDiv>
          <UL>
            <LI><H3>Client:</H3></LI>
            <LI>
              <DIVCOLUMN>
                <DIVROW>
                  <H3>Client Name: {bulkRequest.currentUser.fullName}</H3>
                </DIVROW>
                <DIVROW>
                  <H3>Bulk Request ID: {bulkRequest._id}</H3>
                </DIVROW>
                <DIVROW>
                  <H3>Created on: {showObjectIdDateTime(bulkRequest._id)}</H3>
                </DIVROW>
              </DIVCOLUMN>
            </LI>
          </UL>

          <UL>
            <LI><H3>When:</H3></LI>
            <LI>
              <DIVCOLUMN>
                <DIVROW>
                  <Label htmlFor='pickDate'>Pickup Date:</Label>
                  <Input id='pickDate' type='date' name='pickDate' value={bulkRequest.pickDate} onChange={() => ''} />
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='delDate'>Delivery Date:</Label>
                  <Input id='delDate' type='date' name='delDate' value={bulkRequest.delDate} onChange={() => ''} />
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='GuaranteeDeliveryDate'>Delivery Date Guaranteed:</Label>
                  <input id='GuaranteeDeliveryDate' type='checkbox' name='GuaranteeDeliveryDate' checked={bulkRequest.GuaranteeDeliveryDate} onChange={() => ''} />
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='flexDate'>Flexible Date:</Label>
                  <input id='flexDate' type='checkbox' name='flexDate' checked={bulkRequest.flexDate} onChange={() => ''} />
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='flexRangeDate'>Flexible Range Date:</Label>
                  <Select id='flexRangeDate' name='flexRangeDate' value={bulkRequest.flexRangeDate} onChange={() => ''} >
                    <option>Select Date Range</option>
                    <option>1-day</option>
                    <option>2-day</option>
                    <option>3-day</option>
                    <option>4-day</option>
                    <option>5-day</option>
                  </Select>
                </DIVROW>
              </DIVCOLUMN>
            </LI>
          </UL>

          <UL>
            <LI><H3>Where:</H3></LI>
            <LI>
              <DIVCOLUMN>
                <DIVROW>
                  <Label htmlFor='pickSite'>Pickup Site:</Label>
                  <Input id='pickSite' type='text' name='pickSite' placeholder='enter pickup site...' value={bulkRequest.pickSite} onChange={() => ''} />
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='delSite'>Delivery Site:</Label>
                  <Input id='delSite' type='text' name='delSite' placeholder='enter delivery site...' value={bulkRequest.delSite} onChange={() => ''} />
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='loadingDockPick'>Loading Dock - Pickup Site:</Label>
                  <Select id='loadingDockPick' name='loadingDockPick' value={bulkRequest.loadingDockPick} onChange={() => ''} >
                    <option>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='loadingDockDel'>Loading Dock - Delivery Site:</Label>
                  <Select id='loadingDockDel' name='loadingDockDel' value={bulkRequest.loadingDockDel} onChange={() => ''} >
                    <option>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='truckLocationRestriction'>City Center/Difficult Access:</Label>
                  <Select id='truckLocationRestriction' name='truckLocationRestriction' value={bulkRequest.truckLocationRestriction} multiple onChange={() => ''} >
                    <option>Select</option>
                    <option>Limited Space - Yes</option>
                    <option>Limited Space - No</option>
                    <option>Construction Site</option>
                    <option>Hospital/Medical Facility</option>
                  </Select>
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='truckSizeRestriction'>Truck Size Restricted:</Label>
                  <Select id='truckSizeRestriction' name='truckSizeRestriction' value={bulkRequest.truckSizeRestriction} onChange={() => ''} >
                    <option>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='truckInsideDel'>Inside Delivery:</Label>
                  <Select id='truckInsideDel' name='truckInsideDel' value={bulkRequest.truckInsideDel} onChange={() => ''} >
                    <option>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='truckMove'>Move:</Label>
                  <Select id='truckMove' name='truckMove' value={bulkRequest.truckMove} onChange={() => ''} >
                    <option>Select</option>
                    <option>Business to business</option>
                    <option>Business to consumer</option>
                  </Select>
                </DIVROW>
              </DIVCOLUMN>
            </LI>
          </UL>

          <UL>
            <LI><H3>What:</H3></LI>
            <LI>
              <DIVCOLUMN>
                <DIVROW>
                  <Label htmlFor='commodityPicked'>Commodity:</Label>
                  <Input id='commodityPicked' type='text' name='commodityPicked' placeholder='enter commodity description...' value={bulkRequest.commodityPicked} onChange={() => ''} />
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='dGRestriction'>Dangerous Good:</Label>
                  <Select id='dGRestriction' name='dGRestriction' value={bulkRequest.dGRestriction} onChange={() => ''} >
                    <option>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='qtyPicked'>Quantity:</Label>
                  <Input1 id='qtyPicked' type='number' name='qtyPicked' placeholder='enter qty of pieces...' value={bulkRequest.qtyPicked} onChange={() => ''} />
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='merchandiseHandled'>Merchandise handled:</Label>
                  <Select id='merchandiseHandled' name='merchandiseHandled' value={bulkRequest.merchandiseHandled} onChange={() => ''}>
                    <option>Select</option>
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
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='qtyTotalWeight'>Weight</Label>
                  <InputSelectDiv>
                    <Input1 id='qtyTotalWeight' type='number' name='qtyTotalWeight' placeholder='enter total weight...' value={bulkRequest.qtyTotalWeight} onChange={() => ''} />
                    <Select id='unitWeight' name='unitWeight' value={bulkRequest.unitWeight} onChange={() => ('')}>
                      <option>Select</option>
                      <option>KGM</option>
                      <option>LBS</option>
                      <option>M3</option>
                    </Select>
                  </InputSelectDiv>
                </DIVROW>
                <DIVROW>
                  <Label htmlFor='qtyTotalDimensions'>Dimensions</Label>
                  <InputSelectDiv>
                    <Input1 id='qtyTotalDimensions' type='number' name='qtyTotalDimensions' placeholder='enter total dimensions...' value={bulkRequest.qtyTotalDimensions} onChange={() => ''} />
                    <Select id='unitDimensions' name='unitDimensions' value={bulkRequest.unitDimensions} onChange={() => ''}>
                      <option>Select</option>
                      <option>cm</option>
                      <option>inch</option>
                    </Select>
                  </InputSelectDiv>
                </DIVROW>
              </DIVCOLUMN>
            </LI>
          </UL>

          <UL>
            <LI><H3>Special Instructions:</H3></LI>
            <LI>
              <DIVROW>
                <Label htmlFor='textInstructions'>Details:</Label>
                <Textarea id='textInstructions' type='text' name='textInstructions' placeholder='describe needs / enter instructions...' value={bulkRequest.textInstructions} onChange={() => ''} />
              </DIVROW>
            </LI>
          </UL>
        </SectionDiv>
      )}
    </>
  )
}

export default Request

const DIVROW = styled.div`
display: flex;
flex-direction: row;
width: 34vw;
justify-content: space-between;
padding: 0 0 1vh 0;
`

const DIVCOLUMN = styled.div`
display: flex;
flex-direction: column;
`

const InputSelectDiv = styled.div`
display: flex;
gap: 0.6vw;
`

const UL = styled.ul`
border: solid black 1px;
border-radius: 8px;
padding: 1vh 0 1vh 0;
margin-bottom: 1vh;
width: 38vw;
display: flex;
flex-direction: column;
align-items: center;
`

const LI = styled.li`
color: #fff;
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 36vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
`

const H3 = styled.h3`
color: #fff;
`

const Input1 = styled.input`
width: 5vw;
border-radius: 8px;
border: solid black 1px;
`

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 46vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 0 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`

const Input = styled.input`
width: 14vw;
border-radius: 8px;
border: solid black 1px;
`

const Label = styled.label`
color: #fff;
font-weight: bold;
width: 14vw;
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