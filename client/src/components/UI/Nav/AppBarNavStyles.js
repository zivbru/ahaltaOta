import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    direction: 'rtl',
  },
  title: {
    flexGrow: 1,
    direction: 'ltr',
  },
  direction: {
    direction: 'rtl',
  },
}));

export default useStyles;
