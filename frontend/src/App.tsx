import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState("");

  const fetchData = () => {
    if (word.length > 0) {
      fetch("http://localhost:5000/classify/" + word, {
        method: "GET",
        cors: "no-cors",
        application: "application/json",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      fetchData();
    }
  });

  return (
    <>
      <div className="App">
        <h1>React App</h1>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button id="but" onClick={fetchData}>
          Fetch Address
        </button>
        <p>{data}</p> {/* Render the API response */}
      </div>
    </>
  );
}

export default App;
