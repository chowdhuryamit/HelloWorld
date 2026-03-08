import { View, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Color'

const ThemedView = ({style,children,...props}:any) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme?Colors[colorScheme]:Colors.light;
  return (
    <View style={[{backgroundColor:theme.background},style]} {...props}>
      {children}
    </View>
  )
}

export default ThemedView