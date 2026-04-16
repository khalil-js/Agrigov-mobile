import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  getToken: async () => AsyncStorage.getItem("access"),
  setToken: async (t: string) => AsyncStorage.setItem("access", t),
  removeToken: async () => AsyncStorage.removeItem("access"),
};