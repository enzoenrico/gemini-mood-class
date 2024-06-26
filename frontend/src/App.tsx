import { useState } from "react";
import Cards from "./modules/cards";
import CInput from "./modules/CInput";
import AuthButton from "./modules/CauthButton";
import { getEmotions } from "./modules/storer";

function App() {
  const [emotion, setEmotion] = useState<string>(""); //temp emotion state
  const [backlog, setBacklog] = useState<Array<string>>([]); //backlog of all emotions
  const [apicallResult, setApiResult] = useState<
    Array<{ color: string; emotions: string[] }>
  >([]); //has all api returns in its full format

  const getAllDataFromFirestore = () => {
    const data = getEmotions();
    if (typeof data === typeof Array) {
      data.then((res) => {
        setBacklog(res.map((emotion) => emotion.request));
        setApiResult(
          res.map((emotion) => {
            return { color: emotion.color, emotions: emotion.emotions };
          })
        );
      });
    } else {
      data.then((res) => {
        console.log("Error getting data: \n");
        console.log(res);
      });
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-neutral-900 flex items-center justify-center">
        <div
          id="main"
          className="w-5/6 h-5/6 rounded-md bg-neutral-800  flex flex-col justify-between"
        >
          <div className="flex items-start p-2 justify-between">
            <h2 className="text-4xl text-neutral-100 font-bold text-wrap w-2/5 px-5">
              How are you feeling today?
            </h2>
            <AuthButton />
          </div>
          <div className="flex flex-1 flex-col items-center md:items-stretch sm:items-center sm:min-w-full overflow-y-auto scrollbar">
            <div className="px-10 md:grid lg:grid-cols-3 md:grid-cols-2 gap-2 w-full flex items-stretch flex-col">
              {backlog.map((emotion, i) => {
                const index = backlog.length - i - 1;
                return (
                  <Cards
                    key={index}
                    emotion={emotion}
                    // color={"#0014DC"}
                    color={
                      apicallResult[index]
                        ? apicallResult[index].color
                        : "#FFFFFF"
                    }
                    // apiResult={["Sad", "among us", "pissed off"]}
                    apiResult={
                      apicallResult[index]
                        ? apicallResult[index].emotions
                        : ["NO DATA"]
                    }
                    dateOfCreation={
                      apicallResult[index]
                        ? apicallResult[index].time
                        : "NO DATA"
                    }
                  />
                );
              })}
            </div>
          </div>
          <div className="flex w-full items-center justify-evenly">
            <CInput
              setEmotion={setEmotion}
              apicallResult={apicallResult}
              setApiResult={setApiResult}
              backlog={backlog}
              setBacklog={setBacklog}
              emotion={emotion}
            />
            <button
              className="rounded-md bg-blue-400 px-2 border border-blue-500 h-2/4 text-white"
              onClick={getAllDataFromFirestore}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
