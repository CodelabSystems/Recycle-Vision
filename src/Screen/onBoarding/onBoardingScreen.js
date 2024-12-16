import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native2';
import Onboarding from 'react-native-onboarding-swiper';
import LightText from '../../customText/LightText';
import {Iconify} from 'react-native-iconify';
import RegularText from '../../customText/RegularText';

const OnboardingScreen1 = ({}) => {
  let navigation = useNavigation(0);
  let windowWidth = Dimensions.get('window').width - 20;

  let iconSize = 180;

  return (
    <Onboarding
     
      nextLabel={
        <RegularText
          style={{
            fontSize: 16,
            color: theme.colors.appColor,
            fontFamily: 'Sora-Regular',
          }}>
          Next
        </RegularText>
      }
      onDone={handleBtnPress} // Navigate after the last onboarding screen
      pages={[
        {
          backgroundColor: theme.colors.background,
          title: (
            <View style={styles.contentIcons}>
             
          ),

          subtitle: (
            <View>
              <RegularText
                style={{
                  marginBottom: 10,
                  marginHorizontal: 15,
                  fontFamily: 'Sora-Regular',
                  fontSize: 17, // Customize font size if needed
                  textAlign: 'center',
                }}>
                {` Welcome to RecycleVision \n Identify what's recyclable with just a
                snap. Together, we can reduce waste and build a cleaner future.`}
              </RegularText>
            </View>
          ),
        },
        {
          backgroundColor: theme.colors.background,
          title: (
            <View >
            </View>
          ),

          subtitle: (
            <View>
              <RegularText
                style={{
                  marginBottom: 10,
                  marginHorizontal: 15,
                  fontSize: 17, // Customize font size if needed
                  textAlign: 'center',
                }}>
                Capture Any Object Snap a photo of any item, and we'll let you
                know if it can be recycled or not.
              </RegularText>
            </View>
          ),
        },
        {
          backgroundColor: theme.colors.background,
            <View style={styles.contentIcons}>
              <Iconify
                icon="lucide:list-restart"
                size={iconSize}
                color={theme.colors.onBackground}
              />
            </View>
          ),
          subtitle: (
            <View>
              <RegularText
                style={{
                  marginBottom: 10,
                  marginHorizontal: 15,
                  fontSize: 17, // Customize font size if needed
                  textAlign: 'center',
                }}>
                Start Recycling Smarter Tap below to start identifying
                recyclable items. It’s quick and easy!
              </RegularText>
            </View>
          ),
        },
      ]}
    />
  );
};
const styles = StyleSheet.create({
  btn: {
    padding: 4,
  },
  contentIcons: {
    justifyContent: 'center',
  },
});
export default OnboardingScreen1;
