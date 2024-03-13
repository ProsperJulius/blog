vimport toast, { Toaster } from "react-hot-toast";
import { useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import classNames from "classnames";

export const CapitalCityOptions = () => {
  const answer = useAppSelector((state) => state.capitalCityQuiz.answer);
  const options = useAppSelector((state) => state.capitalCityQuiz.options);
  const [disableSelection, setDisableSelection] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>("");

  useEffect(() => {
    setDisableSelection(false);
    setUserAnswer("");
  }, [answer?.capital]);

  const capitalCitiesOptions = options.map((country) => {
    return (
      <li
        className={classNames({
          clicked: country.capital === userAnswer,
          btn: true,
          correct:userAnswer.length && country.capital === answer?.capital,
          wrong: userAnswer.length && country.capital === userAnswer && country.capital !== answer?.capital,
        })}
        key={country.iso3}
        onClick={() => {
          if (!disableSelection) {
            setDisableSelection(true);
            setUserAnswer(country.capital);
            country.capital === answer?.capital
              ? toast.success("Your answer is correct 😊")
              : toast.error(`The correct answer is ${answer?.capital} 😜`);
          }
        }}
      >
        {country?.capital}
      </li>
    );
  });

  return (
    <div>
      <Toaster />
      <ul>{capitalCitiesOptions}</ul>
    </div>
  );
};
