import { Text, SafeAreaView, StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import { store } from './Redux/store';
import Display from './components/display';
import DisplayReducer from './UseReducer/display';
export default function App() {
  return (
    <Provider store={store}>
      <Display />
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
