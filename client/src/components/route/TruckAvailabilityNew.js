import React from 'react'
import styled from 'styled-components';

const TruckAvailabilityNew = ({ handleChange }) => {

  return (
    <div>
      <RouteCriteria>
        <Label>Max Space:</Label>
        <DivSelect>
          <Input id='maxSpace' name='maxSpace' onChange={handleChange} type='number' min='0' />
          <Select id="selectMaxSpace" name="selectMaxSpace" onChange={handleChange}>
            <option>Select Unit</option>
            <option>PALLET</option>
            <option>SQ METER</option>
            <option>SQ FEET</option>
            <option>M3</option>
          </Select>
        </DivSelect>
      </RouteCriteria>

      <RouteCriteria>
        <Label>Remaining Space:</Label>
        <DivSelect>
          <Input id='remainingSpace' name='remainingSpace' onChange={handleChange} type='number' min='0' />
          <Select id="selectRemainingSpace" name="selectRemainingSpace" onChange={handleChange}>
            <option>Select Unit</option>
            <option>PALLET</option>
            <option>SQ METER</option>
            <option>SQ FEET</option>
            <option>M3</option>
          </Select>
        </DivSelect>
      </RouteCriteria>

      <RouteCriteria>
        <Label>Max Weight:</Label>
        <DivSelect>
          <Input id='maxWeight' name='maxWeight' onChange={handleChange} type='number' min='0' />
          <Select id="selectMaxWeight" name="selectMaxWeight" onChange={handleChange}>
            <option>Select Unit</option>
            <option>KGM</option>
            <option>LBS</option>
          </Select>
        </DivSelect>
      </RouteCriteria>

      <RouteCriteria>
        <Label>Remaining Weight:</Label>
        <DivSelect>
          <Input id='remainingWeight' name='remainingWeight' onChange={handleChange} type='number' min='0' />
          <Select id="selectRemainingWeight" name="selectRemainingWeight" onChange={handleChange}>
            <option>Select Unit</option>
            <option>KGM</option>
            <option>LBS</option>
          </Select>
        </DivSelect>
      </RouteCriteria>

      <RouteCriteria>
        <Label>Max Height:</Label>
        <DivSelect>
          <Input id='maxHeight' name='maxHeight' onChange={handleChange} type='number' min='0' />
          <Select id="selectUnitMaxHeight" name="selectUnitMaxHeight" onChange={handleChange}>
            <option>Select Unit</option>
            <option>CM</option>
            <option>INCH</option>
          </Select>
        </DivSelect>
      </RouteCriteria>

      <RouteCriteria>
        <Label>Max Length:</Label>
        <DivSelect>
          <Input id='maxLength' name='maxLength' onChange={handleChange} type='number' min='0' />
          <Select id="selectUnitMaxLength" name="selectUnitMaxLength" onChange={handleChange}>
            <option>Select Unit</option>
            <option>CM</option>
            <option>INCH</option>
          </Select>
        </DivSelect>
      </RouteCriteria>
    </div>
  )
}

export default TruckAvailabilityNew

const Label = styled.label`
color: #fff;
font-weight: bold;
width: 14vw;
`

const Input = styled.input`
width: 4vw;
border-radius: 8px;
border: solid black 1px;
`

const Select = styled.select`
width: 4vw;
border-radius: 8px;
border: solid black 1px;
`

const DivSelect = styled.div`
display: flex;
gap: 0.4vw;
`

const RouteCriteria = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 20vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 0 1vh 0;
`