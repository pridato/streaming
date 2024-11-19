import { create } from "zustand";
import Cookies from "js-cookie";

const useUserStore = create((set) => ({
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,

  setUser: (userData) => {
    if (userData) {
      Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // Expira en 7 días
    } else {
      Cookies.remove("user");
    }
    set({ user: userData });
  },

  clearUser: () => {
    Cookies.remove("user");
    set({ user: null });
  },
}));

export default useUserStore;
