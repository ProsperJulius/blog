import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addOptions } from "../../../app/slices/quiz/quiz-slice";
import { CapitalCityOptions } from "./capital-city-opitions";
import "./index.css";

export const CapitalCityQuizApp = () => {
  const dispatch = useAppDispatch();
  const answer = useAppSelector((state) => state.capitalCityQuiz.answer);

  const playAgain = useCallback(()=>{

    dispatch(addOptions());
  },[dispatch]);
  return (
    <div className="quiz-container">
      <div className="quiz-block">
        <h3 className="text-primary">What is the Capital city of {answer?.name} 🤔</h3>

        <CapitalCityOptions />

        <button
          className="btn btn-primary"
          onClick={playAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
