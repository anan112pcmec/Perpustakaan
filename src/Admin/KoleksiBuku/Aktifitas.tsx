import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AktivitasModifikasi = {
  bukuDitambah: number;
  bukuDikurang: number;
  dilakukanPada: string;
};

export const AktivitasKoleksiBuku = createSlice({
  name: "aktivitaskoleksibuku",
  initialState: [] as string[],
  reducers: {
    TambahkanAktifitas: (state, action: PayloadAction<string>) => {
      state.push(action.payload); // Tambahkan aktivitas ke dalam array
    },
  },
});

// Export reducer dan action
export const ModifikasiBuku = createSlice({
  name: "modifikasibuku",
  initialState: [] as AktivitasModifikasi[],
  reducers: {
    modifikasiBuku: (
      state,
      action: PayloadAction<{
        bukuDitambah: number;
        bukuDikurang: number;
        dilakukanPada: string;
      }>
    ) => {
      const aktivitas: AktivitasModifikasi = {
        bukuDitambah: action.payload.bukuDitambah,
        bukuDikurang: action.payload.bukuDikurang,
        dilakukanPada: action.payload.dilakukanPada,
      };
      state.push(aktivitas);
    },
  },
});

export const PesanToast = createSlice({
  name:"pesantoast",
  initialState: "",
  reducers: {
    UbahPesan :(state, action) => {
      state = action.payload
    }
  }
})

export const {UbahPesan} = PesanToast.actions

// Export action dan reducer-nya
export const { modifikasiBuku } = ModifikasiBuku.actions;
