import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './Form.css';

const Form = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='direction'>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
          aria-label='disabled tabs example'
        >
          <Tab label='פרטים אישיים' />
          <Tab label='מאכלים' />
        </Tabs>
      </Paper>
    </div>
  );
};

export default Form;
