import React, { useState, useContext } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResumeContext } from '../context/ResumeContext'; // Added Context

const ExperienceScreen = ({ navigation }) => {
  const { resumeData, updateResumeData } = useContext(ResumeContext);

  // Initialize from context if data exists, otherwise use default
  const [experiences, setExperiences] = useState(
    resumeData.experience.length > 0 ? resumeData.experience : [
      { id: Date.now(), designation: '', company: '', startDate: '', endDate: '', bullets: ['', ''] }
    ]
  );

  const handleNext = () => {
    updateResumeData('experience', experiences); // Save array to context
    navigation.navigate('Education');
  };

  const updateField = (index, field, value) => {
    const newExps = [...experiences];
    newExps[index][field] = value;
    setExperiences(newExps);
  };

  const updateBullet = (expIndex, bulletIndex, value) => {
    const newExps = [...experiences];
    newExps[expIndex].bullets[bulletIndex] = value;
    setExperiences(newExps);
  };

  const addExperience = () => {
    setExperiences([...experiences, { 
      id: Date.now(), designation: '', company: '', startDate: '', endDate: '', bullets: [''] 
    }]);
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addBullet = (index) => {
    const newExps = [...experiences];
    newExps[index].bullets.push('');
    setExperiences(newExps);
  };

  const removeBullet = (expIndex, bulletIndex) => {
    const newExps = [...experiences];
    newExps[expIndex].bullets = newExps[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    setExperiences(newExps);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <Text style={styles.headerTitle}>Resume Genie</Text>
        <View style={styles.profileCircle} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepText}>Step 3 of 7   <Text style={styles.savedText}>saved 0s ago</Text></Text>
        
        <View style={styles.progressBarBg}>
          <View style={[styles.progressFill, { width: '33%' }]} />
        </View>
        <Text style={styles.percentage}>33%</Text>

        <Text style={styles.sectionTitle}>Experience</Text>
        <Text style={styles.label}>About You</Text>

        <TouchableOpacity style={styles.addExpButton} onPress={addExperience}>
          <Text style={styles.addExpText}>+ Add Experience</Text>
        </TouchableOpacity>

        {experiences.map((exp, index) => (
          <View key={exp.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Experience {index + 1}</Text>
              <TouchableOpacity onPress={() => removeExperience(exp.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>

            <TextInput 
              style={styles.input} 
              placeholder="Designation" 
              value={exp.designation}
              onChangeText={(text) => updateField(index, 'designation', text)}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Company" 
              value={exp.company}
              onChangeText={(text) => updateField(index, 'company', text)}
            />
            
            <View style={styles.row}>
              <TextInput 
                style={[styles.input, styles.halfInput]} 
                placeholder="Start Date" 
                value={exp.startDate}
                onChangeText={(text) => updateField(index, 'startDate', text)}
              />
              <TextInput 
                style={[styles.input, styles.halfInput]} 
                placeholder="End Date" 
                value={exp.endDate}
                onChangeText={(text) => updateField(index, 'endDate', text)}
              />
            </View>

            {exp.bullets.map((bullet, bIndex) => (
              <View key={bIndex} style={styles.bulletRow}>
                <Text style={styles.bulletNumber}>{bIndex + 1}. </Text>
                <TextInput 
                  style={styles.bulletInput} 
                  placeholder="Describe task/skill" 
                  value={bullet}
                  onChangeText={(text) => updateBullet(index, bIndex, text)}
                />
                <TouchableOpacity onPress={() => removeBullet(index, bIndex)}>
                  <Text style={styles.xButton}>X</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity onPress={() => addBullet(index)}>
              <Text style={styles.addBulletText}>+ Add Bullet</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ... Styles remain the same ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 20, fontWeight: '600' },
  profileCircle: { width: 35, height: 35, borderRadius: 18, backgroundColor: '#E0E0E0' },
  content: { paddingHorizontal: 25 },
  progressBarBg: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginTop: 10 },
  progressFill: { height: '100%', backgroundColor: '#0052CC', borderRadius: 4 },
  percentage: { fontSize: 12, color: '#0052CC', marginVertical: 5 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  addExpButton: { backgroundColor: '#E8F0FE', padding: 12, borderRadius: 8, marginVertical: 15, width: 160 },
  addExpText: { color: '#0052CC', fontWeight: '600' },
  card: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1.5, borderColor: '#0052CC', padding: 15, marginBottom: 20, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  removeText: { color: '#FF4D4D', fontWeight: '600' },
  input: { backgroundColor: '#E0E0E0', borderRadius: 8, padding: 12, marginBottom: 10, color: '#000' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  bulletRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bulletNumber: { fontSize: 16, fontWeight: 'bold' },
  bulletInput: { flex: 1, backgroundColor: '#E0E0E0', borderRadius: 8, padding: 10, marginRight: 10 },
  xButton: { color: '#FF4D4D', fontSize: 18, fontWeight: 'bold' },
  addBulletText: { color: '#0052CC', fontWeight: '600', marginTop: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#F8FAFF', position: 'absolute', bottom: 0, width: '100%' },
  backButton: { padding: 15, width: '45%', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 10 },
  nextButton: { padding: 15, width: '45%', alignItems: 'center', backgroundColor: '#0052CC', borderRadius: 10 },
  nextButtonText: { color: '#FFF', fontWeight: 'bold' },
});

export default ExperienceScreen;