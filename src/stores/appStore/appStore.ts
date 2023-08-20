import { isAxiosError } from 'axios';
import { toast, TypeOptions } from 'react-toastify';
import { create } from 'zustand';

type AppState = {
  loading: boolean;
};

type AppStore = AppState & {
  setLoading: (value: boolean) => void;
  handleErrors: (error: any) => void;
  setNotification: (payload: { message: string; type?: TypeOptions }) => void;
};

const initialState: AppState = {
  loading: false,
};

export const useAppStore = create<AppStore>((set, get) => ({
  ...initialState,
  setNotification(payload) {
    toast(payload.message, {
      type: payload.type ?? 'success',
    });
  },
  handleErrors(error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.error as string;
      toast(message, {
        type: 'error',
      });
    }
  },
  setLoading(value) {
    set({
      loading: value,
    });
  },
}));
