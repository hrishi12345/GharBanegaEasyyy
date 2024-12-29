// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import { StyleSheet, Image, Text, View, ScrollView, Dimensions, TouchableOpacity } from "react-native";
// import { responsiveHeight } from "react-native-responsive-dimensions";

// const AttendanceManagementCard = ({attendances}) => {
//   console.log('attendance',attendances)
//   const projects = [
//     {
//       projectName: "Project Name 1",
//       siteName: "Site Name 1",
//       employeeCount: "10/16",
//       iconUri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/3zu3wulah3i-18%3A283?alt=media&token=f1a84290-798c-4fc9-a618-2432cad4ce65"
//     },
//     {
//       projectName: "Project Name 2",
//       siteName: "Site Name 2",
//       employeeCount: "10/16",
//       iconUri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/3zu3wulah3i-20%3A118?alt=media&token=01b0c559-525b-4d42-bb9a-8bcb07e8a5b5"
//     },
//     {
//       projectName: "Project Name 3",
//       siteName: "Site Name 3",
//       employeeCount: "10/16",
//       iconUri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/3zu3wulah3i-20%3A151?alt=media&token=f4279d14-a210-46a1-8964-2d573cf12f46"
//     },
//     // Add more projects for testing
//     {
//       projectName: "Project Name 4",
//       siteName: "Site Name 4",
//       employeeCount: "10/16",
//       iconUri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/3zu3wulah3i-20%3A151?alt=media&token=f4279d14-a210-46a1-8964-2d573cf12f46"
//     },
//     {
//       projectName: "Project Name 5",
//       siteName: "Site Name 5",
//       employeeCount: "10/16",
//       iconUri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/3zu3wulah3i-20%3A151?alt=media&token=f4279d14-a210-46a1-8964-2d573cf12f46"
//     }
//   ];

