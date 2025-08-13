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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPassengers();
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
    <div className="passengers-list">
      <section className="passengers-list-header">
        <h1>Passengers</h1>
        <PassengerSearch
          itemsPerLoad={ITEMS_PER_LOAD}
          setVisibleCount={setVisibleCount}
        />
      </section>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Wrapper>
          {visiblePassengers.length === 0 && <p>No passengers found</p>}

          {visiblePassengers.map((p) => (
            <PassengerCard key={p.id} passenger={p} />
          ))}
        </Wrapper>
      )}

      <div ref={loadMoreRef} style={{ height: "20px" }}></div>
    </div>
  );

  async function loadPassengers() {
    const res = await fetch(
      "https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json"
    );
    const data = await res.json();

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPassengers(data);

    setIsLoading(false);
  }
}
