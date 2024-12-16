
import {AuthContextProvider} from './src/context/GlobaContext';
import AppNavigator from './src/AppNavigator';

export default function App() {
  return (
      <AppWithTheme />
  );
}

function AppWithTheme() {

  return (
    <>
      <AuthContextProvider>
        <AppNavigator />
      </AuthContextProvider>
    </>
  );
}
