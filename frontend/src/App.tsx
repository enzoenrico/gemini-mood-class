import { useState } from "react";

function App() {
  const [emotion, setEmotion] = useState("");

  const [backlog, setBacklog] = useState<Array<string>>([]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(emotion);
      setEmotion(emotion);
      setBacklog([...backlog, emotion]);
      e.currentTarget.value = "";
      await callApi();
      return;
    }
  };

  const [apicallResult, setApiResult] = useState<Array<string>>([]);
  const [colorRecieved, setColor] = useState<string>("");

  const callApi = async () => {
    const response = await fetch("http://localhost:5000/classify/" + emotion);
    const data = await response.json();
    setApiResult(data.emotions);
    setColor(data.color);
  };

  return (
    <>
      <div className="w-screen h-screen bg-neutral-900 flex items-center justify-center">
        <div
          id="main"
          className="w-5/6 h-5/6 rounded-md bg-neutral-800  flex flex-col justify-between"
        >
          <h2 className="text-5xl text-neutral-100 font-bold text-wrap w-2/5 p-10">
            How are you feeling today?
          </h2>
          <div className="flex flex-1 flex-col justify-start overflow-y-auto">
            <div className="px-10 grid grid-cols-3 gap-4 ">
              {backlog.map((emotion, index) => (
                <div key={index}>
                  <div
                    className="p-2 px-3 m-2 rounded-full bg-neutral-900 text-white text-center break-words"
                    style={
                      // add color element here with js
                      { maxWidth: "100%" }
                    }
                  >
                    <p>{emotion}</p>
                    <div className="flex flex-row items-center justify-center gap-1">
                      {apicallResult.map((e, index) => (
                        <h3
                          className="w-fit rounded-full px-2"
                          key={index}
                          style={{ backgroundColor: colorRecieved }}
                        >
                          {e}
                        </h3>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <input
              type="text"
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
