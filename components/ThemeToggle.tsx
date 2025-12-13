import React, { useEffect } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme, useColorSchemeStore } from '../lib/useColorScheme';

export function AnimatedThemeToggle({ className }: { className?: string }) {
  const colorScheme = useColorScheme();
  const { setColorScheme } = useColorSchemeStore();
  const isDarkMode = colorScheme === 'dark';
  
  // Animation values
  const rotateAnim = React.useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(rotateAnim, {
      toValue: isDarkMode ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [isDarkMode, rotateAnim]);

  const toggleTheme = () => {
    // Scale animation for press feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setColorScheme(isDarkMode ? 'light' : 'dark');
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Pressable
      onPress={toggleTheme}
      className={`p-3 rounded-full bg-card border border-border shadow-sm active:opacity-80 ${className || ''}`}
    >
      <Animated.View
        style={{
          transform: [{ rotate: rotation }, { scale: scaleAnim }],
        }}
      >
        {isDarkMode ? (
          <Ionicons name="sunny" size={24} className="text-foreground" color="#FDB813" />
        ) : (
          <Ionicons name="moon" size={24} className="text-foreground" color="#4A5568" />
        )}
      </Animated.View>
    </Pressable>
  );
}

// Full theme toggle with all three options (Light, Dark, System)
export function ThemeToggle() {
  const { colorScheme: storedScheme, setColorScheme } = useColorSchemeStore();

  const options: { 
    value: 'light' | 'dark' | 'system'; 
    label: string; 
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
    { value: 'light', label: 'Light', icon: 'sunny' },
    { value: 'dark', label: 'Dark', icon: 'moon' },
    { value: 'system', label: 'System', icon: 'phone-portrait-outline' },
  ];

  return (
    <View className="flex-row gap-2 p-2 bg-card rounded-xl border border-border shadow-sm">
      {options.map((option) => {
        const isSelected = storedScheme === option.value;
        
        return (
          <Pressable
            key={option.value}
            onPress={() => setColorScheme(option.value)}
            className={`flex-1 px-4 py-3 rounded-lg items-center ${
              isSelected
                ? 'bg-primary'
                : 'bg-muted/50'
            }`}
          >
            <Ionicons 
              name={option.icon} 
              size={20} 
              color={isSelected ? '#FFFFFF' : '#71717A'}
              style={{ marginBottom: 4 }}
            />
            <Text
              className={`text-sm font-medium ${
                isSelected
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// Compact toggle button with icon only
export function ThemeToggleButton({ size = 24 }: { size?: number }) {
  const colorScheme = useColorScheme();
  const { setColorScheme } = useColorSchemeStore();
  const isDarkMode = colorScheme === 'dark';
  
  const rotateAnim = React.useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(rotateAnim, {
      toValue: isDarkMode ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [isDarkMode, rotateAnim]);

  const toggleTheme = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setColorScheme(isDarkMode ? 'light' : 'dark');
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const iconColor = isDarkMode ? '#FDB813' : '#4A5568';

  return (
    <Pressable
      onPress={toggleTheme}
      className="p-3 rounded-full bg-card border border-border shadow-sm active:opacity-80"
    >
      <Animated.View
        style={{
          transform: [{ rotate: rotation }, { scale: scaleAnim }],
        }}
      >
        <Ionicons 
          name={isDarkMode ? 'sunny' : 'moon'} 
          size={size} 
          color={iconColor}
        />
      </Animated.View>
    </Pressable>
  );
}