//   const screenHeight = Dimensions.get('window').height;
//   const maxCardHeight = screenHeight * 0.5; // 20% of screen height
//   const navigation=useNavigation()
//   return (
//     <View style={[styles.container, { maxHeight: maxCardHeight }]}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.headerTitle}>Attendance Management</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('AttendaceTracker')}>
//   <Text style={styles.viewDetailsLink}>View details</Text>
// </TouchableOpacity>
//       </View>
//       <View style={styles.cardContent}>
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           {projects.map((project, index) => (
//             <View key={index}>
//               <ProjectItem
//                 projectName={project.projectName}
//                 siteName={project.siteName}
//                 employeeCount={project.employeeCount}
//                 iconUri={project.iconUri}
//               />
//               {index < projects.length - 1 && <View style={styles.separator} />}
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// const ProjectItem = ({ projectName, siteName, employeeCount, iconUri }) => (
//   <View style={styles.projectItem}>
//     <View style={styles.projectInfo}>
//       <Text style={styles.projectName}>{projectName}</Text>
//       <Text style={styles.siteName}>{siteName}</Text>
//     </View>
//     <View style={styles.employeeInfo}>
//       <Text style={styles.siteEmploys}>Site Employs</Text>
//       <View style={styles.employeeCount}>
//         <Text style={styles.countText}>{employeeCount}</Text>
//         <Image style={styles.employeeIcon} source={{ uri: iconUri }} />
//       </View>
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',

//     borderColor: "#F1F1F1",
//     borderRadius: 10,
//     backgroundColor: "#FFFFFF",
//     overflow: 'hidden',
//     marginVertical:10,
//   height:responsiveHeight(40)

//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F1F1F1",
//   },
//   headerTitle: {
//     color: "#333333",
//     fontSize: 14,
//       fontFamily: "Prompt",
//     fontWeight:'900'
//   },
//   viewDetailsLink: {
//     color: "#0277D3",
//     fontSize: 12,
//     fontFamily: "Prompt-Medium",
//     textDecorationLine: "underline",
//   },
//   cardContent: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 10,
//   },
//   projectItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 10,
//   },
//   projectInfo: {
//     justifyContent: "center",
//   },
//   projectName: {
//     color: "#0277D3",
//     fontSize: 14,
//     fontFamily: "Prompt-Medium",
//   },
//   siteName: {
//     color: "#333333",
//     fontSize: 12,
//     fontFamily: "Prompt-Medium",
//   },
//   employeeInfo: {
//     alignItems: "center",
//   },
//   siteEmploys: {
//     color: "#333333",
//     fontSize: 10,
//     fontFamily: "Prompt-Medium",
//   },
//   employeeCount: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7F5FF",
//     borderRadius: 14,
//     paddingHorizontal: 11,
//     paddingVertical: 2,
//     marginTop: 5,
//   },
//   countText: {
//     color: "#333333",
//     fontSize: 10,
//     fontFamily: "Prompt-Medium",
//     marginRight: 10,
//   },
//   employeeIcon: {
//     width: 24.06,
//     height: 23,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: "#ECECEC",
//     marginVertical: 5,
//   },
// });

// export default AttendanceManagementCard;
// import React from "react";
// import { StyleSheet, Image, Text, View, ScrollView, Dimensions, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { responsiveHeight } from "react-native-responsive-dimensions";

// const AttendanceManagementCard = () => {
//   const staticProjects = [
//     {
//       projectName: "Greenfield Project",
//       siteName: "Greenfield Site",
//       employeeCount: "12/20",
//       iconUri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/3zu3wulah3i-18%3A283?alt=media&token=f1a84290-798c-4fc9-a618-2432cad4ce65"
//     },
//     {
//       projectName: "Riverfront Project",
//       siteName: "Riverfront Site",
//       employeeCount: "18/25",
//       iconUri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/3zu3wulah3i-20%3A118?alt=media&token=01b0c559-525b-4d42-bb9a-8bcb07e8a5b5"
//     },
//     {
//       projectName: "Mountain View Project",
//       siteName: "Mountain View Site",
//       employeeCount: "15/18",
//       iconUri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/3zu3wulah3i-20%3A151?alt=media&token=f4279d14-a210-46a1-8964-2d573cf12f46"
//     },
//     {
//       projectName: "Seaside Project",
//       siteName: "Seaside Site",
//       employeeCount: "10/14",
//       iconUri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/3zu3wulah3i-20%3A151?alt=media&token=f4279d14-a210-46a1-8964-2d573cf12f46"
//     },
//     {
//       projectName: "Urban Redevelopment",
//       siteName: "Downtown Site",
//       employeeCount: "20/30",
//       iconUri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/3zu3wulah3i-20%3A151?alt=media&token=f4279d14-a210-46a1-8964-2d573cf12f46"
//     }
//   ];

//   const screenHeight = Dimensions.get('window').height;
//   const minCardHeight = screenHeight * 0.2; // Minimum height of 20% of screen height
//   const maxCardHeight = screenHeight * 0.4; // Maximum height of 40% of screen height
//   const navigation = useNavigation();

//   return (
//     <View style={[styles.container, { minHeight: minCardHeight, maxHeight: maxCardHeight }]}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.headerTitle}>Attendance Management</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('AttendaceTracker')}>
//           <Text style={styles.viewDetailsLink}>View details</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.cardContent}>
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           {staticProjects.map((project, index) => (
//             <View key={index}>
//               <ProjectItem
//                 projectName={project.projectName}
//                 siteName={project.siteName}
//                 employeeCount={project.employeeCount}
//                 iconUri={project.iconUri}
//               />
//               {index < staticProjects.length - 1 && <View style={styles.separator} />}
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// const ProjectItem = ({ projectName, siteName, employeeCount, iconUri }) => (
//   <View style={styles.projectItem}>
//     <View style={styles.projectInfo}>
//       <Text style={styles.projectName}>{projectName}</Text>
//       <Text style={styles.siteName}>{siteName}</Text>
//     </View>
//     <View style={styles.employeeInfo}>
//       <Text style={styles.siteEmploys}>Site Employs</Text>
//       <View style={styles.employeeCount}>
//         <Text style={styles.countText}>{employeeCount}</Text>
//         <Image style={styles.employeeIcon} source={{ uri: iconUri }} />
//       </View>
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',

//     borderRadius: 10,
//     backgroundColor: "#FFFFFF",
//     overflow: 'hidden',
//     marginVertical: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     height:responsiveHeight(40)
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F1F1F1",
//   },
//   headerTitle: {
//     color: "#333333",
//     fontSize: 16,
//     fontFamily: "Prompt-Medium",
//     fontWeight: "600",
//   },
//   viewDetailsLink: {
//     color: "#0277D3",
//     fontSize: 14,
//     fontFamily: "Prompt-Medium",
//     textDecorationLine: "underline",
//   },
//   cardContent: {
//     flex: 1, // This allows the content to fill the remaining space
//   },
//   scrollContent: {
//     padding: 15,
//   },
//   projectItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 12,
//   },
//   projectInfo: {
//     justifyContent: "center",
//     flex: 1, // This allows the project info to take up available space
//   },
//   projectName: {
//     color: "#0277D3",
//     fontSize: 16,
//     fontFamily: "Prompt-Medium",
//     fontWeight: "500",
//   },
//   siteName: {
//     color: "#333333",
//     fontSize: 14,
//     fontFamily: "Prompt-Medium",
//   },
//   employeeInfo: {
//     alignItems: "flex-end",
//   },
//   siteEmploys: {
//     color: "#333333",
//     fontSize: 12,
//     fontFamily: "Prompt-Medium",
//   },
//   employeeCount: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F7F5FF",
//     borderRadius: 14,
//     paddingHorizontal: 11,
//     paddingVertical: 4,
//     marginTop: 5,
//   },
//   countText: {
//     color: "#333333",
//     fontSize: 12,
//     fontFamily: "Prompt-Medium",
//     marginRight: 10,
//   },
//   employeeIcon: {
//     width: 24,
//     height: 23,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: "#ECECEC",
//     marginVertical: 8,
//   },
// });

// export default AttendanceManagementCard;

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const AttendanceManagementCard = ({attendances, count}) => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const maxCardHeight = screenHeight * 0.5;

  console.log('axxxxasdasd', attendances);

  return (
    <View style={[styles.container, {maxHeight: maxCardHeight}]}>
      <View style={styles.cardWrapper}>
        <View style={styles.cardHeader}>
          <Text style={styles.headerTitle}>Attendance Management</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AttendaceTracker')}>
            <Text style={styles.viewDetailsLink}>View details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {attendances.map((attendance, index) => (
              <View key={attendance.project._id}>
                <ProjectItem
                  projectName={attendance.project.projectName}
                  siteName={attendance.project.projectCity}
                  employeeCount={`${attendance.totalPresent}/${attendance.totalWorkers}`}
                  attendance={attendance}
                  iconUri="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/3zu3wulah3i-18%3A283?alt=media&token=f1a84290-798c-4fc9-a618-2432cad4ce65"
                />
                {index < attendances.length - 1 && (
                  <View style={styles.separator} />
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const ProjectItem = ({
  projectName,
  siteName,
  employeeCount,
  iconUri,
  attendance,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.projectItem}
      onPress={() =>
        navigation.navigate('Attendance', {project: attendance.project})
      }>
      <View style={styles.projectInfo}>
        <Text style={styles.projectName}>{projectName}</Text>
        <Text style={styles.siteName}>{siteName}</Text>
      </View>
      <View style={styles.employeeInfo}>
        <Text style={styles.siteEmploys}>Site Employs</Text>
        <View style={styles.employeeCount}>
          <Text style={styles.countText}>{employeeCount}</Text>
          <Image style={styles.employeeIcon} source={{uri: iconUri}} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: '#F1F1F1',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  headerTitle: {
    color: '#333333',
    fontSize: 14,
    fontFamily: 'Prompt',
    fontWeight: '900',
  },
  viewDetailsLink: {
    color: '#0277D3',
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
    textDecorationLine: 'underline',
  },

  scrollContent: {
    padding: 10,
  },
  projectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  projectInfo: {
    justifyContent: 'center',
  },
  projectName: {
    color: '#0277D3',
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
  },
  siteName: {
    color: '#333333',
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
  },
  employeeInfo: {
    alignItems: 'center',
  },
  siteEmploys: {
    color: '#333333',
    fontSize: 10,
    fontFamily: 'Prompt-Medium',
  },
  employeeCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F5FF',
    borderRadius: 14,
    paddingHorizontal: 11,
    paddingVertical: 2,
    marginTop: 5,
  },
  countText: {
    color: '#333333',
    fontSize: 10,
    fontFamily: 'Prompt-Medium',
    marginRight: 10,
  },
  employeeIcon: {
    width: 24.06,
    height: 23,
  },
  separator: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginVertical: 5,
  },
});

export default AttendanceManagementCard;
