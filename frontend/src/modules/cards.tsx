const Cards = ({
  emotion,
  color,
  apiResult,
}: {
  emotion: string;
  color: string;
  apiResult: string[];
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center px-2 py-1 bg-neutral-900 text-white rounded-md max-w-xs`}
    >
      {emotion}
      <div className="lg:flex lg:flex-row lg:justify-evenly gap-2 sm:flex-col">
        {apiResult.map((apiEmotion, index) => (
          <div
            key={index}
            className="px-2 rounded-md w-fit sm:w-max my-2 bg-blue-200 border border-blue-400 text-blue-900"
            style={{ backgroundColor: color }}
          >
            {apiEmotion}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
