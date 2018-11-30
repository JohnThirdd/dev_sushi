import React from 'react';
import {
  Animated,
  StyleSheet, 
  Image,
  View, 
  AppRegistry, 
  Text, 
  ScrollView,
  Modal, 
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
  AsyncStorage } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import MainTabs from './mainScreens/MainTabs';
import ModalScreen from './mainScreens/ModalScreen';
import WhyNotWorkingBithc from './mainScreens/СontactsScreen';
import ProfileNotLoggin from './mainScreens/ProfileNotLoggin';
import ProfileForm from './mainScreens/ProfileForm';
import BasketForm from './mainScreens/BasketForm';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
//==============================================================================
//==============================================================================
//==============================================================================
var slider;
var requestUrls;
var requestKey;
var orderRequestUrl;
var requestCityId;

var filterUrl;
var companyInfo;
var filterArray = [{ name: 1 }, { name: 2 }];
basketObj = [{name: 'first'}];
sum = 0;
userInfo = '0';

const HEADER_MAX_HEIGHT = 200;
const IMAGE_VIEW_HEIGHT = 130;
const BUTTON_VIEW_OPACITY = 50;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
var botNavigProps;

var ifChange = false;

var cityName;

scrollY = new Animated.Value(0);

//===============================///////////////////////////////////////
const initialState = {
  basketObj: [{name: 'first'}],
  info: 0,
  sum: 0,
}
const stateProfile = {
  profileToken: '0',
}
const reducer = (state = initialState, action) =>{
  switch(action.type){
    case 'PLUS_C':
      return {basketObj: basketObj, sum: sum, info: stateProfile.profileToken}
    case 'MINUS_C':
      return {basketObj: state.basketObj, sum: state.sum,info: userInfo}
  }
  return state
}
const profileInfo = (state = stateProfile, action) =>{
  switch(action.type){
    case 'PLUS_C':
      store.dispatch({type: 'MINUS_C'});
      return {profileToken: action.vari}
    case 'MINUS_C':
      store.dispatch({type: 'MINUS_C'});
      return {profileToken: userInfo}
  }
  return state
}
const store = createStore(reducer);
const profileStore = createStore(profileInfo);
//===============================///////////////////////////////////////

