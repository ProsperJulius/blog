import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDisptach } from "./store";
import { CanvasContext } from "../feature/portfolio/paintapp/CanvasContext";
import { useContext, useEffect, useState } from "react";

export const useAppDispatch = () => useDispatch<AppDisptach>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useCanvas = () => useContext(CanvasContext);
export const useDeviceType = () => {

    const [width, setWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWidth(window.innerWidth);
    }


    useEffect(() => {

        window.addEventListener("resize", handleResize);


        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    const isMobile = width <= 768;
    const isTablet = width <= 1024;
    const isDeskTop = width > 1024;

    return { isMobile, isTablet, isDeskTop };
}