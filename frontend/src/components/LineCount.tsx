import { useContext } from "react";
import "./LineCount.scss";
import { OptionsContext } from "../context/OptionsProvier";

type Props = {
  text: string;
  invalidLines: Set<number>;
};

function LineCount({ text, invalidLines }: Props) {
  return (
    <div className="lineCountWrapper">
      {Array.from(
        { length: text.split("\n").length },
        (_, index) => index + 1
      ).map((number) => (
        <span className={invalidLines.has(number) ? "error" : ""} key={number}>
          {number}
        </span>
      ))}
    </div>
  );
}

export default LineCount;
