import { useCallback, useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useCanvas,
} from "../../../../app/hooks";
import { clearCanvas, drawStroke, setCanvasSize } from "../canvasUtils";
import {
  beginStroke,
  updateStroke,
} from "../../../../app/slices/paintapp/currentstroke-slice";
import { endStroke } from "../../../../app/slices/paintapp/sharedActions";
import { Stroke } from "../../../../types";

const WIDTH = 1024;
const HEIGHT = 768;
export const CanvasComponent = () => {
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

  return (
    <div>
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
