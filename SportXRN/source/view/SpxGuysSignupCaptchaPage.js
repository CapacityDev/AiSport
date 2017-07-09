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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from '@remobile/react-native-toast';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import ViewPage from '../component/view';
import NavigationBar from '../component/SpxSimpleNavigationBar';
import VisibleView from '../component/SpxVisibleView';
import { StyleConfig } from '../style';
import * as imgsconstant from '../image/imgsconstant';
import * as ResultCode from '../constant/ResultCode';
import * as SpxCommonAction from '../action/SpxCommon';
import * as SpxGuysAction from '../action/SpxGuys';

class SpxGuysSignupCaptchaPage extends Component {
    constructor(props){
        super(props);

        this.onChangeText = this.onChangeText.bind(this);
        this.captchaInputFocus = this.captchaInputFocus.bind(this);
        this.captchaInputBlur = this.captchaInputBlur.bind(this);
        this.nextstepPress = this.nextstepPress.bind(this);
        this.captchaPicPress = this.captchaPicPress.bind(this);// 点击验证码图片

        this.captchaRef = this.updateRef.bind(this, 'captcha');
        this.nextstepbtnRef = this.updateRef.bind(this, 'nextstepbtn');

        this.state = {
          captcha: '',
          captchaPic: 'data:image/png;base64,' + imgsconstant.PicCaptchaEmptyBase64,
          nextstepbtncolor: theme.actionBar.backgroundColorThin,
          tipinfovisible: false
        };
        this.captchaisright = false;// 是否合法：true-合法，false-非法
        this.nextstep = false;// 是否可点击下一步：true-是，false-否

        this.userInfo = props.userInfo;// 用户信息对象，用于界面之间数据交互
        this.smsCaptchaReqInfo = {};// 短信验证码请求对象，cacheKey、inText、mobile
        this.smsCaptchaReqInfo.mobile = this.userInfo.phoneNo;
        this.smsCaptchaReqInfo.cacheKey = '';
    }

    componentDidMount() {
      this.getPicCaptcha();
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

    // 验证码输入框获得焦点后触发
    captchaInputFocus() {
      // 验证码输入框获取焦点后，展示提示信息
      this.setState({ tipinfovisible: true });
    }

    // 验证码输入框失去焦点后触发
    captchaInputBlur() {
      // 验证码输入框获取焦点后，隐藏提示信息
      this.setState({ tipinfovisible: false });
    }

    // 点击验证码图片时触发
    captchaPicPress() {
      // 重新获取图形验证码
      this.getPicCaptcha();
    }

    // 获取验证码
    getPicCaptcha() {
      this.props.spxCommonAction.getPicCaptcha({
        picCapCkOld: this.smsCaptchaReqInfo.cacheKey,
        resolved: (data)=>{
          if (data) {
            if (ResultCode.SUCCESS == data.generateResult) {
              // 获取图形验证码成功
              this.setState({ captchaPic: 'data:image/png;base64,' + data.captchaImgBase64 });
              this.smsCaptchaReqInfo.cacheKey = data.cacheKey;
            } else {
              // 获取图形验证码失败，提示
              this.setState({ tipinfovisible: true });
              Toast.show("获取验证码失败，请重试");
            }
          }
        },
        rejected: (data)=>{
          // 请求失败，提示
          this.setState({ tipinfovisible: true });
          Toast.show("获取验证码失败，请重试");
        }
      });
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
        this.smsCaptchaReqInfo.inText = this.captcha.value();
        // 发送短信验证码请求
        this.props.spxGuysAction.getGuysRegSmsCaptcha({
          reqInfo: this.smsCaptchaReqInfo,
          resolved: (data)=>{
            if (ResultCode.SUCCESS == data.resultCode) {
              // 发送短信验证码成功
              // 跳转到短信验证码输入界面
              this.props.router.push(ViewPage.spxGuysSignupSmsCaptchaPage(), { userInfo: this.userInfo });
            } else {
              // 短信验证码发送失败，提示，清除图形验证码输入框中的内容，重新获取图形验证码
              this.setState({ captcha: '' });
              this.captchaisright = false;
              this.updateNextState();
              this.getPicCaptcha();
              Toast.show("发送短信验证码失败，请重试");
            }
          },
          rejected: (data)=>{
            // 短信验证码发送失败，提示，清除图形验证码输入框中的内容，重新获取图形验证码
            this.setState({ captcha: '' });
            this.captchaisright = false;
            this.updateNextState();
            this.getPicCaptcha();
            Toast.show("发送短信验证码失败，请重试");
          }
        });
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
                  <View style={styles.content}>
                    <TouchableOpacity
              				activeOpacity={ StyleConfig.touchable_press_opacity }
              				onPress={ this.captchaPicPress }
              				>
                      <Image style={{width:px2dp(150), height:px2dp(36)}} source={{uri:data.captchaPic}}/>
                    </TouchableOpacity>
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
                              onFocus={this.captchaInputFocus}
                              onBlur={this.captchaInputBlur}
                    />
                    <VisibleView visible={data.tipinfovisible}>
                      <Text style={{fontSize: px2dp(15), color: 'white'}}>看不清？点击图片更换验证码</Text>
                    </VisibleView>
                  </View>
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

export default connect((state, props) => ({
}), dispatch => ({
  spxCommonAction : bindActionCreators(SpxCommonAction, dispatch),
  spxGuysAction : bindActionCreators(SpxGuysAction, dispatch)
}), null, {
  withRef: true
})(SpxGuysSignupCaptchaPage);

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
