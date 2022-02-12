import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { createRef, useState } from "react";
import { useSearchMovieCompleteMutation } from "../../services/public-api.service";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import DelayInput from "react-native-debounce-input";
import { useNavigation } from "@react-navigation/native";
import { autoCompleteSearchStyle } from "./autocomplete.style";

const SearchAutoComplete = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigation = useNavigation();

  const [searchMovieAutocomplete, { data, isLoading, error }] =
    useSearchMovieCompleteMutation();
  const inputRef = createRef();

  const movieSearchAutocompleteValue = useSelector(
    (state: RootState) => state.SearchReducer
  );
  const getMovieWithSearchParams = (value: any) => {
    setSearchValue(searchValue);
    const paramSearch: any = {
      searchKeyWord: value,
      size: 10,
    };
    searchMovieAutocomplete(paramSearch);
  };

  const getMovieDetail = (item: any) => {
    navigation.navigate("MovieDetail", {
      id: item.id,
      category: item.domainType,
    });
  };

  return (
    <View style={autoCompleteSearchStyle.container}>
      <DelayInput
        value={searchValue}
        minLength={1}
        inputRef={inputRef}
        onChangeText={getMovieWithSearchParams}
        delayTimeout={1000}
        placeholder={"  Searching and enjoying"}
        placeholderTextColor={"grey"}
        style={{
          margin: 10,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          color: "white",
          borderRadius: 5,
        }}
      />
      <FlatList
        style={autoCompleteSearchStyle.list_movie_container}
        data={movieSearchAutocompleteValue.searchAutoCompleteMovieList}
        renderItem={({ item }: any) => (
          <Pressable onPress={() => getMovieDetail(item)}>
            <Text style={autoCompleteSearchStyle.film_title}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default SearchAutoComplete;
