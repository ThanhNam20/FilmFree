import { useNavigation } from "@react-navigation/native";
import React, { createRef, useState } from "react";
import {
  FlatList, Pressable, Text, View
} from "react-native";
import DelayInput from "react-native-debounce-input";
import { useDispatch, useSelector } from "react-redux";
import { useSearchMovieCompleteMutation } from "../../services/public-api.service";
import { removeMovieDetailData } from "../../store/film/filmSlice";
import { RootState } from "../../store/store";
import { autoCompleteSearchStyle } from "./autocomplete.style";

const SearchAutoComplete = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
    dispatch(removeMovieDetailData());
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
