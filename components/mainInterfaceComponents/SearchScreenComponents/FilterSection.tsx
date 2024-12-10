import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";

interface FilterSectionProps {
  title: string;
  options: string[];
  category: keyof activeFilters;
  activeFilters: activeFilters;
  setActiveFilters: React.Dispatch<React.SetStateAction<activeFilters>>;
}

export interface activeFilters {
  releaseDate: string[];
  platform: string[];
  developer: string[];
  publisher: string[];
  genre: string[];
}

interface toggleFilterProps {
  category: keyof activeFilters;
  value: string;
}

export const FilterSection = ({
  title,
  options,
  category,
  activeFilters,
  setActiveFilters,
}: FilterSectionProps) => {
  const [filterText, setFilterText] = useState("");

  const toggleFilter = ({ category, value }: toggleFilterProps) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const filteredOptions = [
    ...options.filter((option) => activeFilters[category].includes(option)),
    ...options.filter(
      (option) =>
        !activeFilters[category].includes(option) &&
        option.toLowerCase().includes(filterText.toLowerCase())
    ),
  ];

  return (
    <View style={styles.filterSection}>
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>{title}</Text>
        <TextInput
          style={styles.filterInput}
          placeholder="Filtrar..."
          value={filterText}
          onChangeText={setFilterText}
        />
      </View>
      <ScrollView
        horizontal
        style={styles.filterOptions}
        showsHorizontalScrollIndicator={false}
      >
        {filteredOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterChip,
              activeFilters[category].includes(option) &&
                styles.filterChipActive,
            ]}
            onPress={() => toggleFilter({ category, value: option })}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilters[category].includes(option) &&
                  styles.filterChipTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterSection: {
    marginBottom: 24,
  },

  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 2,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
  },
  filterChipActive: {
    backgroundColor: "#3b82f6",
    borderColor: "#2563eb",
  },
  filterChipText: {
    fontSize: 14,
    color: "#4b5563",
  },
  filterChipTextActive: {
    color: "#fff",
  },
  filterHeader: {
    justifyContent: "flex-start",

    marginBottom: 12,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  filterInput: {
    width: "30%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
  },
});
