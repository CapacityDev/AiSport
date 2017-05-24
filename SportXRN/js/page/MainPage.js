/**
 * Created by Icey on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, View, BackAndroid, ToastAndroid} from 'react-native';
import TabBar from '../component/TabBar';
import GuysInfoPage from './GuysInfoPage';
import IndividualPage from './IndividualPage';
import SplashScreen from '../native_modules/SplashScreen';

export default class MainScene extends Component{
    constructor(props){
        super(props);
        MainScene.switchToUserInfoPage = MainScene.switchToUserInfoPage.bind(this);
        MainScene.switchToIndividualPage = MainScene.switchToIndividualPage.bind(this);
    }

    static switchToUserInfoPage(rowData){
        this.props.navigator.push({
            component: GuysInfoPage,
            args: {rowData: rowData}
        });
    }

    static switchToIndividualPage(userInfo){
        this.props.navigator.push({
            component: IndividualPage,
            args: {user: userInfo}
        });
    }

    componentDidMount(){
        SplashScreen.hide();
        BackAndroid.addEventListener('hardwareBackPress', function () {
            BackAndroid.exitApp(0);
            return true;
        });
    }

    render(){
        return(
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <TabBar navigator={this.props.navigator}/>
            </View>
        );
    }
}
