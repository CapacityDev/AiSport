/**
 * 用户注册，姓名填写界面
 * Created by Icey on 14/11/16.
 */
import React, {PropTypes} from 'react';
import ReactNative, {Text, View, ScrollView, StyleSheet, Platform, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import NavigationBar from '../component/SimpleNavigationBar';
import VisibleView from '../component/VisibleView';
import PageComponent from './BackPageComponent';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';
import Button from 'react-native-button';
import MainPage from './MainPage';

export default class GuysSignupPhonePage extends PageComponent{
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
                  if ( 11 == text.length ) {
                    this[name + 'isright'] = true;
                  } else {
                    this[name + 'isright'] = false;
                  }
                } else if ('email' == name) {
                  this[name + 'isright'] = true;
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
        // 跳转到下一个界面
        MainPage.switchToGuysSignupPasswordPage();
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
                    <VisibleView visible={data.phonevisible} style={styles.content}>
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
                              style={{fontSize: px2dp(15), color: 'white'}}
                              onPress={() => this.useEmailRegPress()}>
                            使用邮箱注册
                        </Button>
                    </VisibleView>
                    <VisibleView visible={data.emailvisible} style={styles.content}>
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
                              style={{fontSize: px2dp(15), color: 'white'}}
                              onPress={() => this.usePhoneRegPress()}>
                            使用手机注册
                        </Button>
                    </VisibleView>
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
