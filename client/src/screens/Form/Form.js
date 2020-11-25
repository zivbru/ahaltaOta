import React, { useState, useEffect } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Button,
} from '@material-ui/core';
import './Form.css';
import TabPanel from '../../components/UI/Nav/TabPanel';
import PersonalDetailsTab from '../Tabs/PersonalDetailsTab';
import FoodTab from '../Tabs/FoodTab';
import { getAllBeers } from '../../utils/serverApi/beers';
import { getFoodsList, saveData } from '../../utils/serverApi/foods';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Form = ({ auth }) => {
  const [beersList, setBeersList] = useState([]);
  const [foodList, setFoodsList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');

  // console.log(auth.user.profile.googleId);

  const handleClose = () => {
    setOpen(false);
  };

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
    try {
      setLoading(true);
      userData.foods = foods;
      userData.googleId = auth.user.profile.googleId;
      await saveData(userData);
      setLoading(false);
      setBody('המשתמש נוסף בהצלחה');
      setOpen(true);
    } catch (error) {
      console.log('error', error.response.data.message);
      setOpen(true);
      setBody('!! המתשמש לא נוסף אנא נסה שנית מאוחר יותר');
      setLoading(false);
    }
    // setValue(0);
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='direction'>
      {open ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>סיום תהליך</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary' autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
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
      )}
    </div>
  );
};

Form.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProp, {})(Form);
