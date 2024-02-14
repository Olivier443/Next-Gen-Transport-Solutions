import styled from 'styled-components';

const TruckPriceNew = ({ handleChange }) => {

  return (
    <ComponentDiv>
      <RouteCriteria>
        <Label>Price per Pallet:</Label>
        <DivSelect>
          <Input id='unitPricePallet' name='unitPricePallet' onChange={handleChange} type='number' min='0' />
          <Select id="selectUnitPricePallet" name="selectUnitPricePallet" onChange={handleChange}>
            <option value="">Currency</option>
            <option>$USD</option>
            <option>$CAD</option>
          </Select>
        </DivSelect>
      </RouteCriteria>

      <RouteCriteria>
        <Label>Price per 0-1500lbs:</Label>
        <DivSelect>
          <Input id='unitPriceWeight' name='unitPriceWeight' onChange={handleChange} type='number' min='0' />
          <Select id="selectUnitPriceWeight" name="selectUnitPriceWeight" onChange={handleChange}>
            <option value="">Currency</option>
            <option>$USD</option>
            <option>$CAD</option>
          </Select>
        </DivSelect>
      </RouteCriteria>
    </ComponentDiv>
  )
}

export default TruckPriceNew

const ComponentDiv = styled.div`
display: flex;
flex-direction: column;
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

const DivSelect = styled.div`
display: flex;
gap: 0.4vw;
`

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