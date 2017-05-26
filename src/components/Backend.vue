<template>
  <div id="backend-container"  v-loading="isLoading">
    <div class="bk-posts-list">
      <ul>
        <li class="center" @click="newPost()">New</li>
        <li @click="postClick(post)" v-for="post in postsList">
          <h2>{{post.title}}</h2>
          <div class="bk-list-detail">{{post.content | truncate}}</div>
        </li>
      </ul>
    </div>
    
    <div v-if="selectedPost" class="bk-posts-editor">
      <el-row :gutter="20">
        <el-col :span="2" class="align-left editor-label">
          Title:
        </el-col>

        <el-col :span="22">
          <span v-if="!editMode"
                class="editor-label">{{selectedPost.title}}</span>

          <el-input
            v-if="editMode"
            v-model="selectedPost.title" 
            placeholder="please input title ...">
          </el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="2" class="align-left editor-label">
          Tag:
        </el-col>
        
        
        <el-col :span="4">
          <el-tag v-if="!editMode"
                  v-for="tag in selectedPost.tag"
                  :type="'danger'">{{selectedPost.tag}}</el-tag>

          <el-input 
            v-if="editMode"
            v-model="selectedPost.tag"
            placeholder="please input tag ...">
          </el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div v-if="!editMode" v-html="afterMaked" class="content-html"></div>

          <el-input
            v-if="editMode"
            type="textarea"
            :autosize="{ minRows: 20 }"
            v-model="selectedPost.content">
          </el-input>

        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-button
            v-if="!editMode"
            type="primary"
            @click="enterEditMode(true)">Edit</el-button>

          <el-button
            v-if="editMode"
            type="primary"
            @click="save()">Save</el-button>
          <el-button
            v-if="editMode"
            type="danger"
            @click="exitEditMode()">Cancel</el-button>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
const AV = require('leancloud-storage/dist/av')
const marked = require('marked')
const utils = require('utility')
import { mapMutations, mapState, mapActions } from 'vuex'
import PostModel from '../model/post'

export default {
  data () {
    return {
      isLoading: false,
      isNew: false,
      selectedPost: '',
      tmpPost: '',
      editMode: false
    }
  },
  computed: {
    loginState () {
      return this.$store.getters.getLoginState
    },
    afterMaked () {
      return marked(this.selectedPost.content)
    },
    postsList () {
      console.log('reload once')
      return this.$store.state.posts.postsList
    }
  },
  filters: {
    truncate (v) {
      if (v.length < 80) {
        return v
      } else {
        return v.substr(0, 80) + '...'
      }
    }
  },
  methods: {
    newPost () {
      this.selectedPost = PostModel
      this.isNew = true
      this.editMode = true
    },
    postClick (post) {
      this.selectedPost = Object.assign({}, post)
      this.tmpPost = this.selectedPost
    },
    enterEditMode (status) {
      this.editMode = status
    },
    updatePostsList () {
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
    },
    alert (message, type, duration, fn) {
      this.$message({
        message,
        type,
        duration,
        onClose () {
          if (fn) fn()
        }
      })
    },
    save () {
      if (this.isNew) {
        let Posts = new AV.Object.extend('Posts')
        let post = new Posts()
        post.set('title', this.selectedPost.title)
        post.set('tag', this.selectedPost.tag)
        post.set('src', utils.md5(this.selectedPost.title + new Date()))
        post.set('content', this.selectedPost.content)
        post.set('owner', AV.User.current())
        post.save().then(() => {
          this.alert('Success', 'success', 1000)
          this.updatePostsList()
          this.editMode = false
          this.tmpPost = this.selectedPost
        }, error => {
          this.alert('Error', 'error', 1000)
        })
      } else {
        let post = AV.Object.createWithoutData('Posts', this.selectedPost.objectId)
        post.set('title', this.selectedPost.title)
        post.set('tag', this.selectedPost.tag)
        post.set('src', utils.md5(this.selectedPost.title + new Date()))
        post.set('content', this.selectedPost.content)
        post.set('owner', AV.User.current())
        post.save()
        // update app status
        this.updatePostsList()
        this.alert('Success', 'success', 1000)
        this.editMode = false
        this.tmpPost = this.selectedPost
      }
    },
    exitEditMode () {
      // this.selectedPost = Object
      this.$confirm('此操作将删除修改, 是否继续?', 'Tips', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.selectedPost = Object.assign({}, this.tmpPost)
        this.editMode = false
      }).catch(() => {
        console.log('cancel ...')
      })
    }
  },
  created () {
    this.isLoading = true
    if (!AV.User.current()) {
      this.isLoading = false
      this.changeLoginState(false)
      this.alert('请重新登录~', 'error', 1000, () => {
        this.$router.push({path: '/login'})
      })
    }
  },
  mounted () {
    this.updatePostsList()
  },
  ...mapMutations([
    'changeLoginState'
  ])
}
</script>

<style lang="stylus">
#backend-container
  min-width 750px
  overflow-x scroll
#backend-container, .bk-posts-list, .bk-posts-editor
  box-sizing border-box
  height 100%
.bk-posts-list, .bk-posts-editor
  overflow-y scroll
.bk-posts-list
  float left
  width 30%
  padding 0
  border-right 1px solid #ddd
  ul
    box-sizing border-box
    width 100%
    li
      margin-top 5px
      padding 5px
      margin-bottom 5px
      border-bottom 1px solid #ddd
      border-radius 1px
      &:nth-child(1)
        font-size 20px
        margin-top 0
        padding 10px 0
        color #58B7FF
        transition .3s ease-in
        &:hover
          background-color #58B7FF
          color white
      &:hover
        cursor pointer
      .bk-list-detail
        font-weight thin
        font-size 14px
        color #475669
.bk-posts-editor
  float right
  width 70%
  padding 5px
  .el-row
    margin-bottom 20px
    .editor-label
      line-height 36px
      font-weight 500
    .content-html
      padding 8px
      border 1px dashed #ddd
      border-radius 3px
.center
  text-align center
</style>
