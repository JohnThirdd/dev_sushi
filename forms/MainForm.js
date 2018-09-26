import React from 'react';
import { 
  StyleSheet, 
  Image,
  View, 
  AppRegistry, 
  Text, 
  ScrollView,
  Modal, 
  Dimensions,
  TouchableOpacity,
  Alert  } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import MainTabs from './mainScreens/MainTabs';
import ModalScreen from './mainScreens/ModalScreen'
//==============================================================================
//==============================================================================
//==============================================================================
var slider;
var requestUrls;
var requestKey;

var filterUrl;
var filterArray = [{ name: 1 }, { name: 2 }];
//==============================================================================
//==============================================================================
//==============================================================================
class TopNavigator extends React.Component{
  render() {
    return <TOP_NAVIGATOR/>;
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
    }
  }

  onPressSlider(_urlImage)
  {
    this.setState({modalImageUrl: _urlImage, modalVisible: !this.state.modalVisible})
  }

  render(){
    let _sliderRender = slider.items.map((item, i)=>{
      return(
        <View key={i} style={{ paddingRight: 10, paddingLeft: 10 }}>
          <TouchableOpacity onPress={ () => this.onPressSlider(item.image.url) } activeOpacity={1}>
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

    return(
      <View style={styles.container}>
        <View style = { styles.menuHeader }>
          <View style = {{ height: 130 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {_sliderRender}
            </ScrollView>
          </View>

          <View style = {{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.headerButtons}>
              <Text style={styles.textButtons}> Проверка адреса </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerButtons}>
              <Text style={styles.textButtons}> Промокод </Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setState({modalVisible: !this.state.modalVisible}); }}>

            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',}}>
              <ModalScreen urlImage={this.state.modalImageUrl} close={() => { this.setState({modalVisible: !this.state.modalVisible}); }}/>
            </View>

            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setState({modalVisible: !this.state.modalVisible}); }}>
              <TouchableOpacity style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                backgroundColor: 'black',
                opacity: 0.5,}}
                onPress={() => {this.setState({modalVisible: !this.state.modalVisible}); }}
                activeOpacity={0.5}>
              </TouchableOpacity>
            </Modal>
          </Modal>
        </View>
        <TopNavigator/>
      </View>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class ProfileScreen extends React.Component
{
  render(){
    return(
      <View style={styles.container}>
        <Text>ProfileScreen</Text>
      </View>
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
      <View style={styles.container}>
          <Text> СontactScreen </Text>
      </View>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class BasketScreen extends React.Component
{
  render(){
    return(
      <View style={styles.container}>
        <Text>BasketScreen</Text>
      </View>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class ComboSets extends React.Component
{
  constructor(props) {
    super(props);
    this.name = props;
  }

  componentWillMount(){
    //console.log(filterArray[0]);
  }

  render(){
    return(
        <MainTabs  products = { filterArray[0] }/>
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

  render(){
    return(
        <MainTabs  products = { filterArray[1] }/>
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

  render(){
    return(
        <MainTabs  products = { filterArray[2] }/>
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

  render(){
    return(
        <MainTabs  products = { filterArray[3] }/>
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

  render(){
    return(
        <MainTabs  products = { filterArray[4] }/>
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

  render(){
    return(
        <MainTabs  products = { filterArray[5] }/>
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

  render(){
    return(
        <MainTabs  products = { filterArray[6] }/>
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

  render(){
    return(
        <MainTabs  products = { filterArray[7] }/>
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

  render(){
    return(
        <MainTabs  products = { filterArray[8] }/>
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

  render(){
    return(
        <MainTabs  products = { filterArray[9] }/>
    );
  }
}

//==============================================================================
//==============================================================================
//==============================================================================
export default class App extends React.Component {
  componentWillMount(){
    slider = this.props.sliderData;
    requestUrls = this.props.requestUrls;
    requestKey = this.props.requestKey;
    filterUrl = requestUrls.find(_item => _item.name == 'url_products').url;
    filterArray = this.props.filterArray;
  }

  render() {
    return <BOTTOM_NAVIGATOR/>;
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
    padding: 3,
    height: 200,
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
