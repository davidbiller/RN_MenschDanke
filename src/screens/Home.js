import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  PixelRatio,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@exponent/vector-icons';
import { Components } from 'exponent';

const { width, height } = Dimensions.get('window');
const fields = "name,photos{images}";
const apiUrl = "https://graph.facebook.com/";
const apiToken = "EAACEdEose0cBAJ9imIzB6CDdImCVghlgdZB7SgAdgt7wj5o5ZADt87LdpRTHLYfZBSNTFaT7DxdF5dTT9kpMLwwRjcfvC4CBajDsPLwprG5yDJIPrr6bF4BNJqPGbm4AlghZBOE8UWfZCZBRNA4UvcEZB9w0uvwW0WqFLFUy9IULwZDZD";


export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
    loading: true,
    fbData: {},
    smallGallery: false,
    fbPage: "1444539895776785",
    text: "",
    showSearchIcon: true,
    };
  }

  componentWillMount() {
    fetch(apiUrl + this.state.fbPage + "/?fields=" + fields + '&access_token=' + apiToken)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({fbData: responseJson, loading: false})
      })
      .catch((error) => {
        console.log(error)
      });
  }

  renderSmallGallery(fb){
    var imagesRow = [];

    if (fb.photos.data.length < 0 ){
      return <Text> Keine Fotos vorhanden </Text>
    }else{

      for (i=0; i < fb.photos.data.length; i++ )

      imagesRow.push(
                <Image key={i} style={{resizeMode:"contain" , width: width/2, height: 140, marginBottom: 20}}
                       source={{uri: fb.photos.data[i].images[0].source}}
                />);
    }
    return imagesRow;

  }

  renderBigGallery(fb){
    var imagesRow = [];

    if (fb.photos.data.length < 0 ){
      return <Text> Keine Fotos vorhanden </Text>
    }else{

      for (i=0; i < fb.photos.data.length; i++ )

      imagesRow.push(
                <Image key={i} style={{resizeMode:"contain" , width: width, height: 300, marginBottom: 10}}
                       source={{uri: fb.photos.data[i].images[0].source}}
                />);
    }
    return imagesRow;

  }

  showBigGallery(){
    this.setState({smallGallery: true})
  }

  showSmallGallery(){
    this.setState({smallGallery: false})
  }

  goToPage(text){
    fetch(apiUrl + this.state.text + "/?fields=" + fields + '&access_token=' + apiToken)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.photos.data === undefined){
          return
        }
        this.setState({fbData: responseJson, loading: false})
      })
      .catch((error) => {
        console.log(error)
      });
  }

  render() {
    const fb = this.state.fbData;

    if (this.state.loading) { 
      return (<ActivityIndicator style={styles.centering} color={"green"} />)
    }else{
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
          style={styles.searchInput}
          onChangeText={(text) => this.setState({text: text, showSearchIcon: false})}
          onSubmitEditing={() => this.goToPage()}
          value={this.state.text}
          placeholder={"Search"}
          >
          {this.state.showSearchIcon ? 
            <Ionicons name="ios-search-outline" size={18} style={{left: 100, color: "grey"}} />
            :
            <View/>
          }
          </TextInput>
        </View>
        <View style={styles.changeView}>
          <TouchableOpacity onPress={() => this.showBigGallery()}>
            <Ionicons name="md-square" size={28} style={{color: "grey"}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.showSmallGallery()}>
            <Ionicons name="md-apps" size={28} style={{color: "grey"}} />
          </TouchableOpacity>
        </View>

        <ScrollView style={{height: 800}}>
          <View style={styles.imageWrapper}>
            {this.state.smallGallery ? 
              this.renderBigGallery(fb)
              :
              this.renderSmallGallery(fb)
            }
          </View>  
        </ScrollView>
            
      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    marginTop: 20,
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF"
  },
  searchInput: {
    justifyContent: "center",
    textAlign: "center",
    height: 30,
    backgroundColor: "#EFEFEF",
    borderRadius: 4,
  },
  changeView: {
    margin: 8,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageWrapper: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  }
});
