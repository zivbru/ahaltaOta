import AppBarNav from './components/UI/Nav/AppBarNav';

import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';
import MainScreen from './screens/MainScreen.js/MainScreen';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <AppBarNav />
        <MainScreen />
      </Provider>
    </div>
  );
}

export default App;
