/**
 * Created by Icey on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import HomeFragment from './SpxHomeFragment';
import GuysFragment from './SpxGuysFragment';
import MeFragment from '../../js/page/MeFragment';
import NotifyFragment from '../../js/page/NotificationFragment';
import px2dp from '../util/px2dp';


export default class SpxHome extends Component{
    static defaultProps = {
        selectedColor: 'rgb(240,87,41)',
        normalColor: '#a9a9a9'
    };

    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home',
            tabName: ['首页','学员','计划','个人中心']
        }
    }

    render(){
        const {selectedColor} = this.props;
        const {tabName} = this.state;
        return(
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={styles.tabbar}
                sceneStyle={{ paddingBottom: styles.tabbar.height }}>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[0]}
                    selected={this.state.selectedTab === 'home'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.homeNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.homeSelected} />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    {<HomeFragment router={this.props.router} navigator={this.props.navigator}/>}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[1]}
                    selected={this.state.selectedTab === 'guys'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.guysNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.guysSelected} />}
                    onPress={() => this.setState({ selectedTab: 'guys' })}>
                    {<GuysFragment router={this.props.router} navigator={this.props.navigator} />}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[2]}
                    selected={this.state.selectedTab === 'notification'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.notificationNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.notificationSelected} />}
                    onPress={() => this.setState({ selectedTab: 'notification' })}>
                    {<NotifyFragment router={this.props.router} navigator={this.props.navigator}/>}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[3]}
                    selected={this.state.selectedTab === 'me'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.meNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.meSelected} />}
                    onPress={() => this.setState({ selectedTab: 'me' })}>
                    {<MeFragment router={this.props.router} navigator={this.props.navigator}/>}
                </TabNavigator.Item>
            </TabNavigator>
        );
    }

    componentWillMount() {
        const {selectedColor, normalColor} = this.props;
        Icon.getImageSource('md-home', 50, normalColor).then((source) => this.setState({ homeNormal: source }));
        Icon.getImageSource('md-home', 50, selectedColor).then((source) => this.setState({ homeSelected: source }));
        Icon.getImageSource('md-contacts', 50, normalColor).then((source) => this.setState({ guysNormal: source }));
        Icon.getImageSource('md-contacts', 50, selectedColor).then((source) => this.setState({ guysSelected: source }));
        Icon.getImageSource('md-list', 50, normalColor).then((source) => this.setState({ notificationNormal: source }));
        Icon.getImageSource('md-list', 50, selectedColor).then((source) => this.setState({ notificationSelected: source }));
        Icon.getImageSource('md-person', 50, normalColor).then((source) => this.setState({ meNormal: source }));
        Icon.getImageSource('md-person', 50, selectedColor).then((source) => this.setState({ meSelected: source }));
    }
}

const styles = StyleSheet.create({
    tabbar: {
        height: px2dp(62),
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tabStyle:{
        padding: px2dp(8)
    },
    tab: {
        width: px2dp(22),
        height: px2dp(22)
    }
});
