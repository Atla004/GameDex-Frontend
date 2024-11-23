import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GameCard } from "@/components/mainInterfaceComponents/GameCard";
import { activeFilters } from "@/components/mainInterfaceComponents/SearchScreenComponents/FilterSection";
import Pagination from "@/components/mainInterfaceComponents/SearchScreenComponents/Pagination";
import { Game } from "@/types/main";
import { useLocalSearchParams } from "expo-router";
import FilterModal from "@/components/mainInterfaceComponents/SearchScreenComponents/FilterModal";
import { useToast } from "../_layout";
import {OrderingDropdown} from "@/components/mainInterfaceComponents/SearchScreenComponents/Dropdown";


const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

const ITEMS_PER_PAGE = 10;

const filterOptions = {
  releaseDate: [
    "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015",
    "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005",
    "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995",
    "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986", "1985",
    "1984", "1983", "1982", "1981", "1980", "1979", "1978", "1977", "1976", "1975",
    "1974", "1973", "1972", "1971", "1970"
  ],
  platform: ["Nintendo Switch", "Nintendo 3DS", "Mobile", "PC"],
  developer: ["Game Freak", "Niantic", "ILCA"],
  publisher: ["Nintendo", "The Pokémon Company"],
  genre: ["RPG", "Action RPG", "Strategy", "Puzzle", "Adventure"],
};

interface response {
  page: number;
  total_pages: number;
  result_count: number;
}

const SearchScreen = () => {
  const { setToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const isSearchingRef = useRef(false);

  const [response, setResponse] = useState<response>({
    page: 1,
    total_pages: 1,
    result_count: 0,
  });
  const [activeFilters, setActiveFilters] = useState<activeFilters>({
    releaseDate: [],
    platform: [],
    developer: [],
    publisher: [],
    genre: [],
  });
  const [searchResults, setSearchResults] = useState<Game[]>([]);

  const searchInputRef = useRef<TextInput>(null);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const data = useLocalSearchParams();

  const handleSearch = () => {
    isSearchingRef.current = true;
    setCurrentPage(1);
    console.log("handleSearch to currentpage 1"); // no es
  };

  const getSearchedGames = useCallback(() => {
    if (!isSearchingRef.current) {
      console.log("not searching isSearching:", isSearchingRef.current);
      return;
    }
    console.log("fetching data");
    setLoading(true);
    const url = `${backendUrl}/pagination/pag_${currentPage}.json`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
        setResponse(data);
        setLoading(false);
      })
      .catch((error) => {
        setToast("Error searching games", true, 3000);
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    console.log("useEffect currentPage", currentPage);
    getSearchedGames();
  }, [currentPage]);

  useEffect(() => {
    console.log("currentPage se esta cambiando", currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (data) {
      searchInputRef.current?.focus();
    }
  }, [data]);

  const handleClearFilters = () => {
    console.log("handleClearFilters to curentPage 1");
    setCurrentPage(1);
    setActiveFilters({
      releaseDate: [],
      platform: [],
      developer: [],
      publisher: [],
      genre: [],
    });
  };
  const [selected, setSelected] = useState("Release Date");

  return (
    <>
      <ScrollView>
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

<View style={styles.orderingDropdown}>
          <OrderingDropdown
            options={["Release Date", "Name", "Rating"]}
            selected={selected}
            setSelected={setSelected}
          />
        </View>
        {/*pantalla de juegos*/}
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}

        {!loading && isSearchingRef.current && searchResults.length > 0 && (
          <View>
            {searchResults.map((game, index) => (
              <GameCard key={`${currentPage}-${index}`} {...game} />
            ))}

            <Pagination
              currentPage={response.page}
              totalPages={response.total_pages}
              setCurrentPage={setCurrentPage}
              startIndex={startIndex}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              result_count={response.result_count}
            />
          </View>
        )}

        {/* NO se encontraron juegos */}
        {!loading && isSearchingRef.current && searchResults.length === 0 && (
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
    </>
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
  orderingDropdown: {

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4b5563",
  },
});

export default SearchScreen;
