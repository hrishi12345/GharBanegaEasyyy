// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import Svg, { Circle } from 'react-native-svg';

// const ProjectManagementCard = () => {
//   const projects = [
//     { name: "Project Name 1", progress: 70, status: "Progress stage", schedule: "On-schedule" },
//     { name: "Project Name 2", progress: 45, status: "Initial stage", schedule: "Delayed" },
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.headerTitle}>Project Management</Text>
//        <Text style={styles.viewDetailsLink}>View details</Text>
//       </View>
//       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.cardContent}>
//         {projects.map((project, index) => (
//           <ProjectStatusCard key={index} project={project} />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const ProjectStatusCard = ({ project }) => {
//   return (
//     <View style={styles.projectCard}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.projectName}>{project.name}</Text>
//         <Text style={styles.viewDetailsLink}>View details</Text>
//       </View>

//       <View style={styles.content}>
//         <Svg height="80" width="80" viewBox="0 0 100 100">
//           <Circle
//             cx="50"
//             cy="50"
//             r="45"
//             stroke="#E0E0E0"
//             strokeWidth="10"
//             fill="none"
//           />
//           <Circle
//             cx="50"
//             cy="50"
//             r="45"
//             stroke="#0277D3"
//             strokeWidth="10"
//             fill="none"
//             strokeDasharray={`${project.progress * 2.83} ${283 - project.progress * 2.83}`}
//             strokeLinecap="round"
//             transform="rotate(-90 50 50)"
//           />
//           <Text
//             x="50"
//             y="50"
//             fontSize="24"
//             fontWeight="bold"
//             fill="#333333"
//             textAnchor="middle"
//             dy=".3em"
//           >
//             {`${project.progress}%`}
//           </Text>
//         </Svg>
//         <View style={styles.statusInfo}>
//           <Text style={styles.statusText}>Status: {project.status}</Text>
//           <Text style={styles.progressText}>Progress: {project.schedule}</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: 204.44,

//     borderRadius: 10,
//     backgroundColor: "#FFFFFF",
//     overflow: 'hidden',
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,

//     borderBottomColor: "#F1F1F1",
//   },
//   headerTitle: {
//     color: "#333333",
//     fontSize: 14,
//     fontFamily: "Prompt-Medium",
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
//   projectCard: {
//     width: 280,
//     padding: 15,
//     marginRight: 10,
//     borderWidth:1,
//     borderColor: "#F1F1F1",
//     borderRadius:10
//   },
//   projectName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#0277D3",
//     marginBottom: 10,
//   },
//   content: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statusInfo: {
//     marginLeft: 15,
//   },
//   statusText: {
//     fontSize: 14,
//     color: "#333333",
//     fontFamily: "Prompt-Regular",
//     marginBottom: 5,
//   },
//   progressText: {
//     fontSize: 14,
//     color: "#333333",
//     fontFamily: "Prompt-Regular",
//   },
// });

// export default ProjectManagementCard;
// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import Svg, { Circle, Text as SvgText } from 'react-native-svg'; // Import Text from react-native-svg

// const ProjectManagementCard = ({ projects }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.headerTitle}>Project Management</Text>
//       </View>
//       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.cardContent}>
//         {projects.map((project, index) => (
//           <ProjectStatusCard key={project._id} project={project} />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const ProjectStatusCard = ({ project }) => {
//   // Calculate progress based on project status
//   const getProgress = (status) => {
//     switch (status) {
//       case 'Planning': return 25;
//       case 'Development': return 50;
//       case 'Implementation': return 75;
//       case 'Completed': return 100;
//       default: return 0;
//     }
//   };

//   const progress = getProgress(project.projectStatusStage);

//   return (
//     <View style={styles.projectCard}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.projectName}>{project.projectName}</Text>
//       </View>

