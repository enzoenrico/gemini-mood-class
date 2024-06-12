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
    }
  };

  const callApi = async () => {
    const response = await fetch(apiPath);
    const data = await response.json();
    setApiResult([...apicallResult, data]);
  };

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

