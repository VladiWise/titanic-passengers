import React from "react";
import { usePassengers } from "@src/store/usePassagers";
import { Wrapper } from "@src/components/Wrapper";

export function PassengerSearch({
  setVisibleCount,
  itemsPerLoad,
}: {
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  itemsPerLoad: number;
}) {
  const { filters, setFilter } = usePassengers();

  const handleChange = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K]
  ) => {
    setFilter(key, value);
    setVisibleCount(itemsPerLoad);
  };

  return (
    <section>
      <input
        name="name"
        type="text"
        placeholder="Search by name"
        value={filters.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <select
        name="class"
        value={filters.class}
        onChange={(e) => handleChange("class", e.target.value)}
      >
        <option value="">All classes</option>
        <option value="1">1st</option>
        <option value="2">2nd</option>
        <option value="3">3rd</option>
      </select>

      <select
        name="gender"
        value={filters.gender}
        onChange={(e) => handleChange("gender", e.target.value)}
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
          onChange={(e) => handleChange("survivedOnly", e.target.checked)}
        />
        Only survived
      </label>
    </section>
  );
}
