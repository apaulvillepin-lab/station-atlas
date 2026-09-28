import { Link } from "react-router-dom";
import { useRequests } from "../state/RequestsContext";
import type { RequestStatus } from "../types/request";


function requestStatusLabel(status: RequestStatus): string {
  if (status === "requested") {
    return "Demandée";
  }
  if (status === "authorized") {
    return "Autorisée";
  }
  return "Amarrée";
}

export default function RequestsPage() {
  const { requests, dispatch } = useRequests();

  return (
    <section>
      <h1>Demandes d'amarrage</h1>
      <p className="counter">{requests.length} demande(s)</p>
      <Link to="/requests/new" className="button-link">Nouvelle demande</Link>

      
      {requests.length === 0 && (
        <div>
          <p>Aucune demande n'a encore été créée pendant cette session.</p>
          <Link to="/requests/new">Créer une première demande</Link>
        </div>
      )}


      {requests.length > 0 && (
        <div className="grid">
          {requests.map((request) => (
            <div key={request.reference} className="panel">
              <h2>{request.reference}</h2>
              <p>Vaisseau : {request.shipName}</p>
              <p>Quai : {request.dockId}</p>
              <p>Date d'arrivée : {request.arrivalDate}</p>
              <p>Masse : {request.massTons} t</p>
              <p>Statut : {requestStatusLabel(request.status)}</p>

              {request.status === "requested" && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: "authorize", reference: request.reference })}
                >
                  Autoriser
                </button>
              )}

              {request.status === "authorized" && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: "confirm", reference: request.reference })}
                >
                  Confirmer l'amarrage
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}