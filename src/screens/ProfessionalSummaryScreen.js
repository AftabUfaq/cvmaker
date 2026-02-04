import React, { useState, useContext } from 'react'; // Added useContext
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResumeContext } from '../context/ResumeContext'; // Added Context import

const ProfessionalSummaryScreen = ({ navigation }) => {
  const { updateResumeData, resumeData } = useContext(ResumeContext);
  
  // Initialize local state with data from context if it exists
  const [summary, setSummary] = useState(resumeData.summary || '');

  // Simple word counter logic
  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  const handleNext = () => {
    // Save the summary string to the global context
    updateResumeData('summary', summary); 
    navigation.navigate('Experience');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <Text style={styles.headerTitle}>Resume Genie</Text>
        <View style={styles.profileCircle} />
      </View>

      <View style={styles.content}>
        <Text style={styles.stepText}>
          Step 2 of 7   <Text style={styles.savedText}>saved 0s ago</Text>
        </Text>
        
        <View style={styles.progressBarBg}>
          <View style={[styles.progressFill, { width: '17%' }]} />
        </View>
        <Text style={styles.percentage}>17%</Text>

        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.label}>About You</Text>

        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Write a brief overview of your professional background..."
            placeholderTextColor="#A0A0A0"
            multiline={true}
            numberOfLines={10}
            textAlignVertical="top"
            onChangeText={(text) => setSummary(text)}
            value={summary}
          />
        </View>

        <Text style={styles.wordCountText}>{wordCount} words</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext} // Use the new handler
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ... styles remain exactly the same

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20 
  },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#333' },
  profileCircle: { width: 35, height: 35, borderRadius: 17.5, backgroundColor: '#E0E0E0' },
  menuIcon: { fontSize: 24, color: '#333' },
  
  content: { paddingHorizontal: 25 },
  stepText: { fontSize: 14, color: '#666', marginBottom: 10 },
  savedText: { color: '#AAA' },
  
  progressBarBg: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4 },
  progressFill: { height: '100%', backgroundColor: '#0052CC', borderRadius: 4 },
  percentage: { fontSize: 12, color: '#0052CC', marginTop: 5, marginBottom: 20 },
  
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 15 },
  
  textAreaContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#0052CC', // Focused blue color from your image
    padding: 10,
    height: 250,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  textArea: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  wordCountText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    position: 'absolute',
    bottom: 20,
    width: '100%'
  },
  backButton: { 
    padding: 15, 
    width: '45%', 
    alignItems: 'center', 
    backgroundColor: '#F0F0F0', 
    borderRadius: 10 
  },
  backButtonText: { color: '#333', fontWeight: '600' },
  nextButton: { 
    padding: 15, 
    width: '45%', 
    alignItems: 'center', 
    backgroundColor: '#0052CC', 
    borderRadius: 10 
  },
  nextButtonText: { color: '#FFF', fontWeight: 'bold' },
});

export default ProfessionalSummaryScreen;