/**
 * 用户注册，姓名填写界面
 * Created by Icey on 14/11/16.
 */
import React, {PropTypes} from 'react';
import ReactNative, {Text, View, ScrollView, StyleSheet, Platform, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import NavigationBar from '../component/SimpleNavigationBar';
import PageComponent from './BackPageComponent';
import MainPage from './MainPage';
import * as UserAction from '../action/user';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
import Button from 'react-native-button';
import MD5 from 'crypto-js/md5';
import PBKDF2 from 'crypto-js/pbkdf2';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class GuysSignupPasswordPage extends PageComponent{
    constructor(props){
        super(props);

        this.onChangeText = this.onChangeText.bind(this);
        this.nextstepPress = this.nextstepPress.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);
        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.passwordRef = this.updateRef.bind(this, 'password');
        this.nextstepbtnRef = this.updateRef.bind(this, 'nextstepbtn');

        this.state = {
          password: '',
          message: '',
          nextstepbtncolor: theme.actionBar.backgroundColorThin,
          secureTextEntry: true,
        };
        this.passwordisright = false;// 是否合法：true-合法，false-非法
        this.nextstep = false;// 是否可点击下一步：true-是，false-否

        this.userInfo = props.userInfo;// 用户信息对象，用于界面之间数据交互
    }

    onAccessoryPress() {
      this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }

    renderPasswordAccessory() {
      let { secureTextEntry } = this.state;

      let name = secureTextEntry?
        'visibility':
        'visibility-off';

      return (
        <MaterialIcon
          size={24}
          name={name}
          color={TextField.defaultProps.baseColor}
          onPress={this.onAccessoryPress}
          suppressHighlighting
        />
      );
    }

    onChangeText(text) {
        ['password']
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

    validInputs() {
    }

    updateNextState() {
      var validRes = false;// 校验结果，true-合法，false-非法
      if (this.passwordisright) {
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
      const { userAction } = this.props;
      userAction.getUserPwdSalt();
      var PBKDF2Val = PBKDF2(this.password.value(), 'pass phrase exceeds block size', { keySize: 256/32, iterations: 1200 }).toString();
      //this.setState({ message: 'MD5: ' + MD5(this.password.value()).toString()});
      this.setState({ message: 'PBKDF2: ' + PBKDF2Val });
      if (this.nextstep) {
        // 跳转到下一个界面
      } else {
        // 不做处理
      }
    }

    useEmailRegPress() {
      this.setState({ phonevisible: false,  emailvisible: true });
    }

    usePhoneRegPress() {
      this.setState({ phonevisible: true,  emailvisible: false });
    }

    render(){
        let { ...data } = this.state;

        return(
            <View style={styles.container}>
                <NavigationBar title="" backOnPress={this._handleBack.bind(this)}/>
                <ScrollView>
                    <View visible={data.phonevisible} style={styles.content}>
                        <Text style={styles.text}>设置密码</Text>
                        <TextField
                                  textColor='rgb(255, 255, 255)'
                                  tintColor='rgb(255, 255, 255)'
                                  baseColor='rgb(255, 255, 255)'
                                  fontSize={px2dp(20)}
                                  ref={this.passwordRef}
                                  value={data.password}
                                  secureTextEntry={data.secureTextEntry}
                                  autoCapitalize='none'
                                  autoCorrect={false}
                                  enablesReturnKeyAutomatically={true}
                                  onChangeText={this.onChangeText}
                                  returnKeyType='done'
                                  label='密码'
                                  title=''
                                  maxLength={30}
                                  characterRestriction={20}
                                  renderAccessory={this.renderPasswordAccessory}
                                />
                          <Text style={styles.text}>{data.message}</Text>
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
  posts : state.post,
  user: state.user,
  ui: state.postListUI
}), dispatch => ({
  userAction : bindActionCreators(UserAction, dispatch)
}), null, {
  withRef: true
})(GuysSignupPasswordPage);

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
