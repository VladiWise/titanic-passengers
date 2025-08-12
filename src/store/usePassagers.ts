import { create } from "zustand";

export interface Passenger {
  id: number;
  class: string;
  survived: boolean;

  name: string;
  gender: "female" | "male";
  age: number;

  sibsp: string;
  parch: string;
  ticket: string;
  fare: string;
  cabin: string;
  embarked: string;
  boat: string;
  body: string | null;
  "home.dest": string;
}

interface Filters {
  name: string;
  class: string;
  gender: string;
  age: number;
  survivedOnly: boolean;
}

interface PassengersState {
  passengers: Passenger[];
  filters: Filters;
  setPassengers: (list: Passenger[]) => void;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
}

export const usePassengers = create<PassengersState>((set) => ({
  passengers: [],
  filters: { name: "", class: "", gender: "", age: null, survivedOnly: false },
  setPassengers: (list) => set({ passengers: list }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
}));
