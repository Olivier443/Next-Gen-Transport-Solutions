import { React, useEffect, useState, useContext } from 'react'
import { OpenExchangeContext } from '../users/OpenExchangeContext';
import { getSecondsSinceTimestampInSeconds, showTimeStampInSecondsToDateTime } from '../../utils/dateUtils';
import { currencyRatesFetch } from './currencyRatesFetch';
import styled from 'styled-components';

const CurrencyConverter = () => {

  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(0.00.toFixed(2));

  const { currentCurrencyRates, setCurrentCurrencyRates } = useContext(OpenExchangeContext);

  // Allows to convert the amount into a different currency.
  useEffect(() => {
    if (fromCurrency && toCurrency && amount) {
      setConvertedAmount((((1 / currentCurrencyRates.rates[fromCurrency]) * currentCurrencyRates.rates[toCurrency]) * amount).toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, currentCurrencyRates.rates]);

  // This handler updates the state of fromCurrency with the exchange rate with the currency selected in the select.
  const onChangeFromCurrencyHandler = (ev) => {
    ev.preventDefault();
    setFromCurrency(ev.target.value);
  }

  // This handler updates the state of toCurrency with the exchange rate with the currency selected in the select.
  const onChangeToCurrencyHandler = (ev) => {
    ev.preventDefault();
    setToCurrency(ev.target.value);
  }

  // This handler store the value of the amount inputted by the user into the state amount. This is the amount to convert into a different currency.
  const amountChangeHandler = (ev) => {
    ev.preventDefault();
    setAmount(ev.target.value);
  }

  const onClickRefreshRateHandler = (ev) => {
    currencyRatesFetch(setCurrentCurrencyRates);
  }

  return (
    <>
      <form>

        <DIVCNTR>
          <H3>Currency Converter</H3>
          <DIVROW>
            <Label>Amount to convert</Label>
            <Input id='fromCurrency' type='number' min='0' required onChange={amountChangeHandler} />
          </DIVROW>
          <DIVROW>
            <Label htmlFor='fromCurrencies'>From currency:</Label>
            <Select id='fromCurrencies' name='fromCurrencies' onChange={onChangeFromCurrencyHandler} required>
              <option value=''>Choose Currency to Convert</option>
              <option value='CAD'>Canadian dollar - CAD</option>
              <option value='DKK'>Danish krone - DKK</option>
              <option value='EUR'>Europe euro - EUR</option>
              <option value='MXN'>Mexican peso - MXN</option>
              <option value='CHF'>Switzerland franc - CHF</option>
              <option value='GBP'>United Kingdom Pound - GBP</option>
              <option value='USD'>United States dollar - USD</option>
            </Select>
          </DIVROW>

          <DIVROW>
            <Label htmlFor='toCurrencies'>To currency:</Label>
            <Select id='toCurrencies' name='toCurrencies' onChange={onChangeToCurrencyHandler} required>
              <option value=''>Choose Currency Converted</option>
              <option value='CAD'>Canadian dollar - CAD</option>
              <option value='DKK'>Danish krone - DKK</option>
              <option value='EUR'>Europe euro - EUR</option>
              <option value='MXN'>Mexican peso - MXN</option>
              <option value='CHF'>Switzerland franc - CHF</option>
              <option value='GBP'>United Kingdom Pound - GBP</option>
              <option value='USD'>United States dollar - USD</option>
            </Select>
          </DIVROW>
          <DIVROW>
            <Label>Converted Amount</Label>
            {convertedAmount && (
              <H2 id='fromCurrency'>{convertedAmount}</H2>
            )}
          </DIVROW>
          <DIVROW>
            <Label>Rate date:</Label>
            <Label>{showTimeStampInSecondsToDateTime(currentCurrencyRates.timestamp)}</Label>
          </DIVROW>
          <DIVROW>
            <Anchor href="https://openexchangerates.org" target="_blank" style={{ textDecoration: "none", color: "green" }}>OpenExchange</Anchor>
            {/* Only let appear button if 1h left since last OpenExchangeRates was updated */}
            {(getSecondsSinceTimestampInSeconds(currentCurrencyRates.timestamp) >= 3600) ?
              (<button type='button' onClick={onClickRefreshRateHandler}>Refresh Rates</button>) :
              <Label>Refresh in {60 - ((getSecondsSinceTimestampInSeconds(currentCurrencyRates.timestamp)) / 60).toFixed(0)} mn</Label>
            }
          </DIVROW>
        </DIVCNTR>

      </form>
    </>
  )
}

export default CurrencyConverter

const DIVCNTR = styled.div`
display: flex;
flex-direction: column;
`

const DIVROW = styled.div`
display: flex;
flex-direction: row;
padding: 1vh 0 1vh 0;
`

const Label = styled.label`
color: #fff;
font-weight: bold;
width: 8vw;
`

const Anchor = styled.a`
color: #fff;
font-weight: bold;
width: 8vw;
`

const Select = styled.select`
border-radius: 8px;
border: solid black 1px;
`

const H2 = styled.h2`
color: #fff;
`

const H3 = styled.h2`
color: #fff;
`

const Input = styled.input`
font-size: 20px;
border: none;
`
