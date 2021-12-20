import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'react-native-image-picker'
import { useTranslation } from 'react-i18next'

import TopNav from '/Components/TopNav'
import {
  addKycDocumentStart,
  getKycDocumentStart,
} from '@/Store/Actions/KycDocumentAction'
import {
  selectKycDocs,
  selectUploadDocs,
} from '@/Store/Selectors/KycDocumentSelector'
import styles from './styles'
import { useTheme } from '@/Theme'

const previewimg = require('/Assets/Images/user1.jpg')

const Documents = () => {
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(getKycDocumentStart())
  }, [])

  const [inputData, setInputData] = useState({})
  const [fileName, setFileName] = useState()
  const { MyColors } = useTheme()
  const dispatch = useDispatch()
  const kycDocs = useSelector(selectKycDocs)
  const uploadDocs = useSelector(selectUploadDocs)

  const launchImageLibrary = () => {
    let options = {
      title: 'Post Media',
      mediaType: 'image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    ImagePicker.launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker')
        return
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error)
      } else {
        var files = [
          {
            name: res.fileName,
            uri: res.uri,
            type: res.type,
          },
        ]
        setInputData({
          document_file: files[0],
          document_id: 1,
        })
        setFileName(res.fileName)
      }
    })
  }

  const fileUpload = () => {
    dispatch(addKycDocumentStart(inputData))
  }

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.docs.header')} />
      <Text style={[MyColors.grayColor, styles.PageSubtitle]}>
        {t('profile.docs.pageSubtitle')}
      </Text>
      <ScrollView style={styles.ScrollContainer}>
        <Text style={[MyColors.grayColor, styles.PageSubtitle]}>
          {kycDocs.loading ? (
            t('general.loading')
          ) : inputData.document_file ? (
            <View style={styles.PreviewCard}>
              <Image
                source={{
                  uri: inputData.document_file
                    ? inputData.document_file.uri
                    : null,
                }}
                style={styles.PreviewBg}
              />
              <View style={styles.PreviewCardOverlay} />
            </View>
          ) : kycDocs.data.documents.length > 0 ? (
            kycDocs.data.documents.map((doc) => (
              <View style={styles.PreviewCard}>
                <Image
                  source={{
                    uri: doc.picture,
                  }}
                  style={styles.PreviewBg}
                />
                <View style={styles.PreviewCardOverlay} />
              </View>
            ))
          ) : null}
          {fileName
            ? fileName.length > 30
              ? fileName.slice(0, 30) + '....'
              : fileName
            : null}
        </Text>
        <TouchableOpacity onPress={() => launchImageLibrary()}>
          <View style={styles.BottomButton}>
            <Text style={styles.BottomButtonText}>
              {t('profile.docs.inputLabel')}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.BottomContainer}>
        <TouchableOpacity
          disabled={uploadDocs.buttonDisable}
          onPress={() => fileUpload()}
        >
          <View style={styles.BottomButton}>
            <Text style={styles.BottomButtonText}>
              {uploadDocs.loadingButtonContent
                ? t('general.loading')
                : t('profile.docs.submitLabel')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Documents
