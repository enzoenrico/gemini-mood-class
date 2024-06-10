import { useState } from "react";
import react from "@vitejs/plugin-react-swc";
import Cards from "./modules/cards";
import CInput from "./modules/input";

function App() {

    document.addEventListener("load", () =>{
    console.log("loaded")
    document.querySelector("#input")?.focus();
    })

  const [emotion, setEmotion] = useState(""); //temp emotion state

  const [backlog, setBacklog] = useState<Array<string>>([]); //backlog of all emotions

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEmotion(emotion);
      setBacklog([...backlog, emotion]);
      e.currentTarget.value = "";
      console.log(backlog);
      await callApi();
    }
  };

  const [apicallResult, setApiResult] = useState<Array<string>>([]); //has all api returns in it's full format
  const [currResponse, setCurrResponse] = useState<string>(""); //current response from api

  const callApi = async () => {
    // const response = await fetch("http://localhost:5000/classify/" + emotion);
    const response = await fetch("http://localhost:5000/classify/test");
    const data = await response.json();
    setCurrResponse(data);
    setApiResult([...apicallResult, currResponse]);
  };

  return (
    <>
      <div className="w-screen h-screen bg-neutral-900 flex items-center justify-center">
        <div
          id="main"
          className="w-5/6 h-5/6 rounded-md bg-neutral-800  flex flex-col justify-between"
        >
          <h2 className="text-4xl text-neutral-100 font-bold text-wrap w-2/5 p-10">
            How are you feeling today?
          </h2>
          <div className="flex flex-1 flex-col justify-start md:items-stretch sm:items-center sm:min-w-full overflow-y-auto">
            <div className="px-10 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 ">
              {backlog.map((emotion, index) => (
                <Cards
                  key={index}
                  emotion={emotion}
                  colors={"#0014DC"}
                  apiResult={["Sad", "among us", "pissed off"]}
                />
              ))}
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <input
              type="text"
              id="input"
              placeholder="Write how you feel here"
              className="px-2 py-1 my-2 rounded-full border border-neutral-100 bg-neutral-900 hover:border-neutral-300 hover:bg-neutral-950 text-white w-5/6"
              onChange={(e) => setEmotion(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
