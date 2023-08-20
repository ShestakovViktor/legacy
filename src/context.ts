import {createContext} from "solid-js";
import {Context} from "./type";
import {store} from "./store";

export const context = createContext<Context>({
    store,
});