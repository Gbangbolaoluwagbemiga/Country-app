import {useEffect, useState} from 'react';
import {data} from './data.js';
import numeral from 'numeral';
function App() {
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const [searchBtn, setSearchBtn] = useState('');

  function handleCountryOpen() {
    setCountryOpen(prev => !prev);
  }
  function handleResetId() {
    setCountryId(null);
  }

  function handleCountryId(id) {
    setCountryId(countryId => (id === countryId ? null : id));
  }
  useEffect(
    function () {
      async function countryName() {
        try {
          const res = await fetch(
            `https://restcountries.com/v3.1/name/${searchBtn}?fullText=true
          `
          );
          const data = await res.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }

        countryName();
      }
    },
    [searchBtn]
  );
  return (
    <div className="container">
      <Header />
      <SearchBox setSearchBtn={setSearchBtn} />

      {searchBtn === '' && (
        <div className=" ">
          {countryOpen ? (
            <IndividualCountry
              onReturnCountry={handleCountryOpen}
              onHandleCountryId={handleResetId}
              countryId={countryId}
            />
          ) : (
            <>
              <CountryBox
                onCountryOpen={handleCountryOpen}
                onSetCountryId={handleCountryId}
                countryId={countryId}
              />
            </>
          )}
        </div>
      )}
      {searchBtn !== '' && <div>Hiiiii</div>}
    </div>
  );
}

function Header() {
  return (
    <header className="nav--bar my-5">
      <h2>Where in the world?</h2>
      <p>Dark mode</p>
    </header>
  );
}

function SearchBox({setSearchBtn}) {
  return (
    <div className="search--category">
      <input
        type="text"
        placeholder="Search for a country"
        spellCheck
        className="Input--container"
        onChange={e => setSearchBtn(e.target.value)}
      />
      <i className="fa-solid fa-magnifying-glass"></i>
      <select className="Input--container" value="">
        <option disabled selected value="">
          Filter by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

function CountryBox({onCountryOpen, onSetCountryId, countryId}) {
  return (
    <div className="row" onClick={onCountryOpen}>
      {data.map(country => (
        <CountryItem
          country={country}
          onSetCountryId={onSetCountryId}
          countryId={countryId}
          key={country.name}
        />
      ))}
    </div>
  );
}

function CountryItem({country, onSetCountryId, countryId}) {
  function handleCountryId() {
    onSetCountryId(country.callingCodes);
  }
  return (
    <div
      className="col-sm-3 justify gap-3 country--container my-5"
      onClick={handleCountryId}
    >
      <img
        className="Country--flag"
        src={country.flags.png}
        alt={country.name}
      />
      <p className="fw-bold fs-3 text-detail mt-5">{country.name}</p>
      <p className="line--adjustment">
        Population: {numeral(country.population).format('0,0')}
      </p>
      <p className="line--adjustment">Region: {country.region}</p>
      <p className="line--adjustment">Capital: {country.capital}</p>
    </div>
  );
}
function IndividualCountry({onReturnCountry, countryId, onHandleCountryId}) {
  function handleReturn() {
    onReturnCountry();
    onHandleCountryId();
  }
  return (
    <>
      {data.map(country =>
        country.callingCodes === countryId ? (
          <div className="country--details" key={country.name}>
            {' '}
            <button
              style={{display: 'inline'}}
              className="btn-back mb-md-5 mt-2"
              onClick={handleReturn}
            >
              &larr;
            </button>
            <div className="row m-5">
              <div className="col-sm-4">
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="Country--flag"
                />
              </div>
              <div className="col-sm-4">
                <p>Native Name: {country.name}</p>
                <p>Population: {numeral(country.population).format('0,0')}</p>
                <p>Region: {country.region}</p>
                <p>Sub Region: {country.subregion}</p>
                <p>Capital: {country.capital} </p>

                <p>
                  {country.borders && (
                    <>
                      Borders countries: {country?.borders[0]},
                      {country?.borders[1]}
                    </>
                  )}
                </p>
              </div>
              <div className="col-sm-4">
                <p>Top Level Domain: {country.topLevelDomain}</p>
                <p>Currencies: {country.currencies[0].code}</p>
                <p>Languages: {country.languages[0].name}</p>
              </div>
            </div>
          </div>
        ) : (
          ''
        )
      )}{' '}
    </>
  );
}

export default App;
