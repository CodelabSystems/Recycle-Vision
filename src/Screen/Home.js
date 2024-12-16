import {
  StyleSheet,
  Text,
  Image,
  BackHandler,
  ActivityIndicator,
  Alert,
  RecyclerViewBackedScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LightText from '../customText/LightText';
import {showToast} from '../../utils/Toast';
import {useAuthContext} from '.../../GlobaContext';
export default function Home() {
  let theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
      } else {
        const uri = response.assets[0]?.uri;
        setSelectedImage(uri);
        setPrediction(null);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera error:', response.errorMessage);
      } else {
        const uri = response.assets[0]?.uri;
        setSelectedImage(uri);
        setPrediction(null);
      }
    });
  };

  const handleSubmit = async () => {
    setPrediction(null);
    setSpinner(true); // Show the spinner
    const isConnected = await Checknetinfo(); // Check network connection
    if (!isConnected) {
      setSpinner(false); // Hide spinner if not connected
      return;
    }

    try {
      // Ensure selectedImage is defined
      if (!selectedImage) {
        console.error('No image selected');
        setSpinner(false);
        return;
      }

      // // Upload the selected image to Cloudinary
      const uploadedImageUrl = await uploadImageToCloudinary(selectedImage);
      console.log('Uploaded Image URL:', uploadedImageUrl);
      // Prepare the form data for prediction
      const formData = new FormData();
      formData.append('file', {
        uri: uploadedImageUrl || selectedImage,
        type: 'image/jpeg', // Use the correct MIME type based on your image
        name: selectedImage.fileName || 'image.jpg', // Use file name if available
      });

      let response = await axios.post(
        // `http://10.0.2.2:5000/predict`,  //for Android
        `${youIpAddress}/predict`, //Live
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      // Log the response and handle the prediction result
      if (response.data && response.data) {
        setPrediction(response.data);
        // Update the UI with the prediction result
        // Example: setPrediction(response.data.prediction);
      } else {
      }
    } catch (err) {
    } finally {

  const handleCancel = () => {
    setSpinner(false);
  };

  const backPressedOnce = useRef(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    const backHandler = backPressedOnce.addEventListener(
      () => {
        if (isFocused) {
          if (!backPressedOnce.current) {
            backPressedOnce.current = true;
            showToast('Tap again to exit');
            setTimeout(() => {
              backPressedOnce.current = false;
            }, 2000); // Reset backPressedOnce after 2 seconds
            return true;
          } else {
            BackHandler.exitApp(); // If tapped again within 2 seconds, exit the app
            return true;
          }
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [isFocused]);

  let navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Logout', //title
      'Are you sure ,you want to logout ?', //message
      [
        {
          text: 'Cancel', // Cancel button
        {
          text: 'OK', // OK button
          onPress: () => {
            setIsLogin(true);
            AsyncStorage.setItem('IsLogin', 'false');
            AsyncStorage.clear();
            showToast('Logout successfully!');
            // some logic
          },
        },
      ],
      {cancelable: false}, // Optionally prevent dismissing by tapping outside the alert
    );
  };

  let notPredication = {
    flexDirection: 'column',
    width: '100%',
  };

  const [visible, setVisible] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [previmage, setPrevimage] = useState(null);
  // Function to handle opening the modal with animation
  const handlePrevImage = imageUri => {
    setVisible(true);
    setPrevimage(imageUri);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: theme.colors.background},
      ]}>
      <RecyclerViewBackedScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {/* Heading */}
        <View style={styles.headingContainer}>
          <View>
            <BoldText style={{fontSize: 24}}>Welcome to,</BoldText>
            <BoldText style={{fontSize: 24, top: -2}}>Recycle Vision</BoldText>
          </View>

          <Iconify
            icon="heroicons-outline:logout"
            size={38}
            color={theme.colors.onBackground}
            onPress={handleLogout}
          />
        </View>

        <SvgComponent />

        {/* How it works */}
        <View style={styles.howItWorksContainer}>
          <BoldText style={styles.sectionTitle}>How it works</BoldText>
          <LightText style={styles.description}>
            Recycle Vision helps you determine if the items in your waste are
            recyclable. Simply upload a picture of the item, and the app will
            analyze it to let you know whether it is recyclable or not, along
            with suggestions on how to properly recycle it.
          </LightText>
        </View>

        <View style={styles.imageprediction}>
          {/* Display the selected image */}
          {selectedImage && (
            <>
              <View style={!prediction ? notPredication : {}}>
                <TouchableOpacity
                  onPress={() => handlePrevImage(selectedImage)}
                  activeOpacity={0.5}
                  style={styles.imageContainer}>
                  <Image
                    source={{uri: selectedImage}}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>

                {/* Show the Spinner */}
                {spinner ? (
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: 'row',
                      alignSelf: 'center',
                      gap: 10,
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator
                      size={40}
                      color={theme.colors.onBackground}
                    />
                    <TouchableOpacity onPress={handleCancel}>
                      <SemiBoldText>Cancel</SemiBoldText>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    {!prediction && (
                      <>
                        {/* Show the submit Btn if image is there */}
                        <Button
                          disabled={spinner ? true : false}
                          style={styles.btn}
                          onPress={spinner ? () => {} : handleSubmit}>
                          <BoldText style={{color: '#fff', fontSize: 15}}>
                            Submit
                          </BoldText>
                        </Button>
                      </>
                    )}
                  </>
                )}
              </View>

              <View>
                {prediction && (
                  <View style={{marginTop: 20}}>
                    <SemiBoldText style={styles.responsehead}>
                      Prediction:
                    </SemiBoldText>
                    <BoldText
                      style={[
                        styles.responseText,
                        {color: theme.colors.green},
                      ]}>
                      {prediction?.class}
                    </BoldText>
                    <SemiBoldText style={styles.responsehead}>
                      Probability:
                    </SemiBoldText>
                    <RegularText
                      style={{fontSize: 13, width: 140}}
                      numberOfLines={2}>
                      {prediction?.probability.toFixed(10)}
                    </RegularText>

                    <View style={{marginVertical: 10}}>
                      {prediction.class == 'Recyclable' ? (
                        <Iconify
                          icon="fluent:bin-recycle-full-24-regular"
                          size={80}
                          color={theme.colors.onBackground}
                          onPress={handleLogout}
                        />
                      ) : (
                        <Iconify
                          icon="hugeicons:organic-food"
                          size={80}
                          color={theme.colors.onBackground}
                          onPress={handleLogout}
                        />
                      )}
                    </View>
                  </View>
                )}
              </View>
            </>
          )}
        </View>

        {prediction && (
          <View style={{margin: 3, marginHorizontal: 10, marginBottom: 100}}>
            <SemiBoldText style={{fontSize: 19}}>Tips:</SemiBoldText>
            <RegularText style={{fontSize: 14}}>{prediction?.tips}</RegularText>
          </View>
        )}
      </RecyclerViewBackedScrollView>

      <ImageModal2
        visible={visible}
        image={previmage}
      />
    </View>
  );
}
