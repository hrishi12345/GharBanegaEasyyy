// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

// export default function ProgressTracker({ progress }) {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Progress Tracker</Text>
//       <ScrollView style={styles.projectList}>
//         {progress.map((progress, index) => (
//           <View key={index} style={styles.projectItem}>
//             <Text style={styles.projectName}>{progress.project.projectName}</Text>
//             <View style={styles.siteRow}>
//               <Text style={styles.siteName}>{progress.project.site}</Text>
//               <TouchableOpacity
//                 style={styles.viewProgressContainer}
//                 onPress={() => navigation.navigate('Progress', { progress })}
//               >
//                 <Text style={styles.viewProgressText}>View Progress</Text>
//                 <View style={styles.underline} />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.borderBottom} />
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FEFEFE",
//     paddingTop: 44 // Accounting for status bar
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#333333",
//     textAlign: "center",
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
//     fontWeight: "500",
//     color: "#0277D3",
//     marginBottom: 4,
//   },
//   siteRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   siteName: {
//     fontSize: 12,
//     color: "#333333",
//   },
//   viewProgressContainer: {
//     alignItems: "flex-end",
//   },
//   viewProgressText: {
//     fontSize: 12,
//     color: "#0277D3",
//   },
//   underline: {
//     height: 1,
//     backgroundColor: "#0277D3",
//     width: "100%",
//     marginTop: 2,
//   },
//   borderBottom: {
//     height: 1,
//     backgroundColor: "#E0E0E0",
//     marginTop: 12,
//     marginLeft: -10, // Adjust this value to move the border start position
//     marginRight: 0,  // This ensures the border ends exactly below "View Progress"
//   },
// });

// import React from 'react';
// import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
// import MainLayout from '../../components/Tabs/MainLayout';
// import { useNavigation, useRoute } from '@react-navigation/native';

// export default function ProgressTracker() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { progress } = route.params; // This should contain the 'praerae' array data
//   console.log('praerae', progress);

//   return (
//     <MainLayout style={styles.container}>
//       <View style={styles.container2}>
//         <Text style={styles.header}>Progress Tracker</Text>
//       </View>
//       <ScrollView style={styles.projectList}>
//         {progress && progress.map((item, index) => (
//           <View key={index} style={styles.projectItem}>
//             <Text style={styles.projectName}>{item.project.projectName}</Text>
//             <View style={styles.siteRow}>
//               <Text style={styles.siteName}>{item.project.projectCity}</Text>
//               <TouchableOpacity
//                 style={styles.viewProgressContainer}
//                 onPress={() => navigation.navigate('ProgressTracker', { project: item.project })}
//               >
//                 <Text style={styles.viewProgressText}>View Progress</Text>
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
import MainLayout from '../../components/Tabs/MainLayout';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default function ProgressTracker() {
  const projects = useSelector(state => state.projects.projects);
  console.log( projects)
  const navigation = useNavigation();
  return (
    <MainLayout style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.header}>Progress Tracker</Text>
      </View>
      <ScrollView style={styles.projectList}>
        {projects.map(project => (
          <TouchableOpacity
            key={project._id}
            style={styles.projectItem}
            onPress={() => navigation.navigate('ProgressTracker', {project})}>
            <Text style={styles.projectName}>{project.projectName}</Text>
            <View style={styles.siteRow}>
              <Text style={styles.siteName}>{project.projectCity}</Text>
              <TouchableOpacity style={styles.viewProgressContainer}>
                <Text style={styles.viewProgressText}>View Progress</Text>
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
