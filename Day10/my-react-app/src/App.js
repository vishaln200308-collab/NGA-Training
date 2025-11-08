import logo from './logo.svg';
import './App.css';
import Welcome from './components/welcome';

function App() {

  const user = "Guest"; // Define the user variable
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.

          <h1> Functional Component demo </h1>
          <Welcome name = "Captain America " />
          <Welcome name = "Spider Man " />
          <Welcome name = "Batman " />

        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <div>
        <h1>Welcome, {user} </h1>
        <p> This is JSX Demo </p>
        <p>JSX shpuld retuen single parent element</p>
        <p>JSX expression should go in between { } </p>
        <p>Attribute in JSX uses camel casing (className, onClick)</p>
      </div>
    </div>
  );
}

export default App;
