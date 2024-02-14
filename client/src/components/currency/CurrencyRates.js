import React, { useContext, useEffect } from 'react'
import { OpenExchangeContext } from '../users/OpenExchangeContext';
import { currencyRatesFetch } from './currencyRatesFetch';
import img from '../../assets/truck.jpg'
import styled from 'styled-components';

const CurrencyRates = () => {

  const { currentCurrencyRates, setCurrentCurrencyRates } = useContext(OpenExchangeContext);

  // Allows to get the exchange rates provided by https://openexchangerates.org
  // Allows to update the state of currentCurrencyRates and to create the setItem('currencyRates' into the localStorage.
  useEffect(() => {
    if (currentCurrencyRates === null || currentCurrencyRates === undefined) {

      // get currency rates from OpenExchange
      currencyRatesFetch(setCurrentCurrencyRates);
      // fetch(`https://openexchangerates.org/api/latest.json?app_id={Type your KEY}`)
    }
  }, [currentCurrencyRates, setCurrentCurrencyRates/* , BASE_URL */]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setCurrentCurrencyRates(null);
  }

  return (
    <PageDiv>
      <SectionDiv>
        {currentCurrencyRates && (
          <>
            <Form onClick={handleSubmit}>
              <DivForm>
                <TitleButtonDiv>
                  <H2>OpenExchange Currency Rates</H2>
                </TitleButtonDiv>
                <br /><br />
                <ul>
                  <LI><Label><strong>USD to CAD: </strong></Label>{currentCurrencyRates.rates.CAD.toFixed(6)}</LI>
                  <LI><Label><strong>CAD to USD: </strong></Label>{(1 / currentCurrencyRates.rates.CAD).toFixed(6)}</LI>
                </ul>
                <Button id='refreshrates' type='submit' name="refreshrates" value="Refresh Rates" />
                <a href="https://openexchangerates.org/terms" target="_blank" style={{ textDecoration: "none", color: "white" }}>OpenExchange Disclaimer</a>
                <a href="https://openexchangerates.org/license" target="_blank" style={{ textDecoration: "none", color: "white" }} >OpenExchange License</a>
                <br /><br />
              </DivForm>
            </Form>
          </>
        )}
      </SectionDiv>
    </PageDiv>
  )
}

export default CurrencyRates

const Form = styled.form`
background-color: rgba(204, 85, 0, 0.1);
`

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

const DivForm = styled.div`
width: 80%;
height: 90%;
position: absolute;
left: 10%;
top: 10%;
background-color: rgba(204, 85, 0, 0.1);
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
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
width: auto;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 1vh 1vw;
`

const H2 = styled.h2`
font-size: 30px;
color: #fff;
`

const Label = styled.label`
font-size:25px;
`

const LI = styled.li`
color: #fff;
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
margin: 1vh 1vw 1vh 1vw;
`

const Input = styled.input`
width: 60%;
font-size: 20px;
border: none;
`

const Button = styled(Input)`
width: 20%;
color: white;
background-color: rgba(204, 85, 0, 0.1);
font-weight: bold;
font-size: 30px;
justify-content: center;
border: solid 2px;
border-radius: 30px;
margin-top: 40px;

&:hover {
  color:  yellow;
  }
`
