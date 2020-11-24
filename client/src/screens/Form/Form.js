import React, { useState, useEffect } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import './Form.css';
import TabPanel from '../../components/UI/Nav/TabPanel';
import PersonalDetailsTab from '../Tabs/PersonalDetailsTab';
import FoodTab from '../Tabs/FoodTab';
import { getAllBeers } from '../../utils/serverApi/beers';
import { getFoodsList, saveData } from '../../utils/serverApi/foods';

const Form = () => {
  const [beersList, setBeersList] = useState([]);
  const [foodList, setFoodsList] = useState([]);
  const [userData, setUserData] = useState([]);

  const getBeers = async () => {
    const beers = await getAllBeers();
    setBeersList(beers);
  };

  const getFoods = async () => {
    const foods = await getFoodsList();

    setFoodsList(foods);
  };

  useEffect(() => {
    getBeers();
    getFoods();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue, userData) => {
    setValue(newValue);
    setUserData(userData);
  };

  const handleSubmit = async (foods) => {
    ///validateData();

    userData.foods = foods;
    console.log(userData);
    const result = await saveData(userData);
    if (result) {
    } else {
      //show error message
    }
  };

  return (
    <div className='direction'>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          // onChange={handleChange}
          aria-label='disabled tabs example'
        >
          <Tab label='פרטים אישיים' />
          <Tab label='מאכלים' />
        </Tabs>
      </Paper>
      <TabPanel style={{ width: '800px' }} value={value} index={0}>
        <PersonalDetailsTab nextTab={handleChange} beers={beersList} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FoodTab foods={foodList} handleSubmit={handleSubmit} />
      </TabPanel>
    </div>
  );
};

export default Form;
