import { create } from 'zustand';
import JwtDecode from 'jwt-decode';
import { axiosInstance } from 'api/axiosConfig';
import { NavigateFunction } from 'react-router-dom';
import Cookie from 'js-cookie';

export enum UserType {
  CUSTOMER,
  ADMIN,
}

type Token = {
  type_: UserType;
  sub: string;
  first_name: string;
  last_name: string;
  managed_store_id: number | null;
};

type User = {
  type: UserType;
  id: number;
  firstName: string;
  lastName: string;
  managedStoreId: number | null;
};

type AuthState = {
  user: User | null;
  currentStore: number | null;
};

type AuthStore = AuthState & {
  login(token: string, navigate: NavigateFunction): void;
  logout(): void;
};

const initialState: AuthState = {
  user: null,
  currentStore: null,
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,
  login(token, navigate) {
    const currStore = get().currentStore;
    const { first_name, last_name, sub, type_, managed_store_id } = JwtDecode<Token>(token);

    axiosInstance.defaults.headers.authorization = `Bearer ${token}`;

    Cookie.set('id_token', token, {
      expires: 7,
    });

    set((prev) => ({
      user: {
        firstName: first_name,
        lastName: last_name,
        id: Number(sub),
        type: type_,
        managedStoreId: managed_store_id,
      },
      currentStore: type_ === UserType.ADMIN ? managed_store_id : prev.currentStore,
    }));

    if (type_ === UserType.CUSTOMER && currStore) {
      navigate(`/store/${currStore}`);
    } else if (type_ === UserType.ADMIN) {
      navigate(`/admin/dashboard`);
    }
  },
  logout() {
    Cookie.remove('id_token');
    axiosInstance.defaults.headers.authorization = '';

    set({ ...initialState });
  },
}));
