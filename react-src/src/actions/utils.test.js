import { getURL } from './utils'

test('returns the proper URL', () => {
    expect(getURL('category', true)).toBe('http://localhost:2000/api/category/all')
    expect(getURL('lift', false)).toBe('http://localhost:2000/api/lift')
})