import React from 'react';
import { StyleSheet, Image, Text, Linking, View, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
//==============================================================================
//==============================================================================
//==============================================================================
class ContactInfo extends React.Component
{
  render(){
    return(
      <View style={{flexDirection: 'row', alignItems: 'center',}}>
        { this.props.info == 'phone' ?         
          <Image
            resizeMode={'contain'} 
            source={require('./phone-contact.png')}
            style={
              {
                width: 25,
                height: 25,
                marginLeft: 10,
                marginRight: 10,
              }}/>
              :
          <Image
            resizeMode={'contain'} 
            source={require('./mail.png')}
            style={
              {
                width: 25,
                height: 25,
                marginLeft: 10,
                marginRight: 10,
              }}/> }
        <Text style={styles.boldText} >{this.props.phone}</Text>
      </View>
    );
  }
}
//==============================================================================
//==============================================================================
//==============================================================================
export default class СontactsScreen extends React.Component {
  render() {
    return (
          <View style={{backgroundColor: 'white', height: Dimensions.get('window').height}}>
            <ScrollView>
              <View style = {{alignItems: 'center',}}>
                <Image
                  resizeMode={'contain'} 
                  source={require('./maps-icon.png')}
                  style={
                    {
                      width: 200,
                      height: 200,
                      marginBottom: 15,
                    }}/>
              </View>

              <View style={styles.container}>
                <ContactInfo phone = {this.props.companyInfo.contacts.phone} info = { 'phone' }/>
                <Text style = {styles.justText}> Какая то рандомная инфа </Text>

                <ContactInfo phone = {this.props.companyInfo.contacts.email} info = { 'email' }/>
                <Text style = {styles.justText}> Еще больше рандомной инфы</Text>
              </View>

              <View style={{alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'center',}}>
                
                <TouchableOpacity onPress = { () => { Linking.openURL(this.props.companyInfo.social_links.vk) }}>
                  <Image
                    resizeMode={'contain'} 
                    source={require('./vk.png')}
                    style={
                      {
                        width: 50,
                        height: 50,
                        marginLeft: 10,
                        marginRight: 10,
                      }}/>
                </TouchableOpacity>
                
                <TouchableOpacity onPress = { () => { Linking.openURL('https://www.instagram.com/?hl=ru') }}>
                  <Image
                    resizeMode={'contain'} 
                    source={require('./instagram.png')}
                    style={
                      {
                        width: 50,
                        height: 50,
                        marginLeft: 10,
                        marginRight: 10,
                      }}/> 
                </TouchableOpacity>

                <TouchableOpacity onPress = { () => { Linking.openURL('https://www.youtube.com/?gl=RU') }}>
                   <Image
                    resizeMode={'contain'} 
                    source={require('./youtube.png')}
                    style={
                      {
                        width: 50,
                        height: 50,
                        marginLeft: 10,
                        marginRight: 10,
                      }}/>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    marginLeft: 15,
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