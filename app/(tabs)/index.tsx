import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import Header from '@/components/header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const headerHeight = useSharedValue<number>(140);
  const headerTranslate = useSharedValue<number>(0);
  const prevY = useSharedValue<number>(0);
  const scrollY = useSharedValue<number>(0);
  const accDy = useSharedValue<number>(0);

  const [measuredHeaderHeight, setMeasuredHeaderHeight] = useState<number>(140);

  const scrollHandler = useAnimatedScrollHandler((event: any) => {
    const y = event.contentOffset.y;
    const dy = y - prevY.value;
    prevY.value = y;
    scrollY.value = y;

    // persist visible at top
    if (y <= 0) {
      headerTranslate.value = withTiming(0, { duration: 180 });
      return;
    }

    // Continuous behavior: move header proportional to scroll per-frame so it animates while scrolling.
    // This implements the "reversed" behavior: scrolling down (dy>0) moves header toward visible (0),
    // scrolling up (dy<0) moves header toward hidden (-headerHeight).
    const H = headerHeight.value || measuredHeaderHeight || 140;
    // update header translate directly and clamp between -H and 0
    const next = headerTranslate.value + dy;
    const clamped = Math.max(Math.min(next, 0), -H);
    // animate toward clamped value with a short duration so header visibly follows scroll
    headerTranslate.value = withTiming(clamped, { duration: 60 });
  });

  // Ensure header is visible on mount (prevents starting hidden in some edge-cases)
  useEffect(() => {
    headerTranslate.value = 0;
  }, [headerTranslate]);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslate.value }],
    opacity: interpolate(headerTranslate.value, [-headerHeight.value, 0], [0, 1]),
  }));

  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#0d0d0d' }}>
      {/* Animated header: measure via onLayout and animate translateY */}
      <Animated.View
        onLayout={(e) => {
          // capture header height for hide translate and for content padding
          const measured = e.nativeEvent.layout.height || headerHeight.value || 140;
          const h = Math.max(measured, 140);
          headerHeight.value = h;
          setMeasuredHeaderHeight(h);
        }}
        style={[
          headerAnimatedStyle,
          { overflow: 'hidden', position: 'absolute', left: 0, right: 0, top: 0, zIndex: 50, height: measuredHeaderHeight },
        ]}
      >
        <Header />
      </Animated.View>

      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingTop: measuredHeaderHeight + 24 }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >

      {/* Card-like UI similar to the provided mockup */}
      <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.cardHeader}>
          <ThemedView style={styles.userInfo}>
            <ThemedText type="defaultSemiBold">BM/meme_master_69</ThemedText>
            <ThemedText style={styles.muted}> -- 5h</ThemedText>
          </ThemedView>
          <ThemedView style={styles.scoreBadge}>
            <ThemedText type="defaultSemiBold" style={{ color: '#00C853' }}>50</ThemedText>
          </ThemedView>
        </ThemedView>

        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.postImage}
          contentFit="cover"
        />

        <ThemedView style={styles.actionBar}>
          <ThemedView style={styles.actionLeft}>
            <ThemedText style={styles.upvote}>↑</ThemedText>
            <ThemedText style={styles.upvoteCount}>320</ThemedText>
            <ThemedText style={styles.downvote}>↓</ThemedText>
            <ThemedText style={styles.downvoteCount}>120</ThemedText>
            <ThemedText style={styles.comment}>💬 20</ThemedText>
          </ThemedView>
          <ThemedView style={styles.actionRight}>
            <ThemedText>🔖</ThemedText>
            <ThemedText>↗️</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

        <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.cardHeader}>
          <ThemedView style={styles.userInfo}>
            <ThemedText type="defaultSemiBold">BM/meme_master_69</ThemedText>
            <ThemedText style={styles.muted}> -- 5h</ThemedText>
          </ThemedView>
          <ThemedView style={styles.scoreBadge}>
            <ThemedText type="defaultSemiBold" style={{ color: '#00C853' }}>50</ThemedText>
          </ThemedView>
        </ThemedView>

        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.postImage}
          contentFit="cover"
        />

        <ThemedView style={styles.actionBar}>
          <ThemedView style={styles.actionLeft}>
            <ThemedText style={styles.upvote}>↑</ThemedText>
            <ThemedText style={styles.upvoteCount}>320</ThemedText>
            <ThemedText style={styles.downvote}>↓</ThemedText>
            <ThemedText style={styles.downvoteCount}>120</ThemedText>
            <ThemedText style={styles.comment}>💬 20</ThemedText>
          </ThemedView>
          <ThemedView style={styles.actionRight}>
            <ThemedText>🔖</ThemedText>
            <ThemedText>↗️</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
        <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.cardHeader}>
          <ThemedView style={styles.userInfo}>
            <ThemedText type="defaultSemiBold">BM/meme_master_69</ThemedText>
            <ThemedText style={styles.muted}> -- 5h</ThemedText>
          </ThemedView>
          <ThemedView style={styles.scoreBadge}>
            <ThemedText type="defaultSemiBold" style={{ color: '#00C853' }}>50</ThemedText>
          </ThemedView>
        </ThemedView>

        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.postImage}
          contentFit="cover"
        />

        <ThemedView style={styles.actionBar}>
          <ThemedView style={styles.actionLeft}>
            <ThemedText style={styles.upvote}>↑</ThemedText>
            <ThemedText style={styles.upvoteCount}>320</ThemedText>
            <ThemedText style={styles.downvote}>↓</ThemedText>
            <ThemedText style={styles.downvoteCount}>120</ThemedText>
            <ThemedText style={styles.comment}>💬 20</ThemedText>
          </ThemedView>
          <ThemedView style={styles.actionRight}>
            <ThemedText>🔖</ThemedText>
            <ThemedText>↗️</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
        <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.cardHeader}>
          <ThemedView style={styles.userInfo}>
            <ThemedText type="defaultSemiBold">BM/meme_master_69</ThemedText>
            <ThemedText style={styles.muted}> -- 5h</ThemedText>
          </ThemedView>
          <ThemedView style={styles.scoreBadge}>
            <ThemedText type="defaultSemiBold" style={{ color: '#00C853' }}>50</ThemedText>
          </ThemedView>
        </ThemedView>

        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.postImage}
          contentFit="cover"
        />

        <ThemedView style={styles.actionBar}>
          <ThemedView style={styles.actionLeft}>
            <ThemedText style={styles.upvote}>↑</ThemedText>
            <ThemedText style={styles.upvoteCount}>320</ThemedText>
            <ThemedText style={styles.downvote}>↓</ThemedText>
            <ThemedText style={styles.downvoteCount}>120</ThemedText>
            <ThemedText style={styles.comment}>💬 20</ThemedText>
          </ThemedView>
          <ThemedView style={styles.actionRight}>
            <ThemedText>🔖</ThemedText>
            <ThemedText>↗️</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
  </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  cardContainer: {
    backgroundColor: '#0d0d0d',
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  muted: {
    color: '#9a9a9a',
    marginLeft: 6,
  },
  scoreBadge: {
    backgroundColor: 'transparent',
  },
  postImage: {
    width: '100%',
    height: 260,
    borderRadius: 6,
    backgroundColor: '#222',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  upvote: {
    color: '#ffb300',
    fontSize: 16,
  },
  upvoteCount: {
    color: '#fff',
    fontWeight: '700',
  },
  downvote: {
    color: '#ff5252',
    fontSize: 16,
  },
  downvoteCount: {
    color: '#fff',
  },
  comment: {
    color: '#fff',
  },
});
