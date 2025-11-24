import { StyleSheet } from 'react-native';

import Header from '@/components/header';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
export default function ClassementScreen() {
  return (
  <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }} stickyHeader={<Header />} reverseHeader>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Classement du mois
        </ThemedText>
      </ThemedView>
      <ThemedText>Classement content goes here.</ThemedText>
    </ParallaxScrollView>
    );

    
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});
