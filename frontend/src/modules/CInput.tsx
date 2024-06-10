const CInput = ({
  setEmotion,
  emotion,
  setBacklog,
  backlog,
  apicallResult,
  setApiResult,
}) => {
    // const apiPath = "http://localhost:5000/classify/"+emotion;
  const apiPath = "http://localhost:5000/classify/test";

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      setEmotion(e.currentTarget.value);
      e.currentTarget.value = "";
      setBacklog([emotion, ...backlog]);
      //   console.log(backlog);
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
