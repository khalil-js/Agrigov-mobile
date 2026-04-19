import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY, REFRESH_KEY, USER_KEY } from "./config";

// Single storage helper used by both AuthContext and api.ts
// All keys come from config.ts so there is only one place to change them.

export const storage = {
  // ── Token ──────────────────────────────────────────────────────────────────
  getToken:    () => AsyncStorage.getItem(TOKEN_KEY),
  setToken:    (t: string) => AsyncStorage.setItem(TOKEN_KEY, t),
  removeToken: () => AsyncStorage.removeItem(TOKEN_KEY),

  // ── Refresh token ──────────────────────────────────────────────────────────
  getRefresh:    () => AsyncStorage.getItem(REFRESH_KEY),
  setRefresh:    (t: string) => AsyncStorage.setItem(REFRESH_KEY, t),
  removeRefresh: () => AsyncStorage.removeItem(REFRESH_KEY),

  // ── User object ────────────────────────────────────────────────────────────
  getUser:    async () => {
    const s = await AsyncStorage.getItem(USER_KEY);
    return s ? JSON.parse(s) : null;
  },
  setUser:    (u: object) => AsyncStorage.setItem(USER_KEY, JSON.stringify(u)),
  removeUser: () => AsyncStorage.removeItem(USER_KEY),

  // ── Clear everything ───────────────────────────────────────────────────────
  clearAll: () => AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_KEY, USER_KEY]),
};