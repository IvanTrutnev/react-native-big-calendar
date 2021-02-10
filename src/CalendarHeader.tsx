import dayjs from 'dayjs'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { commonStyles } from './commonStyles'
import { Event } from './interfaces'
import { Color } from './theme'
import { isToday } from './utils'

interface CalendarHeaderProps<T> {
  dateRange: dayjs.Dayjs[]
  cellHeight: number
  style: ViewStyle
  allDayEvents: Event<T>[]
  isRTL: boolean
  onPressDateHeader?: (date: Date) => void
  onMinusDate?: any
  onAddDate?: any
  mode: string
}

export const CalendarHeader = React.memo(
  ({
    dateRange,
    cellHeight,
    style = {},
    allDayEvents,
    isRTL,
    onPressDateHeader,
    mode,
  }: CalendarHeaderProps<any>) => {
    const _onPress = React.useCallback(
      (date: Date) => {
        onPressDateHeader && onPressDateHeader(date)
      },
      [onPressDateHeader],
    )

    return (
      <View style={[isRTL ? styles.containerRTL : styles.container, style]}>
        {mode !== 'day' && <View style={[commonStyles.hourGuide, styles.hourGuideSpacer]} />}
        {mode === 'day' && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 48,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#2E3758' }}>
              {dateRange[0].format('MMMM D, YYYY')}
            </Text>
          </View>
        )}
        {mode !== 'day' &&
          dateRange.map((date) => {
            const _isToday = isToday(date)
            return (
              <TouchableOpacity
                style={{ flex: 1, paddingTop: 2 }}
                onPress={() => _onPress(date.toDate())}
                disabled={onPressDateHeader === undefined}
                key={date.toString()}
              >
                <View style={{ height: cellHeight, justifyContent: 'space-between' }}>
                  {/* <Text style={[commonStyles.guideText, _isToday && { color: Color.primary }]}>
                  {mode === '3days' ? date.format('ddd MMM D') : date.format('D')}
                </Text> */}
                  <View style={[styles.wrap, _isToday === false && { backgroundColor: '#fff' }]}>
                    <Text style={[styles.dateText, _isToday && { color: '#fff' }]}>
                      {mode === '3days' ? date.format('ddd D MMM') : date.format('D')}
                    </Text>
                  </View>
                </View>
                {/* {(
                <>
                  <Text onPress={onMinusDate}>before</Text>
                  <Text onPress={onAddDate}>after</Text>
                </>
              )} */}
                <View>
                  {allDayEvents.map((event) => {
                    if (!event.start.isSame(date, 'day')) {
                      return null
                    }
                    return <View />
                  })}
                </View>
              </TouchableOpacity>
            )
          })}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  containerRTL: {
    flexDirection: 'row-reverse',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  dateText: {
    color: '#444',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
  wrap: {
    backgroundColor: Color.primary,
    //width: 36,
    //height: 36,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginTop: 6,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  hourGuideSpacer: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
})
