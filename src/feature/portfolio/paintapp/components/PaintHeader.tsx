import redoimg from "../icons/redo.png";
import undoimg from "../icons/undo.png";
import saveimg from "../icons/save.png";
import { redo, undo } from "../../../../app/slices/paintapp/historyindex-slice";
import { saveAs } from "file-saver";
import {
  useAppDispatch,
  useAppSelector,
  useCanvas,
} from "../../../../app/hooks";
import { getCanvasImage } from "../canvasUtils";
export const PaintHeader = () => {
  const canvasRef = useCanvas();
  const dispatch = useAppDispatch();
  const strokes = useAppSelector((state) => state.strokes);

  const dowloadImage = async () => {
    if (!canvasRef) return;

    const image = await getCanvasImage(canvasRef.current);

    if (!image) return;

    saveAs(image, "drawing.png");
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
    </div>
  );
};
