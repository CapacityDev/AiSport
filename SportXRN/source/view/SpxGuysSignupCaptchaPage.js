/**
 * 用户注册，图形验证码界面（用于防止恶意获取手机验证码）
 * Created by Icey on 14/11/16.
 */
import React, { PropTypes, Component } from 'react';
import ReactNative, {Text, View, ScrollView, StyleSheet, Platform, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';
import Button from 'react-native-button';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import ViewPage from '../component/view';
import NavigationBar from '../component/SpxSimpleNavigationBar';

export default class SpxGuysSignupCaptchaPage extends Component {
    constructor(props){
        super(props);

        this.onChangeText = this.onChangeText.bind(this);
        this.nextstepPress = this.nextstepPress.bind(this);

        this.captchaRef = this.updateRef.bind(this, 'captcha');
        this.nextstepbtnRef = this.updateRef.bind(this, 'nextstepbtn');

        this.state = {
          captcha: '',
          nextstepbtncolor: theme.actionBar.backgroundColorThin
        };
        this.captchaisright = false;// 是否合法：true-合法，false-非法
        this.nextstep = false;// 是否可点击下一步：true-是，false-否

        this.userInfo = props.userInfo;// 用户信息对象，用于界面之间数据交互
    }

    onChangeText(text) {
        ['captcha']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
          if (ref) {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
              if ('' != text) {
                if ('captcha' == name) {
                  if ( 0 < text.length ) {
                    this[name + 'isright'] = true;
                  } else {
                    this[name + 'isright'] = false;
                  }
                }
              } else {
                this[name + 'isright'] = false;
              }
              this.updateNextState();
            }
          }
        });
    }

    validInputs() {
    }

    updateNextState() {
      var validRes = false;// 校验结果，true-合法，false-非法
      if (this.captchaisright) {
        validRes = true;
      }
      if (validRes) {
        // 启用下一步按钮
        this.setState({ nextstepbtncolor: 'rgb(255, 255, 255)' });
        this.nextstep = true;
      } else {
        // 禁用下一步按钮
        this.setState({ nextstepbtncolor: theme.actionBar.backgroundColorThin });
        this.nextstep = false;
      }
    }

    updateRef(name, ref) {
      this[name] = ref;
    }

    nextstepPress() {
      if (this.nextstep) {
        this.userInfo.phoneNo = this.captcha.value();
        // 跳转到下一个界面
        this.props.router.push(ViewPage.spxGuysSignupPasswordPage(), { userInfo: this.userInfo });
      } else {
        // 不做处理
      }
    }

    prevstepPress() {
      this.props.router.pop();
    }

    render(){
        let { ...data } = this.state;

        return(
            <View style={styles.container}>
                <NavigationBar title="" backOnPress={() => this.prevstepPress()}/>
                <ScrollView>
                    <Image style={{width:px2dp(150), height:px2dp(36)}} source={{uri:'https://authcode.jd.com/verify/image?a=0&acid=3d5412c1-7207-4f71-9664-04579de4963e&uid=3d5412c1-7207-4f71-9664-04579de4963e&srcid=reg&is=16763316690e822b4f39d71d934ed3dd&yys=1498902409255'}}/>
                    <TextField
                              textColor='rgb(255, 255, 255)'
                              tintColor='rgb(255, 255, 255)'
                              baseColor='rgb(255, 255, 255)'
                              fontSize={px2dp(20)}
                              ref={this.captchaRef}
                              value={data.captcha}
                              autoCorrect={false}
                              enablesReturnKeyAutomatically={true}
                              returnKeyType='next'
                              label='请输入验证码'
                              onChangeText={this.onChangeText}
                    />
                </ScrollView>
                <ActionButton
                            ref={this.nextstepbtnRef}
                            buttonColor={data.nextstepbtncolor}
                            active={true}
                            degrees={0}
                            hideShadow={true}
                            useNativeFeedback={false}
                            icon={<Icon name="ios-arrow-forward" style={styles.actionButtonIcon} />}
                            onPress={this.nextstepPress}>
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
    content: {
        marginHorizontal: px2dp(15),
    },
    text: {
        color: 'white',
        fontSize: px2dp(25),
        fontWeight: 'bold',
    },
    input: {
        marginTop: px2dp(15),
    },
    actionButtonIcon: {
        fontSize: 28,
        height: 30,
        color: theme.actionBar.backgroundColor,
    },
});
