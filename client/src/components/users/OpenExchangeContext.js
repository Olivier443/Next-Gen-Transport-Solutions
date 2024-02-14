// Creating the user Context
import React, { createContext, useState, useEffect } from 'react'

// create a user Context
export const OpenExchangeContext = createContext(null);

//create a provider component so that all children will access the user context
export const OpenExchangeProvider = ({ children }) => {

  // Time to give it a currentUser state variable
  const [currentCurrencyRates, setCurrentCurrencyRates] = useState(() => {

    // This unnamed function only do the INITIALISATION of state 
    // When refreshing the page or navigating using http on routes
    // It returns the currentRates object stored in the browser local storage if exist
    const currencyRates = JSON.parse(localStorage.getItem('currencyRates'));
    if (currencyRates !== undefined && currencyRates) {
      return currencyRates;
    } else {
      // get currency rates from OpenExchange
      // currencyRatesFetch(setCurrentCurrencyRates); That does not work because setCurrentCurrencyRates is not initialized
      // We need to fetch openExcange inside OpenExchangeProvider

      const BASE_URL = process.env.REACT_APP_BASE_URL;

      fetch(`${BASE_URL}`)
        .then(res => res.json())
        .then((jsonData) => {
          if (jsonData) {
            localStorage.setItem('currencyRates', JSON.stringify(jsonData)); // To maintain the local storage must have a chain of characters. So, we stringify (we cannot put an object in the localStorage)
            setCurrentCurrencyRates(jsonData);
            if (currencyRates !== undefined) {
              return currencyRates;
            } else {
              return null;
            }
          }
        })
    }
  })

  // Grab data from storage(can be null or actual currencyRates)
  // It is used only once (when refreshing the page or using another http route)
  useEffect(() => {
    // Get loginUser from local storage
    const currencyRates = JSON.parse(localStorage.getItem('currencyRates'));
    if (currencyRates !== null && currencyRates !== undefined) {
      // Set currencyRates data to the provider
      setCurrentCurrencyRates(currencyRates);
    }
  }, []);

  // The provider needs to wrap around our application
  return (
    // Export the state so that children can access or set currentCurrencyRates
    <OpenExchangeContext.Provider value={{ currentCurrencyRates: currentCurrencyRates, setCurrentCurrencyRates: setCurrentCurrencyRates }}>
      {children}
    </OpenExchangeContext.Provider>
  )
};
