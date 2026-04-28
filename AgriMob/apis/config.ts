// ─── IMPORTANT: set this to your computer's local IP address ──────────────────
//
// How to find it:
//   • Mac:     open Terminal → run: ipconfig getifaddr en0
//   • Windows: open CMD → run: ipconfig  (look for IPv4 Address)
//
// Replace 192.168.1.100 with YOUR actual IP.
// Both your iPhone and your computer must be on the same Wi-Fi network.
//
// Example: if your IP is 192.168.1.45 → set BASE_URL = "http://192.168.1.45:8000"
//
// DO NOT use:
//   • 10.0.2.2       → only works in Android emulator
//   • 127.0.0.1      → points to the phone itself, not your computer
//   • localhost       → same problem

export const BASE_URL = "http://192.168.1.2:8000"; // ← change this

// Single key used by BOTH storage.ts and AuthContext — no more mismatches
export const TOKEN_KEY   = "auth_access";
export const REFRESH_KEY = "auth_refresh";
export const USER_KEY    = "auth_user";