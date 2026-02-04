import React, { useState, useContext } from 'react'; // Added useState
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResumeContext } from '../context/ResumeContext';

const PersonalInfoScreen = ({ navigation }) => {
  const { updateResumeData } = useContext(ResumeContext);
  
  // localInfo needs keys to match the fields
  const [localInfo, setLocalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: ''
  });

  const handleNext = () => {
    updateResumeData('personalInfo', localInfo); 
    navigation.navigate('ProfessionalSummary');
  };

  // Helper to update state based on field
  const handleChange = (key, value) => {
    setLocalInfo({ ...localInfo, [key]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <Text style={styles.headerTitle}>Resume Genie</Text>
        <View style={styles.profileCircle} />
      </View>

      <View style={styles.content}>
        <Text style={styles.stepText}>Step 1 of 7   <Text style={styles.savedText}>saved 0s ago</Text></Text>
        
        <View style={styles.progressBarBg}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.percentage}>0%</Text>

        <Text style={styles.sectionTitle}>Personal Information</Text>

        {/* Form Inputs mapped to state keys */}
        <TextInput 
          style={styles.input} 
          placeholder="First Name" 
          onChangeText={(val) => handleChange('firstName', val)}
          value={localInfo.firstName}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Last Name" 
          onChangeText={(val) => handleChange('lastName', val)}
          value={localInfo.lastName}
        />
        <TextInput 
          style={styles.input} 
          placeholder="E-mail" 
          keyboardType="email-address"
          onChangeText={(val) => handleChange('email', val)}
          value={localInfo.email}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Phone" 
          keyboardType="phone-pad"
          onChangeText={(val) => handleChange('phone', val)}
          value={localInfo.phone}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Location" 
          onChangeText={(val) => handleChange('location', val)}
          value={localInfo.location}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20 
  },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#333' },
  content: { paddingHorizontal: 25 },
  stepText: { fontSize: 14, color: '#666', marginBottom: 10 },
  savedText: { color: '#999' },
  progressBarBg: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4 },
  progressFill: { width: '5%', height: '100%', backgroundColor: '#0052CC', borderRadius: 4 },
  percentage: { fontSize: 12, color: '#0052CC', marginTop: 5, marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 25 },
  input: {
    backgroundColor: '#E8F0FE',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D0D0D0'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    position: 'absolute',
    bottom: 20,
    width: '100%'
  },
  backButton: { padding: 15, width: '45%', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 8 },
  nextButton: { padding: 15, width: '45%', alignItems: 'center', backgroundColor: '#0052CC', borderRadius: 8 },
  nextButtonText: { color: '#FFF', fontWeight: 'bold' },
});

export default PersonalInfoScreen;