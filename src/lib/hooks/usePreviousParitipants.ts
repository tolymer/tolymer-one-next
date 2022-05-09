import { useEffect, useState } from "react";

const STORAGE_KEY = "rememberParticipants";

export function usePreviousParticipants() {
  const [participants, setParticipants] = useState<string[] | null>(null);
  useEffect(() => {
    setParticipants(restoreParticipants);
  }, []);

  return participants;
}

function restoreParticipants(): string[] | null {
  const result = localStorage.getItem(STORAGE_KEY);
  if (result === null) return null;

  try {
    return JSON.parse(result);
  } catch (err) {
    console.warn(err);
    return null;
  }
}

export function storeParticipants(participants: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
}
