import React, { useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { authAPI, endpoints } from '../../configs/API'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ThesisRecord = () => {
  const [tenKhoaLuan, setTenKhoaLuan] = useState()
  const [sv1, setSv1] = useState()
  const [sv2, setSv2] = useState()

  const [gv1, setGv1] = useState()
  const [gv2, setGv2] = useState()

  const handleRecordThesis = async () => {
    if (!gv1 || !sv1 || !tenKhoaLuan) return

    const sv = [sv1]
    if (sv2) sv.push(sv2)
    const gv = [gv1]
    if (gv2) gv.push(gv2)

    authAPI(await AsyncStorage.getItem('access_token')).post(endpoints[''], {
      tenKhoaLuan,
      sv,
      gv,
    })
  }

  return (
    <View style={{ margin: 20, gap: 10 }}>
      <Text>Ghi nhận khoá luận</Text>
      <TextInput
        placeholder='tên khóa luận'
        style={{ borderColor: 'black', borderWidth: 0.5, padding: 5 }}
        onChange={setTenKhoaLuan}
      />

      <TextInput
        placeholder='sv1'
        style={{ borderColor: 'black', borderWidth: 0.5, padding: 5 }}
        onChange={setSv1}
      />

      <TextInput
        placeholder='sv2'
        style={{ borderColor: 'black', borderWidth: 0.5, padding: 5 }}
        onChange={setSv2}
      />

      <TextInput
        placeholder='gv1'
        style={{ borderColor: 'black', borderWidth: 0.5, padding: 5 }}
        onChange={setGv1}
      />

      <TextInput
        placeholder='gv2'
        style={{ borderColor: 'black', borderWidth: 0.5, padding: 5 }}
        onChange={setGv2}
      />

      <Pressable
        onPress={handleRecordThesis}
        style={{
          padding: 5,
          backgroundColor: '#78a3fa',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Ghi nhận</Text>
      </Pressable>

      <TouchableOpacity></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
  },
})

export default ThesisRecord
