import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
//==============================================================================
//==============================================================================
//==============================================================================
const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
//==============================================================================
//==============================================================================
//==============================================================================
const FAT_TEXT = 'Лучший день - 23 сентебря!';
const SMALL_TEXT = 'Только 23 сентебря будет лучший но не понятный день. Что-то будет продаваться в 3 раза дешевле чем ваша машина';
//==============================================================================
//==============================================================================
//==============================================================================
export default class ModalScreen extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
      animTestVariabele: new Animated.Value(0),
      upOrDown: false,
    }
  }

  componentWillMount(){
    this.animStart();
  }

  closePlease()
  {
    this.props.onClose();
  }

  animStart(){
    if(this.state.upOrDown)
    {
      //this.setState({ headerMin: HEADER_MAX_HEIGHT, headerMax: HEADER_MIN_HEIGHT });
      Animated.timing(this.state.animTestVariabele, {
        toValue: 0,
        //easing: Easing.back(),
        duration: 500,
      }).start(); 
    }
    else
    {
      //this.setState({ headerMax: HEADER_MAX_HEIGHT, headerMin: HEADER_MIN_HEIGHT });
      Animated.timing(this.state.animTestVariabele, {
        toValue: HEADER_MAX_HEIGHT,
        //easing: Easing.back(),
        duration: 500,
      }).start(); 
    }

    this.setState({ upOrDown: !this.state.upOrDown });
  } 

render() {
    const headerHeight = this.state.animTestVariabele.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
      extrapolate: 'clamp',
    });

    return (
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <TouchableOpacity style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              backgroundColor: 'black',
              opacity: 0.5,
            }}
              onPress={() => this.props.onClose() }
              activeOpacity={0.5}>
            </TouchableOpacity>
            
            <Animated.View style={[styles.container, {height: headerHeight}, {bottom: 0}]}>
              <TouchableOpacity
                onPress={ () => this.props.onClose() }
                style = {styles.buttonModal}>
                <Text style={styles.textButton}>−</Text>
              </TouchableOpacity>

              <Image
                resizeMode={'contain'} 
                source={{uri: this.props.urlImage}}
                style={
                  {
                    width: Dimensions.get('window').width - 30, 
                    height: 124,
                    borderRadius: 15,
              }}/>
              <View>
                <ScrollView>
                  <Text style={styles.fatText}> {FAT_TEXT} </Text>
                  <Text style={styles.smallText}> {SMALL_TEXT} </Text>
                </ScrollView>
              </View>
            </Animated.View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  viewInter:{ 
    position: 'absolute',
    backgroundColor: 'white', 
    width: Dimensions.get('window').width,
    //height: 100 
  },

  buttonModal: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    padding: 10
  },

  container: {
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: -4,
    zIndex: 2,
    alignItems: 'center',
  },

  buttonModal: {
    //margin: 10,
    alignItems: 'center',
    //backgroundColor: '#DDDDDD',
    borderRadius: 10,
    //padding: 2
  },

  textButton:{
    fontSize: 30,    
    fontWeight: 'bold',
    color: 'black',
  },

  fatText:{
    fontSize: 15,    
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10,
    paddingTop: 7,
  },

  smallText:{
    fontSize: 11,
    color: 'gray',
    padding: 10
  }
});
