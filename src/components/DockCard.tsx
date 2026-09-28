import { Link } from "react-router-dom";
import type { Dock } from "../types/dock";
import { capacityLabel, kindLabel, statusLabel } from "../services/dockLabels";

interface DockCardProps {
  dock: Dock;
}

export default function DockCard({ dock }: DockCardProps) {
  return (
    <Link to={"/docks/" + dock.id} className="card">
      <h2>{dock.name}</h2>
      <p>Identifiant : {dock.id}</p>
      <p>Type : {kindLabel(dock.kind)}</p>
      <p>
        Statut : <span className={"badge " + dock.status}>{statusLabel(dock.status)}</span>
      </p>
      <p>Capacité : {capacityLabel(dock.capacityTons)}</p>
    </Link>
  );
}