export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f0e6e9'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='20' fill='%23b98e9a' text-anchor='middle' dominant-baseline='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E";

export const handleImageError = (event) => {
  event.target.onerror = null;
  event.target.src = PLACEHOLDER_IMAGE;
};
