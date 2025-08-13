import React from "react";
import { useEffect, useRef, useState } from "react";
import { usePassengers } from "@src/store/usePassagers";
import { Wrapper } from "@src/components/Wrapper";

import { PassengerCard } from "@src/components/PassengerCard/";
import { PassengerSearch } from "@src/components/PassengerSearch/";
import "./PassengersList.scss";
const ITEMS_PER_LOAD = 10;

export function PassengersList() {
  const { passengers, filters, setPassengers, setFilter } = usePassengers();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json"
    )
      .then((res) => res.json())
      .then((data) => setPassengers(data));
  }, [setPassengers]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
      }
    });
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredPassengers = passengers.filter((p) => {
    if (
      filters.name &&
      !p.name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      return false;
    }
    if (filters.class && p.class !== filters.class) {
      return false;
    }
    if (filters.gender && p.gender !== filters.gender) {
      return false;
    }
    if (filters.survivedOnly && !p.survived) {
      return false;
    }
    return true;
  });

  const visiblePassengers = filteredPassengers.slice(0, visibleCount);

  return (
    <div>
      <h1>Passengers</h1>

      <PassengerSearch itemsPerLoad={ITEMS_PER_LOAD} setVisibleCount={setVisibleCount} />

      <Wrapper>
        {visiblePassengers.map((p) => (
          <PassengerCard key={p.id} passenger={p} />
        ))}
      </Wrapper>

      <div ref={loadMoreRef} style={{ height: "20px" }}></div>
    </div>
  );
}
