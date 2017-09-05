import f from './fetch'

export default {
  chapter: '',

  // 获取内容
  parseContext(content) {
      // 匹配 P 标签
      const regBrTag = /(([^>]*<br\s*\/?>[^<]*){10,}|(<p.*?>[^<]*(<\/p>)*){10,})/ig;
      let res = regBrTag.exec(content)
      if (res !== null) {
          this.chapter = res[0];
      }
  },

  async start(url) {
    const content = await f.getContent(url);
    this.parseContext(content);
  },

  init(url) {
    return this.start(url);
  },

  getChapter() {
    return this.chapter;
  }

}
