/**
 * Created by Icey on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, RefreshControl, ScrollView, ToastAndroid, Image, Dimensions, PixelRatio, Alert, AlertIOS} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import SearchBar from '../component/SpxSearchBar';
import UserListView from '../component/SpxUserListView';
import ViewPage from '../component/view';
import * as GuysAction from '../action/SpxGuys';
import * as UserAction from '../action/user';
import PublicEncrypt from 'crypto';

class SpxGuysFragment extends Component {
  constructor(props){
      super(props);
      this.state = {
          refreshing: true,
          loadedData: false,
          dataBlob: []
      }
  }

  render(){
      return(
          <View style={styles.container}>
              <SearchBar onPress={()=>this.searchButtonCallback()}/>
              <ScrollView
                  refreshControl={
                      <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={()=>this.onRefresh()}
                          colors={['red','#ffd500','#0080ff','#99e600']}
                          tintColor={theme.themeColor}
                          title="Loading..."
                          titleColor={theme.themeColor}
                      />
                  }>
                  { this.renderListView() }
              </ScrollView>
              <ActionButton buttonColor={theme.themeColor}
                            active={true}
                            degrees={0}
                            icon={<Icon name="md-add" style={styles.actionButtonIcon} />}
                            onPress={()=>this.testBtnClickCallback()}>
              </ActionButton>
              <ActionButton buttonColor={theme.themeColor}
                            active={true}
                            degrees={0}
                            position="left"
                            icon={<Icon name="md-add" style={styles.actionButtonIcon} />}
                            onPress={()=>this.testBtnClickCallback()}>
              </ActionButton>
          </View>
      );
  }

  testBtnClickCallback() {
    // this.props.router.push(ViewPage.spxSignEntryPage());
    var userInfo = {};

    userInfo.encryptionSalt = '123456789';
    userInfo.signinPwd = 'wqhr32ur83i09238r';
    userInfo.userFirstName = '张';
    userInfo.userLastName = '三丰';
    userInfo.phoneNo = '13546456455';

    // this.props.guysAction.guysRegist({
    //   userInfo: userInfo,
    //   resolved: (data)=>{
    //   },
    //   rejected: (data)=>{
    //   }
    // });


    // PublicEncrypt
    // publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCT3GC9Kp67occDiBotaVs32faqe6J7ozBmrxptnDARX5/OS01MolLQBZ9WSdIcqXueLGipY3WvFHvZQWZZQXUMlkX/13wqzMMy/V/fKWxjIMTO/O/un9xEf3MRgJzWFZ/F611zU3hA43DNZPueEQzPhweF3E14r29+Pyjt4djEZQIDAQAB';
    // privateKey = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAJPcYL0qnruhxwOIGi1pWzfZ9qp7onujMGavGm2cMBFfn85LTUyiUtAFn1ZJ0hype54saKljda8Ue9lBZllBdQyWRf/XfCrMwzL9X98pbGMgxM787+6f3ER/cxGAnNYVn8XrXXNTeEDjcM1k+54RDM+HB4XcTXivb34/KO3h2MRlAgMBAAECgYEAhC9nOJYKlBl7znd1V5Wxm8u7Dgw7ZSat1Y7DJKyV+GIxfn6pW1JekGQGX2Ddeww1XGG9K3mkMuIwGjiyZCb1mO7tT8qq8DWnYZ1ccdzg5IqHUpNILgkdlyho34oSQSQAcTPezmv0Ei2H9NQVoYixu4b1D3yYIlCDIaXZVcPBmMECQQDUNPm9bDoNwNP6p3V8ctb90DrgQLlPkNU8f4Gu3WHuj3qK/hbRBjRE4eL5ToVrUsviMtORZw19DbsoWEWKJ7axAkEAsl/1akKCHTqXX3cmcAf7baAA68zmxaMY3FBG2alq9U1Y82ziKZY5IMZw1AQTXQJx9cI5l9w/Q4nk/dXNVWr99QJAdQEMnlPZIpIqjy7cCZUsU2AHxnQJeQRrfmLzdx4bjDTSJWb536BjG4PM6RdRWx6YygyqOKawej4i7pjVJtrE0QJAc+ktVfaQDKRVV2Da5nQZa1xNHO2SjJ12ezvjPm/8JBk2E0EPGk0XJHgvO2bGmmsLWNL0j/08UwwZdOVpP/d9vQJBAIi/Fzhza6LEOK3tN2OYxxZa2enpm7hbngRBzFXJ6Kr9PJCgPhbUwA6O36YkaBRP/dr+2cdnqLNi0O/aadKoLes=';

  }

  onRefresh() {
      this.setState({refreshing: true});
      //this.fetchData();
  }

  searchButtonCallback(){

  }

  renderListView(){
      if(!this.state.refreshing || this.state.loadedData) {
          return (
              <UserListView isRenderHeader={false} contents={this.state.dataBlob} />
          );
      }
  }

  fetchData(){
      fetch('http://gold.xitu.io/api/v1/hot/57fa525a0e3dd90057c1e04d/android')
          .then((response) => response.json())
          .then((responseData) => {
              let entry = responseData.rows;
              var dataBlob = [];

              for(let i in entry){
                  let itemInfo = {
                      userName: entry[i].userName, // 用户名
                      userCode: entry[i].userCode, // 用户编号
                      excDays: entry[i].excDays ? entry[i].excDays : 0, // 训练天数
                      latelyDate: entry[i].latelyDate ? entry[i].latelyDate : 0, // 最近训练日期
                      portrait: entry[i].portrait ?  entry[i].portrait : null // 头像
                  }
                  dataBlob.push(itemInfo);
              }

              this.setState({
                  dataBlob: dataBlob,
                  loadedData: true,
                  refreshing: false
              });
          }).done();

  }

  componentDidMount(){
      //this.fetchData();
  }
}

export default connect((state, props) => ({
  posts : state.post,
  user: state.user,
  ui: state.postListUI
}), dispatch => ({
  userAction : bindActionCreators(UserAction, dispatch),
  guysAction : bindActionCreators(GuysAction, dispatch)
}), null, {
  withRef: true
})(SpxGuysFragment);

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: theme.pageBackgroundColor,
      marginBottom: px2dp(62)
  },
  actionButtonIcon: {
      fontSize: 28,
      height: 30,
      color: 'white'
  }
});
