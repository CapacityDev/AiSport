/**
 * Created by Icey on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, ToastAndroid, RefreshControl, ScrollView, Dimensions, PixelRatio, Alert, AlertIOS} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import theme from '../config/theme';
import px2dp from '../util/px2dp';

export default class SpxHomeFragment extends Component{
    constructor(props){
        super(props);
        this.state = {
            refreshing: false
        }
    }

    render(){
        return(
            <View style={styles.container}>
              <ScrollView refreshControl={
                  <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh.bind(this)}
                      colors={['red','#ffd500','#0080ff','#99e600']}
                      tintColor={theme.themeColor}
                      title="Loading..."
                      titleColor={theme.themeColor}
                  />
              }>
              <Text>SpxHomeFragment</Text>
              </ScrollView>
            </View>
        );
    }

    componentWillMount() {
    }

    onRefresh() {
        this.setState({refreshing: true});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    }
});
