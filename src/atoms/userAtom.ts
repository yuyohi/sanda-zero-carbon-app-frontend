import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage,
});

const userState = atom<string>({
  key: 'userState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export default userState;
