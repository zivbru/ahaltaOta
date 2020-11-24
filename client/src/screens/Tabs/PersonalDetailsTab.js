import React, { useState } from 'react';
import './PersonalDetailsTab.css';
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Button,
} from '@material-ui/core';
import {
  getToday,
  nameValidation,
  IdValidation,
  phoneValidation,
  ageValidation,
} from '../../components/Validation/validation';
import { makeStyles } from '@material-ui/core/styles';

const initialState = {
  firstName: '',
  lastName: '',
  birthDate: '',
  beer: '',
  Id: '',
  phone: '',
};

const today = getToday();

const PersonalDetailsTab = ({ nextTab, beers }) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      width: '100%',
    },
  }));

  const classes = useStyles();

  const [formData, setFormData] = useState(initialState);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { firstName, lastName, birthDate, beer, Id, phone } = formData;

  const handleSubmit = (e) => {
    nextTab(null, 1, formData);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xl={6} md={6} className='contianer'>
        <TextField
          required
          id='firstName'
          name='firstName'
          label='שם פרטי'
          //   error={isSubmitted && firstNameError}
          fullWidth
          onChange={(e) => onChange(e)}
          value={firstName}
        />
      </Grid>
      <Grid item xs={6} sm={6} className='contianer'>
        <TextField
          required
          id='lastName'
          name='lastName'
          label='שם משפחה'
          autoComplete='family-name'
          //   error={isSubmitted && lastNameError}
          fullWidth
          onChange={(e) => onChange(e)}
          value={lastName}
        />
      </Grid>
      <Grid item xs={6} sm={6} className='contianer'>
        <TextField
          required
          type='date'
          id='date'
          name='birthDate'
          fullWidth
          label='תאריך לידה'
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ max: today }}
          value={birthDate}
          onChange={(e) => onChange(e)}
        />
      </Grid>
      {birthDate !== '' && ageValidation(birthDate) >= 18 && (
        <Grid item xs={6} sm={6} className='contianer'>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label' className='select-label'>
              הבירה המועדפת שלך?
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='beer'
              onChange={(e) => onChange(e)}
              value={beer}
            >
              {/* get it from the server */}
              {beers.map((beerOption) => (
                <MenuItem value={beerOption.value}>{beerOption.key}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
      <Grid container spacing={4}>
        <Grid item xs={6} sm={6} className='contianer'>
          <TextField
            required
            id='id'
            name='Id'
            // error={isSubmitted && IdError}
            label='תעודת זהות'
            fullWidth
            onChange={(e) => onChange(e)}
            value={Id}
          />
        </Grid>
        <Grid item xs={6} sm={6} className='contianer'>
          <TextField
            id='phone'
            name='phone'
            label='טלפון'
            // error={isSubmitted && phoneError}
            fullWidth
            onChange={(e) => onChange(e)}
            value={phone}
          />
        </Grid>
      </Grid>
      <Grid container>
        {/* disabled={btnDisabled} */}
        <Button className='btn' onClick={handleSubmit}>
          המשך
        </Button>
      </Grid>
    </Grid>
  );
};

export default PersonalDetailsTab;
