import React, { useEffect, useRef } from 'react';
import { Image, Modal, StyleSheet, View, Animated } from 'react-native';
import logo from '@/assets/images/icon.png';

const LoadingModal = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const heartbeat = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // Scale up
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Scale back down
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    heartbeat.start();
    return () => heartbeat.stop();
  }, [scaleAnim]);

  return (
    <Modal transparent={true} animationType="fade">
      <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.2)]">
        <Animated.View
          style={[
            styles.pulseContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Image source={logo} style={styles.logo} />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  pulseContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 999, // Fully rounded
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
});
