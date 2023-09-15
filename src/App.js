function App() {
  return (
    <div className="container">
      <header className="nav--bar my-5">
        <h2>Where in the world?</h2>
        <p>Dark mode</p>
      </header>
      <main>
        <div className="search--category">
          <input
            type="text"
            placeholder="Search for a country"
            spellCheck
            className="Input--container"
          />
          <select className="Input--container" value="">
            <option disabled selected value="">
              Filter by Region
            </option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Ocenia</option>
          </select>
        </div>
      </main>
    </div>
  );
}

export default App;
