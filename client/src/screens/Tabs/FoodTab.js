import React, { useState } from 'react';
import useStyles from './FoodsTabStyles';

import {
  List,
  ListItem,
  Checkbox,
  ListItemText,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';

const FoodTab = ({ foods, handleSubmit, initialState }) => {
  const [checked, setChecked] = useState(initialState);
  const [other, setOther] = useState('');
  const [otherCheckbox, setOtherCheckbox] = useState(false);
  const classes = useStyles();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    foods[value].checked = !foods[value].checked;
    setChecked(newChecked);
  };

  const onSubmit = () => {
    const chossenFood = foods.filter((food) => food.checked === true);
    if (otherCheckbox) {
      chossenFood.push(other);
    }

    handleSubmit(chossenFood);
  };

  return (
    <List>
      {foods.map((key, value) => {
        const labelId = `checkbox-list-label-${key.name}`;
        return (
          <ListItem key={value} dense button onClick={handleToggle(value)}>
            <Checkbox
              edge='start'
              checked={checked.indexOf(value) !== -1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
            <ListItemText
              id={labelId}
              primary={key.name}
              style={{ display: 'flex', marginRight: 10 }}
            />
          </ListItem>
        );
      })}
      <ListItem
        key={'אחר'}
        dense
        button
        onClick={() => setOtherCheckbox((prev) => !prev)}
      >
        <Checkbox
          edge='start'
          checked={otherCheckbox}
          disableRipple
          inputProps={{ 'aria-labelledby': 'checkbox-list-label-other' }}
        />
        <ListItemText
          primary='אחר'
          style={{ display: 'flex', marginRight: 10 }}
        />
      </ListItem>
      <Grid className={classes.alignGrid}>
        {otherCheckbox && (
          <TextField
            id='other'
            name='other'
            label='אחר'
            value={other}
            onChange={(e) => setOther(e.target.value)}
            className={classes.textAlign}
          />
        )}
      </Grid>
      <Grid className={classes.alignGrid}>
        <Button onClick={onSubmit}>סיום</Button>
      </Grid>
    </List>
  );
};

export default FoodTab;
