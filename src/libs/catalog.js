import f from './fetch'

export default {
  urlHost: '',
  urlPath: '',
  urlFile: '',

  _tmp: [],
  catalogs: [],

  // 分割URL
  parseUrl(url) {
    const regUrl = /((?:.+\.)?[a-z0-9]+\.[a-z0-9]+)\/(.*)\/(.*)?/i;
    let urlParts = regUrl.exec(url);
    if (urlParts !== null) {
      this.urlHost = urlParts[1];
      this.urlPath = '/' + urlParts[2] + '/';
      this.urlFile = urlParts[3]
    }
  },

  // 补全URL
  parseUri(uri) {
    if (/^\//.test(uri)) {
      return this.urlHost + uri;
    }
    if (/\/\//.test(uri)) {
      return uri;
    }
    return this.urlHost + this.urlPath + uri;
  },

  // 获取章节
  parseContext(content) {
    // 匹配编码
    const regCharset = /<meta.*?charset=["']?([^"'\/>]+)/ig;
    // 匹配换行符
    const regNewline = /[\r\n]/g;
    // 匹配 a 标签
    const regATag = /<a.*?href\s*=\s*["'](.*?)["'].*?>(.*?)<\/a>/ig;
    // 匹配任何标签
    const regAnyTag = /<[^>]*>/g;
    // 匹配章节
    const regChapter = /(第.*?章|第.*?回|序\s*章|楔\s*子|引\s*子|大结局|尾\s*声|后\s*记)/;
    // 匹配章节连接文件
    const regChapterLink = /\/?\d{4,}\.html?/i;
    // 匹配下一页
    const regNextPage = /下\W?页/;

    let metaTag, charset, aTag, nextUrl;

    // 获取编码
    metaTag = regCharset.exec(content);
    if (metaTag) {
      charset = metaTag[1];
    }

    // 去除换行
    content = content.replace(regNewline, '')
    // 获取 A 标签
    while ((aTag = regATag.exec(content)) !== null) {
      let url = this.parseUri(aTag[1].trim());
      let name = aTag[2].replace(regAnyTag, '').trim()

      if (regChapter.test(name) || regChapterLink.test(url)) { // 章节
        // 删除重复章节
        let existIndex = this._tmp.indexOf(url);
        if (existIndex > -1) {
          this._tmp.splice(existIndex, 1);
          this.catalogs.splice(existIndex, 1);
        }
        this._tmp.push(url)
        this.catalogs.push({ url, name })
      } else if (regNextPage.test(name)) { // 下一页
        nextUrl = url
      }
    }

    // 章节下一页
    if (nextUrl) {
      this.start(nextUrl);
    }
  },

  async start(url) {
    const content = await f.getContent(url);
    // console.log(content);
    this.parseContext(content);
  },

  init(url) {
    this.parseUrl(url);
    this.start(url);
  }

}
