/**
 * 用户注册，姓名填写界面
 * Created by Icey on 14/11/16.
 */
import React, {
  PropTypes,
  Component
} from 'react';
import ReactNative, {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ListView,
  Image,
  PixelRatio,
  BackAndroid
} from 'react-native';
import Button from 'react-native-button';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import ViewPage from '../component/view';

export default class SpxSigninEntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  registerPress() {
    this.props.router.push(ViewPage.spxGuysSignupNamePage());
  }

  render(){
    let { ...data } = this.state;

    return(
      <View style={styles.container}>
        <ScrollView>
          <View visible={data.phonevisible} style={styles.content}>
            <Button
              containerStyle={{paddingTop: px2dp(12), marginTop: px2dp(10), height: px2dp(45), borderRadius: px2dp(45), backgroundColor: 'white'}}
              style={{fontSize: px2dp(15), color: theme.actionBar.backgroundColor}}
              onPress={() => {}}>
              使用微信账号登录
            </Button>
            <Button
              containerStyle={{paddingTop: px2dp(12), marginTop: px2dp(10), height: px2dp(45), borderRadius: px2dp(45), backgroundColor: 'white'}}
              style={{fontSize: px2dp(15), color: theme.actionBar.backgroundColor}}
              onPress={() => {}}>
              使用QQ账号登录
            </Button>
            <Button
              containerStyle={{paddingTop: px2dp(12), marginTop: px2dp(10), height: px2dp(45), borderRadius: px2dp(45), backgroundColor: 'white'}}
              style={{fontSize: px2dp(15), color: theme.actionBar.backgroundColor}}
              onPress={() => {}}>
              使用新浪微博账号登录
            </Button>
            <Button
              containerStyle={{paddingTop: px2dp(12), marginTop: px2dp(10), height: px2dp(45), borderRadius: px2dp(45), backgroundColor: theme.actionBar.backgroundColor, borderWidth:px2dp(1), borderColor: 'white'}}
              style={{fontSize: px2dp(15), color: 'white'}}
              onPress={() => this.registerPress()}>
              注册
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.actionBar.backgroundColor,
  },
  content: {
    marginHorizontal: px2dp(15),
  },
});
