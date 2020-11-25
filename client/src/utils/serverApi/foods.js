import api from '../../utils/api';

export const getFoodsList = async () => {
  const foods = await api.get('/foods');
  return foods.data;
};

export const saveData = async (userData) => {
  return await api.post('/users', userData);
};
