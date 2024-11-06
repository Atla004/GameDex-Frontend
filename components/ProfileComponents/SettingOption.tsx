import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SettingOptionProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
}

export const SettingOption: React.FC<SettingOptionProps> = ({
  icon,
  title,
  subtitle,
  onPress,
}) => (
  <TouchableOpacity style={styles.settingOption} onPress={onPress}>
    <View style={styles.settingIconContainer}>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${icon}.png`,
        }}
        style={styles.settingIcon}
      />
    </View>
    <View style={styles.settingText}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    <Ionicons name="chevron-forward" size={24} color="#6b7280" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  settingOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    marginRight: 12,
  },
  settingIcon: {
    width: 24,
    height: 24,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: "#1f2937",
    fontWeight: "500",
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
});
