const reESC = /[\\^$.*+?()[\]{}|]/g
const reChar = /[가-힣]/
const reConsonant = /[ㄱ-ㅎ]/
const offset = 44032

const con2syl = Object.fromEntries(
  'ㄱ:가,ㄲ:까,ㄴ:나,ㄷ:다,ㄸ:따,ㄹ:라,ㅁ:마,ㅂ:바,ㅃ:빠,ㅅ:사'.split(',').map((v) => {
    const entry: (string | number)[] = v.split(':')
    if (typeof entry[1] === 'string') {
      entry[1] = entry[1].charCodeAt(0)
    }
    return entry
  })
)

const chPattern = (ch: string) => {
  let r
  if (reConsonant.test(ch)) {
    const begin = con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl['ㅅ']
    const end = begin + 587
    r = `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`
  } else if (reChar.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset
    if (chCode % 28 > 0) return ch
    const begin = Math.floor(chCode / 28) * 28 + offset
    const end = begin + 27
    r = `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`
  } else r = ch.replace(reESC, '\\$&')
  return `(${r})`
}

const fuzzyFunc = (v: string) => {
  const pattern = new RegExp(v.split('').map(chPattern).join('.*?'), 'i')
  return pattern
}

const Fuzzy = (e: string) => {
  return fuzzyFunc(e)
}
export default Fuzzy
