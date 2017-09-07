// 文章模型对象

import charTool from './charTool'

/**
 * 根据换行符来拆分为数组
 * @param article
 * @returns {Array}
 */
const splitArticle = article => {
  return article.split('\n')
}

/**
 * 按字符来拆分为数组
 * @param section
 * @returns {Array}
 */
const splitSection = section => {
  return section.split('')
}

/**
 * @param fontStyleStatus
 * @param article
 * @returns {Array}
 * @constructor
 */
const ArticleModel = (fontStyleStatus, article) => {
  const charWidth = fontStyleStatus.charWidth

  const sectionArr = splitArticle(article); // 数组，文章的每个段落
  let charArr; // 数组，段落的每个字符
  let articleModel = []; // 存储整个文章的数组模型

  let chars = ''; // 存储字符
  let curChar = ''; // 当前字符，用于遍历
  let width = 0; // chars的宽度
  let isFullWord = true; // 是否为完整的单词/字

  for (let i = 0, sLen = sectionArr.length; i < sLen; i++) {
    charArr = splitSection(sectionArr[i])
    articleModel.push([])

    let j = 0
    const wLen = charArr.length
    while (j < wLen) {
      curChar = charArr[j]

      // 对英文单词会进行封装处理
      if (charTool.isEnglishAlphabet(curChar)) { // 如果当前字符为英文字母
        isFullWord = false
        chars += curChar
        width += charWidth.get(curChar)
        j++
      } else {
        isFullWord = true
      }

      // 当被判断为一个完整的单词时，才会添加到 articleModel 中
      if (isFullWord) {
        // 如果chars为空，则需重新处理字符
        if (!chars.length) {
          chars += curChar
          width += charWidth.get(curChar)
          j++
        }
        articleModel[i].push({
          width: width,
          character: chars
        })
        curChar = chars = ''
        width = 0
      }
    }
  }

  charWidth.remove()
  return articleModel
}

export default ArticleModel
