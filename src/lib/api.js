"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function getSessionToken() {
  const res = await fetch("/api/session-token", { cache: "no-store" });
  if (!res.ok) throw new Error("Please sign in to continue.");
  const data = await res.json();
  return data.token;
}

export async function apiFetch(path, options = {}) {
  const token = await getSessionToken();
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || "The request could not be completed.");
  }

  return data;
}

export async function publicFetch(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
  let data = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || "Unable to load data right now.");
  }

  return data;
}
