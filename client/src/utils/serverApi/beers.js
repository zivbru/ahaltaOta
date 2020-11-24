import api from '../../utils/api';

export const getAllBeers = async () => {
  const beers = await api.get('/beers');
  return beers.data;
};
