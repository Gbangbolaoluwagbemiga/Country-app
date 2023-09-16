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
    <ul>
      {data.map(country => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

function CountryItem({country}) {
  return (
    <>
      <li>{country.name}</li>
    </>
  );
}

export default App;
