import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput, Dimensions, ScrollView, Alert, Modal } from 'react-native';

//==============================================================================
//==============================================================================
//==============================================================================
var url;
var key;
var cityId;

export default class RegForm extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
      modalVisible: false,
      name: '',
      phone: '',
      email: '',
      password1: '',
      password2: '',
    }
  }

  registration(){
    if(this.state.password1!=this.state.password2){
      Alert.alert('Ошибка', 'Пароли не совподают');
    }
    else{
      if(this.state.name!=''&&this.state.phone!=''&&this.state.password1!=''&&this.state.email!=''){
        string = 'key='+key
          +'&login='+this.state.email.replace(/\s/g, '')
          +'&password='+this.state.password2
          +'&email='+this.state.email.replace(/\s/g, '')
          +'&user_name='+this.state.name
          +'&first_name='+this.state.name
          +'&phone='+this.state.phone
          +'&city_id='+cityId;
          this.postQuery(url,string);
      }
      else{
        Alert.alert('Ошибка', 'Заполните все поля');
      }
    }
  }

  postQuery(URLPost, str)
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
          alert(obj.error.message)
        }
        else
        {
          //alert('Твой токен\n' + obj.user.info.token);
          this.props.regSuccess(obj.user);
        }
      } 
      else {
        console.log('error, ' + request.responseText);
      }
    };

    request.open('POST', URLPost);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(str); 
  }

  componentWillMount(){
    url = this.props.requestUrls.find(_item => _item.name == 'url_user_registration').url;
    key = this.props.requestKey;
    cityId = this.props.requestCityId;
  }

  render() {
    return (
          <View style={styles.container}>
            <TextInput 
              onChangeText = {(name) => this.setState({name})}
              value = {this.state.name}
              style = {styles.textInputStyle}
              placeholder = 'имя'
              placeholderTextColor = '#ededed'
              maxLength = {23}
              underlineColorAndroid='rgb(36, 185, 209)'>
            </TextInput>

            <TextInput 
              onChangeText = {(email) => this.setState({email})}
              value = {this.state.email}
              style = {styles.textInputStyle}
              placeholder = 'e-mail'
              placeholderTextColor = '#ededed'
              maxLength = {23}
              underlineColorAndroid='rgb(36, 185, 209)'>
            </TextInput>

            <TextInput 
              onChangeText = {(phone) => this.setState({phone})}
              value = {this.state.phone}
              style = {styles.textInputStyle}
              placeholder = 'телефон'
              placeholderTextColor = '#ededed'
              maxLength = {23}
              underlineColorAndroid='rgb(36, 185, 209)'>
            </TextInput>

            <TextInput 
              onChangeText = {(password1) => this.setState({password1})}
              value = {this.state.password1}
              style = {styles.textInputStyle}
              placeholder = 'пароль'
              placeholderTextColor = '#ededed'
              secureTextEntry = { true }
              maxLength = {23}
              underlineColorAndroid='rgb(36, 185, 209)'>
            </TextInput>

            <TextInput 
              onChangeText = {(password2) => this.setState({password2})}
              value = {this.state.password2}
              style = {styles.textInputStyle}
              placeholder = 'повтори пароль'
              placeholderTextColor = '#ededed'
              secureTextEntry = { true }
              maxLength = {23}
              underlineColorAndroid='rgb(36, 185, 209)'>
            </TextInput>

            <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.registration()}>
              <Text style = {styles.buttonText}>Регистрация</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.close()}}>
              <Text style = {styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
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
  },

  textInputStyle: 
  {
    alignSelf: 'stretch',
    padding: 20,
  },
});


//24A0D1