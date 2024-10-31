import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface CheckboxProps {
  value: boolean;
  setValue: (value: boolean) => void;
}

/**
 * Checkbox component that displays a label and a checkbox input.
 * @param {boolean} value - The current checked state of the checkbox.
 * @param {(value: boolean) => void} setValue - Function to update the checked state.
 * @returns {JSX.Element} The rendered checkbox component.
 */
const Checkbox = ({
  value,
  setValue,
}: CheckboxProps): JSX.Element => {
  const handleChange = () => {
    setValue(!value);
  };

  return (
    <TouchableOpacity
      onPress={handleChange}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <View
        style={{
          height: 20,
          width: 20,
          borderWidth: 1,
          borderColor: "#000",
          backgroundColor: value ? "#000" : "#fff",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
          borderRadius: 4,
        }}
      >
        {value && <Text style={{ color: "#fff" }}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;
