import { convertToFull, millisToMinutesAndSeconds } from './DateUtils'

test('convertToFull returns proper string', () => {
    expect(convertToFull('5')).toBe('05')
    expect(convertToFull('9')).toBe('09')
})

test('millisToMinutesAndSeconds returns proper string', () => {
    expect(millisToMinutesAndSeconds(210000)).toBe('03:30')
    expect(millisToMinutesAndSeconds(605000)).toBe('10:05')
})