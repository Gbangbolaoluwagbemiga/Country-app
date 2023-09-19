import {data} from './data.js';
function App() {
  return (
    <div className="container">
      <Header />
      <SearchBox />
      <CountryBox />
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

function SearchBox() {
  return (
    <div className="search--category">
      <input
        type="text"
        placeholder="Search for a country"
        spellCheck
        className="Input--container"
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

function CountryBox() {
  return (
    <div className="row">
      {data.map(country => (
        <CountryItem country={country} />
      ))}
    </div>
  );
}

function CountryItem({country}) {
  return (
    <div className="col-sm-3 justify gap-3 country--container my-5">
      <img
        className="Country--flag"
        src={country.flags.png}
        alt={country.name}
      />
      <p className="fw-bold fs-3 text-detail mt-5">{country.name}</p>
      <p className="line--adjustment">Population: {country.population}</p>
      <p className="line--adjustment">Region: {country.region}</p>
      <p className="line--adjustment">Capital: {country.capital}</p>
    </div>
  );
}
function IndividualCountry() {
  return (
    <div className="row">
      <div className="col-sm-4">
        <img src="" alt="" />
      </div>
      <div className="col-sm-4">
        <p>Native Name</p>
        <p>Population</p>
        <p>Region</p>
        <p>Sub Region</p>
        <p>Capital</p>

        <p className="row">Borders countries:</p>
      </div>
      <div className="col-sm-4">
        <p>Top Level Domain:</p>
        <p>Currencies:</p>
        <p>Languages:</p>
      </div>
    </div>
  );
}

export default App;
