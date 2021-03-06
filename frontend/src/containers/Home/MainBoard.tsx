import React, { useEffect, useState } from "react";
import { useUpdateBestScore } from "requests/Score";

const random = (n: number) => Math.floor(Math.random() * n);

interface Props {
  bestScore: number;
  setbestScore: (n: number) => void;
}

export default function MainBoard({ bestScore, setbestScore }: Props) {
  const [updateBestScore] = useUpdateBestScore();
  const [board, setboard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const fillTwoRandomNumber = () => {
    // firsTime
    if (
      board?.reduce(
        (t, e) => t + e?.reduce((t1: number, v: number) => t1 + v, 0),
        0
      ) === 0
    ) {
      const randomPosition = [random(4), random(4)];
      let tries = 2;
      const InitBoard = board.map((e, ii) => {
        return !(ii === randomPosition[tries - 1])
          ? e
          : e.map((e, i) => {
              if (tries > 0 && i === randomPosition[tries - 1]) {
                tries--;
                return Math.random() > 0.5 ? 2 : 4;
              } else {
                return 0;
              }
            });
      });
      setboard(InitBoard);
    }
  };

  const LeftArrow = () => {
    setboard(
      board.map((e) => {
        return e.map((element, i, array) =>
          array
            // .sort((a, b) => a - b)
            .reduce((tt, e) => {
              if (e > bestScore) {
                setbestScore(e);
              }
              return e === element ? tt + e : tt;
            }, 0)
        );
      })
    );
  };

  const RightArrow = () => {
    setboard(
      board.map((e) => {
        return e.map((element, i, array) =>
          array
            // .sort((a, b) => a - b)
            .reduceRight((tt, e) => {
              if (e > bestScore) {
                setbestScore(e);
              }
              return e === element ? tt + e : tt;
            }, 0)
        );
      })
    );
  };

  useEffect(() => {
    fillTwoRandomNumber();
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 38) {
        // up arrow
      } else if (e.keyCode === 40) {
        // down arrow
      } else if (e.keyCode === 37) {
        // left arrow
        LeftArrow();
      } else if (e.keyCode === 39) {
        // right arrow
        RightArrow();
      }
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    updateBestScore({ variables: { score: bestScore } });
  }, [bestScore]); // eslint-disable-line

  return (
    <div className="h-[500px] border-[5px] border-[#BBADA0] grid grid-cols-4 grid-rows-4 rounded-md">
      {board.map((e) => (
        <>
          {e.map((ee) => (
            <div
              className={`${
                ee === 0 && "!bg-[#CDC1B4]"
              } border-[5px] flex items-center justify-center font-bold text-[55px] text-[#776E65] border-[#BBADA0]`}
            >
              {ee !== 0 ? ee : null}
            </div>
          ))}
        </>
      ))}
    </div>
  );
}
