import { Time, Unit } from "./units";

export type TSettings = {
  unit: Unit;
  time: Time;
  setUnits: (unit: Unit) => void;
  setTime: (time: Time) => void;
};
