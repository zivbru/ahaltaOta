import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './Form.css';
import TabPanel from '../../components/UI/Nav/TabPanel';
import PersonalDetailsTab from '../Tabs/PersonalDetailsTab';
import FoodTab from '../Tabs/FoodTab';
import api from '../../utils/api';

const Form = () => {
  const [beersList, setBeersList] = useState([]);
  const getBeersFromServer = async () => {
    const beers = await api.get('/beers');
    setBeersList(beers.data);
  };

  useEffect(() => {
    getBeersFromServer();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue, personalDetails) => {
    setValue(newValue);
  };

  const stylesProps = (index) => {
    return {
      id: `scrollable-prevent-tab-${index}`,
      'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
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
          <Tab label='פרטים אישיים' {...stylesProps(0)} />
          <Tab label='מאכלים' {...stylesProps(1)} />
        </Tabs>
      </Paper>
      <TabPanel style={{ width: '800px' }} value={value} index={0}>
        <PersonalDetailsTab nextTab={handleChange} beers={beersList} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FoodTab />
      </TabPanel>
    </div>
  );
};

export default Form;
