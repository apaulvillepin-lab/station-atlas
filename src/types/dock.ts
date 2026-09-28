export interface DockDTO {
  dock_id: string;
  label: string;
  kind: "crew" | "cargo" | "service";
  state: "OPEN" | "BLOCKED";
  limit_tons?: number;
  max_people?: number;
  crane_count?: number;
  tool_station?: string;
}

export type DockStatus = "available" | "blocked";

interface DockBase {
  readonly id: string;
  name: string;
  status: DockStatus;
  capacityTons: number | null;
}

export interface CrewDock extends DockBase {
  kind: "crew";
  maxPeople: number | null;
}

export interface CargoDock extends DockBase {
  kind: "cargo";
  craneCount: number | null;
}

export interface ServiceDock extends DockBase {
  kind: "service";
  toolStation: string | null;
}


export type Dock = CrewDock | CargoDock | ServiceDock;