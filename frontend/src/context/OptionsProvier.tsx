import { createContext } from "react";
import { Options } from "../types";
import { OptionsDefault } from "../data";

export const OptionsContext = createContext<Options>(OptionsDefault);
