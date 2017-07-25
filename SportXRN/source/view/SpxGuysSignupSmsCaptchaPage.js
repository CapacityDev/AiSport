/**
 * 短信验证码输入界面
 * Created by Icey on 2017/7/9.
 */
import React, { PropTypes, Component } from 'react';
import ReactNative, {Text, View, ScrollView, StyleSheet, Platform, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from '@remobile/react-native-toast';
import { TextField } from 'react-native-material-textfield';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import ViewPage from '../component/view';
import NavigationBar from '../component/SpxSimpleNavigationBar';
import * as ResultCode from '../constant/ResultCode';
import * as GuysConstants from '../constant/GuysConstants';
import * as SpxGuysAction from '../action/SpxGuys';

class SpxGuysSignupSmsCaptchaPage extends Component {
    constructor(props){
        super(props);

        this.onChangeText = this.onChangeText.bind(this);
        this.nextstepPress = this.nextstepPress.bind(this);

        this.smscaptchaRef = this.updateRef.bind(this, 'smscaptcha');
        this.nextstepbtnRef = this.updateRef.bind(this, 'nextstepbtn');

        this.state = {
            smscaptcha: '',
            nextstepbtncolor: theme.actionBar.backgroundColorThin,
        };
        this.smscaptchaisright = false;// 姓氏是否合法：true-合法，false-非法
        this.nextstep = false;// 是否可点击下一步：true-是，false-否

		this.userInfo = props.userInfo;// 用户信息对象，用于界面之间数据交互
		this.smsCaptchaReqInfo = {};// 校验短信验证码请求对象，cacheKey、inText、mobile
    }

    onChangeText(text) {
        ['smscaptcha']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
          if (ref.isFocused()) {
            this.setState({ [name]: text });
            if ('' != text) {
              this[name + 'isright'] = true;
            } else {
              this[name + 'isright'] = false;
            }
            this.updateNextState();
          }
        });
    }

    updateNextState() {
      var validRes = false;// 校验结果，true-合法，false-非法
      if (this.smscaptchaisright) {
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

    nextstepPress() {
		if (this.nextstep) {
			if (GuysConstants.SignupPhoneNo == this.userInfo.signupAccType) {
				// 手机号码注册
				this.smsCaptchaReqInfo.mobile = this.userInfo.phoneNo;// 手机号码
				this.smsCaptchaReqInfo.cacheKey = this.userInfo.smsCacheKey;// 短信验证码缓存key
				
				this.userInfo.smsCaptcha = this.smscaptcha.value();
				this.smsCaptchaReqInfo.inText = this.userInfo.smsCaptcha;
				// 校验短信验证码
				this.props.spxGuysAction.validGuysRegSmsCaptcha({
					reqInfo: this.smsCaptchaReqInfo,
					resolved: (data)=>{
						if (ResultCode.SUCCESS == data.resultCode) {
							// 短信验证码校验成功
							// 跳转到密码输入界面
							this.userInfo.ck = data.cacheKey;// 用户注册校验信息缓存key
							this.props.router.push(ViewPage.spxGuysSignupPasswordPage(), { userInfo: this.userInfo });
						} else {
							// 短信验证码验证失败
							this.setState({ smscaptcha: '' });
							this.captchaisright = false;
							this.updateNextState();
							Toast.show("短信验证码验证失败，请重试");
						}
					},
					rejected: (data)=>{
						// 短信验证码发送失败，提示
						this.setState({ smscaptcha: '' });
						this.captchaisright = false;
						this.updateNextState();
						Toast.show("短信验证码验证失败，请重试");
					}
				});
			} else if (GuysConstants.SignupEmail == this.userInfo.signupAccType) {
				// 邮箱注册
				this.smsCaptchaReqInfo.email = this.userInfo.email;// 邮箱
				this.smsCaptchaReqInfo.cacheKey = this.userInfo.emlCacheKey;// 邮件验证码缓存key
				
				this.userInfo.emlCaptcha = this.smscaptcha.value();
				this.smsCaptchaReqInfo.inText = this.userInfo.emlCaptcha;
				// 校验邮箱验证码
				this.props.spxGuysAction.validGuysRegEmlCaptcha({
					reqInfo: this.smsCaptchaReqInfo,
					resolved: (data)=>{
						if (ResultCode.SUCCESS == data.resultCode) {
							// 短信验证码校验成功
							// 跳转到密码输入界面
							this.userInfo.ck = data.cacheKey;// 用户注册校验信息缓存key
							this.props.router.push(ViewPage.spxGuysSignupPasswordPage(), { userInfo: this.userInfo });
						} else {
							// 短信验证码验证失败
							this.setState({ smscaptcha: '' });
							this.captchaisright = false;
							this.updateNextState();
							Toast.show("验证失败，请重试");
						}
					},
					rejected: (data)=>{
						// 短信验证码发送失败，提示
						this.setState({ smscaptcha: '' });
						this.captchaisright = false;
						this.updateNextState();
						Toast.show("验证失败，请重试");
					}
				});
			} else {
				Toast.show("非法操作");
			}
		} else {
		// 不做处理
		}
    }

    prevstepPress() {
      this.props.router.pop();
    }

    updateRef(name, ref) {
      this[name] = ref;
    }

    render(){
        let { ...data } = this.state;

        return(
            <View style={styles.container}>
                <NavigationBar title="" backOnPress={() => this.prevstepPress()}/>
                <ScrollView>
                    <View style={styles.content}>
                        <Text style={styles.text}>您收到的验证码是？</Text>
                        <TextField
                                  textColor='rgb(255, 255, 255)'
                                  tintColor='rgb(255, 255, 255)'
                                  baseColor='rgb(255, 255, 255)'
                                  fontSize={px2dp(20)}
                                  ref={this.smscaptchaRef}
                                  value={data.smscaptcha}
                                  autoCorrect={false}
                                  enablesReturnKeyAutomatically={true}
                                  returnKeyType='next'
                                  label='请输入证码'
                                  onChangeText={this.onChangeText}
                        />
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
  spxGuysAction : bindActionCreators(SpxGuysAction, dispatch)
}), null, {
  withRef: true
})(SpxGuysSignupSmsCaptchaPage);

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
