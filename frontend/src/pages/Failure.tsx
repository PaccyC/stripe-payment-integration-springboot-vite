import { useNavigate } from "react-router-dom";

function Failure() {
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center text-red-600">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-4xl font-bold">Failure!</h1>
        <p className="text-black whitespace-pre-line">
          {queryParams.toString().split("&").join("\n")}
        </p>
        <button
          onClick={onButtonClick}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default Failure;
