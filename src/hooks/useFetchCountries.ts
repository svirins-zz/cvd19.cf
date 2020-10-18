import { useQuery } from '@apollo/client';
import COUNTRY_QUERY from 'queries';
import { Countries } from '../@types';

const useFetchCountires = () => {
  const { loading, error, data } = useQuery<Countries>(COUNTRY_QUERY);
  return { loading, error, data };
};

export default useFetchCountires;
