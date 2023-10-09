import {useEffect, useState} from 'react';
import {data} from './data.js';
import numeral from 'numeral';
function App() {
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [optionRegion, setOptionRegion] = useState('');
  const [countryApi, setCountryApi] = useState(data);

  function handleCountryOpen() {
    setCountryOpen(prev => !prev);
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
        <SearchBox setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      ) : (
        ''
      )}
      {searchQuery === '' && (
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
      {searchQuery !== '' && (
        <SearchedCountry
          countryApi={countryApi}
          searchQuery={searchQuery}
          onSetCountryId={handleCountryId}
          countryId={countryId}
          setSearchQuery={setSearchQuery}
        />
      )}
      {/* {searchQuery !== '' && <div>{countryApi.}</div>} */}
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

function SearchBox({setSearchQuery, searchQuery}) {
  useEffect(
    function () {
      // console.log('Height');
    },
    [searchQuery]
  );
  return (
    <div className="search--category">
      <input
        type="text"
        placeholder="Search for a country"
        spellCheck
        className="Input--container"
        onChange={e => setSearchQuery(e.target.value)}
      />
      {/* <i className="fa-solid fa-magnifying-glass"></i> */}
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
            <div className="row m-5">
              <div className="col-sm-4">
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="Country--flag"
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

                <p>
                  {country.borders && (
                    <>
                      <span className="bold--text"> Borders countries:</span>{' '}
                      {country?.borders[0]},{country?.borders[1]}.
                    </>
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
    <div>
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
function ErrorCOuntry({searchQuery}) {
  return <div>No country with the name {searchQuery} found</div>;
}

export default App;
