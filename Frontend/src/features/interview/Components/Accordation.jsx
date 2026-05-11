
// import  { useState } from 'react'
// import { motion } from "framer-motion";
// const Accordation = ({description, name}) => {
//      const [openJD, setJD] = useState(false);
//   return (
//       <div>
//          <div
//               onClick={() => setJD(!openJD)}
//               className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-700 transition"
//             >
//               <h2 className="text-white font-medium">{name}</h2>
//               <motion.span
//                 animate={{ rotate: openJD ? 0 : 180 }}
//                 transition={{ duration: 0.3 }}
//                 className="text-white text-lg"
//               >
//                    <svg
//           className="w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 "
//           fill="none" viewBox="0 0 16 16"
//         >
//           <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//               </motion.span>
//             </div>

//             {/* Content--jobDescription */} 
//             <motion.div
//               initial={false}
//               animate={{
//                 height: openJD ? "auto" : 0,
//                 opacity: openJD ? 1 : 0,
//               }}
//               transition={{
//                 height: { duration: 0.4, ease: "easeInOut" },
//                 opacity: { duration: 0.4, ease: "easeInOut" },
//               }}
//               className="overflow-hidden"
//             >
//               <motion.div
//                 initial={{ y: -10 }}
//                 animate={{ y: openJD ? 0 : -10 }}
//                 transition={{ duration: 0.3 }}
//                 className="p-4 border-t border-gray-700 text-gray-300"
//               >
//                 {description}
//               </motion.div>
//             </motion.div>
//       </div>
           
//   )
// }

// export default Accordation