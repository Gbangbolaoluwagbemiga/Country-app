import {useEffect, useState} from 'react';
import {data} from './data.js';
import numeral from 'numeral';
function App() {
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearchOpen, setCountrySearchOpen] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [optionRegion, setOptionRegion] = useState('');
  const [countryApi, setCountryApi] = useState(data);

  function handleCountryOpen() {
    setCountryOpen(prev => !prev);
  }
  function handleCountrySearchOpen() {
    setCountrySearchOpen(prev => !prev);
  }
  function handleResetId() {
    setCountryId(null);
  }

  function handleCountryId(id) {
    setCountryId(countryId => (id === countryId ? null : id));
  }

  return (
    <div className="container">
      <Header />
      {!countryOpen ? (
        <SearchBox
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          optionRegion={optionRegion}
          setOptionRegion={setOptionRegion}
        />
      ) : (
        ''
      )}
      {searchQuery === '' && optionRegion === '' && (
        <div className=" ">
          {countryOpen ? (
            <IndividualCountry
              countryApi={countryApi}
              onReturnCountry={handleCountryOpen}
              onHandleCountryId={handleResetId}
              countryId={countryId}
            />
          ) : (
            <>
              <CountryBox
                countryApi={countryApi}
                onCountryOpen={handleCountryOpen}
                onSetCountryId={handleCountryId}
                countryId={countryId}
              />
            </>
          )}
        </div>
      )}
      {searchQuery !== '' && optionRegion === '' && (
        <>
          {' '}
          {countrySearchOpen ? (
            <IndividualCountry
              countryApi={countryApi}
              onReturnCountry={handleCountrySearchOpen}
              onHandleCountryId={handleResetId}
              countryId={countryId}
            />
          ) : (
            <SearchedCountry
              countryApi={countryApi}
              searchQuery={searchQuery}
              onSetCountryId={handleCountryId}
              countryId={countryId}
              setSearchQuery={setSearchQuery}
              onCountrySearchOpen={handleCountrySearchOpen}
            />
          )}
        </>
      )}
      {optionRegion !== '' && (
        <OptionRegion
          optionRegion={optionRegion}
          countryApi={countryApi}
          onSetCountryId={handleCountryId}
          countryId={countryId}
        />
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="nav--bar my-5">
      <h2>Where in the world?</h2>
      <p className="dark--theme">
        <i className="fa-regular fa-moon"></i>Dark mode
      </p>
    </header>
  );
}

function SearchBox({
  setSearchQuery,
  searchQuery,
  optionRegion,
  setOptionRegion,
}) {
  function handleInput(e) {
    setOptionRegion('');
    setSearchQuery(e.target.value);
  }
  return (
    <div className="search--category">
      <input
        type="text"
        placeholder="Search for a country"
        spellCheck
        className="Input--container"
        onChange={handleInput}
        maxLength={50}
      />
      {/* <i className="fa-solid fa-magnifying-glass"></i> */}
      <OptionField
        setSearchQuery={setSearchQuery}
        optionRegion={optionRegion}
        setOptionRegion={setOptionRegion}
      />{' '}
    </div>
  );
}

function OptionField({optionRegion, setOptionRegion, setSearchQuery}) {
  useEffect(
    function () {
      setOptionRegion(optionRegion);
    },
    [optionRegion, setOptionRegion]
  );

  function handleOptionRegion(e) {
    setSearchQuery('');
    setOptionRegion(e.target.value);
  }
  return (
    <select
      className="Input--container"
      value={optionRegion}
      onChange={handleOptionRegion}
    >
      <option disabled selected value="">
        Filter by Region
      </option>
      <option value="Africa">Africa</option>
      <option value="Americas">America</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
}

function CountryBox({onCountryOpen, onSetCountryId, countryId, countryApi}) {
  return (
    <div className="row" onClick={onCountryOpen}>
      {countryApi.map(country => (
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
        <span className="bold--text">Population:</span>{' '}
        {numeral(country.population).format('0,0')}.
      </p>
      <p className="line--adjustment">
        <span className="bold--text">Region:</span> {country.region}.
      </p>
      <p className="line--adjustment">
        <span className="bold--text">Capital:</span> {country.capital}.
      </p>
    </div>
  );
}
function IndividualCountry({
  onReturnCountry,
  countryId,
  onHandleCountryId,
  countryApi,
}) {
  function handleReturn() {
    onReturnCountry();
    onHandleCountryId();
  }
  return (
    <>
      {countryApi.map(country =>
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
            <div className="row m-4">
              <div className="col-sm-4">
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="Country--flag mb-5"
                />
              </div>
              <div className="col-sm-4">
                <p>
                  <span className="bold--text">Native Name:</span>{' '}
                  {country.name}.
                </p>
                <p>
                  <span className="bold--text">Population:</span>{' '}
                  {numeral(country.population).format('0,0')}.
                </p>
                <p>
                  <span className="bold--text">Region:</span> {country.region}.
                </p>
                <p>
                  <span className="bold--text">Sub Region:</span>{' '}
                  {country.subregion}.
                </p>
                <p>
                  <span className="bold--text">Capital:</span> {country.capital}
                  .{' '}
                </p>

                <p className="border--container">
                  {country.borders && (
                    <p className="row">
                      <p className="bold--text border--paragraph col-6">
                        {' '}
                        {country.borders.length >= 2
                          ? 'Border countries:'
                          : 'Border country:'}
                      </p>{' '}
                      <span className="col-2 border--span ">
                        {' '}
                        {country?.borders[0]}
                      </span>
                      {country?.borders[1] && (
                        <span className="col-2 border--span">
                          {country.borders[1]}
                        </span>
                      )}
                      {country?.borders[2] && (
                        <span className="col-2 border--span">
                          {country.borders[2]}
                        </span>
                      )}
                    </p>
                  )}
                </p>
              </div>
              <div className="col-sm-4">
                <p>
                  <span className="bold--text">Top Level Domain:</span>{' '}
                  {country.topLevelDomain}.
                </p>
                <p>
                  <span className="bold--text">Currency:</span>{' '}
                  {country.currencies[0].code}.
                </p>
                <p>
                  <span className="bold--text">Language:</span>{' '}
                  {country.languages[0].name}.
                </p>
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

function SearchedCountry({
  countryApi,
  searchQuery,
  onSetCountryId,
  countryId,
  setSearchQuery,
  onCountrySearchOpen,
}) {
  useEffect(
    function () {
      setSearchQuery(
        prev => prev.split('')?.at(0)?.toUpperCase() + searchQuery.slice(1)
      );
    },
    [searchQuery, setSearchQuery]
  );
  const countryData = countryApi.find(country => country.name === searchQuery);

  return (
    <div onClick={onCountrySearchOpen}>
      {countryData ? (
        <CountryItem
          country={countryData}
          onSetCountryId={onSetCountryId}
          countryId={countryId}
          key={countryData.name}
        />
      ) : (
        <ErrorCOuntry searchQuery={searchQuery} />
      )}
    </div>
  );
}

function OptionRegion({
  countryApi,
  optionRegion,
  onSetCountryId,
  countryId,
  setOptionRegion,
}) {
  return (
    <div className="row">
      {countryApi.map(
        country =>
          country.region === optionRegion && (
            <CountryItem
              country={country}
              onSetCountryId={onSetCountryId}
              countryId={countryId}
              key={country.name}
            />
          )
      )}
    </div>
  );
}
function ErrorCOuntry({searchQuery}) {
  return (
    <div className="my-5">
      No country with the name{' '}
      <span style={{fontWeight: 700, fontSize: '1.25rem'}}>
        {' '}
        "{searchQuery}"
      </span>{' '}
      found.
    </div>
  );
}

export default App;
