/**
 * Created by Icey on 14/11/16.
 */
import React, {PropTypes} from 'react';
import ReactNative, {Text, View, StyleSheet, Platform, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import NavigationBar from '../component/SimpleNavigationBar';
import PageComponent from './BackPageComponent';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Hoshi,
} from 'react-native-textinput-effects';

export default class GuysSignupPage extends PageComponent{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar title="" backOnPress={this._handleBack.bind(this)}/>
                <Text style={styles.text}>怎么称呼您？</Text>
                <Hoshi
                  style={styles.input}
                  label={'姓氏'}
                  borderColor={theme.actionBar.backgroundColor}
                  maskColor={theme.actionBar.backgroundColor}
                />
                <Hoshi
                  style={styles.input}
                  label={'名字'}
                  borderColor={theme.actionBar.backgroundColor}
                  maskColor={theme.actionBar.backgroundColor}
                />
                <ActionButton buttonColor={theme.actionBar.backgroundColorThin}
                              active={true}
                              degrees={0}
                              hideShadow={true}
                              useNativeFeedback={false}
                              icon={<Icon name="ios-arrow-forward" style={styles.actionButtonIcon} />}
                              onPress={() => {}}>
                </ActionButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.actionBar.backgroundColor,
    },
    text: {
        marginLeft: px2dp(15),
        marginRight: px2dp(15),
        color: 'white',
        fontSize: px2dp(25),
        fontWeight: 'bold',
    },
    input: {
        marginTop: px2dp(15),
        marginLeft: px2dp(15),
        marginRight: px2dp(15),
    },
    actionButtonIcon: {
        fontSize: 28,
        height: 30,
        color: theme.actionBar.backgroundColor,
    },
});
