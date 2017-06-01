/**
 * Created by Icey on 14/11/16.
 */
import React, {PropTypes} from 'react';
import ReactNative, {Text, View, StyleSheet, Platform, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import NavigationBar from '../component/NavigationBarWithRightButton';
import PageComponent from './BackPageComponent';

export default class AddGuysPage extends PageComponent{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <NavigationBar title="添加学员" backOnPress={this._handleBack.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
