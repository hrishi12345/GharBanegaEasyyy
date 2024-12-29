// import React, { useEffect } from "react";
// import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import MainLayout from "../../components/Tabs/MainLayout";

// export default function AttendaceTracker({attendances}) {
//   const projects = [
//     { name: "Office Building Renovation", site: "Downtown Plaza" },
//     { name: "Residential Complex", site: "Sunnyside Heights" },
//     { name: "Shopping Mall Extension", site: "Metro Center" },
//     { name: "Hospital Wing Addition", site: "St. Mary's Medical Center" },
//     { name: "School Gymnasium", site: "Lincoln High School" },
//     { name: "Public Library Modernization", site: "Central Library" },
//   ];

//   useEffect(() => {
//     const fetchProjectById = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         console.log('Token:', token);

//         if (token) {
//           const response = await axios.post(
//             `${API_URL}/projects/get-project-by-id`,
//             {_id: inventory[0].project},
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             },
//           );

//           console.log('Project Data:', response.data.data);
//           setProjectData(response.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching project:', error);
//       }
//     };

//     fetchProjectById();
//   }, [attendances]);

//   const navigation=useNavigation()
//   return (
//     <MainLayout style={styles.container}>
//       <View style={styles.container2}>
//       <Text style={styles.header}>Attendace Tracker</Text>
//       </View>
//       <ScrollView style={styles.projectList}>
//         {projects.map((project, index) => (
//           <View key={index} style={styles.projectItem}>
//             <Text style={styles.projectName}>{project.name}</Text>
//             <View style={styles.siteRow}>
//               <Text style={styles.siteName}>{project.site}</Text>
//               <TouchableOpacity style={styles.viewProgressContainer} onPress={() => navigation.navigate('Attendance')}>
//                 <Text style={styles.viewProgressText}>View Details</Text>
//                 <View style={styles.underline} />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.borderBottom} />
//           </View>
//         ))}
//       </ScrollView>
//     </MainLayout>
//   );
// }

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MainLayout from '../../components/Tabs/MainLayout';
import {useSelector} from 'react-redux';

export default function AttendanceTracker() {
  const navigation = useNavigation();
  const projects = useSelector(state => state.projects.projects);

  return (
    <MainLayout style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.header}>Attendance Tracker</Text>
      </View>
      <ScrollView style={styles.projectList}>
        {projects.map(project => (
          <TouchableOpacity
            key={project._id}
            style={styles.projectItem}
            onPress={() => navigation.navigate('Attendance', {project})}>
            <Text style={styles.projectName}>{project.projectName}</Text>
            <View style={styles.siteRow}>
              <Text style={styles.siteName}>{project.projectCity}</Text>
              <TouchableOpacity style={styles.viewProgressContainer}>
                <Text style={styles.viewProgressText}>View Details</Text>
                <View style={styles.underline} />
              </TouchableOpacity>
            </View>
            <View style={styles.borderBottom} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    paddingTop: 44, // Accounting for status bar
  },
  container2: {
    margin: 20,
  },
  header: {
    fontSize: 18,
    fontFamily: 'Prompt-Medium',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 16,
  },
  projectList: {
    flex: 1,
  },
  projectItem: {
    paddingHorizontal: 26,
    paddingVertical: 12,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0277D3',
    marginBottom: 4,
    fontFamily: 'Prompt-Medium',
  },
  siteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  siteName: {
    fontSize: 12,
    color: '#333333',
    fontFamily: 'Prompt-Medium',
  },
  viewProgressContainer: {
    alignItems: 'flex-end',
  },
  viewProgressText: {
    fontSize: 12,
    color: '#0277D3',
    fontFamily: 'Prompt-Medium',
  },
  underline: {
    height: 1,
    backgroundColor: '#0277D3',
    width: '100%',
    marginTop: 2,
  },
  borderBottom: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 12,
    marginLeft: -10, // Adjust this value to move the border start position
    marginRight: 0, // This ensures the border ends exactly below "View Progress"
  },
});
