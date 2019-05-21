<template>
  <div class="articles">
    <header class="articles__header">
      <Icon class="icon icon-add"
            type="add" />
      <h4 class="title">Articles</h4>
    </header>
    <div class="articles__search-bar">
      <Search class="search-input"
              @on-search="search" />
    </div>
    <div class="articles__body">

      <ul class="articles">
        <li class="article"
            v-for="item in filteredArticles"
            :key="item.path"
            :class="{active: article.path === item.path}"
            @click="cdArticle(item)">
          <h3 class="article-title">{{ item.name }}</h3>
          <p class="article-summary">{{ item.summary }}</p>
          <div>
            <time class="article-create-time">{{ item.birthtime | moment('YYYY-MM-DD') }}</time>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Button from '@/components/button'
import Icon from '@/components/icon'
import Search from '@/components/search'

import moment from '@/filters/moment'

export default {
  name: 'Articles',
  components: {
    Button,
    Icon,
    Search
  },
  filters: {
    moment
  },
  data () {
    return {
      articles: [],
      searchTitle: ''
    }
  },
  computed: {
    ...mapState('workspace', [
      'category',
      'article'
    ]),
    filteredArticles () {
      const title = this.searchTitle

      return this.articles.filter(({ name }) => {
        return name.indexOf(title) !== -1
      })
    }
  },
  methods: {
    search (keyword) {
      this.searchTitle = keyword
    },
    cdArticle ({ name, path }) {
      this.$store.commit('workspace/updateArticle', {
        name,
        path
      })
    },
    getArticleList () {
      const { path } = this.category

      this.$fetch('repository.getArticleList', { path }).then(data => {
        this.articles = data
      })
    }
  },
  watch: {
    category (category) {
      if (category.path !== '') this.getArticleList()
    }
  }
}
</script>

<style lang="scss" scoped>
.articles {
  $color: #768191;
  $dark: #1d2329;
  $light: #929ba8;

  color: $color;

  &__header {
    display: flex;
    padding: 0 18px;
    height: 50px;
    align-items: center;
    color: #888;

    .title {
      flex: auto;
      color: $text-color-dark;
    }

    .icon {
      margin-right: 16px;
      padding: 4px;
      flex-shrink: 0;
      font-size: 14px;
      color: $text-color-dark;
    }
  }

  &__search-bar {
    padding: 0 18px 12px;
    border-bottom: 1px solid $border-color;
  }

  .article {
    padding: 10px 30px;

    &.active,
    &:hover {
      background-color: rgba(#000, 0.03);
    }

    &-title {
      font-size: 16px;
      font-weight: 400;
      color: $text-color-dark;
    }

    &-summary {
      overflow: hidden;
      margin: 5px 0;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; // missed
      color: $color;
    }

    &-create-time {
      font-size: 12px;
      color: $light;
    }
  }
}
</style>
