import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

class QuickLook extends Component {

componentDidMount() {
       this.fetchData();
   }
 
   fetchData() {
       fetch("https://api.github.com/repositories")
       .then((response) => response.json())
       .then((responseData) => {
           this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData),
               isLoading: false
           });
       })
       .done();
   }

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: true,
      dataSource: ds
    };
  }

  renderRow(rowData, sectionID, rowID, highlightRow){
    return(
      <View style={styles.row}>
        <Text style={styles.name}>
          Repo Name: {rowData.full_name}
        </Text>
        <Text style={styles.desc}>
          {rowData.description}
        </Text>
      </View>
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    console.log('renderSeparator',sectionID, rowID, adjacentRowHighlighted);
    return(
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  renderLoadingView() {
    return (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large"
          />
          <Text>
                Loading Github repos...
          </Text>
        </View>
    );
  }

  render() {

    if (this.state.isLoading) {
           return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        style={ styles.list }
      />
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  name: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10
  },
  desc: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
    margin: 10
  },
  separator: {
       height: 1,
       backgroundColor: '#dddddd'
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   },
   row: {
    paddingVertical: 20,
  },
});

AppRegistry.registerComponent('QuickLook', () => QuickLook);
