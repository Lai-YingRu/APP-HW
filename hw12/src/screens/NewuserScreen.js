import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage,Picker  } from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { Facebook } from 'expo';

import Confirm from '../components/Confirm';

// Make a component
class NewuserScreen extends Component {
  state = {
    email: null,
    password: null,
    username: null,
    birthday:null,
    gender: 'male',
    error: ' ',
    loading: false,
    
    //showModal: false,
    token: null,
    status: 'Not Login...'
  };

  facebookLogin = async () => {
    console.log('Testing token....');
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      console.log('Already having a token...');
      this.setState({ token });

      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      this.setState({ status: `Hello ${(await response.json()).name}` });
      console.log(response);

    } else {
      console.log('DO NOT having a token...');
      this.doFacebookLogin();
    }
  };

  doFacebookLogin = async () => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync(
      '113143229250709',
      {
        permissions: ['public_profile'],
        behavior: 'web'
      });

    if (type === 'cancel') {
      console.log('Login Fail!!');
      return;
    }

    await AsyncStorage.setItem('fb_token', token);
    this.setState({ token });
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
    this.setState({ status: `Hello ${(await response.json()).name}` });
    console.log(response);
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    try {
      await firebase.auth().signInWithCredential(credential);
      const { currentUser } = await firebase.auth();
      console.log(`currentUser = ${currentUser.uid}`);
      this.props.navigation.navigate('UserStack');
    } catch (err) {

    }
  };

  onSignIn = async () => {
    const { email, password } = this.state;
    this.setState({ error: ' ', loading: true });
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.props.navigation.navigate('UserStack');
    } catch (err) {
      //this.setState({ showModal: true });
    }
  }

  onCreateUser = async () => {
    const { email,password, username, birthday, gender } = this.state;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      //this.setState({ showModal: false });
      const { currentUser } = firebase.auth();    
      let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
      dbUserid.set({ email, username, birthday, gender });
      this.props.navigation.navigate('UserStack');
    } catch (err) {
      this.setState({
        email: '',
        password: '',
        error: err.message,
        loading: false,
        //showModal: false
      });
    }
  }

  // onCLoseModal = () => {
  //   this.setState({
  //     email: '',
  //     password: '',
  //     error: '',
  //     loading: false,
  //     showModal: false
  //   });
  // }

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size='large' style={{ marginTop: 20 }} />;
    }

    return (
      <Button
        title='Sign up'
        backgroundColor='#4AAF4C'
        onPress={this.onCreateUser}
      />
    );
  }
  async componentDidMount() {
    await AsyncStorage.removeItem('fb_token');
  }

  render() {
    return (
      <View>
        <View style={styles.formStyle}>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder='user@email.com'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <FormLabel>Username</FormLabel>
          <FormInput
            
            autoCorrect={false}
            autoCapitalize='none'
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />
          <FormLabel>Birthday</FormLabel>
          <FormInput
            placeholder='XXXX.XX.XX'
            autoCorrect={false}
            autoCapitalize='none'
            value={this.state.birthday}
            onChangeText={birthday => this.setState({ birthday })}
          />
           <FormLabel>Gender</FormLabel>
          <FormInput
            placeholder='male/female'
            autoCorrect={false}
            autoCapitalize='none'
            value={this.state.gender}
            onChangeText={gender => this.setState({ gender })}
          />
          {this.renderButton()}
          <FormValidationMessage>{this.state.error}</FormValidationMessage>
        </View>
        <View style={styles.formStyle2}>
          <Button
            title='Sign in with Facebook'
            backgroundColor='#39579A'
            onPress={this.facebookLogin}
          />
        </View>
        {/*<Confirm
          title='Are you sure to create a new user?'
          visible={this.state.showModal}
          onAccept={this.onCreateUser}
          onDecline={this.onCLoseModal}
        />*/}
      </View>
    );
  }
}

const styles = {
  formStyle: {
    marginTop: 60
  },
  formStyle2: {
    marginTop: 30
  },
};

export default NewuserScreen;