//==============================================================================
//==============================================================================
//==============================================================================
class TopNavigator extends React.Component{
  render() {
    return <TOP_NAVIGATOR onPress = { () => { console.log('нажалосьтута') } }/>;
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class MenuScreen extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      modalImageUrl: '.wall.png',
      modalVisible: false,
      modalVisibleBlack: false,
      scrollY: new Animated.Value(0),
      objArray: [{zero:0},{one:1}],
      numArray: [0,1],
      basketArray: ['1'],
    }
  }

  onPressSlider(_urlImage)
  {
    this.setState({
      modalImageUrl: _urlImage, 
      modalVisible: !this.state.modalVisible
    });
  }

  componentWillMount(){
    botNavigProps = this.props.navigation;
  }

  addToBasket = async () =>
  {
    
  }

  render(){
    let _sliderRender = slider.items.map((item, i)=>{
      return(
        <View key={i} style={{ paddingRight: 10, paddingLeft: 10 }}>
          <TouchableOpacity onPress={ () => 
            this.onPressSlider(item.image.url) } activeOpacity={1}>
            <Image
              resizeMode={'contain'} 
              source={{uri: item.image.url}} 
              key={i}
              style={
                {
                  width: Dimensions.get('window').width - 30, 
                  height: 124,
                  borderRadius: 15,
                }}/>
          </TouchableOpacity>
        </View>
      );
    });

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const trans = this.state.scrollY.interpolate({
      inputRange: [0, 200-0],
      outputRange: [200, 0],
      extrapolate: 'clamp',
    });

    const imageViewHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [IMAGE_VIEW_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const buttonViewOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [BUTTON_VIEW_OPACITY, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerPadding = this.state.scrollY.interpolate({
      inputRange: [0, 3-HEADER_MIN_HEIGHT],
      outputRange: [3, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    return(
      <Animated.View style={styles.container}>
        <Animated.View style = {[styles.menuHeader, {height: headerHeight}]}>
          <Animated.View style = {{ height: 130, padding: 3, }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {_sliderRender}
            </ScrollView>
          </Animated.View>

          <Animated.View style = {{ flexDirection: 'row'}}>
            <TouchableOpacity style={styles.headerButtons} onPress={()=>console.log(basketObj)}>
              <Text style={styles.textButtons}> Проверка адреса </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerButtons} 
              onPress = { 
                () => {
                  console.log('global = ', scrollY);
                  this.setState({scrollY: scrollY});
                }
              }
            >
              <Text style={styles.textButtons}> Промокод</Text>
            </TouchableOpacity>
          </Animated.View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setState({modalVisible: !this.state.modalVisible})}>
            <ModalScreen
              urlImage={this.state.modalImageUrl}
              onClose={() => {
                this.setState({modalVisible: !this.state.modalVisible});}}/>
          </Modal>
        </Animated.View>
        <TopNavigator/>
      </Animated.View>
    );
  }

  componentDidMount(){
    this.setState({scrollY: scrollY});
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class ProfileScreen extends React.Component
{
  saveToken = async (_profileToken) =>{
    try
    {
      await AsyncStorage.setItem('@MySuperStore:profileToken', _profileToken);
    }
    catch (er)
    {
      Alert.alert('Система обнаружения проблем', 'Вот что обнаружено: ' + er.toString());
    }
  }

  render(){
    return(
      <Provider store = {profileStore}>
        <ProfileForm 
          requestUrls={requestUrls} 
          requestKey={requestKey}
          requestCityId={requestCityId}
          cityName = {cityName}
          saveToken={(_token)=>this.saveToken(_token)}/>
      </Provider>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class СontactScreen extends React.Component
{
  render(){
    return(
      <WhyNotWorkingBithc companyInfo = {companyInfo}/>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================

class BasketScreen extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      basketObj: basketObj,
      ifChange: ifChange,
    }
  }

  sumFunction(){
    var _sum = 0;
    basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    sum = _sum
  }

  componentWillMount(){
    this.setState({basketObj:basketObj});
  }

  componentDidMount(){
    this.setState({basketObj:basketObj});
  }

  componentDidUpdate(){
    this.refs.child.componentDidMount();
  }

  render(){

    return(
      <Provider store = {store}>
        <BasketForm 
          ref='child' {...this.props} 
          goAdd = { () => { this.props.navigation.navigate('Меню'); } } 
          
          addOne = {
            (_addOne) => {
              basketObj[basketObj.findIndex(_item => _item.id == _addOne.id)].kol++;
              this.sumFunction();
              store.dispatch({type: 'PLUS_C'});
            }
          }
          minusOne = {
            (_minusOne) => {
              if(basketObj[basketObj.findIndex(_item => _item.id == _minusOne.id)].kol == 1)
              {
                basketObj.splice(basketObj.findIndex(_item => _item.id == _minusOne.id),1);
              }
              else
              {
                basketObj[basketObj.findIndex(_item => _item.id == _minusOne.id)].kol--;
              }
              this.sumFunction();
              store.dispatch({type: 'PLUS_C'});
            }
          }
          cityName = {cityName}
          orderRequestUrl = {orderRequestUrl}
          requestKey = {requestKey}
          requestCityId = {requestCityId}
          ifChange = {ifChange}
          requestUrls = {requestUrls}
        />
      </Provider>
    );
  }
}
//==============================================================================----------------------------------------------
//==============================================================================----------------------------------------------
//==============================================================================----------------------------------------------
class ComboSets extends React.Component
{
  constructor(props) {
    super(props);
    this.name = props;
    this.state = 
    {
      scrollAnimation: '0',
    }
  }

  componentWillMount(){
    //console.log(filterArray[0]);
  }

  sumFunction(){
    var _sum = 0;
    basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    sum = _sum
  }

  render(){
    return(
      <Provider store = {store}>
        <MainTabs  products = { filterArray[0] } 
          scrollAnimation = { 
            (scrollAnimation) => {
              scrollY = scrollAnimation;
            }
          }
          addToBasket = {
            (_addToBasket) => {
              basketObj = _addToBasket;
              this.sumFunction();
              //console.log(basketObj);
            }
          }/>
      </Provider>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class MiniSets extends React.Component
{
  componentWillMount(){
    //console.log(filterArray[1]);
  }

  sumFunction(){
    var _sum = 0;
    basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    sum = _sum
  }

  render(){
    return(
      <Provider store = {store}>
        <MainTabs  products = { filterArray[1] }          
          scrollAnimation = { 
            (scrollAnimation) => {
              scrollY = scrollAnimation;
            }
          }
          addToBasket = {
            (_addToBasket) => {
              basketObj = _addToBasket;
              this.sumFunction();
              //console.log(basketObj);
            }
          }/>
      </Provider>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class Sets extends React.Component
{
  componentWillMount(){
    //console.log(filterArray[1]);
  }

  sumFunction(){
    var _sum = 0;
    basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    sum = _sum
  }

  render(){
    return(
      <Provider store = {store}>
        <MainTabs  products = { filterArray[2] }          
          scrollAnimation = { 
            (scrollAnimation) => {
              scrollY = scrollAnimation;
            }
          }
          addToBasket = {
            (_addToBasket) => {
              basketObj = _addToBasket;
              this.sumFunction();
              //console.log(basketObj);
            }
          }/>
      </Provider>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class BrandedRolls extends React.Component
{
  componentWillMount(){
    //console.log(filterArray[1]);
  }

  sumFunction(){
    var _sum = 0;
    basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    sum = _sum
  }

  render(){
    return(
      <Provider store = {store}>
        <MainTabs  products = { filterArray[3] }          
          scrollAnimation = { 
            (scrollAnimation) => {
              scrollY = scrollAnimation;
            }
          }
          addToBasket = {
            (_addToBasket) => {
              basketObj = _addToBasket;
              this.sumFunction();
              //console.log(basketObj);
            }
          }/>
      </Provider>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class MiniRolls extends React.Component
{
  componentWillMount(){
    //console.log(filterArray[1]);
  }

  sumFunction(){
    var _sum = 0;
    basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    sum = _sum
  }

  render(){
    return(
      <Provider store = {store}>
        <MainTabs  products = { filterArray[4] }          
          scrollAnimation = { 
            (scrollAnimation) => {
              scrollY = scrollAnimation;
            }
          }
          addToBasket = {
            (_addToBasket) => {
              basketObj = _addToBasket;
              this.sumFunction();
              //console.log(basketObj);
            }
          }/>
      </Provider>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class TheFriedRolls extends React.Component
{
  componentWillMount(){
    //console.log(filterArray[1]);
  }

  sumFunction(){
    var _sum = 0;
    basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    sum = _sum
  }

  render(){
    return(
      <Provider store = {store}>
        <MainTabs  products = { filterArray[5] }          
          scrollAnimation = { 
            (scrollAnimation) => {
              scrollY = scrollAnimation;
            }
          }
          addToBasket = {
            (_addToBasket) => {
              basketObj = _addToBasket;
              this.sumFunction();
              //console.log(basketObj);
            }
          }/>
      </Provider>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class BakedRolls extends React.Component
{
  componentWillMount(){
    //console.log(filterArray[1]);
  }

  sumFunction(){
    var _sum = 0;
    basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    sum = _sum
  }

  render(){
    return(
      <Provider store = {store}>
        <MainTabs  products = { filterArray[6] }          
          scrollAnimation = { 
            (scrollAnimation) => {
              scrollY = scrollAnimation;
            }
          }
          addToBasket = {
            (_addToBasket) => {
              basketObj = _addToBasket;
              this.sumFunction();
              //console.log(basketObj);
            }
          }/>
      </Provider>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class Sushi extends React.Component
{
  componentWillMount(){
    //console.log(filterArray[1]);
  }

  sumFunction(){
    var _sum = 0;
    basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    sum = _sum
  }

  render(){
    return(
      <Provider store = {store}>
        <MainTabs  products = { filterArray[7] }          
          scrollAnimation = { 
            (scrollAnimation) => {
              scrollY = scrollAnimation;
            }
          }
          addToBasket = {
            (_addToBasket) => {
              basketObj = _addToBasket;
              this.sumFunction();
              //console.log(basketObj);
            }
          }/>
      </Provider>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class Pizza extends React.Component
{
  componentWillMount(){
    //console.log(filterArray[1]);
  }

  sumFunction(){
    var _sum = 0;
    basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    sum = _sum
  }

  render(){
    return(
      <Provider store = {store}>
        <MainTabs  products = { filterArray[8] }          
          scrollAnimation = { 
            (scrollAnimation) => {
              scrollY = scrollAnimation;
            }
          }
          addToBasket = {
            (_addToBasket) => {
              basketObj = _addToBasket;
              this.sumFunction();
              //console.log(basketObj);
            }
          }/>
      </Provider>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class Paste extends React.Component
{
  componentWillMount(){
    //console.log(filterArray[1]);
  }

  sumFunction(){
    var _sum = 0;
    basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    sum = _sum
  }

  render(){
    return(
      <Provider store = {store}>
        <MainTabs  products = { filterArray[9] }          
          scrollAnimation = { 
            (scrollAnimation) => {
              scrollY = scrollAnimation;
            }
          }
          addToBasket = {
            (_addToBasket) => {
              basketObj = _addToBasket;
              this.sumFunction();
              //console.log(basketObj);
            }
          }/>
      </Provider>
    );
  }
}

//==============================================================================
//==============================================================================
//==============================================================================
class BottomNavigate extends React.Component
{
  render() {
    return <BOTTOM_NAVIGATOR />;
  }
}
//===============================================================================================================
//===============================================================================================================
//===============================================================================================================
export default class App extends React.Component {
  componentWillMount(){
    slider = this.props.sliderData;
    requestUrls = this.props.requestUrls;
    orderRequestUrl = requestUrls.find(_item => _item.name == 'url_delivery_list').url;
    requestKey = this.props.requestKey;
    filterUrl = requestUrls.find(_item => _item.name == 'url_products').url;
    filterArray = this.props.filterArray;
    companyInfo = this.props.companyInfo;
    cityName = this.props.cityName;
    basketObj = this.props.basketObj;
    this.sumFunction();
    store.dispatch({type: 'PLUS_C'});
    requestCityId = this.props.requestCityId;
    userInfo = this.props.userInfo;
    profileStore.dispatch({type: 'MINUS_C'});
  }

  sumFunction(){
    var _sum = 0;
    basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    sum = _sum
  }

  render() {
    return <BottomNavigate/>;
  }
}
//==============================================================================
//==============================================================================
//==============================================================================

const TABS = {
  'Комбо-наборы': { screen: ComboSets },
  'Мини-сеты': { screen: MiniSets },
  'Наборы': { screen: Sets },
  'Фирменные роллы': { screen: BrandedRolls },
  'Мини-роллы': { screen: MiniRolls },
  'Жареные-роллы': { screen: TheFriedRolls },
  'Запеченные-роллы': { screen: BakedRolls },
  'Суши': { screen: Sushi },
  'Пицца': { screen: Pizza },
  'Паста': { screen: Paste },
}
const TOP_NAVIGATOR = createMaterialTopTabNavigator(TABS,
  {
    tabBarPosition: 'top',
    animationEnabled: false,
    swipeEnabled: true,
    tabBarOptions: {
      scrollEnabled: true,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'white',
      },
    }
  });
const BOTTOM_NAVIGATOR = createMaterialTopTabNavigator({
    Меню: MenuScreen,
    Профиль: ProfileScreen,
    Контакты: СontactScreen,
    Корзина: BasketScreen,
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      showIcon: false,
      labelStyle: {
        fontSize: 10,
        marginBottom: 5
      },
      style: {
        backgroundColor: 'rgb(36, 185, 209)',
      },
    }
});
//==============================================================================
//==============================================================================
//==============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    justifyContent: 'center',
  },

  menuHeader: {
    //position: 'absolute',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    //padding: 3,
    //height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(36, 185, 209)',
  },

  headerButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(36, 160, 209)',
    borderRadius: 10,
    width: 150,
    height: 40,
    margin: 5,
    padding: 5,
  },
  textButtons: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
