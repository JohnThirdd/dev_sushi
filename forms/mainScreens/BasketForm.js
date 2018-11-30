import React from 'react';
import { 
  StyleSheet, 
  Alert, 
  AsyncStorage, 
  Image, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView, 
  Animated, 
  Modal,
  TextInput } from 'react-native';
import Basket_ComponentItems from './Basket_ComponentItems';
import EmptyBasketForm from './Empty_BasketForm';
import OrderForm from './OrderForm';
import TimerMixin from 'react-timer-mixin';
import {connect} from 'react-redux';
//==============================================================================
//==============================================================================
//==============================================================================
var orderList;
//==============================================================================
//==============================================================================
//==============================================================================
class BasketForm extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = 
    {
      basketObj: this.props.basketObj,
      sum: 0,
      modalVisible: false,
      modalVisible2: false,
      prospect:'',
      street:'',
      cw:'',
      ifChange: false,
    }
  }

  updateBasket(){
    //this.setState({basketObj: this.props.basketObj});
    this.saveBasket();
    this.itogi();
  }

  componentDidMount(){
    this.orderRequest();
/*    var timer = setInterval(() => {
      this.itogi();
    }, 1500);*/
    this.updateBasket();
  }

  itogi(){
    var _sum = 0;
    this.props.basketObj.map((_item, _i) => {
      if(_i!=0){
        _sum = _sum + (_item.prices[0].price * _item.kol);
      }
    });
    this.setState({sum: _sum});
  }

  basketForQuery(){
    var _basketForQuery = '';
    this.props.basketObj.map((_item, _i) => {
      if(_i!=0){
        if(_i==1){
          _basketForQuery = _item.prices[0].id + '-' + _item.kol;
        }
        else{
          _basketForQuery = _basketForQuery + ';' + _item.prices[0].id + '-' + _item.kol;
        }
      }
    });
    return _basketForQuery;
  }

  orderRequest(){
    return fetch(this.props.orderRequestUrl + '?key=' + this.props.requestKey + '&city_id='+this.props.requestCityId)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          sourceOptions: responseJson,
        }, function(){
          orderList = this.state.sourceOptions;
        });

      })
      .catch((_error) =>{
        Alert.alert('Ошибка','Проверьте сеть');
    });
  }

  orderCreate(){
    if(this.state.prospect != '')
    {
      _address = 'Пр. ' + this.state.prospect + ', ' + 'д.' + this.state.street + ', ' + 'кв.' + this.state.cw;
      _string = 'key=' + this.props.requestKey
      + '&cart=' + this.basketForQuery()
      + '&token=' + this.props.info.info.token
      + '&cityId=' + this.props.requestCityId
      + '&address=' + _address;
      _url = this.props.requestUrls.find(_item => _item.name == 'url_order').url;
      this.orderQuery(_url,_string);
    }
    else
    {
      //this.setState({modalVisible2: !this.state.modalVisible2});
      Alert.alert('Ошибка', 'Заполните все поля');
    }
  }

  orderQuery(URLPost, str)
  {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        var obj =  JSON.parse(request.responseText);
        if(obj.error != null)
        {
          this.setState({modalVisible2: !this.state.modalVisible2});
          alert(obj.error.message)
        }
        else
        {
          //alert('Твой токен\n' + obj.user.info.token);
          this.setState({modalVisible2: !this.state.modalVisible2});
          alert('готово');
        }
      } 
      else {
        this.setState({modalVisible2: !this.state.modalVisible2});
        console.log('error, ' + request.responseText);
      }
    };

    request.open('POST', URLPost);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(str); 
  }

  saveBasket = async () =>{
    try
    {
      await AsyncStorage.setItem('@MySuperStore:basketObj', JSON.stringify(this.props.basketObj));
    }
    catch (er)
    {
      Alert.alert('Система обнаружения проблем', 'Вот что обнаружено: ' + er.toString());
    }
  }

  render() {
    let _productsRender = this.props.basketObj.map((_item, _i) => {
      return(
        <View key={_i}>
          { _i != 0 ? 
              <Basket_ComponentItems 
                key={_i} 
                index={_i} 
                item={_item}
                addToBasket={ (addToBasket) => {this.props.addToBasket(addToBasket)} }
                addOne = {
                  (_addOne) => {
                    this.props.addOne(_addOne);
                    this.updateBasket()
                  }
                }
                minusOne = {
                  (_minusOne) => {
                    this.props.minusOne(_minusOne);
                    this.updateBasket()
                  }
                }/>
            :
              <View style = {styles.firstText}>
                <Text> Ваш заказ </Text>
              </View>
          }
        </View>
        );
    });
    return (
      <View style={styles.container}>
        <ScrollView>
          {_productsRender}
        
          <View style={styles.footer}>
            <View style={{ flexDirection: 'row', width: Dimensions.get('window').width,}}>
              <Text style={{fontWeight: 'bold',}}>Итого: </Text> 
              <Text style={{ right: 0 }}>{this.props.sum} р.</Text>
            </View>

            <View style={{ flexDirection: 'row', width: Dimensions.get('window').width,}}>
              <Text style={{ color: 'gray' }}>Товары на сумму: </Text> 
              <Text style={{ right: 0, color: 'gray' }}>{this.props.sum} р.</Text>
            </View>

            <View style={{ flexDirection: 'row', width: Dimensions.get('window').width,}}>
              <Text style={{ color: 'gray' }}>Экономия: </Text> 
              <Text style={{ textAlign:'right', color: 'gray' }}>0 р.</Text>
            </View>
          </View>

          <View style={[styles.footerBut, {flexDirection: 'column', alignItems: 'center',}]}>

            <TouchableOpacity style={[styles.buttonStyle, {width:Dimensions.get('window').width-30} ]}
              onPress = { () => {alert(this.basketForQuery());} }>
              <Text style = {styles.buttonText}>Проверить на изменение</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonStyle, {width:Dimensions.get('window').width-30} ]}
              onPress = { () => {this.setState({modalVisible: !this.state.modalVisible})} }>
              <Text style = {styles.buttonText}>Оформить заказ</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>   

        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible2}
        onRequestClose={() => this.setState({modalVisible2: !this.state.modalVisible2})}>
          <View style={styles.adressContainer}>
            <TextInput 
              onChangeText = {(prospect) => this.setState({prospect})}
              value = {this.state.prospect}
              style = {styles.textInputStyle}
              placeholder = 'проспект'
              placeholderTextColor = 'gray'
              maxLength = {23}
              underlineColorAndroid='rgb(36, 185, 209)'>
            </TextInput>

            <TextInput 
              onChangeText = {(street) => this.setState({street})}
              value = {this.state.street}
              style = {styles.textInputStyle}
              placeholder = 'дом'
              placeholderTextColor = 'gray'
              maxLength = {23}
              underlineColorAndroid='rgb(36, 185, 209)'>
            </TextInput>

            <TextInput 
              onChangeText = {(cw) => this.setState({cw})}
              value = {this.state.cw}
              style = {styles.textInputStyle}
              placeholder = 'квартира'
              placeholderTextColor = 'gray'
              maxLength = {23}
              underlineColorAndroid='rgb(36, 185, 209)'>
            </TextInput>

            <View style={{flexDirection: 'row', justifyContent: 'center',}}>
              <TouchableOpacity style={[styles.buttonStyle, {width:150} ]}
                onPress = { () => {this.orderCreate()} }>
                <Text style = {styles.buttonText}>Оформить заказ</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.buttonStyle, {width:150} ]}
                onPress = { () => {this.setState({modalVisible2: !this.state.modalVisible2})} }>
                <Text style = {styles.buttonText}>Отмена</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => this.setState({modalVisible: !this.state.modalVisible})}>
          <OrderForm 
            cityName = {this.props.cityName} 
            closeOrder = {() => this.setState({modalVisible: !this.state.modalVisible})}
            openAdress = {() => {this.setState({modalVisible: !this.state.modalVisible}); this.setState({modalVisible2: !this.state.modalVisible2})}}
            orderList = {orderList}/>
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    basketObj: state.basketObj,
    info: state.info,
    sum: state.sum,
  }
}

export default connect(mapStateToProps)(BasketForm)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
    height: Dimensions.get('window').height,
  },

  adressContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'white', 
    height: Dimensions.get('window').height,
  },

  justText:{
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'gray',
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonText:{
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'rgb(36, 185, 209)',
    alignItems: 'center',
  },

  buttonStyle: {
    borderWidth: 1,
    alignItems: 'center',
    borderColor: 'rgb(36, 185, 209)',
    borderRadius: 5,
    justifyContent: 'center',
    margin: 5,
    padding: 5,
  },

  firstText: {
    position: 'relative',
    padding: 10,
    paddingRight: 100,
    borderBottomWidth:2,
    borderBottomColor: '#ededed'
  },

  footer: {
    position: 'relative',
    padding: 10,
    paddingRight: 100,
    borderTopWidth:2,
    borderTopColor: '#ededed'
  },

  footerBut: {
    position: 'relative',
    //padding: 10,
    paddingRight: 100,
    //borderTopWidth:2,
    //borderTopColor: '#ededed'
  },

  textInputStyle: 
  {
    alignSelf: 'stretch',
    padding: 20,
  },
});


//24A0D1