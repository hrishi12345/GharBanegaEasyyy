// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// const timelineData = [
//   { date: '22/08/2024', title: 'Foundation' },
//   { date: '22/08/2024', title: 'Wall' },
//   { date: '22/08/2024', title: 'Ceiling' },
//   { date: '22/08/2024', title: 'Plastering' },
// ];

// const images = [
//   'https://via.placeholder.com/80', // Dummy Image URL 1
//   'https://via.placeholder.com/80', // Dummy Image URL 2
//   'https://via.placeholder.com/80', // Dummy Image URL 3
//   'https://via.placeholder.com/80', // Dummy Image URL 4
//   'https://via.placeholder.com/80', // Dummy Image URL 5
// ];

// const ProjectTimeline = ({progress}) => {
//   console.log('proririrr',progress)
//   return (
//     <ScrollView style={styles.container}>

//       {progress.progress.map((item, index) => (
//         <View key={index} style={styles.timelineItem}>
//           <View style={styles.timelinePoint}>
//             <View style={styles.dot} />
//            <View style={styles.line} />
//           </View>
//           <View style={styles.contentContainer}>
//             <View style={styles.textContainer}>
//               <Text style={styles.date}>Date: {item.date}</Text>
//               <Text style={styles.title}>{item.title}</Text>
//             </View>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
//               {images.map((imageUrl, imgIndex) => (
//                 <Image
//                   key={imgIndex}
//                   source={{ uri: imageUrl }}
//                   style={styles.image}
//                   resizeMode="cover"
//                 />
//               ))}
//             </ScrollView>
//           </View>
//         </View>
//       ))}

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: 'white',
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'black',
//     textAlign: 'center',
//   },
//   timelineItem: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   timelinePoint: {
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 10,
//     backgroundColor: 'orange',
//   },
//   line: {
//     width: 2,
//     flex: 1,
//     backgroundColor: 'orange',
//     marginTop: 5,
//   },
//   contentContainer: {
//     flex: 1,

//     padding: 10,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//   },
//   textContainer: {
//     marginBottom: 10,
//     flexDirection:'row',
//     alignItems:'baseline',
//     gap:20
//   },
//   date: {
//     fontSize: 12,
//     color: '#666',
//   },
//   title: {
//     fontSize: 16,

//     color: 'orange',
//   },
//   imageScroll: {
//     flexDirection: 'row',
//   },
//   image: {
//     width: 80,
//     height: 80,
//     marginRight: 10,
//     borderRadius: 8,
//   },
//   addProgressButton: {
//     backgroundColor: 'orange',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   addProgressButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ProjectTimeline;

// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// const ProjectTimeline = ({  progress = [] }) => {
//   console.log('pwaoaao',progress)
//   return (
//     <ScrollView style={styles.container}>
//       {progress?.map((item, index) => (
//         <View key={index} style={styles.timelineItem}>
//           <View style={styles.timelinePoint}>
//             <View style={styles.dot} />
//             <View style={styles.line} />
//           </View>
//           <View style={styles.contentContainer}>
//             <View style={styles.textContainer}>
//               <Text style={styles.date}>Stage: {item.stage}</Text>
//             </View>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
//               {item.media.map((mediaItem, imgIndex) => (
//                 <Image
//                   key={imgIndex}
//                   source={{ uri: mediaItem.compressedUrl || mediaItem.originalUrl }}
//                   style={styles.image}
//                   resizeMode="cover"
//                 />
//               ))}
//             </ScrollView>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({

//     container: {
//       flex: 1,
//       padding: 16,
//       backgroundColor: 'white',
//     },
//     timelineItem: {
//       flexDirection: 'row',
//       marginBottom: 20,
//       backgroundColor: '#F9F9F9',
//       borderRadius: 10,
//       padding: 10,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 8,
//     },
//     timelinePoint: {
//       alignItems: 'center',
//       marginRight: 15,
//     },
//     dot: {
//       width: 10,
//       height: 10,
//       borderRadius: 10,
//       backgroundColor: 'orange',
//     },
//     line: {
//       width: 2,
//       flex: 1,
//       backgroundColor: 'orange',
//       marginTop: 5,
//     },
//     contentContainer: {
//       flex: 1,
//       padding: 10,
//     },
//     textContainer: {
//       marginBottom: 10,
//       flexDirection: 'row',
//       alignItems: 'baseline',
//       gap: 20,
//     },
//     date: {
//       fontSize: 16,
//       color: 'orange',
//     },
//     imageScroll: {
//       flexDirection: 'row',
//     },
//     image: {
//       width: 80,
//       height: 80,
//       marginRight: 10,
//       borderRadius: 8,
//     },
//   })

// export default ProjectTimeline;
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import DashedLine from '../../assests/DashedLine';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import ImagePreviewModal from './ImagePreviewModel';

const ProjectTimeline = ({progress = []}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePreview = imageUri => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {progress
          .slice()
          .reverse()
          .map(
            (
              item,
              index, // Reverse the array to show latest progress first
            ) => (
              <View key={index} style={styles.mainContainer}>
                <View style={styles.timelineItem}>
                  <View style={styles.timelinePoint}>
                    <View style={styles.dot} />
                    {index !== progress.length - 1 && (
                      <DashedLine height={responsiveHeight(21)} />
                    )}
                  </View>
                  <View style={styles.contentWrapper}>
                    <View style={styles.heading2}>
                      <Text style={styles.date}>Date : {item.date}</Text>
                      <Text style={styles.stage}>{item.stage}</Text>
                    </View>
                    <View style={styles.contentContainer}>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.imageScroll}>
                        {item.media.map((mediaItem, imgIndex) => (
                          <TouchableOpacity
                            key={imgIndex}
                            onPress={() =>
                              openImagePreview(
                                mediaItem.compressedUrl ||
                                  mediaItem.originalUrl,
                              )
                            }>
                            <Image
                              source={{
                                uri:
                                  mediaItem.compressedUrl ||
                                  mediaItem.originalUrl,
                              }}
                              style={styles.image}
                              resizeMode="cover"
                            />
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </View>
            ),
          )}
      </ScrollView>

      <ImagePreviewModal
        visible={modalVisible}
        imageUri={selectedImage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 5,
    height: 'auto',
  },
  timelinePoint: {
    alignItems: 'center',
    marginRight: 15,
    width: 15,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0277D3',
  },
  contentWrapper: {
    flex: 1,
    borderWidth: 0.8,
    borderRadius: 10,
    padding: 10,
    borderColor: '#ECECEC',
  },
  contentContainer: {
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#888888',
    fontFamily: 'Prompt-Medium',
  },
  stage: {
    fontSize: 14,
    color: '#0277D3',
    marginBottom: 8,
    fontFamily: 'Prompt-Medium',
  },
  imageScroll: {
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 4,
  },
  heading2: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 20,
  },
  mainContainer: {
    marginBottom: 10,
    height: 180,
  },
});

export default ProjectTimeline;
