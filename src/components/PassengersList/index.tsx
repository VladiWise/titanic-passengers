import React from "react";
import { useEffect, useRef, useState } from "react";
import { usePassengers } from "@src/store/usePassagers";
import { Wrapper } from "@src/components/Wrapper";

import { PassengerCard } from "@src/components/PassengerCard/";
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

      <Wrapper>
        <input
          name="name"
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => {
            setFilter("name", e.target.value);
            setVisibleCount(ITEMS_PER_LOAD);
          }}
        />

        <select
          name="class"
          value={filters.class}
          onChange={(e) => {
            setFilter("class", e.target.value);
            setVisibleCount(ITEMS_PER_LOAD);
          }}
        >
          <option value="">All classes</option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
        </select>

        <select
          name="gender"
          value={filters.gender}
          onChange={(e) => {
            setFilter("gender", e.target.value);
            setVisibleCount(ITEMS_PER_LOAD);
          }}
        >
          <option value="">All genders</option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>

        <label>
          <input
            name="survivedOnly"
            type="checkbox"
            checked={filters.survivedOnly}
            onChange={(e) => {
              setFilter("survivedOnly", e.target.checked);
              setVisibleCount(ITEMS_PER_LOAD);
            }}
          />
          Only survived
        </label>
      </Wrapper>

      <Wrapper>
        {visiblePassengers.map((p) => (
          <PassengerCard key={p.id} passenger={p} />
        ))}
      </Wrapper>

      <div ref={loadMoreRef} style={{ height: "20px" }}></div>
    </div>
  );
}
