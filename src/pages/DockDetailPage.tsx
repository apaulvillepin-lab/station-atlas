import { Link, useParams } from "react-router-dom";
import { useDocks } from "../hooks/useDocks";
import type { Dock } from "../types/dock";
import { capacityLabel, kindLabel, statusLabel } from "../services/dockLabels";

function specificInfo(dock: Dock): string {
  switch (dock.kind) {
    case "crew":
      if (dock.maxPeople === null) {
        return "Personnes maximum : donnée non renseignée";
      }
      return "Personnes maximum : " + dock.maxPeople;
    case "cargo":
      if (dock.craneCount === null) {
        return "Nombre de grues : donnée non renseignée";
      }
      return "Nombre de grues : " + dock.craneCount;
    case "service":
      if (dock.toolStation === null) {
        return "Poste d'outillage : donnée non renseignée";
      }
      return "Poste d'outillage : " + dock.toolStation;
  }
}

export default function DockDetailPage() {
  const { dockId } = useParams();
  const { docks, loading, error, retry } = useDocks();

  if (loading) {
    return <p role="status">Chargement du quai…</p>;
  }

  if (error !== null) {
    return (
      <div role="alert">
        <h1>Erreur de chargement</h1>
        <p>{error}</p>
        <button type="button" onClick={retry}>Réessayer</button>
      </div>
    );
  }

  const dock = docks.find((d) => d.id === dockId);


  if (dock === undefined) {
    return (
      <section>
        <h1>Quai introuvable</h1>
        <p>Aucun quai de la station ne porte l'identifiant « {dockId} ».</p>
        <Link to="/docks">Retour aux quais</Link>
      </section>
    );
  }

  return (
    <section>
      <Link to="/docks">Retour aux quais</Link>
      <h1>{dock.name}</h1>
      <span className={"badge " + dock.status}>{statusLabel(dock.status)}</span>

      <div className="detail">
        <div className="panel">
          <h2>Identité</h2>
          <p>Identifiant : {dock.id}</p>
          <p>Type : {kindLabel(dock.kind)}</p>
          <p>Statut : {statusLabel(dock.status)}</p>
        </div>

        <div className="panel">
          <h2>Contraintes</h2>
          <p>Capacité : {capacityLabel(dock.capacityTons)}</p>
          <p>{specificInfo(dock)}</p>
        </div>
      </div>
    </section>
  );
}