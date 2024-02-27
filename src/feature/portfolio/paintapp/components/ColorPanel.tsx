import { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { setStrokeColor } from "../../../../app/slices/paintapp/currentstroke-slice";

const COLORS = [
  "#000000",
  "#808080",
  "#c0c0c0",
  "#ffffff",
  "#800000",
  "#ff0000",
  "#808000",
  "#ffff00",
  "#008000",
  "#00ff00",
  "#008080",
  "#00ffff",
  "#000080",
  "#0000ff",
  "#800080",
  "#ff00ff",
  "#808040",
  "#ffff80",
  "#004040",
  "#00ff80",
  "#0080ff",
  "#80ffff",
  "#004080",
  "#8080ff",
  "#8000ff",
  "#ff0080",
  "#804000",
  "#ff8040",
];

export const ColorPanel = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [currentColor, setColor] = useState<string>("black");

  const onColorChange = (color: string) => {
    setColor(color);
    dispatch(setStrokeColor(color));
  };

  return (
    <>
      <div className="color-section">
        <div className="current-color-container">
          <div
            className="current-color"
            style={{ background: currentColor }}
          ></div>
        </div>

        <div className="colors-container">
          <div className="colors">
            {COLORS.map((color) => (
              <div
                key={color}
                onClick={() => onColorChange(color)}
                className="color"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
        <p className="text-muted text-center" style={{ marginTop: "13px" }}>
          Colors
        </p>
      </div>
    </>
  );
};
