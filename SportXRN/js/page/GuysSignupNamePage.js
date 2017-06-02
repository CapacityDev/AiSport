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
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';

export default class GuysSignupNamePage extends PageComponent{
    constructor(props){
        super(props);

        this.onChangeText = this.onChangeText.bind(this);

        this.firstnameRef = this.updateRef.bind(this, 'firstname');
        this.lastnameRef = this.updateRef.bind(this, 'lastname');

        this.state = {
            firstname: '',
            lastname: '',
        };
    }

    onChangeText(text) {
        ['firstname', 'lastname']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
          if (ref.isFocused()) {
            this.setState({ [name]: text });
            this.updateNextState();
          }
        });
    }

    validInputs() {
      var firstname = this.firstname.value();
      var lastname = this.lastname.value();
      if ('' != this.firstname.value() && '' != this.lastname.value()) {
        return true;
      } else {
        return false;
      }
    }

    updateNextState() {
      var res = this.validInputs();
    }

    updateRef(name, ref) {
      this[name] = ref;
    }

    render(){
        let { ...data } = this.state;

        return(
            <View style={styles.container}>
                <NavigationBar title="" backOnPress={this._handleBack.bind(this)}/>
                <ScrollView>
                    <View style={styles.content}>
                        <Text style={styles.text}>您叫什么名字？</Text>
                        <TextField
                                  textColor='rgb(255, 255, 255)'
                                  tintColor='rgb(255, 255, 255)'
                                  baseColor='rgb(255, 255, 255)'
                                  ref={this.firstnameRef}
                                  value={data.firstname}
                                  autoCorrect={false}
                                  enablesReturnKeyAutomatically={true}
                                  returnKeyType='next'
                                  label='姓氏'
                                  onChangeText={this.onChangeText}
                        />
                        <TextField
                                  textColor='rgb(255, 255, 255)'
                                  tintColor='rgb(255, 255, 255)'
                                  baseColor='rgb(255, 255, 255)'
                                  ref={this.lastnameRef}
                                  value={data.lastname}
                                  autoCorrect={false}
                                  enablesReturnKeyAutomatically={true}
                                  returnKeyType='next'
                                  label='名字'
                                  onChangeText={this.onChangeText}
                        />
                    </View>
                </ScrollView>
                <ActionButton buttonColor={theme.actionBar.backgroundColorThin}
                              active={true}
                              degrees={0}
                              hideShadow={true}
                              useNativeFeedback={false}
                              icon={<Icon name="ios-arrow-forward" style={styles.actionButtonIcon} />}
                              onPress={() => {}}>
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
