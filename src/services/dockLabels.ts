import type { DockStatus } from "../types/dock";


export function statusLabel(status: DockStatus): string {
  if (status === "available") {
    return "Disponible";
  }
  return "Bloqué";
}

export function kindLabel(kind: "crew" | "cargo" | "service"): string {
  if (kind === "crew") {
    return "Équipage";
  }
  if (kind === "cargo") {
    return "Fret";
  }
  return "Maintenance";
}

export function capacityLabel(capacityTons: number | null): string {
  if (capacityTons === null) {
    return "Capacité non renseignée";
  }
  return capacityTons + " t";
}