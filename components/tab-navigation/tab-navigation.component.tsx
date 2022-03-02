import React, { useRef, useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SLIDER_HEIGHT } from "../../constants/config";
import FilmCategory from "../category-film";
import CommentInputComponent from "../comment-movie";
import CommentMovieComponent from "../comment-movie/comment-movie.component";
import EpisodesListComponent from "../episodes-list";
import MovieDescriptionComponent from "../movie-description";

const TabNavigationMovieDetail = ({ movieData }: any) => {
  const [movieDetailData, movieDetailParams] = movieData;
  const [componentShow, setComponentShow] = useState(1);
  const [heightOfInput, setHeightOjInput] = useState(350);

  const ChangeHeightOjInput = (densityPixel: number) => {
    setHeightOjInput(densityPixel);
  };

  const LikeListMovie = () => {
    const likeListMovies = movieDetailData.data.likeList.map(
      (item: any) =>
        ({
          id: item.id,
          category: item.category,
          imageUrl: item.coverVerticalUrl,
          title: item.name,
        } as any)
    );
    const data = {
      homeSectionName: "Relative movies",
      recommendContentVOList: likeListMovies,
    };
    return (
      <ScrollView>
        <MovieDescriptionComponent
          movieDescription={{
            movieName: movieDetailData?.data.name,
            yearRelease: movieDetailData?.data.year,
            introduction: movieDetailData?.data.introduction,
            score: movieDetailData?.data.score,
            tagList: movieDetailData?.data.tagList,
          }}
        />
        <EpisodesListComponent
          episodeList={{
            episodeListData: movieDetailData.data.episodeVo,
            episodeCount: movieDetailData?.data.episodeCount,
            category: movieDetailParams.category,
            contentId: movieDetailParams.id,
          }}
        />
        <FilmCategory listFilmCategory={data} />
      </ScrollView>
    );
  };

  const changeComponentShow = (componentNumber: number) => {
    if (!componentNumber) return;
    setComponentShow(componentNumber);
  };

  return (
    <SafeAreaView style={{}}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonStyle}>
          <Button onPress={() => changeComponentShow(1)} title="Button 1" />
        </View>
        <View style={styles.buttonStyle}>
          <Button onPress={() => changeComponentShow(2)} title="Button 2" />
        </View>
      </View>
      {componentShow == 1 ? (
        <View
          style={{
            height: 380,
          }}
        >
          <LikeListMovie />
        </View>
      ) : (
        <View>
          <View
            style={{
              height: heightOfInput,
            }}
          >
            <CommentMovieComponent movieId={movieDetailData.data.id} />
          </View>
          <CommentInputComponent changeHeightOjInput={ChangeHeightOjInput} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default TabNavigationMovieDetail;

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    zIndex: 10,
  },
  buttonStyle: {
    width: "50%",
  },
});
