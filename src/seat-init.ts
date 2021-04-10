import fs from "fs";
import { Connection, getConnection } from "typeorm";
import { Production } from "./entity/production";
import { Show } from "./entity/show";
import { VenueSeat } from "./entity/venue_seat";
import { TicketType } from "./entity/ticket_type";

interface Seat {
  start: number[]; offset: number[]; row: string; col: (string | number); repeat?: number; enabled: number; wheelchair?: number;

}

let stallsLeft = [{
  start: [10, 10],
  offset: [5, 2],
  row: "AA",
  col: 1,
  repeat: 10,
  enabled: 0
}, {
  start: [10, 20],
  offset: [5, 2],
  row: "BB",
  col: 1,
  repeat: 10,
  enabled: 0
}, {
  start: [10, 30],
  offset: [5, 2],
  row: "CC",
  col: 1,
  repeat: 10,
  enabled: 0
}, {
  start: [10, 40],
  offset: [5, 2],
  row: "DD",
  col: "1A",
  enabled: 1
}, {
  start: [15, 42],
  offset: [5, 2],
  row: "DD",
  col: "1B",
  enabled: 1
}, {
  start: [20, 44],
  offset: [5, 2],
  row: "DD",
  col: "1C",
  enabled: 1
}, {
  start: [25, 46],
  offset: [5, 2],
  row: "DD",
  col: 1,
  repeat: 6,
  enabled: 1
}, {
  start: [10, 50],
  offset: [5, 2],
  row: "EE",
  col: "A",
  repeat: 10,
  enabled: 1
}, {
  start: [0, 56],
  offset: [5 * 5 / 3, 2 * 5 / 3],
  row: "A",
  col: 1,
  repeat: 3,
  enabled: 1,
  wheelchair: 1
}, {
  start: [25, 66],
  offset: [5, 2],
  row: "A",
  col: 4,
  repeat: 6,
  enabled: 1
}, {
  start: [55, 78],
  offset: [5, 2],
  row: "A",
  col: "9A",
  enabled: 1
}, {
  start: [60, 80],
  offset: [5, 2],
  row: "A",
  col: "9B",
  enabled: 1
}, {
  start: [0, 76],
  offset: [5, 2],
  row: "C",
  col: 1,
  repeat: 13,
  enabled: 1
}, {
  start: [0, 86],
  offset: [5, 2],
  row: "D",
  col: 1,
  repeat: 13,
  enabled: 0
}, {
  start: [0, 96],
  offset: [5, 2],
  row: "E",
  col: 1,
  repeat: 12,
  enabled: 1
}, {
  start: [0, 106],
  offset: [5, 2],
  row: "F",
  col: 1,
  repeat: 12,
  enabled: 0
}, {
  start: [0, 116],
  offset: [5, 2],
  row: "G",
  col: 1,
  repeat: 11,
  enabled: 1
}, {
  start: [0, 126],
  offset: [5, 2],
  row: "H",
  col: 1,
  repeat: 11,
  enabled: 0
}, {
  start: [0, 136],
  offset: [5, 2],
  row: "I",
  col: 1,
  repeat: 11,
  enabled: 1
}, {
  start: [0, 146],
  offset: [5, 2],
  row: "J",
  col: 1,
  repeat: 11,
  enabled: 0
}, {
  start: [0, 156],
  offset: [5, 2],
  row: "K",
  col: "1A",
  enabled: 1
}, {
  start: [5, 158],
  offset: [5, 2],
  row: "K",
  col: 1,
  repeat: 10,
  enabled: 1
}];

let stallsCentre = [{
  start: [78, 30],
  offset: [6, 0],
  row: "AA",
  col: 11,
  repeat: 9,
  enabled: 0
}, {
  start: [78, 40],
  offset: [6, 0],
  row: "BB",
  col: 9,
  repeat: 9,
  enabled: 0
}, {
  start: [78, 50],
  offset: [6, 0],
  row: "CC",
  col: 11,
  repeat: 9,
  enabled: 0
}, {
  start: [78, 60],
  offset: [6, 0],
  row: "DD",
  col: 7,
  repeat: 9,
  enabled: 1
}, {
  start: [75, 70],
  offset: [6, 0],
  row: "EE",
  col: "K",
  enabled: 1
}, {
  start: [81, 70],
  offset: [6, 0],
  row: "EE",
  col: 1,
  repeat: 9,
  enabled: 1
}, {
  start: [78, 80],
  offset: [6, 0],
  row: "A",
  col: 10,
  repeat: 9,
  enabled: 1
}, {
  start: [78, 90],
  offset: [6, 0],
  row: "B",
  col: 1,
  repeat: 9,
  enabled: 1
}, {
  start: [75, 100],
  offset: [6, 0],
  row: "C",
  col: 14,
  repeat: 10,
  enabled: 1
}, {
  start: [72, 110],
  offset: [6, 0],
  row: "D",
  col: 14,
  repeat: 11,
  enabled: 0
}, {
  start: [69, 120],
  offset: [6, 0],
  row: "E",
  col: 13,
  repeat: 12,
  enabled: 1
}, {
  start: [66, 130],
  offset: [6, 0],
  row: "F",
  col: 13,
  repeat: 13,
  enabled: 0
}, {
  start: [63, 140],
  offset: [6, 0],
  row: "G",
  col: 12,
  repeat: 14,
  enabled: 1
}, {
  start: [63, 150],
  offset: [6, 0],
  row: "H",
  col: 12,
  repeat: 14,
  enabled: 0
}, {
  start: [63, 160],
  offset: [6, 0],
  row: "I",
  col: 12,
  repeat: 14,
  enabled: 1
}, {
  start: [63, 170],
  offset: [6, 0],
  row: "J",
  col: 12,
  repeat: 14,
  enabled: 0
}, {
  start: [63, 180],
  offset: [6, 0],
  row: "K",
  col: 11,
  repeat: 14,
  enabled: 1
}, {
  start: [63, 190],
  offset: [6, 0],
  row: "L",
  col: 1,
  repeat: 3,
  enabled: 0
}, {
  start: [129, 190],
  offset: [6, 0],
  row: "L",
  col: 4,
  repeat: 3,
  enabled: 0
}];

