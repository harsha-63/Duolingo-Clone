// import { useContext } from "react";
// // import { Card, CardContent } from "../components/ui/Card"; // Adjust path if needed
// import { Flame, Zap, Medal } from "lucide-react";
// import { AuthContext } from "../Context/AuthContext";

// const UserProfile = () => {
//   const { user } = useContext(AuthContext); // Getting user from context

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <div className="bg-gray-100">
//         <div className="p-6">
//           {/* Profile Header */}
//           <div className="flex items-start gap-4">
//             <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
//               <div className="text-white text-2xl">{user.name.charAt(0)}</div>
//             </div>
//             <div className="flex-1">
//               <h1 className="text-2xl font-bold">{user.name}</h1>
//               <p className="text-gray-500">@{user.username}</p>
//               <p className="text-gray-500 text-sm">Joined {user.joinDate}</p>
//             </div>
//           </div>

//           {/* Follow Stats */}
//           <div className="flex gap-4 mt-4">
//             <p className="text-gray-600">
//               <span className="font-bold">{user.following}</span> Following
//             </p>
//             <p className="text-gray-600">
//               <span className="font-bold">{user.followers}</span> Followers
//             </p>
//           </div>

//           {/* Statistics Section */}
//           <div className="mt-8">
//             <h2 className="text-xl font-bold mb-4">Statistics</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="p-4">
//                 <div className="flex items-center gap-3">
//                   <Flame className="w-6 h-6 text-orange-500" />
//                   <div>
//                     <div className="text-xl font-bold">{user.streak}</div>
//                     <div className="text-gray-500">Day streak</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4">
//                 <div className="flex items-center gap-3">
//                   <Zap className="w-6 h-6 text-yellow-500" />
//                   <div>
//                     <div className="text-xl font-bold">{user.xp}</div>
//                     <div className="text-gray-500">Total XP</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white font-bold">S</div>
//                   <div>
//                     <div className="text-xl font-bold">sapphire</div>
//                     <div className="text-gray-500">Current league</div>
//                     <div className="text-xs text-blue-500 mt-1">WEEK 1</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4">
//                 <div className="flex items-center gap-3">
//                   <Medal className="w-6 h-6 text-yellow-500" />
//                   <div>
//                     <div className="text-xl font-bold">{user.stats.topFinishes}</div>
//                     <div className="text-gray-500">Top 3 finishes</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Achievements Section Header */}
//           <div className="mt-8 flex justify-between items-center">
//             <h2 className="text-xl font-bold">Achievements</h2>
//             <button className="text-blue-500 hover:text-blue-600">
//               VIEW ALL
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;





const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export default Profile
