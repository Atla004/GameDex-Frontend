import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  startIndex: number;
  ITEMS_PER_PAGE: number;
  result_count: number;
}


const Pagination = ({ currentPage, totalPages, setCurrentPage, startIndex, ITEMS_PER_PAGE, result_count }: PaginationProps) => {
  console.log(currentPage, "currentPage in Pagination.tsx");
  return(
  <View style={styles.paginationContainer}>
    <TouchableOpacity
      style={[
        styles.paginationButton,
        currentPage === 1 && styles.paginationButtonDisabled,
      ]}
      onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
      disabled={currentPage === 1}
    >
      <Ionicons
        name="chevron-back"
        size={24}
        color={currentPage === 1 ? "#9ca3af" : "#3b82f6"}
      />
    </TouchableOpacity>

    <View style={styles.paginationInfo}>
      <Text style={styles.paginationText}>
        Page {currentPage} of {totalPages}
      </Text>
    </View>

    <TouchableOpacity
      style={[
        styles.paginationButton,
        currentPage === totalPages && styles.paginationButtonDisabled,
      ]}
      onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
      disabled={currentPage === totalPages}
    >
      <Ionicons
        name="chevron-forward"
        size={24}
        color={currentPage === totalPages ? "#9ca3af" : "#3b82f6"}
      />
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 16,
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  paginationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationButtonDisabled: {
    backgroundColor: "#f3f4f6",
    opacity: 0.5,
  },
  paginationInfo: {
    alignItems: "center",
  },
  paginationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  paginationSubtext: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
});

export default Pagination;
