/**
 * Created by Icey on 24/05/2017.
 * 添加学员
 */
'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, RefreshControl, ScrollView, ToastAndroid, Image, Dimensions, PixelRatio, Alert, AlertIOS} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import SearchBar from '../component/SearchBar';
import Swiper from 'react-native-swiper';
import UserListView from '../component/UserListView';

const saeInput = (
  <Sae
    label={'Email Address'}
    iconClass={FontAwesomeIcon}
    iconName={'pencil'}
    iconColor={'white'}
    // TextInput props
    autoCapitalize={'none'}
    autoCorrect={false}
  />
);

export default class AddGuysFragment extends Component{
  constructor(props){
      super(props);
      this.state = {

      }
  }

  render(){
      return(
          <View style={styles.container}>
              <SearchBar onPress={this._searchButtonCallback.bind(this)}/>
              <ScrollView
                  refreshControl={
                      <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh.bind(this)}
                          colors={['red','#ffd500','#0080ff','#99e600']}
                          tintColor={theme.themeColor}
                          title="Loading..."
                          titleColor={theme.themeColor}
                      />
                  }>
                  { this._renderListView() }
              </ScrollView>
              <ActionButton buttonColor={theme.themeColor}
                            active={true}
                            degrees={0}
                            icon={<Icon name="md-add" style={styles.actionButtonIcon} />}
                            onPress={() => {}}>
              </ActionButton>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: theme.pageBackgroundColor,
      marginBottom: px2dp(62),
  },
  actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
  }
});
