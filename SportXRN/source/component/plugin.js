import React, { Component } from 'react';
import {
	View,
	Platform,
	StatusBar,
} from 'react-native';

import Updater from './updater';
import Messager from './messager';
import theme from '../config/theme';

class Plugin extends Component {

	constructor(props) {
	    super(props);
	}

	renderUpdater(){
		if(Platform.OS === 'android'){
			return (
				<Updater router = { this.props.router }/>
			);
		}
	}

	renderMessager(){
		return (
			<Messager router = { this.props.router }/>
		);
	}

	render(){
		return (
			<View>
				<StatusBar
					translucent ={ false }
					backgroundColor={theme.actionBar.backgroundColor}
					barStyle="light-content" />
					
				{ this.renderUpdater() }
				{ this.renderMessager() }
			</View>
		);
	}
}

export default Plugin;



