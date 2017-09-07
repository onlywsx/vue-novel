// 文字样式类，提供定制和切换字体样式

import CharWidth from './CharWidth'

class FontStyleController {
  constructor (option) {
    this.option = option || {
      small: {
        fontSize: '12px',
        lineHeight: '20px',
        letterSpacing: '0px'
      },
      normal: {
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '1px'
      },
      big: {
        fontSize: '20px',
        lineHeight: '28px',
        letterSpacing: '0px'
      }
    }
    this.currentOptionToken = undefined
    this.charWidth = {}
  }

  set (optionToken) {
    const opt = this.option[optionToken]
    const charW = this.charWidth[optionToken]
    if (opt) {
      if (!charW) {
        this.charWidth[optionToken] = new CharWidth(opt)
      }
      this.currentOptionToken = optionToken
    }
  }

  getStatus () {
    const cur = this.currentOptionToken
    if (!cur) {
      return {
        error: 'Please set the "optionToken".'
      }
    }
    return {
      style: this.option[cur],
      charWidth: this.charWidth[cur]
    }
  }
}

export default FontStyleController
