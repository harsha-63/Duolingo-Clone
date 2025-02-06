

const PracticePage = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto font-playpen">
      {/* Today's Review Section */}
      <h2 className="text-2xl font-bold mb-4">Today&apos;s Review</h2>
      <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-8 rounded-2xl relative ">
        <span className="bg-gradient-to-r from-green-400 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-md">SUPER</span>
        <h3 className="text-xl font-bold mt-2">Unit Rewind</h3>
        <p className="text-base">Keep your memory fresh with this review of Unit 1!</p>
        <button className="bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg mt-3">UNLOCK</button>
        <img src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/ae8155edc34071375ce1c2e3fbba1194.svg" alt="Demo" className="absolute top-0 right-2 w-32" />
      </div>

      {/* Conversation Section */}
      <h2 className="text-2xl font-bold mt-6 mb-6">Conversation</h2>
      <div className="space-y-4">
        <div className="bg-gray-100 p-6 rounded-2xl flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold">Speak</h3>
              <span className="bg-gradient-to-r from-green-400 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-md">SUPER</span>
            </div>
            <p className="text-base text-gray-600">Improve your speaking skills with these phrases</p>
          </div>
          <img src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/3e81c469cbffa24102aa839524868adf.svg" alt="Microphone" className="w-14" />
        </div>
        <div className="bg-gray-100 p-6 rounded-2xl flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold">Listen</h3>
              <span className="bg-gradient-to-r from-green-400 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-md">SUPER</span>
            </div>
            <p className="text-base text-gray-600">Boost your listening skills with an audio-only session</p>
          </div>
          <img src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/2ebe830fd55a7f2754d371bcd79faf32.svg" alt="Headphones" className="w-16" />
        </div>
      </div>

      {/* Your Collections Section */}
      <h2 className="text-2xl font-bold mt-6 mb-6">Your Collections</h2>
      <div className="bg-gray-100 p-6 rounded-xl flex items-center justify-between relative">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold">Mistakes</h3>
            <span className="bg-gradient-to-r from-green-400 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-md">SUPER</span>
          </div>
          <p className="text-base text-gray-600">Start a personalized lesson to practice your mistakes</p>
        </div>
        <img src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/648b88c8b70ebaaff919e49b0aa54949.svg" alt="Mistakes" className="w-16" />
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">20</span>
      </div>
    </div>
  );
};

export default PracticePage;



