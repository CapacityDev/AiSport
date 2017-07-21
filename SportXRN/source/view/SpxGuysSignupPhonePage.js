/**
 * 用户注册，姓名填写界面
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
import * as ResultCode from '../constant/ResultCode';
import * as GuysConstants from '../constant/GuysConstants';
import * as SpxGuysAction from '../action/SpxGuys';
import * as ValidUtil from '../util/validutil';

class SpxGuysSignupPhonePage extends Component {
    constructor(props){
        super(props);

        this.onChangeText = this.onChangeText.bind(this);
        this.nextstepPress = this.nextstepPress.bind(this);

        this.phonenumberRef = this.updateRef.bind(this, 'phonenumber');
        this.emailRef = this.updateRef.bind(this, 'email');
        this.nextstepbtnRef = this.updateRef.bind(this, 'nextstepbtn');

        this.state = {
			phonenumber: '',
			email: '',
			nextstepbtncolor: theme.actionBar.backgroundColorThin,
			phonevisible: true,
			emailvisible: false,
        };
        this.phonenumberisright = false;// 是否合法：true-合法，false-非法
        this.emailisright = false;// 是否合法：true-合法，false-非法
        this.nextstep = false;// 是否可点击下一步：true-是，false-否
		this.accType = GuysConstants.SignupPhoneNo;// 注册账号类型：1-手机号码，2-邮箱

        this.userInfo = props.userInfo;// 用户信息对象，用于界面之间数据交互
    }
	
	componentDidMount() {
		// 输入框聚焦
		//this.phonenumber.focus();
	}

    onChangeText(text) {
        ['phonenumber', 'email']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
          if (ref) {
            if (ref.isFocused()) {
				this.setState({ [name]: text });
				if ('' != text) {
					if ('phonenumber' == name) {
						if (ValidUtil.valid(text, 1)) {
							this[name + 'isright'] = true;
						} else {
							this[name + 'isright'] = false;
						}
					} else if ('email' == name) {
						if (ValidUtil.valid(text, 3)) {
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
		if (this.phonenumberisright || this.emailisright) {
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
			this.userInfo.signupAccType = this.accType;
			let signupAcc = "";
			if (GuysConstants.SignupPhoneNo == this.accType) {
				// 手机号码注册
				this.userInfo.phoneNo = this.phonenumber.value();
				signupAcc = this.userInfo.phoneNo;
			} else if (GuysConstants.SignupEmail == this.accType) {
				// 邮箱注册
				this.userInfo.emial = this.phonenumber.value();
				signupAcc = this.userInfo.emial;
			} else {
				// 失败
				alert('非法操作');
				return;
			}
			// 判断手机号或邮箱是否已注册
			this.props.spxGuysAction.signupAccValid({
				reqInfo: signupAcc,
				resolved: (data)=>{
					if (ResultCode.SUCCESS == data.resultCode) {
						if (GuysConstants.AccNotExisted == data.repData) {
							// 账号可用
							// 跳转到下一个界面
							this.props.router.push(ViewPage.spxGuysSignupCaptchaPage(), { userInfo: this.userInfo });
						} else if(GuysConstants.AccExisted == data.repData) {
							// 账号已注册
							if (GuysConstants.SignupPhoneNo == this.accType) {
								Toast.show("此手机号码已注册，可尝试登录。");
							} else if (GuysConstants.SignupEmail == this.accType) {
								Toast.show("此邮箱已注册，可尝试登录。");
							}
						} else {
							// 失败
							Toast.show("账号验证失败，请稍后重试");
						}
					} else {
						// 失败
						Toast.show("账号验证失败，请稍后重试");
					}
				},
				rejected: (data)=>{
					Toast.show("账号验证失败，请稍后重试");
				}
			});
		} else {
			// 不做处理
		}
    }

    prevstepPress() {
		this.props.router.pop();
    }

    useEmailRegPress() {
		this.setState({ phonevisible: false,  emailvisible: true });
		this.accType = GuysConstants.SignupEmail;// 注册账号类型：1-手机号码，2-邮箱
		// 清空手机号码输入框
		this.state.phonenumber = "";
		this.phonenumberisright = false;
		this.updateNextState();
    }

    usePhoneRegPress() {
		this.setState({ phonevisible: true,  emailvisible: false });
		this.accType = GuysConstants.SignupPhoneNo;// 注册账号类型：1-手机号码，2-邮箱
		// 清空邮箱输入框
		this.state.email = "";
		this.emailisright = false;
		this.updateNextState();
    }

    render(){
        let { ...data } = this.state;

        return(
            <View style={styles.container}>
                <NavigationBar title="" backOnPress={() => this.prevstepPress()}/>
                <ScrollView>
                  <View style={styles.content}>
                    <VisibleView visible={data.phonevisible}>
                        <Text style={styles.text}>您的电话号码是？</Text>
                        <TextField
							textColor='rgb(255, 255, 255)'
							tintColor='rgb(255, 255, 255)'
							baseColor='rgb(255, 255, 255)'
							fontSize={px2dp(20)}
							ref={this.phonenumberRef}
							value={data.phonenumber}
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							returnKeyType='next'
							label='电话'
							onChangeText={this.onChangeText}
                        />
                        <Button
							containerStyle={{marginTop: px2dp(10), width: px2dp(105), height: px2dp(25), borderRadius:4}}
							onPress={() => this.useEmailRegPress()}>
                            <Text style={{fontSize: px2dp(15), color: 'white', textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationColor: 'white'}}>使用邮箱注册</Text>
                        </Button>
                    </VisibleView>
                    <VisibleView visible={data.emailvisible}>
                        <Text style={styles.text}>您的邮箱是？</Text>
                        <TextField
							textColor='rgb(255, 255, 255)'
							tintColor='rgb(255, 255, 255)'
							baseColor='rgb(255, 255, 255)'
							fontSize={px2dp(20)}
							ref={this.emailRef}
							value={data.email}
							autoCorrect={false}
							enablesReturnKeyAutomatically={true}
							returnKeyType='next'
							label='邮箱'
							onChangeText={this.onChangeText}
                        />
                        <Button
							containerStyle={{marginTop: px2dp(10), width: px2dp(105), height: px2dp(25), borderRadius:4}}
							onPress={() => this.usePhoneRegPress()}>
                            <Text style={{fontSize: px2dp(15), color: 'white', textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationColor: 'white'}}>使用手机注册</Text>
                        </Button>
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
	spxGuysAction : bindActionCreators(SpxGuysAction, dispatch)
}), null, {
	withRef: true
})(SpxGuysSignupPhonePage);

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
