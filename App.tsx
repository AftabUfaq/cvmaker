import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// --- Screen Imports ---
import SplashScreen from './src/screens/SplashScreen';
import PersonalInfoScreen from './src/screens/PersonalInfoScreen';
import ProfessionalSummaryScreen from './src/screens/ProfessionalSummaryScreen'
import ExperienceScreen from './src/screens/ExperienceScreen';
import EducationScreen from './src/screens/EducationScreen';
import SkillsScreen from './src/screens/SkillsScreen';
import ProjectsScreen from './src/screens/ProjectScreen';
import TemplateScreen from './src/screens/TemplateScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import PDFPreviewScreen from './src/screens/PDFPreviewScreen';
import { ResumeProvider } from './src/context/ResumeContext';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <ResumeProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash" 
          screenOptions={{ 
            headerShown: false,
            // Smooth transition between form steps
            gestureEnabled: true, 
          }}
        >
          {/* 1. Loading/Entry */}
          <Stack.Screen name="Splash" component={SplashScreen} />

          {/* 2. CV Data Collection Steps */}
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
          <Stack.Screen name="ProfessionalSummary" component={ProfessionalSummaryScreen} />
          <Stack.Screen name="Experience" component={ExperienceScreen} />
          <Stack.Screen name="Education" component={EducationScreen} />
          <Stack.Screen name="Skills" component={SkillsScreen} />
          <Stack.Screen name="Projects" component={ProjectsScreen} />

          {/* 3. Design & Customization */}
          <Stack.Screen name="Template" component={TemplateScreen} />
          

          {/* 4. Final Review & Export */}
          <Stack.Screen name="Preview" component={PreviewScreen} />
          <Stack.Screen name="PDFPreview" component={PDFPreviewScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
      </ResumeProvider>
    </SafeAreaProvider>
  );
}

export default App;