import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

function Dashboard() {
  return (
    <div>
      <Button color="primary">Your Dashboard</Button>
      <Link to="/create/poll">Create Poll</Link>
    </div>
  );
}

export default Dashboard;




// import React from 'react';
// import { Link } from 'react-router-dom';


// function Dashboard() {
//   return (
//     <div className>
//       <nav class="bg-gray-800">
//         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div class="flex items-center justify-between h-16">
//             <div class="flex items-center">
//               <div class="flex-shrink-0">
//                 <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg" alt="Workflow logo"/>
//               </div>
//               <div class="hidden md:block">
//             <div class="ml-10 flex items-baseline space-x-4">
//               <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Dashboard</Link>

//               <Link to="/create/poll" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Team</Link>
//             </div>
//           </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Dashboard;

