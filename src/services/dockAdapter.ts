import type { Dock, DockDTO, DockStatus } from "../types/dock";

function readNumber(value: number | undefined): number | null {
  if (typeof value === "number" && value > 0) {
    return value;
  }
  return null;
}


export function toDock(dto: DockDTO): Dock {

  if (typeof dto.dock_id !== "string" || typeof dto.label !== "string") {
    throw new Error("Un quai du manifeste est invalide.");
  }

  const status: DockStatus = dto.state === "OPEN" ? "available" : "blocked";
  const capacityTons = readNumber(dto.limit_tons);

  switch (dto.kind) {
    case "crew":
      return {
        kind: "crew",
        id: dto.dock_id,
        name: dto.label,
        status: status,
        capacityTons: capacityTons,
        maxPeople: readNumber(dto.max_people),
      };
    case "cargo":
      return {
        kind: "cargo",
        id: dto.dock_id,
        name: dto.label,
        status: status,
        capacityTons: capacityTons,
        craneCount: readNumber(dto.crane_count),
      };
    case "service":
      return {
        kind: "service",
        id: dto.dock_id,
        name: dto.label,
        status: status,
        capacityTons: capacityTons,
        toolStation: dto.tool_station ? dto.tool_station : null,
      };
    default:
      throw new Error("Type de quai inconnu.");
  }
}