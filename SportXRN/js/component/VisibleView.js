import React, { Component } from 'react';
import { View, } from 'react-native';

export default class VisibleView extends Component {

  static propTypes = {
    visible: React.PropTypes.bool,
    style: React.PropTypes.object
  }

  render() {
    const comp = this.props.visible
      ? <View style={this.props.style}>{this.props.children}</View>
      : null

    return comp
  }
}
