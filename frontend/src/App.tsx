import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    // Make the API call here
    fetch("http://localhost:5000/classify/prompts", {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json",
      // Add any additional headers if needed
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>React App</h1>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <p>{word.split("a").join("A")}</p>
          <p>{data}</p> {/* Render the API response */}
        </header>
      </div>
    </>
  );
}

export default App;
