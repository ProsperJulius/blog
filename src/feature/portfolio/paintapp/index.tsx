import { Button, Modal } from "react-bootstrap";
import "./index.css";
import { useEffect, useState } from "react";
import { useDeviceType } from "../../../app/hooks";

export interface PaintAppProps {
  colorComponent: JSX.Element;
  canvasComponent: JSX.Element;
  headerComponent: JSX.Element;
}

export const PaintApp = (paintappProps: PaintAppProps) => {
  const { isMobile } = useDeviceType();
  const [show, setShow] = useState(isMobile);
  useEffect(() => {
    setShow(isMobile);
  }, [isMobile]);

  const handleClose = () => setShow(false);
  const modal = isMobile ? (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Seems like you are viewing this on a mobile device
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          For a good user experience consider using a large screen for this
          page!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : null;

  return (
    <>
      {modal}
      {paintappProps.headerComponent}
      {paintappProps.colorComponent}
      {paintappProps.canvasComponent}
    </>
  );
};
