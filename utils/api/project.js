// useEffect(() => {
//   const fetchProgressData = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       console.log('Token:', token);

//       if (token) {
//         const response = await axios.get(
//           'http://3.110.171.43:5000/api/progress?projectId=668c372e432809f7668d4c0e',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log('Progress Data:', response.data.progress);
//         setProgressData(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching progress data:', error);
//     }
//   };

//   fetchProgressData();
// }, []);
