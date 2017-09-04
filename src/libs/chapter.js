import f from './fetch'

export default {
  contents: [],

  // 获取内容
  parseContext(content) {
      // 匹配 P 标签
      const regBrTag = /(([^>]*<br\s*\/?>[^<]*){10,}|(<p.*?>[^<]*(<\/p>)*){10,})/ig;
      let res = regBrTag.exec(content)
      if (res !== null) {
          this.contents.push(res[0]);
      }
  },

  async start(url) {
    const content = await f.getContent(url);
    this.parseContext(content);
  },

  init(url) {
    this.start(url);
  }

}
