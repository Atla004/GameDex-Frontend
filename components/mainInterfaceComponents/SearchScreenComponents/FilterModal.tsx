import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { activeFilters, FilterSection } from "@/components/mainInterfaceComponents/SearchScreenComponents/FilterSection";
import { FilterSectionDate } from "./FilterSectionDate";

interface FilterModalProps {
  visible: boolean;
  onRequestClose: () => void;
  filterOptions: any;
  activeFilters: activeFilters;
  setActiveFilters: React.Dispatch<React.SetStateAction<activeFilters>>;
  handleClearFilters: () => void;
  handleSearch: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onRequestClose,
  filterOptions,
  activeFilters,
  setActiveFilters,
  handleClearFilters,
  handleSearch,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity
              onPress={onRequestClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#1f2937" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filtersContainer}>
            <FilterSectionDate
              title="Release Date"
              options={filterOptions.releaseDate}
              category="releaseDate"
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
            <FilterSection
              title="Platform"
              options={filterOptions.platform}
              category="platform"
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
            <FilterSection
              title="Genre"
              options={filterOptions.genre}
              category="genre"
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearFilters}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleSearch}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  closeButton: {
    padding: 4,
  },
  filtersContainer: {
    padding: 16,
  },
  modalFooter: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    gap: 12,
  },
  clearButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
  },
  clearButtonText: {
    color: "#4b5563",
    fontSize: 16,
    fontWeight: "500",
  },
  applyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#3b82f6",
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default FilterModal;
