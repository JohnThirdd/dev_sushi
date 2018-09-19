import React from 'react';
import { FlatList, StyleSheet, ActivityIndicator, Text, View, TouchableOpacity, Alert, AsyncStorage, TextInput } from 'react-native';
//==============================================================================
//==============================================================================
//==============================================================================
export default class SelectCity extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true, 
      inputText: '',
      filterData: [
        {
          "id": 3485,
          "country_id": 1,
          "name": "Москва",
          "metro": false
        },
        {
          "id": 4001,
          "country_id": 1,
          "name": "Санкт-Петербург",
          "metro": false
        } 
      ] 
    }
  }

  select = async (_itemID) =>
  {
    try
    {
      await AsyncStorage.setItem('cityID', _itemID.toString());
    }
    catch (_er)
    {
      Alert.alert('Система обнаружения проблем', 'Вот что обнаружено: ' + _er.toString());
    }
    this.props.selectedMethod();
  }

  componentDidMount(){
    this.setState({ filterData: this.props.dataSource });
  }

  search(_item)
  {
    if(_item.name.search(this.state.inputText) != -1)
      return true;
    else
      return false;
  }

  searchState(_text)
  {
    const _NEW_DATA = this.props.dataSource.filter(function(_item){
         const _ITEM_DATA = _item.name.toUpperCase()
         const _TEXT_DATA = _text.toUpperCase()
         return _ITEM_DATA.indexOf(_TEXT_DATA) > -1
      })
      this.setState({
        filterData: _NEW_DATA,
        inputText: _text,
      })
  }

  render(){

    return(
      <View style={ styles.container }>

        <TextInput 
          onChangeText = {(inputText) => this.searchState(inputText)}
          value = {this.state.inputText}
          style = {styles.textInputStyle}
          placeholder = 'поиск'
          placeholderTextColor = 'gray'
          underlineColorAndroid = 'white'
          maxLength = {23}/>

        <FlatList
          data={this.state.filterData}
          renderItem =
          {({item}) => 
            {
              return(
                <Text style = { styles.item } onPress = { () => this.select(item.id) }>{item.name}</Text>
              )
            }
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   
  },

  item: {
    fontSize: 17,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth:2,
    borderBottomColor: '#ededed',
  },

  itemButton:{
    position: 'relative',
    backgroundColor: 'white',
    paddingRight: 100,
    borderBottomWidth:2,
    borderBottomColor: '#ededed'
  },

  textInputStyle:{
    alignSelf: 'stretch',
    //color: '#fff',
    padding: 10,
    //backgroundColor: '#251025',
    borderBottomWidth: 2,
    borderBottomColor: '#ededed', 
  },
})
