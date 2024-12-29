import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const ProjectDetailsCard = () => {
  const projectData = {
    name: "Project Name",
    startDate: "17/06/2024",
    currentStage: "Wall",
    lastCompletedStage: "Foundation",
    documents: [
      {
        id: 1,
        name: "Document name.pdf",
        uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/7h1wl8mcsv-378%3A1572?alt=media&token=dbfacb7e-0caf-4f6b-9a45-97200c4d4a0b",
      },
      {
        id: 2,
        name: "Document name.pdf",
        uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/7h1wl8mcsv-378%3A1578?alt=media&token=325a1df3-d137-428e-80e8-b174ab430253",
      },
      {
        id: 3,
        name: "Document name.pdf",
        uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/7h1wl8mcsv-378%3A1584?alt=media&token=8a81548c-affc-4a8e-910d-edf73faca55c",
      },
      {
        id: 4,
        name: "Document name.pdf",
        uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/7h1wl8mcsv-378%3A1590?alt=media&token=70cd2b9a-b21f-437c-adeb-fd6b18f52cd2",
      },
    ],
    payments: {
      total: "4,50,000",
      completed: "3,50,000",
      due: "3,50,000",
    },
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.headerRow}>
          <Text style={styles.projectName}>{projectData.name}</Text>
          <Text style={styles.dateText}>Start Date: {projectData.startDate}</Text>
        </View>

        {/* Stage Information */}
        <View style={styles.stageInfo}>
          <Text style={styles.stageText}>
            Current Stage: {projectData.currentStage}
          </Text>
          <Text style={styles.stageText}>
            Last Completed Stage: {projectData.lastCompletedStage}
          </Text>
        </View>

        {/* Documents Section */}
        <View style={styles.documentsSection}>
          <Text style={styles.sectionTitle}>Documents:</Text>
          <View style={styles.documentList}>
            {projectData.documents.map((doc) => (
              <View key={doc.id} style={styles.documentItem}>
                <Image
                  style={styles.documentIcon}
                  source={{ uri: doc.uri }}
                  resizeMode="contain"
                />
                <Text style={styles.documentName}>{doc.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Payment Analytics Section */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Analytics:</Text>
          <View style={styles.paymentDetails}>
            {/* Total Amount */}
            <View style={styles.totalAmount}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.amountText}>₹ {projectData.payments.total}</Text>
            </View>

            {/* Payment Status */}
            <View style={styles.paymentStatus}>
              <View style={styles.statusRow}>
                <View style={[styles.indicator, styles.completedIndicator]} />
                <Text style={styles.statusText}>Completed Payment</Text>
                <Text style={styles.completedAmount}>
                  ₹ {projectData.payments.completed}
                </Text>
              </View>
              <View style={styles.statusRow}>
                <View style={[styles.indicator, styles.dueIndicator]} />
                <Text style={styles.statusText}>Due Payment</Text>
                <Text style={styles.dueAmount}>
                  ₹ {projectData.payments.due}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 350,
    borderWidth: 1,
    borderColor: "rgba(241,241,241,1)",
    borderRadius: 10,
    backgroundColor: "white",
  },
  contentContainer: {
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  projectName: {
    fontSize: 14,
    fontFamily: "Prompt, sans-serif",
    fontWeight: "500",
    color: "rgba(51,51,51,1)",
  },
  dateText: {
    fontSize: 12,
    fontFamily: "Prompt, sans-serif",
    fontWeight: "500",
    color: "rgba(51,51,51,1)",
  },
  stageInfo: {
    marginBottom: 15,
  },
  stageText: {
    fontSize: 12,
    fontFamily: "Prompt, sans-serif",
    fontWeight: "500",
    color: "rgba(51,51,51,1)",
    marginBottom: 5,
  },
  documentsSection: {
    marginBottom: 15,
  },
  documentList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  documentItem: {
    alignItems: "center",
    width: 70,
  },
  documentIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  documentName: {
    fontSize: 8,
    fontFamily: "Prompt, sans-serif",
    color: "rgba(51,51,51,1)",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Prompt, sans-serif",
    fontWeight: "500",
    color: "rgba(51,51,51,1)",
  },
  paymentSection: {
    marginTop: 10,
  },
  paymentDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalAmount: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  paymentStatus: {
    flex: 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  indicator: {
    width: 14,
    height: 14,
    borderRadius: 2,
    marginRight: 10,
  },
  completedIndicator: {
    backgroundColor: "rgba(2,119,211,1)",
  },
  dueIndicator: {
    backgroundColor: "rgba(51,51,51,1)",
  },
  totalText: {
    fontSize: 12,
    fontFamily: "Prompt",
    fontWeight: "500",
    color: "rgba(51,51,51,1)",
  },
  amountText: {
    fontSize: 10,
    fontFamily: "Prompt",
    fontWeight: "500",
    color: "rgba(51,51,51,1)",
    marginBottom: 5,
  },
  statusText: {
    fontSize: 10,
    fontFamily: "Prompt",
    fontWeight: "500",
    color: "rgba(51,51,51,1)",
    flex: 1,
  },
  completedAmount: {
    fontSize: 10,
    fontFamily: "Prompt",
    fontWeight: "500",
    color: "rgba(2,119,211,1)",
  },
  dueAmount: {
    fontSize: 10,
    fontFamily: "Prompt",
    fontWeight: "500",
    color: "rgba(51,51,51,1)",
  },
});

export default ProjectDetailsCard;