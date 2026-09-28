import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocks } from "../hooks/useDocks";
import { statusLabel } from "../services/dockLabels";

export default function NewRequestPage() {
  const { docks } = useDocks();

  const [reference, setReference] = useState<string>("");
  const [shipName, setShipName] = useState<string>("");
  const [dockId, setDockId] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [mass, setMass] = useState<string>("");

  return (
    <section>
      <Link to="/requests">Retour aux demandes</Link>
      <h1>Nouvelle demande d'amarrage</h1>
      <p>Remplissez les cinq champs puis enregistrez. L'aperçu se met à jour en direct.</p>

      <div className="form-layout">
        <form noValidate>
          <div className="field">
            <label htmlFor="reference">Référence (AT- puis 4 chiffres)</label>
            <input
              id="reference"
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="shipName">Nom du vaisseau</label>
            <input
              id="shipName"
              type="text"
              value={shipName}
              onChange={(e) => setShipName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="dockId">Quai</label>
            <select
              id="dockId"
              value={dockId}
              onChange={(e) => setDockId(e.target.value)}
            >
              <option value="">Choisir un quai</option>
              {docks.map((dock) => (
                <option key={dock.id} value={dock.id}>
                  {dock.id} – {dock.name} ({statusLabel(dock.status)})
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="arrivalDate">Date d'arrivée</label>
            <input
              id="arrivalDate"
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="mass">Masse (en tonnes)</label>
            <input
              id="mass"
              type="number"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
            />
          </div>

          <button type="submit">Enregistrer la demande</button>
        </form>

      
        <aside className="panel">
          <h2>Aperçu de la demande</h2>
          <p>Référence : {reference || "—"}</p>
          <p>Vaisseau : {shipName || "—"}</p>
          <p>Quai : {dockId || "—"}</p>
          <p>Date d'arrivée : {arrivalDate || "—"}</p>
          <p>Masse : {mass ? mass + " t" : "—"}</p>
        </aside>
      </div>
    </section>
  );
}