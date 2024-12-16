import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import BoldText from '../../customText/BoldText';
import {Button, useTheme} from 'react-native-paper';
import LightText from '../../customText/LightText';
import RegularText from '../../customText/RegularText';
import {useNavigation} from '@react-navigation/native';
import Header from '../../Component/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../../context/GlobaContext';
import axios from 'axios';
import {showToast} from '../../../utils/Toast';
export default function Login() {
  let theme = useTheme();
  const {setIsLogin, Checknetinfo} = useAuthContext();
  let navigation = useNavigation();
  // State for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spinner, setSpinner] = useState(false);

  const handleLogin = async () => {
    const isConnected = await Checknetinfo();
    if (!isConnected) {
      setSpinner(false);
      return;
    };
    let data = {
      email,
      password,
    };
    try {
      let response = await axios.post(`${youIpAddress}/login`, data); //Live
      // let response = await axios.post(`http://10.0.2.2:5000/login`,data); //for emulator
      if (response.status === 200) {
        let message = response.data.message;
        showToast(`${message}`);
        await AsyncStorage.setItem('IsLogin', 'true');
        setIsLogin(false);
        navigation.navigate('Home');
      } else {
        showToast('Something went wrong');
      }
    } catch (error) {
      console.log(error,'error');
      if (axios.isAxiosError(error)) {
        // Check if the error has a response (like status 400 errors)
        if (error.response) {
          showToast(`${error.response.data.error}`);
        }
      }
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  let screenName = 'Login';
  return (
    <>
      <Header screenName={screenName} />
      <View
        style={[
          styles.mainContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        {/* Heading */}
        <View style={styles.headingContainer}>
          <BoldText style={styles.authHead}>Sign in to Your</BoldText>
          <BoldText style={styles.authHead}>Account</BoldText>
          <LightText style={{marginTop: 10}}>
            Please sign in to continue or create a new account.
          </LightText>

        </View>

        {/* Inputs */}
        <View style={styles.inputContainer}>
          
          <TextInput
            style={[
              styles.input,
              {
                color: theme.colors.onBackground,
                borderColor: theme.colors.onBackground,
              },
            ]}
            placeholder="2"
            value={password}
          />
          <Button
            onPress={spinner ? () => {} : handleLogin}
            mode="contained"
            style={[styles.btn, {backgroundColor: theme.colors.onBackground}]}>
            {spinner ? (
              <ActivityIndicator size={24} color={theme.colors.background} />
            ) : (
            )}
          </Button>
        </View>

        <View
          style={{
            marginVertical: 2,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <LightText>Don't have an account? </LightText>
          <TouchableOpacity onPress={handleRegister}>
            </RegularText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );