/**
 * 短信验证码输入界面
 * Created by Icey on 2017/7/9.
 */
import React, { PropTypes, Component } from 'react';
import ReactNative, {Text, View, ScrollView, StyleSheet, Platform, TouchableOpacity, ListView, Image, PixelRatio, BackAndroid} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import ViewPage from '../component/view';
import NavigationBar from '../component/SpxSimpleNavigationBar';

export default class SpxGuysSignupSmsCaptchaPage extends Component {
    constructor(props){
        super(props);

        this.onChangeText = this.onChangeText.bind(this);
        this.nextstepPress = this.nextstepPress.bind(this);

        this.firstnameRef = this.updateRef.bind(this, 'firstname');
        this.lastnameRef = this.updateRef.bind(this, 'lastname');
        this.nextstepbtnRef = this.updateRef.bind(this, 'nextstepbtn');

        this.state = {
            firstname: '',
            lastname: '',
            nextstepbtncolor: theme.actionBar.backgroundColorThin,
        };
        this.firstnameisright = false;// 姓氏是否合法：true-合法，false-非法
        this.lastnameisright = false;// 名字是否合法：true-合法，false-非法
        this.nextstep = false;// 是否可点击下一步：true-是，false-否
    }

    onChangeText(text) {
        ['firstname', 'lastname']
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
      if (this.firstnameisright && this.lastnameisright) {
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
        // 跳转到下一个界面
        var userInfo = { userFirstName: this.firstname.value(), userLastName: this.lastname.value() };
        this.props.router.push(ViewPage.spxGuysSignupPhonePage(), { userInfo: userInfo });
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
                        <Text style={styles.text}>您收到的短信验证码是？</Text>
                        <TextField
                                  textColor='rgb(255, 255, 255)'
                                  tintColor='rgb(255, 255, 255)'
                                  baseColor='rgb(255, 255, 255)'
                                  fontSize={px2dp(20)}
                                  ref={this.firstnameRef}
                                  value={data.firstname}
                                  autoCorrect={false}
                                  enablesReturnKeyAutomatically={true}
                                  returnKeyType='next'
                                  label='请输入短信验证码'
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
