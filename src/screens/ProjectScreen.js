import React, { useState, useContext } from 'react'; // Added useContext
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResumeContext } from '../context/ResumeContext'; // Added Context

const ProjectsScreen = ({ navigation }) => {
  const { resumeData, updateResumeData } = useContext(ResumeContext);

  // Initialize from context if data exists
  const [projects, setProjects] = useState(
    resumeData.projects.length > 0 ? resumeData.projects : [
      { id: Date.now(), name: '', description: '', startDate: '', endDate: '', bullets: [''] }
    ]
  );

  // Handle saving to global context and navigating
  const handleNext = () => {
    updateResumeData('projects', projects);
    navigation.navigate('Template');
  };

  // Helper to update specific object fields in the array
  const updateField = (index, field, value) => {
    const newProjs = [...projects];
    newProjs[index][field] = value;
    setProjects(newProjs);
  };

  // Helper to update specific bullets
  const updateBullet = (projIndex, bulletIndex, value) => {
    const newProjs = [...projects];
    newProjs[projIndex].bullets[bulletIndex] = value;
    setProjects(newProjs);
  };

  const addProject = () => {
    setProjects([...projects, { 
      id: Date.now(), name: '', description: '', startDate: '', endDate: '', bullets: [''] 
    }]);
  };

  const removeProject = (id) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const addBullet = (index) => {
    const newProjs = [...projects];
    newProjs[index].bullets.push('');
    setProjects(newProjs);
  };

  const removeBullet = (projIndex, bulletIndex) => {
    const newProjs = [...projects];
    newProjs[projIndex].bullets = newProjs[projIndex].bullets.filter((_, i) => i !== bulletIndex);
    setProjects(newProjs);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <Text style={styles.headerTitle}>Resume Genie</Text>
        <View style={styles.profileCircle} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepText}>Step 6 of 7   <Text style={styles.savedText}>saved 0s ago</Text></Text>
        
        <View style={styles.progressBarBg}>
          <View style={[styles.progressFill, { width: '83%' }]} />
        </View>
        <Text style={styles.percentage}>83%</Text>

        <Text style={styles.sectionTitle}>Projects</Text>
        
        <TouchableOpacity style={styles.addButton} onPress={addProject}>
          <Text style={styles.addButtonText}>+ Add Project</Text>
        </TouchableOpacity>

        {projects.map((proj, index) => (
          <View key={proj.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardLabel}>Project {index + 1}</Text>
              <TouchableOpacity onPress={() => removeProject(proj.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>

            <TextInput 
              style={styles.input} 
              placeholder="Name of Project" 
              placeholderTextColor="#999" 
              value={proj.name}
              onChangeText={(text) => updateField(index, 'name', text)}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Description" 
              placeholderTextColor="#999" 
              value={proj.description}
              onChangeText={(text) => updateField(index, 'description', text)}
            />
            
            <View style={styles.row}>
              <TextInput 
                style={[styles.input, styles.halfInput]} 
                placeholder="Start Date" 
                placeholderTextColor="#999" 
                value={proj.startDate}
                onChangeText={(text) => updateField(index, 'startDate', text)}
              />
              <TextInput 
                style={[styles.input, styles.halfInput]} 
                placeholder="End Date" 
                placeholderTextColor="#999" 
                value={proj.endDate}
                onChangeText={(text) => updateField(index, 'endDate', text)}
              />
            </View>

            {proj.bullets.map((bullet, bIndex) => (
              <View key={bIndex} style={styles.bulletRow}>
                <Text style={styles.bulletNumber}>{bIndex + 1}. </Text>
                <TextInput 
                  style={styles.bulletInput} 
                  placeholder="Contribution or highlight" 
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
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 15 },
  addButton: { backgroundColor: '#E8F0FE', padding: 12, borderRadius: 8, marginBottom: 20, width: 140 },
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

export default ProjectsScreen;