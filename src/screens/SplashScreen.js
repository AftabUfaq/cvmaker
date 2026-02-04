import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Wait for 3 seconds, then move to the Home screen
    setTimeout(() => {
      navigation.replace('PersonalInfo'); 
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F5FF" />
      
      {/* Top Section */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>RESUME GENIE</Text>
        
        <View style={styles.iconCircle}>
          {/* Replace with your local logo image */}
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo} 
          />
        </View>

        <Text style={styles.subtitle}>Build your resume in minutes!</Text>
        
        {/* Progress Bar Placeholder */}
        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>
      </View>

      {/* Footer Section */}
     <View style={styles.footer}>
  <Text style={styles.footerText}>BY DROIDS</Text>
  <Image 
    source={require('../assets/droid.png')} 
    style={[styles.smallLogo, { backgroundColor: 'red' }]} 
  />
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F5FF', // Light blue-ish background from your image
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  mainContent: {
    alignItems: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'serif', // Or your custom font
    color: '#000',
    letterSpacing: 2,
    marginBottom: 40,
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  progressBarBg: {
    width: 250,
    height: 6,
    backgroundColor: '#D1D9E6',
    borderRadius: 3,
  },
  progressBarFill: {
    width: '40%', // You can animate this later
    height: '100%',
    backgroundColor: '#A0A0A0',
    borderRadius: 3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  smallLogo: {
    width: 30,
    height: 30,
  }
});

export default SplashScreen;