import { useState, useEffect } from "react";

import "./App.css";

function CountryItem({ country }) {
  return (
    <div>
      <p>{country.name}</p>
      <img src={"/flags/1x1/" + country.code + ".svg"} />
    </div>
  );
}

function App() {
  const [countries, setCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function loadCountries() {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await fetch("https://football.shrp.dev/items/countries");
      const parsedData = await response.json();
      setCountries(parsedData.data); //mise à jour de la variable d'état "countries"
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCountries();
  }, []);

  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Sorry, an error has occurred.</p>}
      {countries !== null &&
        countries.map((item) => <CountryItem key={item.id} country={item} />)}
    </div>
  );
}

export default App;
