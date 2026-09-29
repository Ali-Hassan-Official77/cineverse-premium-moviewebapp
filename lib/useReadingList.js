"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cineverse:reading-list";
export const runtime = 'edge';

function readStorage() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Cineverse's differentiator feature: a personal "reading list" of films to
 * come back to, persisted in localStorage — no account or database needed.
 */
export function useReadingList() {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    setIds(readStorage());
    function onStorage(e) {
      if (e.key === STORAGE_KEY) setIds(readStorage());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isSaved = useCallback((id) => ids.includes(id), [ids]);

  const toggle = useCallback((id) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { ids, isSaved, toggle };
}
