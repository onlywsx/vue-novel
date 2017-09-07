/**
 * 判断字符是否为英文字母
 * @param character
 * @returns {boolean}
 */
const isEnglishAlphabet = character => {
  let result = false
  const charCode = character.charCodeAt()
  if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
    result = true
  }
  return result
}

/**
 * 判断是否为结束符
 * @param character
 * @returns {boolean}
 */
const isEndChar = character => {
  const endCharArr = [
    ',', '.', '?', '!', ';', ':', "'", '"', ']', '}', ')', '>',
    '，', '。', '？', '！', '；', '：', '、', '’', '”', '】', '）', '》'
  ]

  const isEndChar = function (character) {
    let result = false
    for (let i = 0, l = endCharArr.length; i < l; i++) {
      if (character === endCharArr[i]) {
        result = true
        break
      }
    }
    return result
  }

  return isEndChar(character)
}

/**
 * HTML实体转码
 * @param content
 * @returns {XML}
 */
const encodeHTML = content => {
  return content
    .replace(/&/g, '&amp;')
    .replace(/ /g, '&nbsp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default {
  isEndChar: isEndChar,
  isEnglishAlphabet: isEnglishAlphabet,
  encodeHTML: encodeHTML
}
