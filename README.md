# Station Atlas

Application React + TypeScript (Vite) pour consulter les quais de la station
et gérer les demandes d'amarrage.

## Lancement

npm install
npm run dev

Puis ouvrir http://localhost:5173/docks

## Structure choisie

Vérification des types : `npx tsc --noEmit`
- `public/api/docks.json` : manifeste des quais, lu avec `fetch("/api/docks.json")`
- `src/types/` : types du domaine (`dock.ts` : DTO + modèle `Dock` en union par `kind` ; `request.ts` : demande d'amarrage)
- `src/services/` : chargement HTTP (`dockService.ts`), adaptation DTO → modèle (`dockAdapter.ts`), libellés affichés (`dockLabels.ts`)
- `src/hooks/useDocks.ts` : chargement des quais avec états chargement / erreur / vide / succès, bouton Réessayer et AbortController
- `src/state/` : `requestsReducer.ts` (création et transitions requested → authorized → docked) et `RequestsContext.tsx` (partage des demandes entre les pages)
- `src/components/` : `AppLayout.tsx` (en-tête et navigation), `DockCard.tsx` (carte d'un quai)
- `src/pages/` : une page par route (`/docks`, `/docks/:dockId`, `/requests`, `/requests/new`, 404)