import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions, ScrollView, Animated, Modal } from 'react-native';
import RegForm from './RegForm';
//==============================================================================
//==============================================================================
//==============================================================================
var vremenniyObj = {
  "user": {
  "info": {
  "verify": true,
  "active": true,
  "token": "OXCaR0mR2vriiMET25LcK79r8GoHjl-j",
  "email": "JohnThird@gmail.com",
  "phone": "85552",
  "user_name": "Джон",
  "first_name": "Джон",
  "second_name": "",
  "last_name": "",
  "sex": 0,
  "city_id": 3876,
  "city_name": "Кострома",
  "orders_count": 0,
  "partner": false,
  "partner_feed": false
  },
  "price_type": {
  "id": 16,
  "name": "Основной тип цен",
  "description_short": "",
  "image": {
  "url": "",
  "width": 0,
  "height": 0
  }
  },
  "cards": [
  {
  "id": 2346,
  "number": "33588f4fd9c764c",
  "type": "discount",
  "balance": 0,
  "percent": 0
  },
  {
  "id": 2347,
  "number": "33588f4fd9c764c",
  "type": "ball",
  "balance": 0,
  "cashback": 10,
  "max_percent": 50,
  "relation": 1
  }
  ]
  }
};
export default class ProfileNotLoggin extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
      modalVisible: false,
    }
  }

  render() {
    return (
          <View style={styles.container}>
            <Image
              resizeMode={'contain'} 
              source={require('./users.png')}
              style={
                {
                  width: 200,
                  height: 200,
                  marginBottom: 15,
                }}/>

            <Text style={{alignItems: 'center'}}> Авторизация </Text>

            <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.props.vari(vremenniyObj)}>
              <Text style = {styles.buttonText}>Войти</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle } onPress={()=>{this.setState({modalVisible:!this.state.modalVisible})}}>
              <Text style = {styles.buttonText}>Регистрация</Text>
            </TouchableOpacity>

            <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setState({modalVisible: !this.state.modalVisible})}>
              <RegForm 
                close={() => this.setState({modalVisible: !this.state.modalVisible})}
                requestUrls={this.props.requestUrls}
                requestKey={this.props.requestKey}
                requestCityId={this.props.requestCityId}
                regSuccess={(_regSuccess)=>{this.setState({modalVisible: !this.state.modalVisible}); this.props.regSuccess(_regSuccess);}}/>
            </Modal>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
    height: Dimensions.get('window').height,
  },

  buttonStyle: {
    borderWidth: 1,
    alignItems: 'center',
    width: 150,
    borderColor: 'rgb(36, 185, 209)',
    borderRadius: 5,
    justifyContent: 'center',
    margin: 5,
    padding: 5,
  },

  buttonText:{
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'rgb(36, 185, 209)',
    alignItems: 'center',
  },

  boldText:{
    fontSize: 25,
    color: 'rgb(36, 160, 209)',
  },

  justText:{
    marginLeft: 5,
    marginBottom: 10,
    color: 'gray',
  }
});


//24A0D1