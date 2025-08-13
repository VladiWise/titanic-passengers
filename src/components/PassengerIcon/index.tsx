import React from "react";
import { MaleIcon, BabyIcon, FemaleIcon } from "@src/assets/SVG";

export function PassengerIcon({ gender, age }: { gender: "female" | "male"; age: number }) {
  if (age <= 1) {
    return <BabyIcon width={48} height={48} />;
  }

  switch (gender) {
    case "male":
      return <MaleIcon width={48} height={48} />;

    case "female":
      return <FemaleIcon width={48} height={48} />;
  }
}
