<template>
  <main class="layout-workspace">
    <aside class="layout-workspace__aside aside">
      <header class="aside__header">

      </header>
      <div class="aside__body">
        <section class="group">
          <header class="group__header">
            <h4 class="title">Categories</h4>
            <Icon class="icon icon-add"
                  type="add" />
          </header>
          <Categories :categories="categories"
                      @getArticleList="getArticleList" />
        </section>
      </div>
    </aside>
    <div class="layout-workspace__articles">
      <Articles :articles="articles" />
    </div>
    <div class="layout-workspace__article">
      <Article />
    </div>
  </main>
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
      articles: []
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
      console.log(path)
      this.$fetch('repository.getArticleList', path).then(data => {
        this.articles = data
        console.log(JSON.stringify(data, null, 4))
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
    width: 200px;
  }

  &__articles {
    position: relative;
    width: 300px;
  }

  &__article {
    flex: auto;
  }
}

.aside {
  display: flex;
  height: 100%;
  flex-direction: column;

  &__header,
  &__footer {
    flex-shrink: 0;
  }

  &__body {
    flex: auto;
    overflow: auto;
    padding: 15px 0;
  }

  &__footer {
    display: flex;

    padding: 10px;
    justify-content: space-between;
  }
}

.group {
  &__header {
    display: flex;
    padding: 0 10px 0 18px;
    height: 50px;
    align-items: center;
    color: #888;

    .title {
      flex: auto;
    }

    .icon {
      flex-shrink: 0;
      font-size: 14px;
    }
  }
}
</style>
