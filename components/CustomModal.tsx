import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface CustomModalProps {
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ children }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {children}
      </View>
    </View>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: 450,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    // alignItems: 'center',
  },
})
