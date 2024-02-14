// Get currency rates from OpenExchange
// currencyRatesFetch is a function, not a React component, 
// so we need the setCurrentCurrencyRate setter
// (the OpenExchangeProvider cannot be used outside React )

export const currencyRatesFetch = (setCurrentCurrencyRates) => {

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  fetch(`${BASE_URL}`)
    .then(res => res.json())
    .then((jsonData) => {
      if (jsonData) {
        localStorage.setItem('currencyRates', JSON.stringify(jsonData)); // Must have a chain of characters to maintain the local storage. So, we stringify (we cannot put an object in the localStorage)
        setCurrentCurrencyRates(jsonData);
      }
    })
}