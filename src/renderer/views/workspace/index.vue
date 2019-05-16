<template>
  <div class="layout-workspace">
    <aside class="layout-workspace__aside">
      <Categories :categories="categories"
                  @getArticleList="getArticleList" />
    </aside>
    <div class="layout-workspace__articles">
      <Articles :articles="articles"
                @getArticle="getArticle" />
    </div>
    <div class="layout-workspace__article">
      <Article :article="article" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/button'
import Icon from '@/components/icon'

import Article from './components/article'
import Articles from './components/articles'
import Categories from './components/categories'

export default {
  name: 'Workspace',
  components: {
    Button,
    Icon,
    Article,
    Articles,
    Categories
  },
  data () {
    return {
      categories: [],
      articles: [],
      article: ''
    }
  },
  computed: {

  },
  methods: {
    init () {
      this.getCategoryList()
    },
    getCategoryList () {
      this.$fetch('repository.getCategoryList').then(data => {
        this.categories = data

        if (data.length > 0) {
          this.getArticleList(data[0].path)
        }
      })
    },
    getArticleList (path) {
      this.$fetch('repository.getArticleList', path).then(data => {
        this.articles = data

        if (data.length > 0) {
          this.getArticle(data[0].path)
        }
      })
    },
    getArticle (path) {
      this.$fetch('repository.getArticle', path).then(res => {
        this.article = res
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.layout-workspace {
  display: flex;
  height: 100vh;
  flex-direction: row;
  background-color: #fff;

  &__aside,
  &__articles,
  &__article {
    flex-shrink: 0;
    overflow: auto;
  }

  &__articles,
  &__article {
    border-left: 1px solid $border-color;
  }

  &__aside {
    width: 240px;
  }

  &__articles {
    position: relative;
    width: 300px;
    background-color: #fafafa;
  }

  &__article {
    flex: auto;
  }
}
</style>
