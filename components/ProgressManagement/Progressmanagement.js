import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';

export const ProgressManagementCard = ({progress}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.cardHeader}>
          <Text style={styles.headerTitle}>Progress Management</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Progress', {progress})}>
            <Text style={styles.viewDetailsLink}>View details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}>
          {progress && progress.length > 0 ? (
            <View style={styles.projectList}>
              {progress.slice(0, 3).map(progressItem => (
                <ProjectItem
                  key={progressItem._id}
                  projectName={
                    progressItem.project.projectName || 'Unknown Project'
                  }
                  site={progressItem.project.projectCity || 'Unknown City'}
                  stage={progressItem.stage || 'N/A'}
                  date={new Date(progressItem.date).toLocaleDateString()}
                  todayProgressUploaded={progressItem.todayProgressUploaded}
                  progressItem={progressItem}
                  iconSource="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/gqs4sfu88c-1%3A152?alt=media&token=f4fd112d-59a1-489e-8e9a-1dd3d924a9a6"
                />
              ))}
            </View>
          ) : (
            <Text style={styles.noDataText}>No Progress Data</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const ProjectItem = ({
  projectName,
  site,
  stage,
  date,
  todayProgressUploaded,
  iconSource,
  progressItem,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.projectItem}
      onPress={() =>
        navigation.navigate('ProgressTracker', {project: progressItem.project})
      }>
      <View style={styles.projectInfo}>
        <View style={styles.container3}>
          <Text style={styles.projectName}>
            {projectName.charAt(0).toUpperCase() + projectName.slice(1)}
          </Text>
          <Text style={styles.projectName}>Stage Name</Text>
        </View>
        <View style={styles.container3}>
          <View style={styles.siteContainer}>
            <Text style={styles.stage}>{site}</Text>
          </View>
          <View style={styles.stageContainer}>
            <Text style={styles.stage}>{stage}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 137,
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  headerTitle: {
    color: '#333333',
    fontSize: 15,
    fontFamily: 'Prompt-Medium',
  },
  viewDetailsLink: {
    color: '#0277D3',
    fontSize: 14,
    fontFamily: 'Prompt-Medium',
    textDecorationLine: 'underline',
  },
  cardContent: {
    flex: 1,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  projectList: {
    flex: 1,
    justifyContent: 'space-between',
  },
  projectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 0.6,
    borderColor: '#ECECEC',
  },
  projectInfo: {
    flex: 1,
    margin: 15,
  },
  projectName: {
    color: '#0277D3',
    fontSize: 15,
    fontFamily: 'Prompt-Medium',
    marginBottom: 6,
  },
  siteInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  stage: {
    color: '#333',
    fontSize: 13,
    fontFamily: 'Prompt-Medium',
    marginRight: 8,
  },
  date: {
    color: '#333',
    fontSize: 12,
    fontFamily: 'Prompt-Medium',
  },
  siteContainer: {
    marginRight: 20,
  },
  stageContainer: {
    marginLeft: 30,
  },
  container3: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  noDataText: {
    fontSize: 16,
    color: '#737373',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Prompt-Medium',
  },
});

export default ProgressManagementCard;

// import React from "react";
// import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// export const ProgressManagementCard = () => {
//   const navigation = useNavigation();

//   // Static data example
//   const progress = [
//     {
//       _id: "1",
//       project: { projectName: "Project Alpha" },
//       stage: "Foundation",
//       date: "2024-08-25",
//       todayProgressUploaded: true,
//       iconSource: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/gqs4sfu88c-1%3A152?alt=media&token=f4fd112d-59a1-489e-8e9a-1dd3d924a9a6",
//     },
//     {
//       _id: "2",
//       project: { projectName: "Project Beta" },
//       stage: "Framing",
//       date: "2024-08-24",
//       todayProgressUploaded: false,
//       iconSource: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/gqs4sfu88c-1%3A152?alt=media&token=f4fd112d-59a1-489e-8e9a-1dd3d924a9a6",
//     },
//     {
//       _id: "3",
//       project: { projectName: "Project Gamma" },
//       stage: "Roofing",
//       date: "2024-08-23",
//       todayProgressUploaded: true,
//       iconSource: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/gqs4sfu88c-1%3A152?alt=media&token=f4fd112d-59a1-489e-8e9a-1dd3d924a9a6",
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.cardWrapper}>
//         <View style={styles.cardHeader}>
//           <Text style={styles.headerTitle}>Progress Management</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Progress', progress)}>
//             <Text style={styles.viewDetailsLink}>View details</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.cardContent}>
//           <View style={styles.projectList}>
//             {progress.map((item) => (
//               <ProjectItem
//                 key={item._id}
//                 projectName={item.project.projectName}
//                 stage={item.stage}
//                 date={item.date}
//                 todayProgressUploaded={item.todayProgressUploaded}
//                 iconSource={item.iconSource}
//               />
//             ))}
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const ProjectItem = ({ projectName, stage, date, todayProgressUploaded, iconSource }) => (
//   <View style={styles.projectItem}>
//     <View style={styles.projectInfo}>
//       <Text style={styles.projectName}>{projectName}</Text>
//       <View style={styles.siteInfo}>
//         <Text style={styles.stage}>{stage}</Text>
//         <Text style={styles.date}>{date}</Text>
//       </View>
//     </View>
//     <View style={styles.statusContainer}>
//       <Image style={styles.statusIcon} source={{ uri: iconSource }} />
//       <Text style={styles.statusText}>{todayProgressUploaded ? "Uploaded" : "Pending"}</Text>
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     minHeight: 187,
//   },
//   cardWrapper: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     marginBottom: 10,
//   },
//   headerTitle: {
//     color: "#333",
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
//     padding: 14,
//     borderWidth: 1,
//     borderColor: "#F1F1F1",
//     borderRadius: 10,
//     backgroundColor: "#FFF",
//   },
//   projectList: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   projectItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   projectInfo: {
//     flex: 1,
//   },
//   projectName: {
//     color: "#0277D3",
//     fontSize: 14,
//     fontFamily: "Prompt-Medium",
//     marginBottom: 4,
//   },
//   siteInfo: {
//     flexDirection: "row",
//   },
//   stage: {
//     color: "#333",
//     fontSize: 12,
//     fontFamily: "Prompt-Medium",
//     marginRight: 8,
//   },
//   date: {
//     color: "#333",
//     fontSize: 12,
//     fontFamily: "Prompt-Medium",
//   },
//   statusContainer: {
//     alignItems: "center",
//   },
//   statusIcon: {
//     width: 42,
//     height: 42,
//     marginBottom: 5,
//   },
//   statusText: {
//     color: "#333",
//     fontSize: 10,
//     fontFamily: "Prompt-Regular",
//   },
// });

// export default ProgressManagementCard;
