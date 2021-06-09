import { Like } from "typeorm";

function escapeLikeQuery(str: string) {
  return str.replace(/(?=[%_\\])/g, "\\");
}

export function StartsWith(str: string) {
  return Like(`${escapeLikeQuery(str)}%`);
}

export function EndsWith(str: string) {
  return Like(`%${escapeLikeQuery(str)}`);
}

export function Contains(str: string) {
  return Like(`%${escapeLikeQuery(str)}%`);
}
