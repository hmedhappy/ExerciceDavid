import { createContext } from 'react';
import { User } from 'requests/types';

export default createContext<{ user: User | null; setUser: (user: User | null) => void }>({
  user: null,
  setUser: () => {},
});
