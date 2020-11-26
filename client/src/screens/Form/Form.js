import React, { useState, useEffect, useCallback } from 'react';
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
import useStyles from './FormStyles';
import TabPanel from '../../components/UI/Nav/TabPanel';
import PersonalDetailsTab from '../Tabs/PersonalDetailsTab';
import FoodTab from '../Tabs/FoodTab';
import { getAllBeers } from '../../utils/serverApi/beers';
import { getFoodsList, saveData } from '../../utils/serverApi/foods';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserById } from '../../store/actions/auth';

const Form = ({ user }) => {
  const [initialState, setInitialState] = useState([]);
  const [beersList, setBeersList] = useState([]);
  const [foodList, setFoodsList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const classes = useStyles();

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

  // const getUserData = useCallback(async () => {
  //   const userFromServer = await getUserById(user.profile.googleId);
  //   if (userFromServer) {
  //     user.data = userFromServer.data;
  //     console.log(user.data);
  //   }
  // }, [user]);

  useEffect(() => {
    getBeers();
    getFoods();
  }, []);

  // useEffect(() => {
  //   getUserData();
  // }, [getUserData]);

  const handleChange = (event, newValue, userData) => {
    setValue(newValue);
    setUserData(userData);
  };

  const handleSubmit = async (foods) => {
    try {
      setLoading(true);
      userData.foods = foods;
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
    setValue(0);
  };
  useEffect(() => {
    const userFoods = ((user || {}).data || {}).foods;
    setInitialState(
      foodList
        .map((key, value) => {
          const isExists =
            userFoods &&
            userFoods.find((userfood) => userfood.foodid === key.foodid);
          if (isExists) {
            foodList[value].checked = true;
            return value;
          }
          return false;
        })
        .filter((e) => e === 0 || e)
    );
  }, [user, foodList]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={classes.direction}>
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
            <FoodTab
              foods={foodList}
              initialState={initialState}
              handleSubmit={handleSubmit}
            />
          </TabPanel>
        </div>
      )}
    </div>
  );
};

Form.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProp, {})(Form);
