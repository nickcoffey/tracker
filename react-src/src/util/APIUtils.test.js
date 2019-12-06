import { returnValue } from './APIUtils'

test('returnValue returns proper value', () => {
    const testObj = {obj: 'test'}
    expect(returnValue({ success: true, data: testObj }, false)).toStrictEqual(testObj)
    expect(returnValue({ success: false, data: testObj }, false)).toStrictEqual({})
})