<template>
  <div class="workspace__articles">
    <header>
      <div class="handler-bar">
        <div class="button-group">
          <Button class="button"
                  icon="add" />
        </div>
      </div>
      <div class="search-bar">
        <Search class="search-input" />
      </div>
    </header>
    <ul class="articles">
      <li class="article"
          v-for="(article, index) in articles"
          :key="index">
        <h3 class="article-title">{{ article.name }}</h3>
        <p class="article-summary">我外婆说，我舅舅小时候性子很揪。跟我外公吵完架，就把眼镜布塞眼镜盒里，拿几本书塞进书包，气哼哼的出门，在门口还会吼一声：我这就去美国！再也不回来了！</p>
        <div>
          <time class="article-create-time">{{ article.creteTime }}</time>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from '@/components/button'
import Search from '@/components/search'

export default {
  name: 'Articles',
  components: {
    Button,
    Search
  },
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.workspace__articles {
  $color: #768191;
  $dark: #1d2329;
  $light: #929ba8;

  padding: 20px 0;
  color: $color;

  header {
    padding: 0 10px;
    border-bottom: 1px solid $border-color-light;

    .handler-bar {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      .button-group {
        flex-shrink: 0;

        .button {
          & + .button {
            margin-left: 10px;
          }
        }
      }
    }

    .search-bar {
      margin-bottom: 10px;
    }
  }

  .article {
    padding: 10px 10px;

    &.active,
    &:hover {
      background-color: #f3f3f3;
    }

    &-title {
      font-size: 14px;
      font-weight: 500;
      color: $dark;
    }

    &-summary {
      overflow: hidden;
      margin: 5px 0;
      height: 40px;
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
