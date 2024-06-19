const Cards = ({
  emotion,
  color,
  apiResult,
  dateOfCreation,
}: {
  emotion: string;
  color: string;
  apiResult: string[];
}) => {
  const isLightColor = (): boolean => {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };
  // const currentDate = new Date().toLocaleDateString();

  return (
    <div
      className={`flex flex-col items-center justify-center px-2 py-1 bg-neutral-900 text-white rounded-md max-w-xs sm:w-full h-fit text-wrap`}
    >
      {emotion}
      <div className="flex md:flex-row flex-col md:gap-2">
        {apiResult.map((apiEmotion, index) => (
          <div
            key={index}
            className={`px-2 rounded-md md:w-fit w-full my-2 transition-all ${
              isLightColor() ? "text-black" : "text-white"
            }`}
            style={{ backgroundColor: color }}
          >
            {apiEmotion}
          </div>
        ))}
      </div>
      <div className="font-thin text-slate-100">{dateOfCreation}</div>
    </div>
  );
};

export default Cards;
