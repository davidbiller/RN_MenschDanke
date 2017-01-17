import React from 'react';
import { StatusBar } from 'react-native';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import Home from './screens/Home';

const Router = createRouter(() => ({
  Home: () => Home,
}));


export default class extends React.Component {
  componentWillMount() {
    StatusBar.setBarStyle('default', false);
  }

  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation
          id={'master'}
          initialRoute={Router.getRoute('Home')}
        />
      </NavigationProvider>
    );
  }
}
