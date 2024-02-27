import "./index.css";

export interface PaintAppProps {
  colorComponent: JSX.Element;
  canvasComponent: JSX.Element;
  headerComponent: JSX.Element;
}

export const PaintApp = (paintappProps: PaintAppProps) => {
  return (
    <>
      {paintappProps.headerComponent}
      {paintappProps.colorComponent}
      {paintappProps.canvasComponent}
    </>
  );
};
