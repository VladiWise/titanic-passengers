import React from "react";

import "./PassengerCard.scss";

import type { Passenger } from "@src/store/usePassagers";
import { PassengerIcon } from "@src/components/PassengerIcon/";
import { formatAge } from "@src/utils/utils";

export function PassengerCard({ passenger }: { passenger: Passenger }) {
  return (
    <section className="passenger-card">
      <div className="passenger-card-main">
        <PassengerIcon age={passenger.age} gender={passenger.gender} />
        <div className="passenger-card-info">
          <span style={{ fontWeight: "500" }}>{passenger.name}</span>
          <span className="text-gray-400">{passenger.gender}</span>
          <span className="text-gray-500">{formatAge(passenger.age)}</span>
        </div>
      </div>

      <div className="passenger-card-info flex-end">
        {passenger.survived ? (
          <span style={{ fontWeight: "700", color: "#2ECC71" }}>Survived</span>
        ) : (
          <span style={{ fontWeight: "700", color: "#E74C3C" }}>Not survived</span>
        )}

        <span className="text-gray-400">class: {passenger.class}</span>
        <span className="text-gray-500">ticker: {passenger.ticket}</span>
      </div>
    </section>
  );
}
