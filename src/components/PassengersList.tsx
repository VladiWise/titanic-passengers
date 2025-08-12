import React from "react";
import { useEffect, useRef, useState } from "react";
import { usePassengers } from "../store/usePassagers"; 

import "./PassengerCard.scss"
const ITEMS_PER_LOAD = 40;

export function PassengersList() {
  const { passengers, filters, setPassengers, setFilter } = usePassengers();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Загрузка данных
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

  // Фильтрация
  const filteredPassengers = passengers.filter((p) => {
    if (filters.name && !p.name.toLowerCase().includes(filters.name.toLowerCase())) {
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

      {/* Фильтры */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => {
            setFilter("name", e.target.value);
            setVisibleCount(ITEMS_PER_LOAD);
          }}
        />

        <select
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
            type="checkbox"
            checked={filters.survivedOnly}
            onChange={(e) => {
              setFilter("survivedOnly", e.target.checked);
              setVisibleCount(ITEMS_PER_LOAD);
            }}
          />
          Only survived
        </label>
      </div>

      {/* Таблица */}
      <div style={{display: "flex", flexDirection: "column", gap:"1rem"}}>
    

          {visiblePassengers.map((p) => (
            <div key={p.id} className="passenger-card-container">
              
              <p>{p.name}</p>
              <p>{p.class}</p>
              <p>{p.survived ? "Yes" : "No"}</p>
              <p>{p.age}</p>
            </div>
          ))}
 


      </div>

      <div ref={loadMoreRef} style={{ height: "20px" }}></div>
    </div>
  );
}
