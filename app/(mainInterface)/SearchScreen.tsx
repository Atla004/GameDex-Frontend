import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GameCard } from "@/components/mainInterfaceComponents/GameCard";
import { activeFilters } from "@/components/mainInterfaceComponents/SearchScreenComponents/FilterSection";
import Pagination from "@/components/mainInterfaceComponents/SearchScreenComponents/Pagination";
import { Game } from "@/types/main";
import { useLocalSearchParams } from "expo-router";
import FilterModal from "@/components/mainInterfaceComponents/SearchScreenComponents/FilterModal";
import BackgroundMainInterface from "@/components/wraper/BackgroundMainInterface";

// Mock data - in a real app this would come from an API
const allSearchResults:Game[] = Array(25)
  .fill(null)
  .map((_, index) => ({
    id: index.toString(),
    imageUrl:
      index % 2 === 0
        ? "https://imgs.search.brave.com/GVcDP9cX1YLhjAXS0-gIVZzpPpmCYLlsOHfwIOt7VfU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dHdvLXRvbmUtaW5r/LWNsb3VkLmpwZz93/aWR0aD0xMDAwJmZv/cm1hdD1wanBnJmV4/aWY9MCZpcHRjPTA"
        : "https://imgs.search.brave.com/GVcDP9cX1YLhjAXS0-gIVZzpPpmCYLlsOHfwIOt7VfU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dHdvLXRvbmUtaW5r/LWNsb3VkLmpwZz93/aWR0aD0xMDAwJmZv/cm1hdD1wanBnJmV4/aWY9MCZpcHRjPTA",
    title:
      index % 2 === 0 ? "Pokémon Scarlet & Violet" : "Pokémon Legends: Arceus",
    description:
      index % 2 === 0
        ? "Embark on an open-world adventure in the Paldea region. Discover new Pokémon, explore vast landscapes, and uncover the mysteries of Terastallization."
        : "Travel to the ancient Hisui region and discover the origins of the Pokémon world in this groundbreaking adventure.",
    releaseDate: index % 2 === 0 ? "2022-11-18" : "2022-01-28",
    platform: "Nintendo Switch",
    developer: "Game Freak",
    publisher: "Nintendo",
    genre: index % 2 === 0 ? "RPG" : "Action RPG",
    criticScore: index % 2 === 0 ? 85 : 90,
    userScore: index % 2 === 0 ? 8.5 : 9.0,
    ranking: index + 1,
  }));

const ITEMS_PER_PAGE = 5;

const filterOptions = {
  releaseDate: ["2023", "2022", "2021", "2020", "Older"],
  platform: ["Nintendo Switch", "Nintendo 3DS", "Mobile", "PC"],
  developer: ["Game Freak", "Niantic", "ILCA"],
  publisher: ["Nintendo", "The Pokémon Company"],
  genre: ["RPG", "Action RPG", "Strategy", "Puzzle", "Adventure"],
};


const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<activeFilters>({
    releaseDate: [],
    platform: [],
    developer: [],
    publisher: [],
    genre: [],
  });

  const searchInputRef = useRef<TextInput>(null);

  const totalPages = Math.ceil(allSearchResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResults = allSearchResults.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const data = useLocalSearchParams();

  useEffect(() => {
    if (data) {
      searchInputRef.current?.focus();
    }
  }, [data]);

  const handleSearch = () => {
    setIsSearching(true);
    setCurrentPage(1);
    // Implement search logic here with filters
  };

  const handleClearFilters = () => {
    setCurrentPage(1);
    setActiveFilters({
      releaseDate: [],
      platform: [],
      developer: [],
      publisher: [],
      genre: [],
    });
  };

  return (

    <BackgroundMainInterface>
      <ScrollView >
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search Pokémon games..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#6b7280" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setShowFilters(true)}
            >
              <Ionicons name="ellipsis-vertical" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {isSearching && currentResults.length > 0 && (
          <View>

            {currentResults.map((game, index) => (
              <GameCard key={`${currentPage}-${index}`} {...game} />
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              startIndex={startIndex}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              allSearchResults={allSearchResults}
            />
          </View>
        )}

        {isSearching && currentResults.length === 0 && (
          <View style={styles.emptyState}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
              }}
              style={styles.emptyStateIcon}
            />
            <Text style={styles.emptyStateText}>No games found</Text>
            <Text style={styles.emptyStateSubtext}>Try different keywords</Text>
          </View>
        )}
      </ScrollView>

      <FilterModal
        visible={showFilters}
        onRequestClose={() => setShowFilters(false)}
        filterOptions={filterOptions}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        handleClearFilters={handleClearFilters}
        handleSearch={() => {
          handleSearch();
          setShowFilters(false);
        }}
      />
    </BackgroundMainInterface>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    backgroundColor: "#1d4ed8",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#3b82f6",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#1f2937",
  },
  filterButton: {
    marginLeft: 8,
    padding: 4,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyStateIcon: {
    width: 64,
    height: 64,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4b5563",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#6b7280",
  },
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
  filterSection: {
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
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

export default SearchScreen;
