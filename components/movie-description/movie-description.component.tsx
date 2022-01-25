import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { MovieDescriptionStyle } from "./movie-description.style";

const MovieDescriptionComponent = ({ movieDescription }: any) => {
  const { movieName, yearRelease, introduction, score, tagList } =
    movieDescription;
  return (
    <View style={MovieDescriptionStyle.container}>
      <Text style={MovieDescriptionStyle.movieName}>{movieName}</Text>
      <View style={MovieDescriptionStyle.evaluateField}>
        <View style={MovieDescriptionStyle.starPoint}>
          <AntDesign name="staro" size={24} color="yellow" />
          <Text style={MovieDescriptionStyle.descriptionText}>{score}</Text>
        </View>
        <View style={MovieDescriptionStyle.releaseDate}>
          <AntDesign name="calendar" size={24} color="red" />
          <Text style={MovieDescriptionStyle.descriptionText}>
            {yearRelease}
          </Text>
        </View>
      </View>
      <Text style={MovieDescriptionStyle.descriptionText}>{introduction}</Text>
    </View>
  );
};

export default MovieDescriptionComponent;