let stallsRight = [{
  start: [194, 10],
  offset: [-5, 2],
  row: "AA",
  col: 30,
  repeat: -10,
  enabled: 0
}, {
  start: [194, 20],
  offset: [-5, 2],
  row: "BB",
  col: 27,
  repeat: -10,
  enabled: 0
}, {
  start: [189, 32],
  offset: [-5, 2],
  row: "CC",
  col: 29,
  repeat: -9,
  enabled: 0
}, {
  start: [194, 40],
  offset: [-5, 2],
  row: "DD",
  col: 26,
  repeat: -11,
  enabled: 1
}, {
  start: [194, 50],
  offset: [-5, 2],
  row: "EE",
  col: 20,
  repeat: -11,
  enabled: 1
}, {
  start: [199, 58],
  offset: [-5, 2],
  row: "A",
  col: 28,
  enabled: 1,
  wheelchair: 1
}, {
  start: [189, 62],
  offset: [-5, 2],
  row: "A",
  col: 27,
  repeat: -9,
  enabled: 1
}, {
  start: [144, 80],
  offset: [5, 2],
  row: "A",
  col: "19B",
  enabled: 1
}, {
  start: [139, 82],
  offset: [5, 2],
  row: "A",
  col: "19A",
  enabled: 1
}, {
  start: [204, 76],
  offset: [-5, 2],
  row: "C",
  col: 36,
  repeat: -13,
  enabled: 1
}, {
  start: [204, 86],
  offset: [-5, 2],
  row: "D",
  col: 37,
  repeat: -13,
  enabled: 0
}, {
  start: [204, 96],
  offset: [-5, 2],
  row: "E",
  col: 36,
  repeat: -12,
  enabled: 1
}, {
  start: [204, 106],
  offset: [-5, 2],
  row: "F",
  col: 37,
  repeat: -12,
  enabled: 0
}, {
  start: [204, 116],
  offset: [-5, 2],
  row: "G",
  col: 37,
  repeat: -11,
  enabled: 1
}, {
  start: [204, 126],
  offset: [-5, 2],
  row: "H",
  col: 36,
  repeat: -11,
  enabled: 0
}, {
  start: [204, 136],
  offset: [-5, 2],
  row: "I",
  col: 36,
  repeat: -11,
  enabled: 1
}, {
  start: [204, 146],
  offset: [-5, 2],
  row: "J",
  col: 36,
  repeat: -11,
  enabled: 0
}, {
  start: [204, 156],
  offset: [-5, 2],
  row: "K",
  col: 37,
  repeat: -4,
  enabled: 1
}];


let stalls: Seat[] = [...stallsLeft, ...stallsCentre, ...stallsRight];

let seats: any = [];
for (let group of stalls) {
  const repeat = group.repeat || 1;

  for (let i = 0; i < Math.abs(repeat); ++i) {
    let col;
    if (typeof group.col === "number") {
      col = i * Math.sign(repeat) + group.col;
    } else if (typeof group.col === "string" && group.col.length === 1) {
      col = String.fromCharCode(group.col.charCodeAt(0) + i * Math.sign(repeat));
    } else {
      col = group.col;
    }

    const seatNum = group.row + col;

    const circle = {
      posX: group.start[0] + i * group.offset[0],
      posY: group.start[1] + i * group.offset[1],
      seatNum,
      wheelchair: group.wheelchair ? 1 : 0,
      status: group.enabled ? 1 : 0
    };

    seats.push(circle);
  }
}

export default async function () {
  //fs.writeFileSync("test", JSON.stringify(seats, null, 2), "utf-8");
  for (let s of seats) {
    const conn = getConnection();
    const repo = conn.getRepository(VenueSeat);

    let entry = new VenueSeat();
    entry.posX = s.posX;
    entry.posY = s.posY;
    entry.seatNum = s.seatNum;
    entry.wheelchair = s.wheelchair;
    entry.type = s.status;

    await conn.manager.save(entry);
  }
}
