import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions, ScrollView, Animated, ImageBackground } from 'react-native';
import ProfileNotLoggin from './ProfileNotLoggin';
import {connect} from 'react-redux';
//==============================================================================
//==============================================================================
//==============================================================================
var vari='0';
export default class ProfileLoginForm extends React.Component {
  render() {
    return (
          <View style={styles.container}>
            <ScrollView>
              <View style={styles.header}>
                <Image
                resizeMode={'contain'} 
                source={require('./checked.png')}
                style={
                  {
                    width: 50,
                    height: 50,
                    marginBottom: 15,
                  }}/>
                <Text style={styles.boldText}>{this.props.profileToken.info.user_name}</Text>
              </View>

              <TouchableOpacity style={styles.firstText}>
                <Text>
                  История заказов
                </Text>
              </TouchableOpacity>

              <View style={styles.firstText}>
                <Text>
                  Ваши баллы: 0
                </Text>
              </View>

              <View style={styles.firstText}>
                <Text>
                  Ваш город: {this.props.cityName}
                </Text>
              </View>

              <View style={styles.container2}>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.exit()}}>
                  <Text style = {styles.buttonText}>Настройка</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.exit()}}>
                  <Text style = {styles.buttonText2}>Выйти</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
    );
  }
}

/*function mapStateToProps(state){
  return {
    profileToken: state.profileToken
  }
}

function mapDispatchToProps(dispatch){
  return{
    plusCounter : () => dispatch({type: 'PLUS_C',vari:vari}),
    minusCounter : () => dispatch({type: 'MINUS_C'}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLoginForm)*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
    //height: Dimensions.get('window').height,
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

  firstText: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth:2,
    borderBottomColor: '#ededed'
  },

  header: {
    backgroundColor: 'rgb(36, 185, 209)',
    width: Dimensions.get('window').width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText2:{
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'red',
    alignItems: 'center',
  },

  buttonText:{
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'rgb(36, 185, 209)',
    alignItems: 'center',
  },

  boldText:{
    fontSize: 20,
    color: 'white',
  },

  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
    //height: Dimensions.get('window').height,
  },
});


//24A0D1