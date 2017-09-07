// 页面渲染

import charTool from './charTool'
import $ from 'webpack-zepto'
import ArticleModel from './ArticleModel'

const wrapPage = (content, pageClass) => {
  return '<div ' + (pageClass ? 'class=' + pageClass : '') + '>' + content + '</div>'
}

const wrapChar = (content, key) => {
  return '<span data-key="' + key + '">' + content + '</span>'
}

const renderPage = config => {
  const blank = config.blank || [30, 30, 30, 30]; // 上,右,下,左
  const article = config.article
  const pageClass = config.pageClass
  const fontStyleStatus = config.fontStyleStatus

  const articleModel = new ArticleModel(fontStyleStatus, article)
  const style = fontStyleStatus.style
  const letterSpacing = style.letterSpacing ? +style.letterSpacing.replace(/px$/, '') : 0
  const $window = $(window)
  const pageW = $window.width() - blank[1] - blank[3]
  const pageH = $window.height() - blank[0] - blank[2]
  const maxLineOfPage = Math.floor(pageH / +style.lineHeight.replace(/px$/, ''))
  let pageLength = 0; // 页面长度计数器，单位：行
  let lineWidth = 0; // 单行长度计数器，单位：像素
  let articleStr = ''; // 文章内容存储
  let pageStr = ''; // 页面内容存储
  let lineStr = ''; // 单行内容存储
  let lineCharCounter = 0; // 每行字数计数器
  let spaceWidth = 0; // 剩余空白区域宽度
  let curChar = ''; // 当前检索的字符
  let wordNum = 0; // 文字编号

  for (let i = 0, l1 = articleModel.length; i < l1; i++) {
    let j = 0
    let l2 = articleModel[i].length

    while (j < l2) {
      curChar = articleModel[i][j].character
      if (pageLength < maxLineOfPage) {
        lineWidth += articleModel[i][j].width
        if (lineWidth <= pageW) { // 每行未满
          // lineStr += '<span data-key="'+ j +'">' + curChar + '</span>'
          lineStr += wrapChar(curChar, wordNum++)
          lineCharCounter += curChar.length
          j++
        } else { // 每行已满
          // 获取所剩空白区域
          spaceWidth = pageW - lineWidth + articleModel[i][j].width
          if (charTool.isEndChar(curChar)) {
            // lineStr += '<span data-key="'+ j +'">' + curChar + '</span>'
            lineStr += wrapChar(curChar, wordNum++)
            spaceWidth = spaceWidth - articleModel[i][j].width
            lineCharCounter += curChar.length
            j++
          }

          if (Math.abs(spaceWidth) > 1) {
            pageStr += '<p style="letter-spacing: ' + (letterSpacing + spaceWidth / lineCharCounter) + 'px;">' + lineStr + '</p>'
          } else {
            pageStr += '<p>' + lineStr + '</p>'
          }
          pageLength++
          // 初始化
          lineStr = ''
          lineWidth = 0
          lineCharCounter = 0
        }
      } else { // 每页已满
        pageStr = wrapPage(pageStr, pageClass)
        articleStr += pageStr
        // 初始化
        pageStr = ''
        pageLength = 0
      }
    }
    // 每段结束
    if (lineStr.length > 0) { // 内容还没有被存储
      pageStr += '<p>' + lineStr + '</p>'
      pageLength++
      // 初始化
      lineStr = ''
      lineWidth = 0
      lineCharCounter = 0
    }
  }
  // 全部文章结束
  pageStr = wrapPage(pageStr, pageClass)
  articleStr += pageStr
  // 初始化
  pageStr = ''
  pageLength = 0

  return articleStr
}

export default renderPage
