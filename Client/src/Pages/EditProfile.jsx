import { useContext, useState } from 'react';
import Sidebar from '../Components/UserComponents/Sidebar';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { user, updateProfile, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleImageSelect = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  const handleSave = async () => {
    if (!selectedImage) {
      console.error("No image selected!");
      return;
     
    }
  
    try {
      const updatedUser = await updateProfile(selectedImage);
  
      if (updatedUser) {
        setUser(updatedUser); 
        console.log("Profile updated successfully:", updatedUser);
        navigate("/profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };
  

  return (
    <div className="flex h-screen max-md:flex-col">
      <div className="w-1/6 border-r border-gray-300 px-6 py-4 max-md:w-full max-md:fixed max-md:bottom-0 max-md:left-0 max-md:z-50 max-md:bg-white">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 mx-16 mb-16">
        <h1 className="text-4xl font-semibold mb-10 font-playpen text-center">
          Edit Profile
        </h1>

        <div className="flex justify-center mb-8">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-green-500 shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[
            "https://i.pinimg.com/736x/44/a7/38/44a73814fec0205473407264fbfd1c6f.jpg",
            "https://i.pinimg.com/736x/98/ad/e1/98ade11a55b57c0600de7efba606ba0c.jpg",
            "https://i.pinimg.com/736x/0b/56/29/0b5629f6e72652709e3e5bd5eb94a4f8.jpg",
            "https://i.pinimg.com/736x/b4/6c/70/b46c70289d120c83fe65b06c10f25ade.jpg",
            "https://i.pinimg.com/736x/7d/47/bd/7d47bdd578c64dcff1a34e402f34d90c.jpg",
          ].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Profile ${index + 1}`}
              className={`w-52 h-48 object-cover rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 ${
                selectedImage === src ? "ring-4 ring-green-500" : ""
              }`}
              onClick={() => handleImageSelect(src)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button 
            onClick={handleSave} 
            className="bg-lime-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-lime-600 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

