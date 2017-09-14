import f from './fetch'

export default {
  chapter: '',

  // 获取内容
  parseContext(content) {
      // 匹配 P 标签
      const regBrAndPTag = /(([^>]*<br\s*\/?>[^<]*){10,}|(<p.*?>[^<]*(<\/p>)*){10,})/i;
      let res = regBrAndPTag.exec(content)
      if (res !== null) {
          let chapter = res[0];
          const regPTag = /<p.*?>([^<\s]+)/ig;
          let p, paragraphs = [];
          while ((p = regPTag.exec(chapter)) !== null) {
            paragraphs.push(this.parseParagraph(p[1]))
          }
          const regBrTagFirst = /\s*([^<]+)<br/i;
          if ((p = regBrTagFirst.exec(chapter)) !== null) {
            paragraphs.push(this.parseParagraph(p[1]))
          }
          const regBrTag = /<br\s*\/?>\s*([^<]+)/ig;
          while ((p = regBrTag.exec(chapter)) !== null) {
            paragraphs.push(this.parseParagraph(p[1]))
          }
          this.chapter = paragraphs.join("\n");
      }
  },

  parseParagraph(p) {
    return '　　' + p.replace(/^&nbsp;/ig, '');
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
