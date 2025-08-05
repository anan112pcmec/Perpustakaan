import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ForYouState {
  nama :string | null;
  favorit: string[]; // Menyimpan ID atau nama buku favorit
  sudahScrollBawah: boolean; // Penanda bahwa user sudah scroll ke bawah
}

const favoritFromStorage = localStorage.getItem("Favorit");

const initialState: ForYouState = {
  nama: localStorage.getItem("userNama") || "",
  favorit: favoritFromStorage ? [favoritFromStorage] : [],
  sudahScrollBawah: false,
};

export const foryouSlice = createSlice({
  name: "foryou",
  initialState,
  reducers: {
    tambahFavorit: (state, action: PayloadAction<string>) => {
      state.favorit.push(action.payload);
    },
    hapusFavorit: (state, action: PayloadAction<string>) => {
      state.favorit = state.favorit.filter((item) => item !== action.payload);
    },
    setSudahScrollBawah: (state, action: PayloadAction<boolean>) => {
      state.sudahScrollBawah = action.payload;
    },
  },
});

export const { tambahFavorit, hapusFavorit, setSudahScrollBawah } = foryouSlice.actions;
export default foryouSlice.reducer;
