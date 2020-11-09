import Provider from "./src/context";
import LogRocket from "logrocket";

export const wrapRootElement = Provider;
export const onClientEntry = () => LogRocket.init("rhcw85/cvd10");
