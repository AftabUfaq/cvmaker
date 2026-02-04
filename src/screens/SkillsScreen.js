import React, { useState, useContext } from 'react'; // Added useContext
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResumeContext } from '../context/ResumeContext'; // Import Context

const SkillsScreen = ({ navigation }) => {
  const { resumeData, updateResumeData } = useContext(ResumeContext);

  // Initialize from context if data exists, otherwise use your defaults
  const [skills, setSkills] = useState(
    resumeData.skills.length > 0 ? resumeData.skills : ['Python', 'Java', 'C++', 'React']
  );
  const [skillInput, setSkillInput] = useState('');

  const handleNext = () => {
    updateResumeData('skills', skills); // Save the array of strings to global context
    navigation.navigate('Projects');
  };

  // Add a new skill to the list
  const addSkill = () => {
    if (skillInput.trim().length > 0) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput(''); 
    }
  };

  // Remove a skill from the list
  const removeSkill = (indexToRemove) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <Text style={styles.headerTitle}>Resume Genie</Text>
        <View style={styles.profileCircle} />
      </View>

      <View style={styles.content}>
        <Text style={styles.stepText}>Step 5 of 7   <Text style={styles.savedText}>saved 0s ago</Text></Text>
        
        <View style={styles.progressBarBg}>
          <View style={[styles.progressFill, { width: '67%' }]} />
        </View>
        <Text style={styles.percentage}>67%</Text>

        <Text style={styles.sectionTitle}>Skills</Text>

        <View style={styles.inputRow}>
          <TextInput 
            style={styles.input} 
            placeholder="Add a skill (e.g Python)" 
            placeholderTextColor="#A0A0A0"
            value={skillInput}
            onChangeText={setSkillInput}
            onSubmitEditing={addSkill} 
          />
          <TouchableOpacity style={styles.addButton} onPress={addSkill}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.skillsContainer}>
          {skills.map((item, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{item}</Text>
              <TouchableOpacity onPress={() => removeSkill(index)}>
                <Text style={styles.removeX}> X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={handleNext} 
        >
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
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 20 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#E8F0FE', borderRadius: 8, padding: 12, marginRight: 10, fontSize: 16, color: '#000' },
  addButton: { backgroundColor: '#0052CC', paddingHorizontal: 25, justifyContent: 'center', borderRadius: 8 },
  addButtonText: { color: '#FFF', fontWeight: 'bold' },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  skillTag: { flexDirection: 'row', backgroundColor: '#E8F0FE', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, marginRight: 10, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: '#D0DDFE' },
  skillText: { color: '#000', fontSize: 15, fontWeight: '500' },
  removeX: { color: '#FF4D4D', fontWeight: 'bold', marginLeft: 8, fontSize: 14 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, position: 'absolute', bottom: 0, width: '100%' },
  backButton: { padding: 15, width: '45%', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 10 },
  nextButton: { padding: 15, width: '45%', alignItems: 'center', backgroundColor: '#0052CC', borderRadius: 10 },
  nextButtonText: { color: '#FFF', fontWeight: 'bold' },
});

export default SkillsScreen;