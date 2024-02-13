import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector, useCanvas } from "../../../app/hooks";
import {
  beginStroke,
  updateStroke,
} from "../../../app/slices/paintapp/currentstroke-slice";
import { ColorPanel } from "./components/ColorPanel";
import "./index.css";
import {
  clearCanvas,
  drawStroke,
  getCanvasImage,
  setCanvasSize,
} from "./canvasUtils";
import { Stroke } from "../../../types";
import { endStroke } from "../../../app/slices/paintapp/sharedActions";
import { redo, undo } from "../../../app/slices/paintapp/historyindex-slice";
import { saveAs } from "file-saver";
import redoimg from "./icons/redo.png";
import undoimg from "./icons/undo.png";
import saveimg from "./icons/save.png";

const WIDTH = 1024;
const HEIGHT = 768;
export const PaintApp = () => {
  const canvasRef = useCanvas();
  const currentStroke: Stroke = useAppSelector((state) => state.currentStroke);
  const historyIndex = useAppSelector((state) => state.historyIndex);
  const strokes = useAppSelector((state) => state.strokes);

  const getCanvasWithContext = useCallback(
    (canvas = canvasRef.current) => {
      return { canvas, context: canvas?.getContext("2d") };
    },
    [canvasRef]
  );
  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) return;

    requestAnimationFrame(() => {
      const { color, points } = currentStroke;

      drawStroke(context, points, color);
    });
  }, [getCanvasWithContext, currentStroke]);

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) return;

    setCanvasSize(canvas, WIDTH, HEIGHT);
    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle = "black";

    clearCanvas(canvas);
  }, [getCanvasWithContext]);

  const dispatch = useAppDispatch();

  const isDrawing = useAppSelector(
    (state) => !!state.currentStroke.points.length
  );

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX: x, offsetY: y } = nativeEvent;
    dispatch(beginStroke({ x, y }));
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX: x, offsetY: y } = nativeEvent;

    dispatch(updateStroke({ x, y }));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({ historyIndex, stroke: currentStroke }));
    }
  };

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!context || !canvas) return;

    requestAnimationFrame(() => {
      clearCanvas(canvas);
      strokes.slice(0, strokes.length - historyIndex).forEach((stroke) => {
        drawStroke(context, stroke.points, stroke.color);
      });
    });
  }, [getCanvasWithContext, historyIndex, strokes]);

  const dowloadImage = async () => {
    if (!canvasRef) return;

    const image = await getCanvasImage(canvasRef.current);

    if (!image) return;

    saveAs(image,'drawing.png');
  };

  return (
    <div>
      <div className="paintapp-header">
        <ul>
          <li>
            <a href="#" style={{ lineHeight: "2.2" }}>
              {" "}
              File
            </a>
          </li>
          <li>
            <a href="#" style={{ lineHeight: "2.2" }}>
              Edit
            </a>
          </li>
          <li>
            {" "}
            <a href="#">
              {" "}
              <img
                src={saveimg}
                style={{ height: "19px" }}
                alt="save"
                onClick={dowloadImage}
              />
            </a>
          </li>
          <li>
            <a href="#" onClick={() => dispatch(undo(strokes.length))}>
              <img src={undoimg} style={{ height: "22px" }} alt="undo" />
            </a>
          </li>
          <li>
            <a href="#" onClick={() => dispatch(redo())}>
              <img src={redoimg} style={{ height: "22px" }} alt="redo" />
            </a>
          </li>
        </ul>
      </div>

      <div className="color-section">
        <div className="current-color-container">
          <div
            className="current-color"
            style={{ background: currentStroke.color }}
          ></div>
        </div>

        <div className="colors-container">
          <ColorPanel />
          <p className="text-muted text-center" style={{ marginTop: "13px" }}>
            Colors
          </p>
        </div>
      </div>

      <div className="canvas-container">
        <div></div>
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseOut={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
        <div></div>
      </div>
    </div>
  );
};
