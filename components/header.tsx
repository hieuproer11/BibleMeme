import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function Header() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <ThemedView style={[styles.container, { backgroundColor: '#0d0d0d' }]}>
      {/* Top row: logo left, menu right */}
      <ThemedView style={styles.topRow}>
        <ThemedView style={styles.left}>
          <ThemedText style={styles.brand}>BibleMeme</ThemedText>
        </ThemedView>

        <ThemedView style={styles.right}>
          <TouchableOpacity onPress={() => setOpen((v) => !v)} style={styles.menuButton}>
            <IconSymbol name="chevron.right" size={18} color="#fff" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* Search bar under the top row */}
      <ThemedView style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </ThemedView>

      {open && (
        <ThemedView style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <ThemedText>Profile</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <ThemedText>My posts</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <ThemedText>Settings</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <ThemedText>Logout</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: Platform.select({ ios: 54, android: 20, default: 20 }),
    paddingBottom: 10,
    backgroundColor: 'transparent',
    zIndex: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  headerWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 8,
    marginBottom: 8,
    // shadow / elevation to match bottom nav container look
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8 },
      android: { elevation: 6 },
      default: {},
    }),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brand: {
    fontWeight: '700',
    marginLeft: 4,
    fontFamily: 'Jersey 10',
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 18,
    width: '66%',
    marginHorizontal: '17%',
    marginTop: 8,
    alignSelf: 'center',
    marginBottom: 6,
    zIndex: 30,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    color: '#000',
  },
  micButton: {
    marginLeft: 8,
    padding: 4,
  },
  right: {
    alignItems: 'center',
  },
  menuButton: {
    padding: 4,
  },
  menuContainer: {
    position: 'absolute',
    right: 12,
    top: Platform.select({ ios: 100, android: 80, default: 80 }),
    backgroundColor: '#111',
    padding: 8,
    borderRadius: 8,
    zIndex: 50,
  },
  menuItem: {
    paddingVertical: 8,
  },
});
