import type { DockingRequest } from "../types/request";


export type RequestAction =
  | { type: "create"; request: DockingRequest }
  | { type: "authorize"; reference: string }
  | { type: "confirm"; reference: string };

export function requestsReducer(
  state: DockingRequest[],
  action: RequestAction
): DockingRequest[] {
  switch (action.type) {
    case "create": {
      
      const exists = state.some((r) => r.reference === action.request.reference);
      if (exists) {
        return state;
      }
      return [...state, action.request];
    }

    case "authorize":
  
      return state.map((r) => {
        if (r.reference === action.reference && r.status === "requested") {
          return { ...r, status: "authorized" };
        }
        return r;
      });

    case "confirm":
    
      return state.map((r) => {
        if (r.reference === action.reference && r.status === "authorized") {
          return { ...r, status: "docked" };
        }
        return r;
      });

    default:
      return state;
  }
}