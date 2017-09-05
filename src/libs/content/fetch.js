export default {
  charset: 'gbk',

  // 获取内容
  getContent(url) {
    return new Promise((resolve, reject) => {
      let blob;
      fetch(url)
      .then(response => response.blob())
      .then(blob => {
        this.readContent(blob, this.charset)
        .then(result => {
          // 判断编码
          let regCharset = /(首|页|阅|读|第|章|节|下|载|书|架|手|机)/;
          if (regCharset.test(result)) {
            resolve(result);
          } else {
            this.charset = this.charset == 'gbk' ? 'utf8' : 'gbk';
            this.readContent(blob, this.charset)
            .then(result => {
              resolve(result);
            });
          }
        });
      });

    });
  },

  readContent(blob, charset) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      }
      reader.onerror = () => {
        reject(reader.error)
      }
      reader.readAsText(blob, charset);
    });
  }

}
