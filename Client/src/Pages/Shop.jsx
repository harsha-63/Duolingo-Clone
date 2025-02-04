import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const Shop = () => {
  const {user}=useContext(AuthContext);
  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 sm:p-10 shadow-lg h-auto max-md:mt-9">
        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">SUPER</span>
        <h2 className="text-xl font-bold mt-2">Start 2025 with 60% off!</h2>
        <p className="text-sm">Savings apply to the 12-month plan.</p>
        <p className="text-sm mt-1">
          Offer ends in <span className="text-green-300 font-semibold">69h 8m</span>
        </p>
        <button className="mt-4 w-full sm:w-auto bg-white text-black font-semibold py-2 rounded-lg shadow">
          GET 60% OFF
        </button>
      </div>

      {/* Product Section */}
      <div className="mt-6 ">
        <h3 className="text-2xl font-playpen font-semibold mb-6">Hearts</h3>

        {/* Refill Hearts */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mt-3 font-playpen">
          <div className="flex items-center gap-3">
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/547ffcf0e6256af421ad1a32c26b8f1a.svg"
              alt="heart"
              className="w-24 h-24"
            />
            <div>
              <h4 className="font-semibold text-lg">Refill Hearts</h4>
              <p className="text-base text-gray-600">
                Get full hearts so you can worry less about making mistakes in a lesson
              </p>
            </div>
          </div>
          <button className=" bg-gray-300 text-gray-500 px-4 py-1 rounded-lg cursor-not-allowed flex items-center">
  {user.life === 5 ? (
    "FULL"
  ) : (
    <>
      Get for: 350
  <img 
    src="https://d35aaqx5ub95lt.cloudfront.net/vendor/45c14e05be9c1af1d7d0b54c6eed7eee.svg" 
    alt="" 
    className="w-6 h-6 ml-2"
  />
    </>
  )}
</button>

        </div>

        {/* Unlimited Hearts */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mt-3 font-playpen">
          <div className="flex items-center gap-3">
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/4f3842c690acf9bf0d4b06e6ab2fffcf.svg"
              alt="Unlimited Hearts"
              className="w-24 h-24"
            />
            <div>
              <h4 className="font-semibold text-lg">Unlimited Hearts</h4>
              <p className="text-base text-gray-600">Never run out of hearts with Super!</p>
            </div>
          </div>
          <button className="bg-purple-600 text-white px-4 py-1 rounded-lg">
            GET SUPER
          </button>
        </div>
      </div>

      {/* Power-Ups Section */}
      <div className="mt-6 max-md:mb-16">
        <h3 className="text-2xl font-playpen font-semibold mb-6">Power-Ups</h3>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <img
            src="/path-to-uploaded-image/Screenshot 2025-01-29 132628.png"
            alt="Power-Ups"
            className="w-full rounded-lg"
          />
          <div>
            <h4 className="font-semibold text-lg">Unlimited Hearts</h4>
            <p className="text-base text-gray-600">Never run out of hearts with Super!</p>
          </div>
          <button className="bg-purple-600 text-white px-4 py-1 rounded-lg">
            GET SUPER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;


