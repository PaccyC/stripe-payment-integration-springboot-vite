import { useNavigate } from "react-router-dom";

function Success() {
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 text-green-600 px-4">
      <div className="flex flex-col items-center space-y-3 bg-white p-8 rounded shadow-md">
        <h1 className="text-4xl font-bold">Success!</h1>
        <p className="text-black whitespace-pre-line text-center">
          {queryParams.toString().split("&").join("\n")}
        </p>
        <button
          onClick={onButtonClick}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default Success;
