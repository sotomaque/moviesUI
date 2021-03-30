import React from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  FlatList,
  Animated,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import { Profiles } from '../components';
import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants';

const Home = ({ navigation }) => {
  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;

  const renderHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
      }}
    >
      {/* profile */}
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 50,
          height: 50,
        }}
        onPress={() => {}}
      >
        {/* image */}
        <Image
          source={images.profile_photo}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'rgba(158, 150, 150, .5)',
          }}
        />
      </TouchableOpacity>
      {/* screen mirror */}
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 50,
          height: 50,
        }}
        onPress={() => {}}
      >
        <Image
          source={icons.airplay}
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.primary,
          }}
        />
      </TouchableOpacity>
    </View>
  );

  const renderNewSeasonSection = () => {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={SIZES.width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={60}
        decelerationRate={0}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        data={dummyData.newSeason}
        keyExtractor={(item) => `${item.id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: newSeasonScrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('MovieDetail', { selectedMovie: item });
              }}
            >
              <View
                style={{
                  width: SIZES.width,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Thumbnail */}
                <ImageBackground
                  style={{
                    height: SIZES.width * 0.85,
                    width: SIZES.width * 0.85,
                    justifyContent: 'flex-end',
                  }}
                  source={item.thumbnail}
                  resizeMode="cover"
                  imageStyle={{
                    borderRadius: 40,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 60,
                      width: '100%',
                      marginBottom: SIZES.radius,
                      paddingHorizontal: SIZES.radius,
                    }}
                  >
                    {/* Play Now */}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      {/* Play Icon */}
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: COLORS.transparentWhite,
                        }}
                      >
                        <Image
                          source={icons.play}
                          resizeMode="contain"
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.white,
                          }}
                        />
                      </View>
                      {/* Play Now Text */}
                      <Text
                        style={{
                          marginLeft: SIZES.base,
                          color: COLORS.white,
                          ...FONTS.h3,
                        }}
                      >
                        Play Now
                      </Text>
                    </View>

                    {/* Still Watching */}
                    {item.stillWatching.length > 0 && (
                      <View style={{ justifyContent: 'center' }}>
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.h4,
                          }}
                        >
                          Still Watching
                        </Text>
                        <Profiles profiles={item.stillWatching} />
                      </View>
                    )}
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width);

    return (
      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {dummyData.newSeason.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: 'clamp',
          });

          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              opacity={opacity}
              key={`dot-${index}`}
              style={{
                borderRadius: SIZES.radius,
                width: dotWidth,
                height: 6,
                marginHorizontal: 3,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {/* Header */}
      {renderHeader()}

      {/* Main Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {renderNewSeasonSection()}
        {renderDots()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
