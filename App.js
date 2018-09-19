import React from 'react';
import { StyleSheet, Text, View, Alert, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoadForm from './forms/LoadForm';
import FirstForm from './forms/FirstForm';
import SelectCityForm from './forms/SelectCityForm';
import MainForm from './forms/MainForm';
//==============================================================================
//==============================================================================
//==============================================================================
const FIRST_QUERY_URL = 'http://damir.mobil2b.com/api';
const KEY = 'dk0Wk-Eik-0_3oRmUz_nBKaedr9J4Hsn';
var options;
var directories;
var settings;
var home;
//==============================================================================
//==============================================================================
//==============================================================================
class LoadingScreen extends React.Component
{
  static navigationOptions = { header: () => null };

  constructor(props)
  {
    super(props);
    this.state =
    {
      cityID: 'none',
    }
  }

  firstQuery()
  {
    return fetch(FIRST_QUERY_URL + '?key=' + KEY)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          sourceOptions: responseJson.options,
          sourceDirectories: responseJson.directories,
          sourceSettings: responseJson.settings,
          sourceHome: responseJson.home,
        }, function(){
          options = this.state.sourceOptions;
          directories = this.state.sourceDirectories;
          settings = this.state.sourceSettings;
          home = this.state.sourceHome;
          this.loadCityID();
        });

      })
      .catch((_error) =>{
        Alert.alert('Ошибка','Проверьте сеть');
      });
  }

  componentWillMount()
  {
    this.firstQuery();
  }

  loadCityID = async () => 
  {
    try 
    {
      const _VALUE = await AsyncStorage.getItem('cityID');
      if (_VALUE !== null) 
      {
        this.setState({ cityID: _VALUE });
      }
    } 
    catch (_er) 
    {
       Alert.alert('Система обнаружения проблем', 'Вот что обнаружено: ' + _er.toString());
    }

    if(this.state.cityID == 'none')
    {
      const { navigate } = this.props.navigation;
      navigate('firstHome', { refresh: this });
    }
    else
    {
      const { navigate } = this.props.navigation;
      navigate('main', { refresh: this, cityName: directories.city.find(_item => _item.id == this.state.cityID).name});
    }
  }

  render()
  {
    return(
      <LoadForm />
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class FirstScreen extends React.Component{

  static navigationOptions = { header: () => null };

  goSelectCity()
  {
    const { navigate } = this.props.navigation;
    navigate('selectCity', { refresh: this.props.navigation.state.params.refresh });
  }

  render()
  {
    const { navigate } = this.props.navigation;
    return(
      <FirstForm  selectCityMethod = { () => this.goSelectCity() }/>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class SelectCityScreen extends React.Component
{
  static navigationOptions = { header: () => null };

  selected()
  {
    const { navigate } = this.props.navigation;
    navigate('load');
    this.props.navigation.state.params.refresh.loadCityID();
  }

  render()
  {
    const { navigate } = this.props.navigation;
    return(
      <SelectCityForm selectedMethod = { () => this.selected() }  dataSource = { directories.city }/>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
class MainScreen extends React.Component{

  static navigationOptions = ({ navigation }) => {
    return{
      headerLeft: (
        <Text
          onPress = { () => navigation.navigate('selectCity', { refresh: navigation.state.params.refresh }) }
          style={{ 
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
          }}
          >{navigation.state.params.cityName}</Text>
        ),
      headerStyle: { backgroundColor: 'rgb(36, 185, 209)' },
      headerTintColor: "white"
    }
  }

  goSelectCity()
  {
    const { navigate } = this.props.navigation;
    navigate('selectCity', { refresh: this.props.navigation.state.params.refresh });
  }

  render()
  {
    return(
      <MainForm sliderData = { home.slider }/>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
export default class App extends React.Component {
  render() {
    return <STACKNAVIGATOR/>;
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
const STACKNAVIGATOR = createStackNavigator({
  load: { screen: LoadingScreen },
  firstHome: { screen: FirstScreen },
  selectCity: { screen: SelectCityScreen },
  main: { screen: MainScreen }
}, {
  navigatonOptions: {
    headerStyle: { marginTop: Expo.Constants.statusBarHeight },
    headerMode: 'screen' 
  }
});
//==============================================================================
//==============================================================================
//==============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//==============================================================================
//==============================================================================
//==============================================================================