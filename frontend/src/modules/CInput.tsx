import { storeEmotion } from "./storer";

type apicallResult = { color: string; emotions: string[] };
type CInputProps = {
  setEmotion: (emotion: string) => void;
  emotion: string;
  setBacklog: (backlog: string[]) => void;
  backlog: string[];
  apicallResult: apicallResult[];
  setApiResult: (apiResult: apicallResult[]) => void;
};

const CInput: React.FC<CInputProps> = ({
  setEmotion,
  emotion,
  setBacklog,
  backlog,
  apicallResult,
  setApiResult,
}) => {
  const apiPath = "http://localhost:5000/classify/" + emotion;

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      setEmotion(e.currentTarget.value);
      e.currentTarget.value = "";
      setBacklog([emotion, ...backlog]);
      await callApi();
      console.log(await createParams());
      send();
    }
  };

  const callApi = async () => {
    const response = await fetch(apiPath);
    const data = await response.json();
    setApiResult([...apicallResult, data]);
  };

  const createParams = async() => {
    const color = await apicallResult[apicallResult.length - 1]?.color;

    const emotions = await apicallResult[apicallResult.length - 1]?.emotions;
    const request = emotion;
    const time = new Date();
    const user = "user";
    return { color, emotions, request, time, user };
  };

  const send = async () =>{
    const params = await createParams();
    await storeEmotion(params);
  }

  return (
    <input
      type="text"
      id="input"
      placeholder="Write how you feel here"
      className="px-2 py-1 my-2 rounded-full border border-neutral-100 bg-neutral-900 hover:border-neutral-300 hover:bg-neutral-950 text-white w-5/6"
      onChange={(e) => setEmotion(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default CInput;
