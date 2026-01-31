// import React , {useEffect, useState, useRef }from 'react'

// const Game : React.FC = () => {
//   const [color ,setColor] = useState<"green" | "red">('green');  
//   const [score, setScore ] = useState(0);
//   const [result ,setResult] = useState<"win" | "lose" | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   let timerID;
//   const startGame = () => {
//         setIsPlaying(true);
//         setScore(0);
//         setResult(null);
//         switchLight();
//   }
//   const stopGame = (status : "win" | "lose") =>{
//      setIsPlaying(false);
//      setResult(status);
//      if(intervalRef.current) clearTimeout(intervalRef.current);
//   }
//   const switchLight = () =>{
//       setColor(Math.random() < 0.5 ?"red":"green");
//       const timeout = Math.floor(500 + Math.random()*500);
//       intervalRef.current = setTimeout(switchLight,timeout);
//   }
//   const colorMap ={
//      green :'bg-green-600',
//      red :'bg-red-600',
//   }
//   useEffect(() =>{
//     return(() => clearInterval(timerID));
//   });

//   const handleClick = () =>{
//        setInterval(() =>{
//        setColor(prev => prev ==='green'?'red':'green'); 
//       },1500); 
//   }

//   const handleColor = () =>{
//         if(color === 'green'){
//              setScore(prev => prev+10);
//         }
//         if(score === 100){

//         }
//   }

//   return (
//     <div className='min-h-screen text-center bg-gray-400'>
//         <h1>Squid Game</h1>
//         <div className={`h-24 w-24 rounded-full border-2 ${colorMap[color]}`}
//                   onClick={handleColor}
//                  >

//         </div>
//         {
//            score>0 ?(
//             <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                      className="h-full bg-blue-600 transition-all duration-300"
//                      style={{ width: `${score}%` }}
//                  />
//               </div>
//             ):(
//                  <button onClick={handleClick}> Play </button>
//             )
//         }
//     </div>
//   )
// }

// export default  Game;
