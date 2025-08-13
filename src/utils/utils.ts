export function formatAge(value: number) {
  const years = Math.floor(value);
  const months = Math.floor((value - years) * 12);

  if (years === 0 && months > 0) {
    return `${months}m`;
  }
  if (months === 0) {
    return `${years}y`;
  }
  return `${years}y ${months}m`;
}
