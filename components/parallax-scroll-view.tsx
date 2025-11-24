import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

// Default header height (exported for compatibility)
export const HEADER_HEIGHT = 140;

type Props = PropsWithChildren<{
  headerImage?: ReactElement; // optional parallax header image (kept for backward compatibility)
  stickyHeader?: ReactElement; // header to render fixed above content (will hide on scroll)
  headerBackgroundColor: { dark: string; light: string };
  hideThreshold?: number; // threshold (px) for scroll delta to trigger hide/show
  reverseHeader?: boolean; // when true, reverse hide/show direction
}>;

export default function ParallaxScrollView({ children, headerImage, stickyHeader, headerBackgroundColor, hideThreshold, reverseHeader }: Props) {
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  // measured header height (JS state) and a shared value for use in animated styles
  const [measuredHeaderHeight, setMeasuredHeaderHeight] = useState<number>(HEADER_HEIGHT);

  const headerHeight = useSharedValue<number>(measuredHeaderHeight);

  // keep the shared value in sync when measuredHeaderHeight changes
  useEffect(() => {
    headerHeight.value = measuredHeaderHeight;
  }, [measuredHeaderHeight, headerHeight]);

  // Shared values to detect scroll direction and hide/show sticky header
  const scrollY = useSharedValue(0);
  const prevY = useSharedValue(0);
  const headerTranslateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event: any) => {
    const y = event.contentOffset.y;
    const dy = y - prevY.value;
    prevY.value = y;
    scrollY.value = y;

    // If we're at or above the top, always show the header (persist at top)
    if (y <= 0) {
      headerTranslateY.value = withTiming(0, { duration: 180 });
      return;
    }

    // hide/show behavior — can be reversed via prop
    const threshold = typeof hideThreshold === 'number' ? hideThreshold : 12;
    if (!reverseHeader) {
      // default: hide when scrolling down, show when scrolling up
      if (dy > threshold) {
        headerTranslateY.value = withTiming(-headerHeight.value - 20, { duration: 180 });
      } else if (dy < -threshold) {
        headerTranslateY.value = withTiming(0, { duration: 180 });
      }
    } else {
      // reversed: show when scrolling down, hide when scrolling up
      if (dy > threshold) {
        headerTranslateY.value = withTiming(0, { duration: 180 });
      } else if (dy < -threshold) {
        headerTranslateY.value = withTiming(-headerHeight.value - 20, { duration: 180 });
      }
    }
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const H = headerHeight.value;
    return {
      height: H,
      transform: [
        {
          translateY: interpolate(scrollY.value, [-H, 0, H], [-H / 2, 0, H * 0.75]),
        },
        {
          scale: interpolate(scrollY.value, [-H, 0, H], [2, 1, 1]),
        },
      ],
    } as any;
  });

  const stickyHeaderAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslateY.value }],
    // fade out as it translates away to ensure no visible remnants
    opacity: interpolate(headerTranslateY.value, [-headerHeight.value - 20, 0], [0, 1]),
  }));

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Animated.ScrollView
        ref={scrollRef}
        style={{ backgroundColor, flex: 1 }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        contentContainerStyle={{ paddingTop: measuredHeaderHeight }}>

        {/* content placed below the header via paddingTop */}

        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>

      {/* parallax header rendered absolutely so scroll content can sit under it */}
      {headerImage && (
        <Animated.View
          onLayout={(e) => setMeasuredHeaderHeight(e.nativeEvent.layout.height)}
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              overflow: 'hidden',
              backgroundColor: headerBackgroundColor[colorScheme],
              zIndex: 10,
            },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>
      )}

      {/* sticky header overlay (fixed). Render when a stickyHeader or headerImage is provided. */}
      {(stickyHeader || headerImage) && (
        <Animated.View
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height;
            // update measured header height when it changes so padding + overlay height stay in sync
            if (h && h !== measuredHeaderHeight) {
              setMeasuredHeaderHeight(h);
            }
          }}
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: measuredHeaderHeight,
              backgroundColor: headerBackgroundColor[colorScheme],
              zIndex: 40,
            },
            stickyHeaderAnimatedStyle,
          ]}>
          {/* If a dedicated stickyHeader was passed use it, otherwise fall back to headerImage */}
          {stickyHeader ?? headerImage}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
