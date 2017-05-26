// const AV = require('leancloud-storage/dist/av')

export const postsList = {
  state: {
    postsList: []
  },
  // getters: {
  //   getPostsList (state) {
  //     return state.postsList
  //   }
  // },
  mutations: {
    setPostsList (state, posts) {
      for (let i = 0; i < posts.length; i++) {
        posts[i] = JSON.stringify(posts[i])
        posts[i] = JSON.parse(posts[i])
      }
      console.log('update once')
      state.postsList = posts
    }
  }
  // ,actions: {
  //   getPostsList (context) {
  //     let q = new AV.Query('Posts')
  //     q.include('owner')
  //     q.descending('createdAt')
  //     q.find().then((posts) => {
  //       for (let i = 0; i < posts.length; i++) {
  //         posts[i] = JSON.stringify(posts[i])
  //         posts[i] = JSON.parse(posts[i])
  //       }
  //       console.log(posts)
  //       context.commit('setPostsList', posts)
  //       context.commit('setErrHttpGet', false)
  //     }, error => {
  //       console.log(JSON.stringify(error))
  //       context.commit('setErrHttpGet', true)
  //     })
      //
      //
      // console.log('get')
      // context.commit({
      //   type: 'setPostsList',
      //   posts: [{
      //     title: '百度联合创始人徐勇：从建团队、找融资、应对危机来看百度早期创业',
      //     date: new Date(),
      //     tag: 'angular2',
      //     src: '34628',
      //     content: '提到百度，你脑海中第一个想到的是不是李彦宏先生？而此次，投投想给你介绍另外一个人——徐勇先生，早年他曾与李彦宏先生一起从硅谷回国创建了百度。这一期，投投就与你分享徐勇先生的一给你介绍另外一个人——徐勇先生，早年他曾与李彦宏先生一起从硅谷回国创建了百度。这一期，投投就与你分享徐勇先生的一'
      //   }, {
      //     title: '百度联合创始人徐勇：从建团队、找融资、应对危机来看百度早期创业',
      //     date: new Date(),
      //     tag: 'angular2',
      //     src: '34628',
      //     content: '提到百度，你脑海中第一个想到的是不是李彦宏先生？而此次，投投想给你介绍另外一个人——徐勇先生，早年他曾与李彦宏先生一起从硅谷回国创建了百度。这一期，投投就与你分享徐勇先生的一给你介绍另外一个人——徐勇先生，早年他曾与李彦宏先生一起从硅谷回国创建了百度。这一期，投投就与你分享徐勇先生的一'
      //   }, {
      //     title: '百度联合创始人徐勇：从建团队、找融资、应对危机来看百度早期创业',
      //     date: new Date(),
      //     tag: 'angular2',
      //     src: '34628',
      //     content: '提到百度，你脑海中第一个想到的是不是李彦宏先生？而此次，投投想给你介绍另外一个人——徐勇先生，早年他曾与李彦宏先生一起从硅谷回国创建了百度。这一期，投投就与你分享徐勇先生的一给你介绍另外一个人——徐勇先生，早年他曾与李彦宏先生一起从硅谷回国创建了百度。这一期，投投就与你分享徐勇先生的一'
      //   }, {
      //     title: '百度联合创始人徐勇：从建团队、找融资、应对危机来看百度早期创业',
      //     date: new Date(),
      //     tag: 'angular2',
      //     src: '34628',
      //     content: '提到百度，你脑海中第一个想到的是不是李彦宏先生？而此次，投投想给你介绍另外一个人——徐勇先生，早年他曾与李彦宏先生一起从硅谷回国创建了百度。这一期，投投就与你分享徐勇先生的一给你介绍另外一个人——徐勇先生，早年他曾与李彦宏先生一起从硅谷回国创建了百度。这一期，投投就与你分享徐勇先生的一'
      //   }, {
      //     title: '百度联合创始人徐勇：从建团队、找融资、应对危机来看百度早期创业',
      //     date: new Date(),
      //     tag: 'angular2',
      //     src: '34628',
      //     content: '提到百度，你脑海中第一个想到的是不是李彦宏先生？而此次，投投想给你介绍另外一个人——徐勇先生，早年他曾与李彦宏先生一起从硅谷回国创建了百度。这一期，投投就与你分享徐勇先生的一给你介绍另外一个人——徐勇先生，早年他曾与李彦宏先生一起从硅谷回国创建了百度。这一期，投投就与你分享徐勇先生的一'
      //   }, {
      //     title: '百度联合创始人徐勇：从建团队、找融资、应对危机来看百度早期创业',
      //     date: new Date(),
      //     tag: 'angular2',
      //     src: '34628',
      //     content: '提到百度，你脑海中第一个想到的是不是李彦宏先生？而此次，投投想给你介绍另外一个人——徐勇先生，早年他曾与李彦宏先生一起从硅谷回国创建了百度。这一期，投投就与你分享徐勇先生的一给你介绍另外一个人——徐勇先生，早年他曾与李彦宏先生一起从硅谷回国创建了百度。这一期，投投就与你分享徐勇先生的一'
      //   }]
      // })
    // }
  // }
}
