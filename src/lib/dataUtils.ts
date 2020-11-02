import { Countries } from "../@types";

export const fetchAndTransform = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => transform(data));

const transform = (data) => {};
