import { create } from 'zustand';

type AppState = {
  loading: boolean;
};

type AppStore = AppState & {
  setLoading: (value: boolean) => void;
};

const initialState = {
  loading: false,
};

export const useAppStore = create<AppStore>((set, get) => ({
  ...initialState,
  setLoading(value) {
    set({
      loading: value,
    });
  },
}));
