<template>
  <main class="layout">
    <aside class="layout__aside aside">
      <header class="aside__header">
        <div class="user">
          <div
            class="user__avatar"
            style="background-image: url(/icons/icon.png)"
          />
          <div class="user__username"></div>
        </div>
      </header>
      <div class="aside__body">
        <ul class="routers">
          <nav class="router" v-for="nav in navList" :key="nav.to">
            <router-link
              class="router__link"
              :to="nav.to"
              active-class="active"
            >
              <Icon class="router__icon" :type="nav.icon" />
            </router-link>
          </nav>
        </ul>
      </div>
      <footer class="aside__footer">
        <Button class="btn btn-setting" radius="8" icon="sync" />
      </footer>
    </aside>
    <div class="layout__view">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import Button from '@/components/button'
import Icon from '@/components/icon'

export default {
  name: 'printer',
  components: {
    Button,
    Icon
  },
  data () {
    return {
      navList: [
        {
          name: 'Worksspace',
          icon: 'press',
          to: '/workspace'
        },
        {
          name: 'Setting',
          icon: 'setting',
          to: '/setting'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100vh;

  &__aside {
    flex-shrink: 0;
    width: 60px;
  }

  &__view {
    flex: auto;
    overflow: hidden;
  }
}

.aside {
  display: flex;
  height: 100%;
  flex-direction: column;
  color: #fff;
  background-color: #2b50ed;

  &__header,
  &__footer {
    @include align-content-center;
    flex-shrink: 0;
  }

  &__body {
    @include align-content-center;
    flex: auto;
    overflow: auto;
  }

  &__footer {
    padding: 10px;

    .btn {
      margin: 8px 0;
      width: 32px;
      height: 32px;
      text-align: center;
      color: #fff;
      border-radius: 8px;
      cursor: pointer;
    }
  }
}

.user {
  padding: 8px 0;
  text-align: center;

  &__avatar {
    flex-shrink: 0;
    @include circle(32px);
    background-color: #ccc;
    background-size: cover;
    background-repeat: no-repeat;
  }

  &__username {
    margin: 8px 0;
    @include text-truncate;
  }
}

.routers {
  .router {
    margin: 28px 0;

    &__link {
      @include align-content-center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;

      &:hover,
      &.active {
        background-color: #2443dd;
      }
    }

    &__icon {
      font-size: 20px;
    }
  }
}
</style>
