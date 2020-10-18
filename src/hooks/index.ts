import { useEffect } from 'react';

// TODO: refactor data fetching to hook
export const useFetchCountires = () => 'fetched';

export const useRefEffect = ({ effect, ref = {} }) => {
  useEffect(() => {
    effect(ref.current);
  }, [effect, ref]);
};