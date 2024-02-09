import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDisptach } from "./store";
import { CanvasContext } from "../feature/portfolio/paintapp/CanvasContext";
import { useContext } from "react";

export const useAppDispatch = () => useDispatch<AppDisptach>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useCanvas = () => useContext(CanvasContext);