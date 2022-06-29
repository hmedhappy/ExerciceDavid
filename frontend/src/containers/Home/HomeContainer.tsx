import { useState } from "react";
import MainBoard from "./MainBoard";

const HomeContainer = () => {
  //   const {data} = useGetBestScore();
  //   const [bestScore, setbestScore] = useState(data?.bestscore);
  const [bestScore, setbestScore] = useState(0);
  return (
    <div className="w-full h-[100vh] bg-[#FAF8EF]">
      <div className="w-[500px] m-auto">
        <div className="header  w-[500px] flex justify-between relative ">
          <div className="h-full py-8 w-full">
            <p className="text-[70px] font-bold text-[#776E65]">2048</p>
            <div className="flex justify-between w-full">
              <p className="text-[18px] text-[#776E65] font-medium">
                Join the tiles, get to <span className="font-bold">2048!</span>{" "}
                <br />{" "}
                <span className="font-bold hover:underline cursor-pointer">
                  How to play →
                </span>
              </p>
              <button className="text-[white] font-bold w-[130px] h-[40px] bg-[#8F7A66] hover:bg-[#8F7A667d] px-3 py-2 rounded-md">
                New Game
              </button>
            </div>
          </div>
          <div className="flex gap-3 absolute top-4 right-0 ">
            <div className="flex items-center rounded-md justify-center flex-col text-[#776E65] bg-[#B1A498]  h-[55px] w-[80px] ">
              <p className="text-[white] font-bold text-[13px]">SCORE</p>
              <p className="text-[white] font-bold text-[25px]">12</p>
            </div>
            <div className="flex items-center rounded-md justify-center  flex-col text-[#776E65] bg-[#B1A498]  h-[55px] w-[80px]">
              <p className="text-[white] font-bold text-[13px]">BEST</p>
              <p className="text-[white] font-bold text-[25px]">12</p>
            </div>
          </div>
        </div>
        <MainBoard bestScore={bestScore} setbestScore={setbestScore} />
      </div>
    </div>
  );
};

export default HomeContainer;
