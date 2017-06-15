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
import Crypto from 'crypto';
import * as CryptoJS from 'crypto-js';

export default class SpxGuysFragment extends Component {
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

    console.log(Crypto.randomBytes(32).toString('hex'));

    let publicKey = `-----BEGIN PUBLIC KEY-----`
    + `\n`
    + `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCLrkCtjNgE4dvPeRcE7sNGC7srRKG/KFtyEm2mBJKvnf3n1MgCAXJFjnLgMOEYaZSK8SfMhnVlkyop7A2Rxyo0Hid+kchDh68qlFC6qBgddMNPM5AD+cGylhzyV6Z5c9kYwfUUnTNnwifC3mWN3cLHcwH7iiUjbom6Q23i3fQsNQIDAQAB`
    + `\n`
    + `-----END PUBLIC KEY-----`;

    let privateKey = `-----BEGIN PRIVATE KEY-----`
    + `\n`
    + `MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIuuQK2M2ATh2895FwTuw0YLuytEob8oW3ISbaYEkq+d/efUyAIBckWOcuAw4RhplIrxJ8yGdWWTKinsDZHHKjQeJ36RyEOHryqUULqoGB10w08zkAP5wbKWHPJXpnlz2RjB9RSdM2fCJ8LeZY3dwsdzAfuKJSNuibpDbeLd9Cw1AgMBAAECgYALjuS9N61cYhAdT+jOuK8h6bCYOPqlZcKDYvD9zt0QeSNcfqf6OoJpLQtmb8UAjyQCh0gCzZGDUTUo+OZ6jJ96Rt7Tlu3uBkDTFlKg1bB2e4h6iUk45Kbceg4XK/PpoA/U/o6Hun1SYXXJ1hQtPvHftTObL+KdxkjgrK9dmiGFVQJBAN3LQ17+I4r3RLKkXF0iCrCTqnw8WZDEy0n9o6UTpz/iUlNf3rQSALDA1hAZ1CAY0znhK+/uAkEmVWirbaZnfB8CQQChOQpyHa6u7e7kGCIK418ZZTgnE1y249SztqPnKEva3S/HNiu2kfLbM4DZ6G9urpi70+S6Rxn1m1XdEiDuI00rAkEAuTsBl/rtGijqAbvMu6crgE7CyiDouEPyd2fR3JKuUmckVCcz6fVDCFr0K9w2UVwKRENum2GOFnT6TYEmARxaBwJAFAMnl8i1cUNZnvib6SwWFunokXkmzhDzyycFq2DmIZHJJ3pC7NOrCKiY+vOOOXf0v4Pq5XCD+WfBvcJNUiIRpwJAMJ+mroQ3TVsNSP5+ljGWLN4hbQhTwT/lW6YW49wCjBiPjtAc3Z5cDCBjNLkSVttTLgiu1Zz96cgyog5wkNPGrw==`
    + '\n'
    + `-----END PRIVATE KEY-----`;
    let encrypted = Crypto.publicEncrypt({
      padding: 1,
      key: publicKey
    }, new Buffer('电话覅uadsfddsf敌法阿斯顿发呆圣达菲就卡死的方法IERPG好人'), false);
    console.log('encrypted:'+encrypted);

    let decrypted = Crypto.privateDecrypt({
      padding: 1,
      key: privateKey
    }, encrypted, false).toString();
    console.log('decrypted:'+decrypted);

    var encryptedPBKDF2 = CryptoJS.PBKDF2('data', 'solt', { keySize: 256/32, iterations: 1200 });// 长度64
    console.log('encryptedPBKDF2:'+encryptedPBKDF2);
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
