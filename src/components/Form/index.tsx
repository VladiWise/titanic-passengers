import React from "react";

interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ name, ...props }: InputType) {
  return (
    <input
      type="text"

    
      onChange={(e) => {
        setFilter("name", e.target.value);
        setVisibleCount(ITEMS_PER_LOAD);
      }}
      {...props}
    />
  );
}
