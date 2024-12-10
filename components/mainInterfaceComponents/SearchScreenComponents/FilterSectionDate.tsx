import { useEffect, useState } from "react";
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

export const FilterSectionDate = ({
  title,
  options,
  category,
  activeFilters,
  setActiveFilters,
}: FilterSectionProps) => {
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    console.log(activeFilters);
  }
  , [activeFilters]);
  
  const [selectedRange, setSelectedRange] = useState<string[]>([]);

  const toggleFilter = ({ category, value }: toggleFilterProps) => {
    setActiveFilters((prev) => {
      let newFilters = { ...prev };
      if (selectedRange.length === 0) {
        newFilters[category] = [value];
        setSelectedRange([value]);
      } else if (selectedRange.length === 1) {
        if (selectedRange[0] === value) {
          newFilters[category] = [];
          setSelectedRange([]);
        } else {
          const start = Math.min(options.indexOf(selectedRange[0]), options.indexOf(value));
          const end = Math.max(options.indexOf(selectedRange[0]), options.indexOf(value));
          const range = options.slice(start, end + 1);
          newFilters[category] = range;
          setSelectedRange(range);
        }
      } else {
        newFilters[category] = [value];
        setSelectedRange([value]);
      }
      return newFilters;
    });
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(filterText.toLowerCase())
  );

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
      <ScrollView horizontal style={styles.filterOptions} showsHorizontalScrollIndicator={false}>

        
        {filteredOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterChip,
              activeFilters[category].includes(option) &&
              selectedRange.length === 1 && selectedRange.includes(option)
                ? styles.filterChipSingle
                : activeFilters[category].includes(option)
                ? styles.filterChipRange
                : {},
            ]}
            onPress={() => toggleFilter({ category, value: option })}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilters[category].includes(option) &&
                selectedRange.length === 1 && selectedRange.includes(option)
                  ? styles.filterChipTextSingle
                  : activeFilters[category].includes(option)
                  ? styles.filterChipTextRange
                  : {},
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
  scrollStyle: {
    backgroundColor: "white",
  },
  filterSection: {
    marginBottom: 24,
  },

  filterOptions: {
    flexDirection: "row",
    flexWrap: "nowrap",

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
  filterChipRange: {
    backgroundColor: "#60a5fa",
    borderColor: "#3b82f6",
  },
  filterChipTextRange: {
    color: "#fff",
  },
  filterChipSingle: {
    backgroundColor: "#f87171",
    borderColor: "#ef4444",
  },
  filterChipTextSingle: {
    color: "#fff",
  },
});
