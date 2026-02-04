import React, { useState, useContext } from 'react'; // Added useContext
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResumeContext } from '../context/ResumeContext'; // Import Context

const EducationScreen = ({ navigation }) => {
  const { resumeData, updateResumeData } = useContext(ResumeContext);

  // Initialize state from context or default to one empty block
  const [educations, setEducations] = useState(
    resumeData.education.length > 0 ? resumeData.education : [
      { id: Date.now(), school: '', degree: '', startDate: '', endDate: '', bullets: [''] }
    ]
  );

  // Update specific fields in the education array
  const updateField = (index, field, value) => {
    const newEdus = [...educations];
    newEdus[index][field] = value;
    setEducations(newEdus);
  };

  // Update specific bullet points
  const updateBullet = (eduIndex, bulletIndex, value) => {
    const newEdus = [...educations];
    newEdus[eduIndex].bullets[bulletIndex] = value;
    setEducations(newEdus);
  };

  const handleNext = () => {
    updateResumeData('education', educations); // Save to global context
    navigation.navigate('Skills');
  };

  const addEducation = () => {
    setEducations([...educations, { 
      id: Date.now(), school: '', degree: '', startDate: '', endDate: '', bullets: [''] 
    }]);
  };

  const removeEducation = (id) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const addBullet = (index) => {
    const newEdus = [...educations];
    newEdus[index].bullets.push('');
    setEducations(newEdus);
  };

  const removeBullet = (eduIndex, bulletIndex) => {
    const newEdus = [...educations];
    newEdus[eduIndex].bullets = newEdus[eduIndex].bullets.filter((_, i) => i !== bulletIndex);
    setEducations(newEdus);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <Text style={styles.headerTitle}>Resume Genie</Text>
        <View style={styles.profileCircle} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepText}>Step 4 of 7   <Text style={styles.savedText}>saved 0s ago</Text></Text>
        
        <View style={styles.progressBarBg}>
          <View style={[styles.progressFill, { width: '50%' }]} />
        </View>
        <Text style={styles.percentage}>50%</Text>

        <Text style={styles.sectionTitle}>Education</Text>
        
        <TouchableOpacity style={styles.addButton} onPress={addEducation}>
          <Text style={styles.addButtonText}>+ Add Education</Text>
        </TouchableOpacity>

        {educations.map((edu, index) => (
          <View key={edu.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardLabel}>Education {index + 1}</Text>
              <TouchableOpacity onPress={() => removeEducation(edu.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>

            <TextInput 
              style={styles.input} 
              placeholder="Name of School/college" 
              placeholderTextColor="#999" 
              value={edu.school}
              onChangeText={(text) => updateField(index, 'school', text)}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Highest position (e.g - Graduation/Post-Graduation)" 
              placeholderTextColor="#999" 
              value={edu.degree}
              onChangeText={(text) => updateField(index, 'degree', text)}
            />
            
            <View style={styles.row}>
              <TextInput 
                style={[styles.input, styles.halfInput]} 
                placeholder="Start Date" 
                placeholderTextColor="#999" 
                value={edu.startDate}
                onChangeText={(text) => updateField(index, 'startDate', text)}
              />
              <TextInput 
                style={[styles.input, styles.halfInput]} 
                placeholder="End Date" 
                placeholderTextColor="#999" 
                value={edu.endDate}
                onChangeText={(text) => updateField(index, 'endDate', text)}
              />
            </View>

            {edu.bullets.map((bullet, bIndex) => (
              <View key={bIndex} style={styles.bulletRow}>
                <Text style={styles.bulletNumber}>{bIndex + 1}. </Text>
                <TextInput 
                  style={styles.bulletInput} 
                  placeholder="Additional Info (GPA, Awards, etc.)" 
                  placeholderTextColor="#999" 
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
        
        <View style={{ height: 120 }} />
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

// ... Styles stay the same
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 20, fontWeight: '600' },
  profileCircle: { width: 35, height: 35, borderRadius: 18, backgroundColor: '#E0E0E0' },
  content: { paddingHorizontal: 25 },
  progressBarBg: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginTop: 10 },
  progressFill: { height: '100%', backgroundColor: '#0052CC', borderRadius: 4 },
  percentage: { fontSize: 12, color: '#0052CC', marginVertical: 5 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 15 },
  addButton: { backgroundColor: '#E8F0FE', padding: 12, borderRadius: 8, marginBottom: 20, width: 160 },
  addButtonText: { color: '#0052CC', fontWeight: '600' },
  card: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1.5, borderColor: '#0052CC', padding: 15, marginBottom: 20, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cardLabel: { fontSize: 16, fontWeight: '600' },
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

export default EducationScreen;