// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import MainLayout from '../../components/Tabs/MainLayout';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { API_URL } from '../../utils/url';

// export default function InventoryTracker() {
//   const [projectData, setProjectData] = useState(null);
//   const route = useRoute();
//   const {inventory} = route.params;
//   const navigation = useNavigation();

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
//   }, [inventory]);

//   return (
//     <MainLayout style={styles.container}>
//       <View style={styles.container2}>
//         <Text style={styles.header}>Inventory Management</Text>
//       </View>
//       <ScrollView style={styles.projectList}>
//         {projectData && (
//           <View style={styles.projectItem}>
//             <Text style={styles.projectName}>{projectData.projectName}</Text>
//             <View style={styles.siteRow}>
//               <Text style={styles.siteName}>{projectData.projectCity}</Text>
//               <TouchableOpacity
//                 style={styles.viewProgressContainer}
//                 onPress={() =>
//                   navigation.navigate('InventoryManagement', {projectData})
//                 }>
//                 <Text style={styles.viewProgressText}>View Details</Text>
//                 <View style={styles.underline} />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.borderBottom} />
//           </View>
//         )}
//       </ScrollView>
//     </MainLayout>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FEFEFE',
//     paddingTop: 44, // Accounting for status bar
//   },
//   container2: {
//     margin: 20,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#333333',
//     textAlign: 'center',
//     marginVertical: 16,
//   },
//   projectList: {
//     flex: 1,
//   },
//   projectItem: {
//     paddingHorizontal: 26,
//     paddingVertical: 12,
//   },
//   projectName: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#0277D3',
//     marginBottom: 4,
//   },
//   siteRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   siteName: {
//     fontSize: 12,
//     color: '#333333',
//   },
//   viewProgressContainer: {
//     alignItems: 'flex-end',
//   },
//   viewProgressText: {
//     fontSize: 12,
//     color: '#0277D3',
//   },
//   underline: {
//     height: 1,
//     backgroundColor: '#0277D3',
//     width: '100%',
//     marginTop: 2,
//   },
//   borderBottom: {
//     height: 1,
//     backgroundColor: '#E0E0E0',
//     marginTop: 12,
//     marginLeft: -10, // Adjust this value to move the border start position
//     marginRight: 0, // This ensures the border ends exactly below "View Progress"
//   },
// });
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MainLayout from '../../components/Tabs/MainLayout';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default function InventoryTracker() {
  const projects = useSelector(state => state.projects.projects);
  const navigation = useNavigation();
  const userRole = useSelector(state => state.auth.user?.userType);

  const handleProjectPress = project => {
    if (userRole === 'Supervisor') {
      navigation.navigate('SuperVisorInventory', {project});
    } else {
      navigation.navigate('InventoryManagement', {project});
    }
  };

  const renderProjectItem = project => (
    <TouchableOpacity
      key={project._id}
      style={styles.projectItem}
      onPress={() => handleProjectPress(project)}>
      <Text style={styles.projectName}>{project.projectName}</Text>
      <View style={styles.siteRow}>
        <Text style={styles.siteName}>{project.projectCity}</Text>
        <TouchableOpacity
          style={styles.viewProgressContainer}
          onPress={() => handleProjectPress(project)}>
          <Text style={styles.viewProgressText}>View Details</Text>
          <View style={styles.underline} />
        </TouchableOpacity>
      </View>
      <View style={styles.borderBottom} />
    </TouchableOpacity>
  );

  return (
    <MainLayout style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.header}>Inventory Management</Text>
      </View>
      <ScrollView style={styles.projectList}>
        {projects.map(renderProjectItem)}
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    paddingTop: 44,
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
    marginLeft: -10,
    marginRight: 0,
  },
});
