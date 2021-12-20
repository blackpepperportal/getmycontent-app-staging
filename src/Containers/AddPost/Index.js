import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import * as Progress from 'react-native-progress'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import * as ImagePicker from 'react-native-image-picker'
import { fetchUserDetailsStart } from '@/Store/Actions/UserAction'
import { postFileUploadStart, savePostStart } from '@/Store/Actions/PostAction'
import { selectUserDetails } from '@/Store/Selectors/UserSelector'
import { selectAddPost, selectFileUpload } from '@/Store/Selectors/PostSelector'
import TopNav from '/Components/TopNav'
import styles from './Styles'
import { useTheme } from '@/Theme'

const AddPostContainer = () => {
  const { t } = useTranslation()
  const [fileName, setFileName] = useState()
  const [inputData, setInputData] = useState({})
  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState(null)
  const { MyColors, darkMode } = useTheme()
  const { control, handleSubmit, errors, setValue } = useForm()
  const dispatch = useDispatch()
  const addedPost = useSelector(selectAddPost)
  const uploadedFile = useSelector(selectFileUpload)
  const userDetails = useSelector(selectUserDetails)

  useFocusEffect(
    React.useCallback(() => {
      const startFunction = async () => {
        setValue('content', '')
        setFileName(null)
        setInputData({})
        setShowProgress(false)
      }
      startFunction()
    }, []),
  )

  useEffect(() => {
    if (
      progress < 96 &&
      progress !== null &&
      uploadedFile.buttonDisable === true
    ) {
      setTimeout(() => setProgress(progress + 16), 1000)
    }
    if (
      uploadedFile.buttonDisable === false &&
      uploadedFile.loading === false
    ) {
      setProgress(100)
      setTimeout(() => {
        setShowProgress(false)
      }, 1000)
    }
    console.log(progress)
  }, [progress, uploadedFile.buttonDisable])

  const handleAddPost = (inputDataPost) => {
    if (fileName) {
      dispatch(
        savePostStart({
          content: inputDataPost.content,
          amount: inputDataPost.amount ? inputDataPost.amount : '',
          post_files: uploadedFile.data.post_file.post_file_id,
          preview_file: inputData.preview_file ? inputData.preview_file : '',
        }),
      )
    }
    if (!fileName) {
      dispatch(
        savePostStart({
          content: inputDataPost.content,
          amount: inputDataPost.amount ? inputDataPost.amount : '',
        }),
      )
    }
  }

  const launchVideoLibrary = () => {
    let options = {
      title: 'Post Media',
      mediaType: 'video',
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
        const source = { uri: res.uri }
        var files = [
          {
            name: res.uri.split('/').slice(-1)[0],
            uri: res.uri,
            type: 'video/mp4',
          },
        ]
        dispatch(
          postFileUploadStart({
            file: files[0],
            file_type: 'video',
          }),
        )
        setInputData({
          document_file: files[0],
          document_id: 1,
        })
        setFileName('res.fileName')
        setProgress(0)
        setShowProgress(true)
      }
    })
  }

  const launchImageLibrary = () => {
    let options = {
      title: 'Post Media',
      mediaType: 'image',
      storageOptions: {
        skipBackup: false,
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
        const source = { uri: res.uri }
        var files = [
          {
            name: res.fileName,
            uri: res.uri,
            type: res.type,
          },
        ]
        dispatch(
          postFileUploadStart({
            file: files[0],
            file_type: 'image',
          }),
        )
        setInputData({
          document_file: files[0],
          document_id: 1,
        })
        setFileName(res.fileName)
        setProgress(0)
        setShowProgress(true)
      }
    })
  }

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('addPost.header')} goBack={false} />
      <Text style={[MyColors.grayColor, styles.PageSubtitle]}>
        {t('addPost.pageSubtitle')}
      </Text>
      <ScrollView style={styles.ScrollContainer}>
        <View style={styles.FormBox}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder={t('addPost.contentInput.placeHolder')}
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                multiline={true}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="content"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.content && <Text>{t('general.required')}</Text>}
          {fileName ? (
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={[
                    MyColors.lightBorder,
                    MyColors.primaryColor,
                    styles.amountInput,
                  ]}
                  placeholder={t('addPost.amountInput.placeholder')}
                  underlineColorAndroid="transparent"
                  placeholderTextColor={darkMode ? '#ccc' : '#333'}
                  multiline={true}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="amount"
              rules={{
                pattern: {
                  value: /^[0-9]*[1-9][0-9]*$/,
                  message: t('general.invalid'),
                },
              }}
              defaultValue=""
            />
          ) : null}
          {errors.amount && <Text>{errors.amount.message}</Text>}
          {userDetails.data.is_document_verified
            ? userDetails.data.is_document_verified !== 0 && (
                <>
                  <Text style={[MyColors.grayColor, styles.FileName]}>
                    {fileName
                      ? t('addPost.files.fileAttached')
                      : t('addPost.files.fileNotAttached')}
                  </Text>
                  <View style={styles.UploadContainer}>
                    <TouchableOpacity
                      style={styles.UploadButton}
                      disabled={uploadedFile.buttonDisable}
                      onPress={() => launchImageLibrary()}
                    >
                      <Text style={styles.UploadButtonText}>
                        <Icon name="file-image-o" style={styles.UploadImgIco} />
                        {`  ${t('addPost.files.imageInputLabel')}`}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.UploadButton}
                      disabled={uploadedFile.buttonDisable}
                      onPress={() => launchVideoLibrary()}
                    >
                      <Text style={styles.UploadButtonText}>
                        <Icon name="file-video-o" style={styles.UploadImgIco} />
                        {`  ${t('addPost.files.videoInputLabel')}`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {showProgress && (
                    <View style={styles.ProgressContainer}>
                      <Progress.Bar
                        progress={progress / 100}
                        width={Dimensions.get('window').width * 0.85}
                        color={'#8163C7'}
                      />
                    </View>
                  )}
                </>
              )
            : null}
        </View>
      </ScrollView>
      <View style={styles.BottomContainer}>
        <TouchableOpacity
          onPress={handleSubmit(handleAddPost)}
          disabled={addedPost.buttonDisable || uploadedFile.buttonDisable}
        >
          <View style={styles.BottomButton}>
            <Text style={styles.BottomButtonText}>
              {uploadedFile.loadingButtonContent
                ? t('general.fileUploadLoading')
                : addedPost.loadingButtonContent
                ? t('general.loading')
                : t('general.post')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddPostContainer
