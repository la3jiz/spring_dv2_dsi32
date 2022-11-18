import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';

import { Stacked, SparkLine } from '../components';
import { earningData, SparklineAreaData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Overview = () => {
  const { currentColor, currentMode } = useStateContext();


  return (
    
   <>
{/* <div className="tk-blob" style={{style:"--fill: #56cbb9;"}}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.5 297.7">
    <path d="M286.9 54.2c42.7 34.9 89.4 85.3 84.2 130.4-5.2 45.1-62.1 84.7-118 102.3S142.3 300 94.8 278C47.2 256 6.9 216.6.8 173.9S22.7 85.2 56 52.4C89.4 19.6 127.9.1 166.6 0s77.6 19.2 120.3 54.2z"></path>
  </svg>
</div> */}
</>
    // <div className="mt-24">
    //   <div className="flex flex-wrap lg:flex-nowrap justify-center ">
 
    //     <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
    //       {earningData.map((item) => (
    //         <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
    //           <button
    //             type="button"
    //             style={{ color: item.iconColor, backgroundColor: item.iconBg }}
    //             className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
    //           >
    //             {item.icon}
    //           </button>
    //           <p className="mt-3">
    //             <span className="text-lg font-semibold">{item.amount}</span>
    //             <span className={`text-sm text-${item.pcColor} ml-2`}>
    //               {item.percentage}
    //             </span>
    //           </p>
    //           <p className="text-sm text-gray-400  mt-1">{item.title}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   <div className="flex gap-10 flex-wrap justify-center">
    //     <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
    //       <div className="flex justify-between">
    //         <p className="font-semibold text-xl">Updates</p>
    //         <div className="flex items-center gap-4">
    //           <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
    //             <span>
    //               <GoPrimitiveDot />
    //             </span>
    //             <span>Expense</span>
    //           </p>
    //           <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
    //             <span>
    //               <GoPrimitiveDot />
    //             </span>
    //             <span>Budget</span>
    //           </p>
    //         </div>
    //       </div>
    //       <div className="mt-10 flex gap-10 flex-wrap justify-center">
    //         <div className=" border-r-1 border-color m-4 pr-10">
    //           <div>
    //             <p>
    //               <span className="text-3xl font-semibold">$93,438</span>
    //               <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
    //                 23%
    //               </span>
    //             </p>
    //             <p className="text-gray-500 mt-1">Budget</p>
    //           </div>
    //           <div className="mt-8">
    //             <p className="text-3xl font-semibold">$48,487</p>

    //             <p className="text-gray-500 mt-1">Expense</p>
    //           </div>

    //           <div className="mt-5">
    //             <SparkLine currentColor={currentColor} id="line-sparkLine" type="Line" height="80px" width="250px" data={SparklineAreaData} color={currentColor} />
    //           </div>

    //         </div>
    //         <div>
    //           <Stacked currentMode={currentMode} width="320px" height="360px" />
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //        <div className=" rounded-2xl md:w-400 p-4 m-3"  style={{ backgroundColor: currentColor }} >
    //       <div className="flex justify-between items-center ">
    //           <p className="font-semibold text-white text-2xl">Earnings</p>

    //           <div>
    //             <p className="text-2xl text-white font-semibold mt-8">$63,448.78</p>
    //             <p className="text-gray-200">Monthly revenue</p>
    //           </div>
    //         </div>
    //       </div>

   
    //     </div>
    //   </div>

 
    // </div>
    // <h1>overviow</h1>
  );
};

export default Overview;
