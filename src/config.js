export const NODE_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://server-pastepick.2.rahtiapp.fi"
    : "http://localhost:3001";

export const PYTHON_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://server-fastapi-pastepick.2.rahtiapp.fi"
    : "http://localhost:8000";
