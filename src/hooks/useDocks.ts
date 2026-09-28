import { useEffect, useState } from "react";
import type { Dock } from "../types/dock";
import { fetchDocks } from "../services/dockService";

export function useDocks() {
  const [docks, setDocks] = useState<Dock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchDocks(controller.signal)
      .then((result) => {
        setDocks(result);
        setLoading(false);
      })
      .catch(() => {
      
        if (controller.signal.aborted) {
          return;
        }
        setError("Impossible de charger les quais.");
        setLoading(false);
      });

  
    return () => {
      controller.abort();
    };
  }, [reloadCount]);

 
  function retry() {
    setReloadCount((count) => count + 1);
  }

  return { docks, loading, error, retry };
}