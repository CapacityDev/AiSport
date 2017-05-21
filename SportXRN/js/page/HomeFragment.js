/**
 * Created by Icey on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, ToastAndroid, RefreshControl, ScrollView, Dimensions, PixelRatio, Alert, AlertIOS} from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ImageButton from '../component/ImageButtonWithText';

const imgBtnImages = [
    require('../image/trend.png'),
    require('../image/rank.png'),
    require('../image/hot.png')
];

export default class HomeFragment extends Component{
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            btnName: ['沸点','贡献榜','本周最热']
        }
    }

    render(){
        return(
            <View style={styles.container}>
              <View style={styles.actionBar}>
                  <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize}}>首页</Text>
              </View>
              <ScrollView refreshControl={
                  <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh.bind(this)}
                      colors={['red','#ffd500','#0080ff','#99e600']}
                      tintColor={theme.themeColor}
                      title="Loading..."
                      titleColor={theme.themeColor}
                  />
              }>
              <View style={styles.imageBtnLine}>
                  {this.state.btnName.map((item, index) => {
                      return(
                      <ImageButton
                          key={index}
                          image={imgBtnImages[index]}
                          imgSize={px2dp(35)}
                          text={item}
                          color="#000"
                          btnStyle={styles.imgBtn}
                          onPress={this._imageButtonCallback.bind(this, index)}/>
                      )})
                  }
              </View>
              </ScrollView>
            </View>
        );
    }

    componentWillMount() {
    }

    _onRefresh() {
        this.setState({refreshing: true});
    }

    _imageButtonCallback(position){
        this._alert();
    }

    _alert(){
        if(Platform.OS === 'android') {
            Alert.alert(
                'Message',
                "This function currently isn't available",
                [{text: 'OK', onPress: () => {}}]
            );
        }else if(Platform.OS === 'ios'){
            AlertIOS.alert(
                'Message',
                "This function currently isn't available",
                [{text: 'OK', onPress: () => {}}]
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    text: {
        color: theme.text.color,
        fontSize: theme.text.fontSize
    },
    actionBar: {
        height: theme.actionBar.height,
        backgroundColor: theme.actionBar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0
    },
    image: {
        height: px2dp(130),
        width: Dimensions.get('window').width
    },
    imageBtnLine:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: '#c4c4c4'
    },
    imgBtn: {
        height: px2dp(80),
        width: Dimensions.get('window').width/3,
    }
});
