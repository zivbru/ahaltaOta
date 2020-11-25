import React, { useState } from 'react';
import useStyles from './PersonalDetailsStyles';
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
} from '@material-ui/core';
import {
  getDate,
  nameValidation,
  IdValidation,
  phoneValidation,
  ageValidation,
} from '../../components/Validation/validation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const today = getDate(new Date());

const PersonalDetailsTab = ({ nextTab, beers, user }) => {
  const classes = useStyles();

  const initialState = {
    firstName: user && user.data ? user.data.firstname : '',
    lastName: user && user.data ? user.data.lastname : '',
    birthDate: user && user.data ? getDate(user.data.birthdate) : '',
    beer: user && user.data ? user.data.favoritebeer : '',
    Id: user && user.data ? user.data.israelid : '',
    phone: user && user.data ? user.data.phone : '',
  };

  const [formData, setFormData] = useState(initialState);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { firstName, lastName, birthDate, beer, Id, phone } = formData;

  const handleSubmit = (e) => {
    nextTab(null, 1, formData);
  };
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [idTouched, setIdTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const handleTouch = (label) => {
    switch (label) {
      case 'firstName':
        setFirstNameTouched(true);
        break;
      case 'lastName':
        setLastNameTouched(true);
        break;
      case 'id':
        setIdTouched(true);
        break;
      case 'phone':
        setPhoneTouched(true);
        break;
      default:
        break;
    }
  };

  const isButtonDisdabled =
    (!nameValidation(firstName) ||
      firstName === '' ||
      !nameValidation(lastName) ||
      lastName === '' ||
      !IdValidation(Id) ||
      Id === '' ||
      birthDate === '' ||
      !phoneValidation(phone) ||
      phoneTouched === '') &&
    !user;

  return (
    <Grid container spacing={4}>
      <Grid item xl={6} md={6} className={classes.contianer}>
        <TextField
          required
          id='firstName'
          name='firstName'
          label='שם פרטי'
          onFocus={() => handleTouch('firstName')}
          helperText={
            firstNameTouched && (!nameValidation(firstName) || firstName === '')
              ? 'שם פרטי חייב להיות בין 0 ל 50 תווים לפחות ורק מאותיות !'
              : ''
          }
          error={
            firstNameTouched && (!nameValidation(firstName) || firstName === '')
          }
          fullWidth
          onChange={(e) => onChange(e)}
          value={firstName}
        />
      </Grid>
      <Grid item xs={6} sm={6} className={classes.contianer}>
        <TextField
          required
          onFocus={() => handleTouch('lastName')}
          helperText={
            lastNameTouched && (!nameValidation(lastName) || lastName === '')
              ? ' שם משפחה חייב להיות בין 0 ל 50 תווים לפחות ורק מאותיות!'
              : ''
          }
          error={
            lastNameTouched && (!nameValidation(lastName) || lastName === '')
          }
          id='lastName'
          name='lastName'
          label='שם משפחה'
          autoComplete='family-name'
          fullWidth
          onChange={(e) => onChange(e)}
          value={lastName}
        />
      </Grid>
      <Grid item xs={6} sm={6} className={classes.contianer}>
        <TextField
          required
          type='date'
          id='date'
          name='birthDate'
          fullWidth
          label='תאריך לידה'
          helperText={
            idTouched && birthDate === '' ? 'יש להכניס תאריך לידה' : ''
          }
          error={idTouched && birthDate === ''}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ max: today }}
          value={birthDate}
          onChange={(e) => onChange(e)}
        />
      </Grid>
      {birthDate !== '' && ageValidation(birthDate) >= 18 && (
        <Grid item xs={6} sm={6} className={classes.contianer}>
          <InputLabel
            id='demo-simple-select-label'
            className={classes.selectLabel}
          >
            הבירה המועדפת שלך?
          </InputLabel>
          <Select
            fullWidth
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='beer'
            onChange={(e) => onChange(e)}
            value={beer}
          >
            {beers.map((beerOption) => (
              <MenuItem value={beerOption.value}>{beerOption.key}</MenuItem>
            ))}
          </Select>
        </Grid>
      )}
      <Grid container spacing={4}>
        <Grid item xs={6} sm={6} className={classes.contianer}>
          <TextField
            required
            id='id'
            name='Id'
            onFocus={() => handleTouch('id')}
            helperText={
              idTouched && (!IdValidation(Id) || Id === '')
                ? 'יש להכניס תעודת זהות תקינה!'
                : ''
            }
            error={idTouched && (!IdValidation(Id) || Id === '')}
            label='תעודת זהות'
            fullWidth
            onChange={(e) => onChange(e)}
            value={Id}
          />
        </Grid>
        <Grid item xs={6} sm={6} className={classes.contianer}>
          <TextField
            id='phone'
            name='phone'
            label='טלפון'
            onFocus={() => handleTouch('phone')}
            helperText={
              phoneTouched && (!phoneValidation(phone) || phoneTouched === '')
                ? 'יש להכניס מספר טלפון תקין!'
                : ''
            }
            error={
              phoneTouched && (!phoneValidation(phone) || phoneTouched === '')
            }
            fullWidth
            onChange={(e) => onChange(e)}
            value={phone}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Button
          className={classes.btn}
          disabled={isButtonDisdabled}
          onClick={handleSubmit}
        >
          המשך
        </Button>
      </Grid>
    </Grid>
  );
};

PersonalDetailsTab.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProp, {})(PersonalDetailsTab);
