'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView
} = React;

var ChatBox = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return {
      messageList: [],
      dataSource: ds
    };
  },
  componentDidMount: function() {
  },
  addMessage: function(message) {
    console.log("Adding a new message " + message);
    var messages = this.state.messageList;
    var newMessages = messages.concat([message]);
    this.setState({
      messageList: newMessages,
      dataSource: this.state.dataSource.cloneWithRows(newMessages)
    });
  },
  handleMessageSubmit: function(message) {
    console.log("Submitting message " + message);
    this.addMessage(message);
  },
  render: function() {
    return (
      <View>
        <Text style={styles.title}>
          {'Messages'}
        </Text>
        <MessageList data={this.state.dataSource}/>
        <InputForm onMessageSubmit={this.handleMessageSubmit} />
      </View>
    );
  }
});

var MessageList = React.createClass({
  render: function() {
    return (
      <ListView
        dataSource={this.props.data}
        renderRow={this.renderMessage}
        style={styles.listView}
      />
    );
  },
  renderMessage: function(message) {
    return (
      <View style={styles.message}>
        <Text>
          {message.author}: {message.text}
        </Text>
      </View>
    );
  }
});

var InputForm = React.createClass({
  getInitialState: function() {
    return {
      input: ''
    };
  },
  handleSubmit: function() {
    var text = this.state.input;
    console.log('Submitted message ' + text);
    if (!text) {
      return;
    }
    this.props.onMessageSubmit({author: "author", text: text});
    this.setState({input: ''});
    return;
  },
  render: function() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        autoFocus={true}
        value={this.state.input}
        onChangeText={(text) => this.setState({'input': text})}
        onSubmitEditing={this.handleSubmit}
        placeholder={'Message'}
      />
    );
  }
});

var styles = StyleSheet.create({
  listView: {
    marginTop: 20,
    backgroundColor: '#5E93FF',
  },
  message: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5E93FF',
    fontSize: 300,
    paddingTop: 10,
  },
  title: {
    fontSize: 50,
    margin: 10,
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('MobileMessage', () => ChatBox);
