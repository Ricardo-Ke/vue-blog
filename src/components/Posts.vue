<template>
  <div v-loading="isLoading">
    <div class="posts-all">
      <ul class="tags-list center">
        <li class="tag-item collection-tag">All</li>
        <li v-for="tag in tags" class="tag-item collection-tag">
          {{tag}}
        </li>
      </ul>

      <ul v-if="postsList" class="posts-list center">
        <li v-for="post in postsList" class="post-item">
          <router-link :to="'p/' + post.src" class="title">{{post.title}}</router-link>

          <p class="abstract">{{post.content}}</p>

          <div class="meta">
            <span class="collection-tag">{{post.tag}}</span>
            <span>{{post.updatedAt | customDate}}</span>
          </div>
        </li>
      </ul>
    </div>
    
    <footer>
      <span>© 2017 All rights reserved.</span>
      <span>By Ricardo</span>
    </footer>
  </div>
</template>

<script>
import { toNormalDate } from '../utils/date'
// import * as utils from 'utility'
const AV = require('leancloud-storage/dist/av')

export default {
  data () {
    return {
      tags: ['Angular', 'Vue', 'JS'],
      isLoading: true
    }
  },
  computed: {
    postsList () {
      return this.$store.state.posts.postsList
    }
  },
  filters: {
    customDate (v) {
      return toNormalDate(v)
    }
  },
  mounted () {
    let q = new AV.Query('Posts')
    q.include('owner')
    q.descending('createdAt')
    q.find().then((posts) => {
      this.$store.commit('setPostsList', posts)
      this.isLoading = false
    }, error => {
      this.alert('出错了哦~', 'error', 1000)
      console.log(JSON.stringify(error))
      this.isLoading = false
    })
  }
}
</script>

<style lang="stylus">
.posts-all
  position relative
  padding-left 45px
  .center
    width 85%
    max-width 1024px
    margin 0 auto
    padding-top 15px
  .collection-tag
    padding 2px 6px
    border 1px solid rgba(236,97,73,.7)
    border-radius 3px
    margin-right 10px
    transition .1s ease-in
    cursor pointer
    color #ea6f5a!important
    &:hover
      color #ec6149!important
      background-color rgba(236,97,73,.05)
      border-color #ec6149

.tags-list
  .tag-item
    float left 

.posts-list
  clear both
  .post-item
    margin-bottom 17px
    padding-bottom 17px
    border-bottom 1px dashed #ddd
    .title
      box-sizing border-box
      display inherit
      margin-bottom 4px
      margin 0 0 8px
      font-size 24px
      font-weight 700
      line-height 1.5
      color #333;
      cursor pointer
      &:hover
        text-decoration underline
    .abstract
      width 100%
      margin 0 0 7px
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 3
      overflow hidden
      font-size 15px
      line-height 24px
      text-align left
    .meta
      font-size 12px
      font-weight 400
      line-height 20px
      text-align left
      .collection-tag
        padding 2px 6px
        border 1px solid rgba(236,97,73,.7)
        border-radius 3px
        margin-right 10px
        transition .1s ease-in
        cursor pointer
        color #ea6f5a!important
        &:hover
          color #ec6149!important
          background-color rgba(236,97,73,.05)
          border-color #ec6149

footer
  clear both
  text-align center
  color #b3b3b3
  span
    font-size 12px
    line-height 12px
    display block
    margin-bottom .7em
</style>
