import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from '../components';
import { COLORS, SIZES, FONTS, icons } from '../constants';

const MovieDetail = ({ navigation, route }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const { selectedMovie } = route.params;
    setSelectedMovie(selectedMovie);
  }, []);

  const renderHeaderBar = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? 40 : 20,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Back */}
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.transparentBlack,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.left_arrow}
            style={{ height: 25, width: 25, tintColor: COLORS.white }}
          />
        </TouchableOpacity>

        {/* Share */}
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.transparentBlack,
          }}
          onPress={() => console.warn('share')}
        >
          <Image
            source={icons.upload}
            style={{ height: 25, width: 25, tintColor: COLORS.white }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeaderSection = () => {
    return (
      <ImageBackground
        source={selectedMovie?.details.image}
        resizeMode="cover"
        style={{
          width: '100%',
          height: SIZES.height < 700 ? 0.6 * SIZES.height : 0.7 * SIZES.height,
        }}
      >
        <View style={{ flex: 1 }}>
          {/* header bar */}
          {renderHeaderBar()}

          {/* gradient */}
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={['transparent', '#000']}
              style={{
                width: '100%',
                height: 150,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {/* Season  */}
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                {selectedMovie?.details.season}
              </Text>
              {/* Name */}
              <Text
                style={{
                  marginTop: SIZES.base,
                  color: COLORS.white,
                  ...FONTS.h1,
                }}
              >
                {selectedMovie?.name}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  };

  const renderCategoryAndRatings = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.base,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* age */}
        <View
          style={[
            styles.categoryContainer,
            {
              marginLeft: 0,
            },
          ]}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            {selectedMovie?.details.age}
          </Text>
        </View>

        {/* genre */}
        <View
          style={[
            styles.categoryContainer,
            {
              paddingHorizontal: SIZES.padding,
            },
          ]}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            {selectedMovie?.details.genre}
          </Text>
        </View>

        {/* ratings */}
        <View style={styles.categoryContainer}>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{ width: 15, height: 15 }}
          />
          <Text
            style={{ color: COLORS.white, ...FONTS.h4, marginLeft: SIZES.base }}
          >
            {selectedMovie?.details.ratings}
          </Text>
        </View>
      </View>
    );
  };

  const renderMovieDetails = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          justifyContent: 'space-around',
        }}
      >
        {/* title + play time + progress bar */}
        <View>
          {/* title + play time */}
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h4 }}>
              {selectedMovie?.details.currentEpisode}
            </Text>
            <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>
              {selectedMovie?.details.runningTime}
            </Text>
          </View>

          {/* progress bar */}
          <ProgressBar
            containerStyle={{ marginTop: SIZES.radius }}
            barStyle={{ height: 5, borderRadius: 3 }}
            barPercentage={selectedMovie?.details.progress}
          />
        </View>

        {/* watch now button */}
        <TouchableOpacity
          style={{
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Platform.OS === 'ios' ? SIZES.padding * 2 : 0,
            borderRadius: 15,
            backgroundColor: COLORS.primary,
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
            {selectedMovie?.details.progress === '0%'
              ? 'Watch Now'
              : 'Continue Watching'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: COLORS.black }}
      style={{ backgroundColor: COLORS.black }}
    >
      {/* Header */}
      {renderHeaderSection()}

      {/* Category + Ratings */}
      {renderCategoryAndRatings()}

      {/* Details */}
      {renderMovieDetails()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray1,
  },
});

export default MovieDetail;
