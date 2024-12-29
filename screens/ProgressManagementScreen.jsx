// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import ProjectTimeline from '../components/ProgressManagement/ProjectTimeline';
// import BackIcon from '../assests/BackIcon';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const ProgressManagementScreen = () => {
//   const [progress, setProgressData] = useState([]); // Initialize as an array
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { project } = route.params; // Expecting 'project' to contain the relevant data

//   useEffect(() => {
//     const fetchProgressData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         console.log('Token:', token);

//         if (token) {
//           const response = await axios.get(
//             'http://3.110.171.43:5000/api/progress?projectId=668c372e432809f7668d4c0e',
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           console.log('Progress Data:', response.data.progress);
//           setProgressData(response.data.progress || []); // Default to an empty array if no data
//         }
//       } catch (error) {
//         console.error('Error fetching progress data:', error);
//       }
//     };

//     fetchProgressData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <BackIcon />
//         </TouchableOpacity>
//         <Text style={styles.mainHeader}>Progress Tracker</Text>
//       </View>
//       <View style={styles.projectInfo}>
//         <Text style={styles.projectName}>{project.projectName}</Text>
//         <Text style={styles.projectSite}>Site: {project.projectCity}</Text>
//         <Text style={styles.projectDescription}>{project.description}</Text>
//       </View>
//       <TouchableOpacity style={styles.addWorkerButton}>
//         <Text style={styles.addWorkerButtonText}>+ Add Progress</Text>
//       </TouchableOpacity>
//       <View style={styles.container3}>
//         <Text style={styles.header}>Project Timeline</Text>
//       </View>
//       <ProjectTimeline progress={progress} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FEFEFE',
//     paddingTop: 34,
//     marginHorizontal: responsiveWidth(2),
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 30,
//     marginRight: responsiveWidth(5),
//     marginBottom: 20,
//   },
//   mainHeader: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#333333',
//     textAlign: 'center',
//     marginVertical: 16,
//   },
//   projectInfo: {
//     padding: 14,
//     borderWidth: 1,
//     borderColor: '#ECECEC',
//     borderRadius: 10,
//     marginHorizontal: 16,
//     marginBottom: 16,
//   },
//   projectName: {
//     color: '#0277D3',
//     fontSize: 14,
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   projectSite: {
//     color: '#333333',
//     fontSize: 12,
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   projectDescription: {
//     color: '#333333',
//     fontSize: 12,
//     fontWeight: '400',
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'black',
//   },
//   addWorkerButton: {
//     backgroundColor: '#0277D3',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginHorizontal: 20,
//   },
//   addWorkerButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   container3: {
//     marginHorizontal: 18,
//     marginTop: 15,
//   },
// });

// export default ProgressManagementScreen;
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AddProgressModal from '../components/ProgressManagement/AddProgressModel';

import ProjectTimeline from '../components/ProgressManagement/ProjectTimeline';
import {API_URL} from '../utils/url';
import BackIcon from '../assests/BackIcon';
import ImagePreviewModal from '../components/ProgressManagement/ImagePreviewModel';
import AdminProgressModal from '../components/ProgressManagement/AdminProgressModel';
import {useSelector} from 'react-redux';

const ProgressManagementScreen = () => {
  const [progress, setProgressData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const userRole = useSelector(state => state.auth.user?.userType);
  const {project} = route.params;
  console.log('Project:', project);
  const fetchProgressData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(
          `${API_URL}/progress?projectId=${project._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setProgressData(response.data.progress || []);
      }
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  // Handle image click
  const handleImageClick = imageUri => {
    setSelectedImage(imageUri);
    setImagePreviewVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.mainHeader}>Progress Tracker</Text>
      </View>

      <View style={styles.projectInfo}>
        <Text style={styles.projectName}>{project.projectName}</Text>
        <Text style={styles.projectSite}>Site: {project.projectCity}</Text>
        <Text style={styles.projectDescription}>{project.description}</Text>
      </View>

      <TouchableOpacity
        style={styles.addWorkerButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addWorkerButtonText}>+ Add Progress</Text>
      </TouchableOpacity>

      <View style={styles.projectTimelineContainer}>
        <Text style={styles.projectTimeline}>Project Timeline</Text>
      </View>

      <ProjectTimeline progress={progress} />

      {userRole === 'Admin' ? (
        <AdminProgressModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          projectId={project._id}
          fetchProgressData={fetchProgressData}
        />
      ) : (
        <AddProgressModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          project={project}
          fetchProgressData={fetchProgressData}
          onImageClick={handleImageClick} // Pass the function to open full-screen preview
        />
      )}

      {/* Full-screen image preview */}
      <ImagePreviewModal
        visible={imagePreviewVisible}
        imageUri={selectedImage}
        onClose={() => setImagePreviewVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    paddingTop: 34,
    marginHorizontal: responsiveWidth(2),
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  mainHeader: {
    fontSize: 18,
    fontFamily: 'Prompt-Medium',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 16,
  },
  projectInfo: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  projectName: {
    color: '#0277D3',
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    marginBottom: 4,
  },
  projectSite: {
    color: '#333333',
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
    marginBottom: 4,
  },
  projectDescription: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '400',
  },
  addWorkerButton: {
    backgroundColor: '#0277D3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  addWorkerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Prompt-Medium',
  },
  projectTimelineContainer: {
    marginLeft: 20,
    margin: 10,
  },
  projectTimeline: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Prompt-Medium',
  },
});

export default ProgressManagementScreen;
