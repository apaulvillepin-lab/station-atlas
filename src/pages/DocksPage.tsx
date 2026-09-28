import { useState } from "react";
import { useDocks } from "../hooks/useDocks";
import DockCard from "../components/DockCard";
import type { DockStatus } from "../types/dock";

type StatusFilter = "all" | DockStatus;

export default function DocksPage() {
  const { docks, loading, error, retry } = useDocks();
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

 
  const visibleDocks = docks.filter((dock) => {
    const matchesSearch = dock.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesStatus = statusFilter === "all" || dock.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function handleStatusChange(value: string) {
    if (value === "available" || value === "blocked") {
      setStatusFilter(value);
    } else {
      setStatusFilter("all");
    }
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
  }

  const isReady = !loading && error === null;

  return (
    <section>
     
      <h1>Quais d'amarrage</h1>
      <p>Consultez la disponibilité et la capacité des quais de la station.</p>
      {isReady && docks.length > 0 && (
        <p className="counter">{visibleDocks.length} quai(s) affiché(s)</p>
      )}

      
      {loading && <p role="status">Chargement des quais…</p>}

      {!loading && error !== null && (
        <div role="alert">
          <p>{error}</p>
          <button type="button" onClick={retry}>Réessayer</button>
        </div>
      )}

     
      {isReady && docks.length === 0 && (
        <p>Aucun quai disponible dans le manifeste</p>
      )}

      {isReady && docks.length > 0 && (
        <>
         
          <div className="controls">
            <label>
              Rechercher par nom
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            <label>
              Statut
              <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="all">Tous</option>
                <option value="available">Disponible</option>
                <option value="blocked">Bloqué</option>
              </select>
            </label>

            <button type="button" onClick={resetFilters}>Réinitialiser</button>
          </div>

          
          {visibleDocks.length === 0 ? (
            <div>
              <p>Aucun quai ne correspond à votre recherche</p>
              <button type="button" onClick={resetFilters}>Réinitialiser les critères</button>
            </div>
          ) : (
            <div className="grid">
              {visibleDocks.map((dock) => (
                <DockCard key={dock.id} dock={dock} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}