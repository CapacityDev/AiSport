/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Navigation from './js/config/entry';

export default class SportXRN extends Component {
  render() {
    return (
      <Navigation/>
    );
  }
}

AppRegistry.registerComponent('SportXRN', () => SportXRN);
