import { Auth } from '@/interfaces/auth.interface';
import { atom, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const authState = atom<any>({
    key: 'Auth',
    default: {
        logined: false,
        token: null,
    },
    effects: [ persistAtom ],
});

export const useAuth = () => useRecoilValue(authState);
