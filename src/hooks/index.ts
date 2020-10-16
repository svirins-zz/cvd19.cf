import { useEffect } from 'react';

export const useRefEffect = ({ effect, ref = {} }) => {
  useEffect(() => {
    effect(ref.current);
  }, [effect, ref]);
};

// TODO: refactor data fetching to hook
export const useFetchCountires = () => 'fetched';
