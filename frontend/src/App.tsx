import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState("");

  const but = document.querySelector<HTMLButtonElement>("#but");

  const fetchData = async ():Promise<object> => {
    if (word.length > 0) {
      fetch("http://localhost:5000/classify/" + word, {
        method: "GET",
        cors: "no-cors",
        application: "application/json",
      })
        .then((res) => res.json())
        .then((data: JSON) => {
          console.log(data);
          setData(data["color"]);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };

  const setBut = () => {
    console.log("data:" + data)
    but.innerText = data;
    but.style.backgroundColor = data;
  };

  const handleFetch = () => {
    fetchData()
  };

  return (
    <>
      <div className="App">
        <h1>React App</h1>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button id="but" onClick={handleFetch}>
          Fetch Address
        </button>
        <p>{data}</p> {/* Render the API response */}
      </div>
    </>
  );
}

export default App;
