import { useEffect } from "react";
import { API_URL_BASE } from "../constants";

/**
 * Cloud Runを起こす君
 */
export function usePing() {
  useEffect(() => {
    fetch(`${API_URL_BASE}/ping`).catch((err) => {
      console.error(err);
    });
  });
}
