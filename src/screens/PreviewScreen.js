import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResumeContext } from '../context/ResumeContext';
import * as RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const PreviewScreen = ({ navigation }) => {
  const { resumeData } = useContext(ResumeContext);

  const generatePDF = async () => {
    // ... (Your existing PDF generation logic remains exactly as it was)
    try {
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: 'Helvetica', 'Arial', sans-serif; color: #333; padding: 20px; }
              .header { text-align: center; border-bottom: 2px solid #0052CC; padding-bottom: 10px; }
              .name { font-size: 28px; font-weight: bold; margin: 0; color: #000; }
              .contact { font-size: 14px; margin: 5px 0; }
              .section-title { font-size: 18px; font-weight: bold; color: #0052CC; text-transform: uppercase; margin-top: 20px; border-bottom: 1px solid #EEE; }
              .item { margin-bottom: 15px; }
              .item-header { display: flex; justify-content: space-between; font-weight: bold; }
              .sub-header { font-style: italic; color: #555; }
              .bullet-list { margin: 5px 0; padding-left: 20px; }
              .skill-container { display: flex; flex-wrap: wrap; gap: 10px; }
              .skill-tag { background: #F0F0F0; padding: 5px 10px; border-radius: 4px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 class="name">${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}</h1>
              <p class="contact">${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}</p>
            </div>
            <div class="section-title">Professional Summary</div>
            <p>${resumeData.summary || 'N/A'}</p>
            <div class="section-title">Experience</div>
            ${resumeData.experience.map(exp => `
              <div class="item">
                <div class="item-header"><span>${exp.designation}</span><span>${exp.startDate} - ${exp.endDate}</span></div>
                <div class="sub-header">${exp.company}</div>
                <ul class="bullet-list">${exp.bullets.map(b => b ? `<li>${b}</li>` : '').join('')}</ul>
              </div>
            `).join('')}
            <div class="section-title">Education</div>
            ${resumeData.education.map(edu => `
              <div class="item">
                <div class="item-header"><span>${edu.degree}</span><span>${edu.startDate} - ${edu.endDate}</span></div>
                <div class="sub-header">${edu.school}</div>
              </div>
            `).join('')}
            <div class="section-title">Skills</div>
            <div class="skill-container">
              ${resumeData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div class="section-title">Projects</div>
            ${resumeData.projects.map(proj => `
              <div class="item">
                <div class="item-header"><span>${proj.name}</span><span>${proj.startDate} - ${proj.endDate}</span></div>
                <p style="margin: 2px 0;">${proj.description}</p>
                <ul class="bullet-list">${proj.bullets.map(b => b ? `<li>${b}</li>` : '').join('')}</ul>
              </div>
            `).join('')}
          </body>
        </html>
      `;

      let options = {
        html: htmlContent,
        fileName: `${resumeData.personalInfo.firstName}_Resume`,
        directory: 'Documents',
      };

      let file = await RNHTMLtoPDF.convert(options);
      console.log('PDF Module:', RNHTMLtoPDF);
      
      await Share.open({
        url: (Platform.OS === 'android' ? 'file://' : '') + file.filePath,
        type: 'application/pdf',
      });

    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF');
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <Text style={styles.headerTitle}>Resume Genie</Text>
        <View style={styles.profileCircle} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Identity Section */}
        <View style={styles.identitySection}>
          <Text style={styles.nameLabel}>
            {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{resumeData.personalInfo.email}</Text>
            <Text style={styles.infoLabel}>{resumeData.personalInfo.phone}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.whiteBox}>
            <Text style={styles.summaryText}>{resumeData.summary || "N/A"}</Text>
          </View>
        </View>

        {/* Experience */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <View style={styles.whiteBox}>
            {resumeData.experience.length > 0 ? resumeData.experience.map((exp, index) => (
              <View key={exp.id} style={[styles.itemBlock, index !== 0 && styles.itemDivider]}>
                <Text style={styles.mainLabel}>{exp.designation}</Text>
                <Text style={styles.subLabel}>{exp.company}</Text>
                <Text style={styles.dateText}>{exp.startDate} - {exp.endDate}</Text>
                {exp.bullets.map((b, i) => b.trim() !== "" && <Text key={i} style={styles.bulletText}>• {b}</Text>)}
              </View>
            )) : <Text style={styles.emptyText}>No experience added.</Text>}
          </View>
        </View>

        {/* --- ADDED EDUCATION PREVIEW --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.whiteBox}>
            {resumeData.education.length > 0 ? resumeData.education.map((edu, index) => (
              <View key={edu.id} style={[styles.itemBlock, index !== 0 && styles.itemDivider]}>
                <Text style={styles.mainLabel}>{edu.degree}</Text>
                <Text style={styles.subLabel}>{edu.school}</Text>
                <Text style={styles.dateText}>{edu.startDate} - {edu.endDate}</Text>
              </View>
            )) : <Text style={styles.emptyText}>No education added.</Text>}
          </View>
        </View>

        {/* --- ADDED PROJECTS PREVIEW --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Projects</Text>
          <View style={styles.whiteBox}>
            {resumeData.projects.length > 0 ? resumeData.projects.map((proj, index) => (
              <View key={proj.id} style={[styles.itemBlock, index !== 0 && styles.itemDivider]}>
                <Text style={styles.mainLabel}>{proj.name}</Text>
                <Text style={styles.subLabel}>{proj.description}</Text>
                <Text style={styles.dateText}>{proj.startDate} - {proj.endDate}</Text>
                {proj.bullets.map((b, i) => b.trim() !== "" && <Text key={i} style={styles.bulletText}>• {b}</Text>)}
              </View>
            )) : <Text style={styles.emptyText}>No projects added.</Text>}
          </View>
        </View>

        {/* Skills Preview */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsWrapper}>
            {resumeData.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillBadgeText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveDraftButton}>
          <Text style={styles.saveDraftText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.generateButton} onPress={generatePDF}>
          <Text style={styles.generateText}>Generate PDF</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 22, color: '#333' },
  profileCircle: { width: 35, height: 35, borderRadius: 18, backgroundColor: '#E0E0E0' },
  content: { paddingHorizontal: 25 },
  identitySection: { marginTop: 10, marginBottom: 20 },
  nameLabel: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  infoLabel: { fontSize: 14, fontWeight: '600', color: '#555' },
  sectionContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 8 },
  whiteBox: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#D9D9D9' },
  itemBlock: { marginBottom: 10 },
  itemDivider: { borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 10, marginTop: 10 },
  mainLabel: { fontSize: 16, fontWeight: 'bold', color: '#0052CC' },
  subLabel: { fontSize: 14, fontWeight: '600', color: '#333' },
  dateText: { fontSize: 12, color: '#888', marginBottom: 4 },
  bulletText: { fontSize: 13, color: '#555', marginLeft: 10 },
  emptyText: { color: '#AAA', fontStyle: 'italic' },
  skillsWrapper: { flexDirection: 'row', flexWrap: 'wrap' },
  skillBadge: { backgroundColor: '#0052CC', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, marginRight: 8, marginBottom: 8 },
  skillBadgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#F8FAFF', position: 'absolute', bottom: 0, width: '100%' },
  saveDraftButton: { padding: 15, width: '45%', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 10 },
  saveDraftText: { color: '#333', fontWeight: '600' },
  generateButton: { padding: 15, width: '45%', alignItems: 'center', backgroundColor: '#0052CC', borderRadius: 10 },
  generateText: { color: '#FFF', fontWeight: 'bold' },
});

export default PreviewScreen;