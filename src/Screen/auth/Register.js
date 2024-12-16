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
import {useAuthContext} from '../../context/GlobaContext';
import {showToast} from '../../../utils/Toast';

export default function Register2() {
  let theme = useTheme();
  const {Checknetinfo} = useAuthContext();
  // State for email and password inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [spinner, setSpinner] = useState(false);

  let navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = async () => {
    const isConnected = await Checknetinfo();
    if (!isConnected) {
      setSpinner(false);
      return;
    }
    // Handle login action here
    // Prepare for data
    let data = {
      name,
      email,
      password,
    };

    try {
      let response = await axios.post(`${youIpAddress}/register`, data); //Live
      // let response = await axios.post(`http://10.0.2.2:5000/register`,data); //for emulator
      let message = response.data.message;
      showToast(`${message}`);
      navigation.navigate('Login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Check if the error has a response (like status 400 errors)
        if (error.response) {
          showToast(`${error.response.data.error}`);
        }
      }
    }
  };
  let screenName = 'Register';

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
          <BoldText style={styles.authHead}>Sign Up</BoldText>
          <LightText style={{marginTop: 10}}>
            Enter your details to create a new account
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
            placeholder="Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={[
              styles.input,
              {
                color: theme.colors.onBackground,
                borderColor: theme.colors.onBackground,
              },
            ]}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[
              styles.input,
              {
                color: theme.colors.onBackground,
                borderColor: theme.colors.onBackground,
              },
            ]}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button
            onPress={spinner ? () => {} : handleRegister}
            mode="contained"
            style={[styles.btn, {backgroundColor: theme.colors.onBackground}]}>
            {spinner ? (
              <ActivityIndicator size={24} color={theme.colors.background} />
            ) : (
              <BoldText style={{color: theme.colors.background}}>
                Register
              </BoldText>
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
          <LightText>Already have an account? </LightText>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
 
  btn: {
    padding: 4,
    marginTop: 20,
  },
});
