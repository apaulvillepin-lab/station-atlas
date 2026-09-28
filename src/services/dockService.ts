import type { Dock } from "../types/dock";
import { toDock } from "./dockAdapter";


export async function fetchDocks(signal: AbortSignal): Promise<Dock[]> {
  const response = await fetch("/api/docks.json", { signal: signal });


  if (!response.ok) {
    throw new Error("Erreur HTTP " + response.status);
  }


  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("La réponse n'est pas une liste de quais.");
  }

 
  return data.map(toDock);
}