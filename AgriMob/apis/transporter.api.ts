import { apiFetch } from "./api";

export const transporterApi = {
  // available missions
  availableMissions: (qs?: string) =>
    apiFetch(`/api/missions/available/${qs ? `?${qs}` : ""}`),

  // my missions
  myMissions: (qs?: string) =>
    apiFetch(`/api/missions/my/${qs ? `?${qs}` : ""}`),

  // accept mission
  acceptMission: (id: number, vehicleId?: number) =>
    apiFetch(`/api/missions/${id}/accept/`, {
      method: "POST",
      body: JSON.stringify({ vehicle_id: vehicleId }),
    }),

  // decline mission
  declineMission: (id: number) =>
    apiFetch(`/api/missions/${id}/decline/`, {
      method: "POST",
    }),

  // update status
  updateStatus: (
    id: number,
    status: "picked_up" | "in_transit" | "delivered"
  ) =>
    apiFetch(`/api/missions/${id}/status/`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  // mission detail
  detail: (id: number) =>
    apiFetch(`/api/missions/${id}/`),

  // vehicles
  myVehicles: () =>
    apiFetch("/api/vehicules/me/"),
};