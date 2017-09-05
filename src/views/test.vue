<template>
  <div>
    <div style="word-wrap: break-word;" v-html="content"></div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <a :href="item.url" target="_blank">{{item.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import catalog from 'libs/content/catalog';
  import chapter from 'libs/content/chapter';

  export default {
    computed: {
      ...mapState([
        'list',
        'content'
      ])
    },
    methods: {
      async getCatalog() {
        // let url = '/m.vodtw.com/wapbook-15248/';
        let url = '/www.vodtw.com/Html/Book/8/8924/Index.html';
        // let url = '/www.biquge.lu/book/2379/';
        // let url = '/www.xxbiquge.com/12_12583/';
        // let url = '/www.kanshula.com/book/miaoshoushengxiang/';
        // let url = '/www.23us.la/html/78/78900/';
        // let url = '/www.biquwu.cc/biquge/3_3148/';
        // let url = '/www.baoliny.com/64364/index.html';
        // let url = '/www.qu.la/book/5509/';
        await catalog.init(url);
        this.$store.commit('list', catalog.getCatalogs());
      },
      async getContent() {
        let url = '/www.vodtw.com/Html/Book/8/8924/4614448.html';
        await chapter.init(url);
        this.$store.commit('content', chapter.getChapter());
      }
    },
    mounted: function () {
      this.getCatalog();
      this.getContent();
    }
  }
</script>
