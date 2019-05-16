const controller = 'repositoryController'

export default {
  getList: {
    channel: `${controller}/getList`
  },
  getCategoryList: {
    channel: `${controller}/getCategoryList`
  },
  getArticleList: {
    channel: `${controller}/getArticleList`
  },
  getArticle: {
    channel: `${controller}/getArticle`
  }
}
