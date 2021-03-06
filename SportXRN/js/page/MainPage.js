/**
 * Created by Icey on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, View, BackAndroid, ToastAndroid} from 'react-native';
import TabBar from '../component/TabBar';
import GuysInfoPage from './GuysInfoPage';
import IndividualPage from './IndividualPage';
import AddGuysPage from './AddGuysPage';
import GuysEntrancePage from './GuysEntrancePage';
import GuysSignupNamePage from './GuysSignupNamePage';
import GuysSignupPhonePage from './GuysSignupPhonePage';
import GuysSignupPasswordPage from './GuysSignupPasswordPage';
import SplashScreen from '../native_modules/SplashScreen';

export default class MainScene extends Component{
    constructor(props) {
        super(props);
        MainScene.switchToUserInfoPage = MainScene.switchToUserInfoPage.bind(this);
        MainScene.switchToIndividualPage = MainScene.switchToIndividualPage.bind(this);
        MainScene.switchToAddGuysPage = MainScene.switchToAddGuysPage.bind(this);
        MainScene.switchToGuysEntrancePage = MainScene.switchToGuysEntrancePage.bind(this);
        MainScene.switchToRegisterPage = MainScene.switchToRegisterPage.bind(this);
        MainScene.switchToGuysSignupPhonePage = MainScene.switchToGuysSignupPhonePage.bind(this);
        MainScene.switchToGuysSignupPasswordPage = MainScene.switchToGuysSignupPasswordPage.bind(this);
    }

    static switchToGuysSignupPasswordPage(userInfo) {
      this.props.navigator.push({
          component: GuysSignupPasswordPage,
          args: { userInfo: userInfo }
      });
    }

    static switchToRegisterPage() {
      this.props.navigator.push({
          component: GuysSignupNamePage,
          args: {}
      });
    }

    static switchToGuysSignupPhonePage(userInfo) {
      this.props.navigator.push({
          component: GuysSignupPhonePage,
          args: { userInfo: userInfo }
      });
    }

    static switchToGuysEntrancePage() {
      this.props.navigator.push({
          component: GuysEntrancePage,
          args: {}
      });
    }

    static switchToAddGuysPage() {
        this.props.navigator.push({
            component: AddGuysPage,
            args: {}
        });
    }

    static switchToUserInfoPage(rowData) {
        this.props.navigator.push({
            component: GuysInfoPage,
            args: {rowData: rowData}
        });
    }

    static switchToIndividualPage(userInfo) {
        this.props.navigator.push({
            component: IndividualPage,
            args: {user: userInfo}
        });
    }

    componentDidMount() {
        SplashScreen.hide();
        BackAndroid.addEventListener('hardwareBackPress', function () {
            BackAndroid.exitApp(0);
            return true;
        });
    }

    render() {
        return(
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <TabBar navigator={this.props.navigator}/>
            </View>
        );
    }
}
