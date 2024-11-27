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
import { useToast, useUserData } from "../_layout";
import { OrderingDropdown } from "@/components/mainInterfaceComponents/SearchScreenComponents/Dropdown";
import { set } from "zod";

const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

const ITEMS_PER_PAGE = 10;

const filterOptions = {
  releaseDate: [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
    "2006",
    "2005",
    "2004",
    "2003",
    "2002",
    "2001",
    "2000",
    "1999",
    "1998",
    "1997",
    "1996",
    "1995",
    "1994",
    "1993",
    "1992",
    "1991",
    "1990",
    "1989",
    "1988",
    "1987",
    "1986",
    "1985",
    "1984",
    "1983",
    "1982",
    "1981",
    "1980",
    "1979",
    "1978",
    "1977",
    "1976",
    "1975",
    "1974",
    "1973",
    "1972",
    "1971",
    "1970",
  ],
  platform: ["Nintendo Switch"],
  genre: ["RPG", "Action RPG", "Strategy", "Puzzle", "Adventure"],
  developer: ["Game Freak", "Niantic", "ILCA"],
  publisher: ["Nintendo", "The Pokémon Company"],
};

interface response {
  page: number;
  total_pages: number;
  result_count: number;
}
interface backArrays {
  name: string;
  slug: string;
  id: number;
  api_id?: number;
}

const SearchScreen = () => {
  const { setToast } = useToast();
  const { token } = useUserData();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genresArray, setGenresArray] = useState<string[]>([]);
  const [platformsArray, setPlatformsArray] = useState<string[]>([]);
  const [genresDic, setGenresDic] = useState<backArrays[]>([]);
  const [platformsDic, setPlatformsDic] = useState<backArrays[]>([]);

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
    if (currentPage === 1) {
      getSearchedGames();
    }
  };

  const getSearchedGames = () => {
    if (!isSearchingRef.current) {
      return;
    }
    setLoading(true);
    console.log("fetching data to searchchhhchchch");
    console.log("activeFilters", activeFilters);

    const getFirstAndLast = (arr: string[]): string[] => {
      return arr.length === 1 ? [arr[0], arr[0]] : [arr[arr.length - 1], arr[0]];
    };


    const params: { search: string} = {
      search: searchQuery,
      ...(activeFilters.genre.length > 0 && {
        genres: activeFilters.genre.map((genre) => genre.toLowerCase()),
      }),
      ...(activeFilters.platform.length > 0 && {
        platforms: activeFilters.platform.map(
          (plat) => platformsDic.find((num) => num.name === plat)?.api_id
        ),
      }),
      ...(activeFilters.releaseDate.length > 0 && {
        releaseYears: getFirstAndLast(activeFilters.releaseDate).join(","),
      }),
    };

    console.log(getFirstAndLast(activeFilters.releaseDate))

    const formattedParams = new URLSearchParams({
      ...Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, value.toString()])
      ),
    });

    const url = `${backendUrl}/api/game/search/${currentPage}?${formattedParams}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        const getDepthLevel1 = (obj: Record<string, any>): Record<string, any> => {
          const result: Record<string, any> = {};
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              result[key] = typeof obj[key] === 'object' && obj[key] !== null ? '[Object]' : obj[key];
            }
          }
          return result;
        };

        console.log("te odio rafael de la mata", getDepthLevel1(res.data));
        console.log("te odio rafael de la mata", getDepthLevel1(res.data.results[0]));
        

        const toResults = res.data.results.map((game: any) => {
          return {
            id: game.api_id,
            title: game.title,
            description: game.description,
            imageUrl: game.imageUrl,
            userScore: game.userScore,
            criticScore: 0,
            ranking: 0,
          };
        }); 
        


        if (Array.isArray(res.data.results))
          setSearchResults(toResults as Game[]);

        setResponse({
          page: res.data.page,
          total_pages: res.data.total_pages,
          result_count: res.data.result_count,
        });
        setLoading(false);
      })
      .catch((error) => {
        setToast("Error searching games", true, 3000);
        setLoading(false);
      });
  };

  useEffect(() => {
    getSearchedGames();
  }, [currentPage]);

  useEffect(() => {
    if (data) {
      searchInputRef.current?.focus();
    }
  }, [data]);

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

  async function fetchGenres() {
    try {
      const response = await fetch(`${backendUrl}/api/misc/genres`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const data = await response.json();

      const namesArray = data.data.map((item: { name: string }) => item.name);
      setGenresDic(data.data);

      setGenresArray(namesArray);
    } catch (error) {
      setToast("Error fetching Genres", true, 3000);
    }
  }

  async function fetchPlatform() {
    try {
      const response = await fetch(`${backendUrl}/api/misc/platforms`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const data = await response.json();

      setPlatformsDic(data.data);
      console.log("data plata", data.data[0]);

      const namesArray = data.data.map((item: { name: string }) => item.name);

      setPlatformsArray(namesArray);
    } catch (error) {
      setToast("Error fetching Platform", true, 3000);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchGenres(), fetchPlatform()]);
      } catch (error) {
        setToast("Error fetching data", true, 3000);
      }
    };
    fetchData();
  }, []);

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
          {/*           <OrderingDropdown
            options={["Release Date", "Name", "Rating"]}
            selected={selected}
            setSelected={setSelected}
          /> */}
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
        filterOptions={{
          ...filterOptions,
          genre: genresArray,
          platform: platformsArray,
        }}
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
  orderingDropdown: {},
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
