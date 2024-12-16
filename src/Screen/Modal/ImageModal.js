


import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
  } from 'react-native';
  import React, {Modal2} from 'react';
import SemiBoldText from '../../customText/SemiBoldText';
  
  export default function ImageModal({visible, image, opacityAnim, setVisible}) {
    let theme = useTheme();
    // Function to close modal with animation
    const closeImageModal = () => {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    };
    return (
      <>
        {/* Modal for Aadhaar image */}
        <Modal2 visible={visible} transparent={true} animationType="fade">
          <View style={styles.fullScreenModal}>
            {/* App Bar */}
            <View>

            </View>
            <TouchableWithoutFeedback onPress={closeImageModal}>
              <View
                style={[
                  styles.modalBackdrop,
                  {backgroundColor: theme.colors.background},
                ]}>
                <Animated.View
                  style={[styles.modalContent, {opacity: opacityAnim}]}>
                  {image ? (
                    <Image
                      source={{
                        uri: image,
                      }}
                      style={styles.aadharImage}
                    />
                  ) : (
                    <SemiBoldText
                      style={{color: theme.colors.onBackground, fontSize: 16}}>
                      No Image Found
                    </SemiBoldText>
                  )}
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </>
    );
  }