import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { DockingRequest } from "../types/request";
import { requestsReducer } from "./requestsReducer";
import type { RequestAction } from "./requestsReducer";


interface RequestsContextValue {
  requests: DockingRequest[];
  dispatch: (action: RequestAction) => void;
}

const RequestsContext = createContext<RequestsContextValue | null>(null);

interface RequestsProviderProps {
  children: ReactNode;
}


export function RequestsProvider({ children }: RequestsProviderProps) {
  const [requests, dispatch] = useReducer(requestsReducer, []);

  return (
    <RequestsContext.Provider value={{ requests, dispatch }}>
      {children}
    </RequestsContext.Provider>
  );
}


export function useRequests(): RequestsContextValue {
  const context = useContext(RequestsContext);
  if (context === null) {
    throw new Error("useRequests doit être utilisé dans RequestsProvider.");
  }
  return context;
}