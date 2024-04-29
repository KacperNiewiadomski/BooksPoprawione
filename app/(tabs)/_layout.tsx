import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPage = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <Tabs
      key={refreshKey}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Books',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Pressable onPress={refreshPage}>
                {({ pressed }) => (
                  <FontAwesome
                    name="refresh"
                    size={30}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={[styles.icon, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="bars"
                      size={33}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={[styles.icon, { opacity: pressed ? 0.5 : 1 }]}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    marginRight: 10,
    padding: 5,
  },
});
