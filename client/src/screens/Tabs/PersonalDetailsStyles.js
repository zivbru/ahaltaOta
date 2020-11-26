import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  '@global': {
    '.MuiFormControl-root > .MuiFormLabel-root': {
      right: 0,
      left: 'auto',
    },
    '.MuiGrid-root > .MuiButtonBase-root': {
      backgroundColor: 'cornflowerblue',
      marginTop: '42px',
      marginRight: 'auto',
    },
  },

  selectLabel: {
    right: 0,
    marginRight: '20px',
  },
}));

export default useStyles;
