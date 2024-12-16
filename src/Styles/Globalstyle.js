import { StyleSheet } from 'react-native';

const globalStyles = (theme) => StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal:12
     // Shadow for Android
    //  elevation: 1.5, // Lower elevation for less shadow on Android
  }
  
});

export default globalStyles;
