import React, { useEffect } from 'react'
import { View, Image, Text, ScrollView, useWindowDimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native'
import { useDispatch, useSelector } from 'react-redux'
import HTML from 'react-native-render-html'
import { useTranslation } from 'react-i18next'

import styles from './styles'
import TopNav from '/Components/TopNav'
import { useTheme } from '@/Theme'
import { fetchSinglePageStart } from '@/Store/Actions/PageAction'
import { selectPageData } from '@/Store/Selectors/PageSelector'

const supporticon = require('/Assets/Images/support.png')

const Help = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSinglePageStart())
  }, [])

  const contentWidth = useWindowDimensions().width;


  const { MyColors } = useTheme()
  const pageData = useSelector(selectPageData)

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.help')} />
      <ScrollView style={styles.ScrollContainer}>
        {pageData.loading ? (
          <Text>{t('general.loading')}</Text>
        ) : pageData.data.length > 0 ? (
          pageData.data.map((data, index) => (
            <React.Fragment key={index}>
              <Text style={[MyColors.grayColor, styles.PageSubtitle]}>
                {data.title}
              </Text>
              <Collapse>
                <CollapseHeader>
                  <View style={[MyColors.cardBg, styles.FaqHead]}>
                    <Text style={[MyColors.primaryColor, styles.FaqHeadText]}>
                      {data.title}
                    </Text>
                    <Icon
                      name="chevron-down"
                      style={[MyColors.lightColor, styles.CollapseIcon]}
                    />
                  </View>
                </CollapseHeader>
                <CollapseBody>
                  <View style={[MyColors.cardLightBg, styles.FaqBody]}>
                      <HTML source={{ html: data.description }} contentWidth={contentWidth} />
                  </View>
                </CollapseBody>
              </Collapse>
            </React.Fragment>
          ))
        ) : (
          <Text>{t('general.noData')}</Text>
        )}
      </ScrollView>
    </View>
  )
}

export default Help