//       <View style={styles.content}>
//         <Svg height="80" width="80" viewBox="0 0 100 100">
//           <Circle
//             cx="50"
//             cy="50"
//             r="45"
//             stroke="#E0E0E0"
//             strokeWidth="10"
//             fill="none"
//           />
//           <Circle
//             cx="50"
//             cy="50"
//             r="45"
//             stroke="#0277D3"
//             strokeWidth="10"
//             fill="none"
//             strokeDasharray={`${progress * 2.83} ${283 - progress * 2.83}`}
//             strokeLinecap="round"
//             transform="rotate(-90 50 50)"
//           />
//           <SvgText
//             x="50"
//             y="50"
//             fontSize="20"
//             fontFamily= "Prompt-Medium"
//             fill="#333333"
//             textAnchor="middle"
//             dy="6" // Adjust vertical alignment
//           >
//             {`${progress}%`}
//           </SvgText>
//         </Svg>
//         <View style={styles.statusInfo}>
//           <View style={styles.container3}>
//             <Text style={styles.progressText}>Status: </Text>
//             <Text style={styles.statusText}>{project.projectStatusStage}</Text>
//           </View>
//           <View style={styles.container3}>
//             <Text style={styles.progressText}>Type: </Text>
//             <Text style={styles.statusText}>{project.projectType}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: 204.44,
//     borderRadius: 10,
//     backgroundColor: "#FFFFFF",
//     overflow: 'hidden',
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//     borderBottomColor: "#F1F1F1",
//   },
//   headerTitle: {
//     color: "#333333",
//     fontSize: 15,
//     fontFamily: "Prompt-Medium",

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
//   projectCard: {
//     width: 280,
//     padding: 15,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: "#F1F1F1",
//     borderRadius: 10,
//   },
//   projectName: {
//     fontSize: 16,
//     color: "black",
//     marginBottom: 10,
//     fontFamily: 'Prompt-Medium',
//   },
//   content: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statusInfo: {
//     marginLeft: 15,
//   },
//   statusText: {
//     fontSize: 14,
//     color: "#333333",
//     fontFamily: "Prompt-Regular",
//     marginBottom: 5,
//   },
//   progressText: {
//     fontSize: 14,
//     color: "#333333",
//     fontFamily: "Prompt-Medium",
//   },
//   container3: {
//     flexDirection: 'row',
//   },
// });

// export default ProjectManagementCard;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Svg, {Circle, Text as SvgText} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

const ProjectManagementCard = ({projects}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerTitle}>Project Management</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.cardContent}>
        {projects.map((project, index) => (
          <ProjectStatusCard key={project._id} project={project} />
        ))}
      </ScrollView>
    </View>
  );
};

const ProjectStatusCard = ({project}) => {
  const navigation = useNavigation();

  // Calculate progress based on project status

  const progress = project.progressPercentage;

  return (
    <TouchableOpacity
      style={styles.projectCard}
      onPress={() => navigation.navigate('ProgressTracker', {project})}
      activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <Text style={styles.projectName}>{project.projectName}</Text>
      </View>

      <View style={styles.content}>
        <Svg height="80" width="80" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="#E0E0E0"
            strokeWidth="10"
            fill="none"
          />
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="#0277D3"
            strokeWidth="10"
            fill="none"
            strokeDasharray={`${progress * 2.83} ${283 - progress * 2.83}`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <SvgText
            x="50"
            y="50"
            fontSize="20"
            fontFamily="Prompt-Medium"
            fill="#333333"
            textAnchor="middle"
            dy="6">
            {`${progress}%`}
          </SvgText>
        </Svg>
        <View style={styles.statusInfo}>
          <View style={styles.container3}>
            <Text style={styles.progressText}>Status: </Text>
            <Text style={styles.statusText}>{project.projectStatusStage}</Text>
          </View>
          <View style={styles.container3}>
            <Text style={styles.progressText}>Type: </Text>
            <Text style={styles.statusText}>{project.projectType}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 204.44,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#F1F1F1',
  },
  headerTitle: {
    color: '#333333',
    fontSize: 15,
    fontFamily: 'Prompt-Medium',
  },
  viewDetailsLink: {
    color: '#0277D3',
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
    textDecorationLine: 'underline',
  },
  cardContent: {
    flex: 1,
  },
  projectCard: {
    width: 280,
    padding: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 10,
  },
  projectName: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Prompt-Medium',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusInfo: {
    marginLeft: 15,
  },
  statusText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Prompt-Regular',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Prompt-Medium',
  },
  container3: {
    flexDirection: 'row',
  },
});

export default ProjectManagementCard;
