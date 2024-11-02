import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Circle, Path } from "react-native-svg";

interface ProgressCircleProps {
  progress: number;
  size?: number;
}

const ProgressCircle = ({ progress, size = 120 }: ProgressCircleProps) => {
  const radius = (size - 20) / 2;
  const strokeWidth = 2;
  const circumference = Math.PI * radius; // Half circumference for semicircle
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Determine color based on progress
  const getColor = (progress: number) => {
    if (progress < 20) return "#700d0d";
    if (progress < 40) return "#ff0000";
    if (progress < 60) return "#ff6600";
    if (progress < 75) return "yellow";
    if (progress < 90) return "#00ab00";
    
    return "#00ff00";
  };

  const transform = `translate(${strokeWidth }, ${strokeWidth })`;
  

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg
        height={size}
        width={size}
        viewBox={`0 0 ${size + strokeWidth+2} ${size + strokeWidth+2}`}
      >
        <Path
          transform={transform}
          d={`M 0 ${size / 2} A ${size / 2} ${size / 2} 0 1 0 ${size} ${
            size / 2
          } L ${size} ${size / 2 + 1} L 0 ${size / 2 + 1} Z`}
          fill="white"
          stroke="black"
          strokeWidth={strokeWidth}
        />
        <Path
          transform={transform}
          d={`M 0 ${size / 2} A ${size / 2} ${size / 2} 0 1 1 ${size} ${
            size / 2
          } L ${size} ${size / 2 - 1} L 0 ${size / 2 - 1} Z`}
          fill="red"
          stroke="black"
          strokeWidth={strokeWidth}
        />

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 7}
          fill="white"
          stroke="black"
          strokeWidth={strokeWidth * 2}
        />

        <Path
          transform={transform}
          d={`M ${size / 2 - radius} ${size / 2} A ${radius} ${radius} 0 0 1 ${
            size / 2 + radius
          } ${size / 2}`}
          stroke="#A8A8A8" // Light grey
          strokeWidth={strokeWidth+5}
          fill="none"
        />
        <Path
          transform={transform}
          d={`M ${size / 2 - radius} ${size / 2} A ${radius} ${radius} 0 0 1 ${
            size / 2 + radius
          } ${size / 2}`}
          stroke={getColor(progress)}
          strokeWidth={strokeWidth+5}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.textView}>
        
      <Text style={[styles.text, { fontSize: size / 6 }]}>{progress}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {

    fontFamily: "PressStart2P", 
    color: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  textView: {
    bottom: 23,        
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProgressCircle;
