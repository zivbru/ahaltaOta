import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  'align-right > .MuiTypography-root': {
    display: 'flex',
    marginRight: '10px',
  },
  textAlign: {
    marginRight: '25px',
  },
  'text-align > .MuiFormLabel-root': {
    left: 'auto',
  },
  alignGrid: {
    marginRight: '28px',
  },
  'container > .MuiButtonBase-root': {
    backgroundColor: 'cornflowerblue',
    marginTop: '70px',
  },
}));

export default useStyles;
