import { createContext } from "react";
import { Options } from "../types";
import { options } from "../data";

export const OptionsContext = createContext<Options>(options);
