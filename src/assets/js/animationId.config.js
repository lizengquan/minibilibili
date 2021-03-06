// 动漫分区id号
export const NavList = ['动画', '番剧', '国创', '音乐', '舞蹈', '游戏', '科技', '生活', '鬼畜', '时尚', '广告', '娱乐', '影视', '搞笑']

export const iconList = ['icon-rentou', 'icon-dianying', 'icon-dianshi', 'icon-erji', 'icon-fan', 'icon-youxi', 'icon-keji', 'icon-icon13',
  'icon-guixu', 'icon-shishang', 'icon-guanggao', 'icon-yule', 'icon-shexiangji', 'icon-dianshiju'
]

export const categoryList = [
  {
    title: '首页',
    url: '/recommend',
    id: 0,
    topTList: []
  },
  {
    title: '动画',
    url: '/channel',
    id: 1,
    img: require('../../assets/img/category/ic_category_t24.png'),
    topTList: [{
        name: 'MAD·AMV',
        tid: 24
      },
      {
        name: 'MMD·3D',
        tid: 25
      },
      {
        name: '短片·手书·配音',
        tid: 47
      },
      {
        name: '综合',
        tid: 27
      }
    ]
  },
  {
    title: '番剧',
    url: '/channel',
    id: 2,
    img: require('../../assets/img/category/ic_category_t13.png'),
    topTList: [{
        name: '连载动画',
        tid: 33
      },
      {
        name: '完结动画',
        tid: 32
      },
      {
        name: '资讯',
        tid: 51
      },
      {
        name: '官方延伸',
        tid: 152
      }
    ]
  },
  {
    title: '国创',
    url: '/channel',
    id: 3,
    img: require('../../assets/img/category/ic_category_t167.png'),
    topTList: [{
        name: '国产动画',
        tid: 153
      },
      {
        name: '国产原创相关',
        tid: 168
      },
      {
        name: '布袋戏',
        tid: 169
      },
      {
        name: '资讯',
        tid: 170
      }
    ]
  },
  {
    title: '音乐',
    url: '/channel',
    id: 4,
    img: require('../../assets/img/category/ic_category_t3.png'),
    topTList: [{
        name: '原创音乐',
        tid: 28
      },
      {
        name: '翻唱',
        tid: 31
      },
      {
        name: 'VOCALOID·UTAU',
        tid: 30
      },
      {
        name: '演奏',
        tid: 59
      },
      {
        name: '三次元音乐',
        tid: 29
      },
      {
        name: 'OP/ED/OST',
        tid: 54
      },
      {
        name: '音乐选集',
        tid: 130
      }
    ]
  },
  {
    title: '舞蹈',
    url: '/channel',
    id: 5,
    img: require('../../assets/img/category/ic_category_t129.png'),
    topTList: [{
        name: '宅舞',
        tid: 20
      },
      {
        name: '三次元舞蹈',
        tid: 154
      },
      {
        name: '舞蹈教程',
        tid: 156
      }
    ]
  },
  {
    title: '科技',
    url: '/channel',
    id: 6,
    img: require('../../assets/img/category/ic_category_t36.png'),
    topTList: [{
        name: '纪录片',
        tid: 37
      },
      {
        name: '趣味科普人文',
        tid: 124
      },
      {
        name: '野生技术协会',
        tid: 122
      },
      {
        name: '演讲•公开课',
        tid: 39
      },
      {
        name: '星海',
        tid: 96
      },
      {
        name: '数码',
        tid: 95
      },
      {
        name: '机械',
        tid: 98
      }
    ]
  },
  {
    title: '游戏',
    url: '/channel',
    id: 7,
    img: require('../../assets/img/category/ic_category_t4.png'),
    topTList: [{
        name: '单机游戏',
        tid: 17
      },
      {
        name: '电子竞技',
        tid: 171
      },
      {
        name: '手机游戏',
        tid: 172
      },
      {
        name: '网络游戏',
        tid: 65
      },
      {
        name: '桌牌游戏',
        tid: 173
      },
      {
        name: 'GMV',
        tid: 121
      }
    ]
  },
  {
    title: '娱乐',
    url: '/channel',
    id: 8,
    img: require('../../assets/img/category/ic_category_t5.png'),
    topTList: [{
        name: '综艺',
        tid: 71
      },
      {
        name: '明星',
        tid: 137
      },
      {
        name: 'Korea相关',
        tid: 131
      }
    ]
  },
  {
    title: '鬼畜',
    url: '/channel',
    id: 9,
    img: require('../../assets/img/category/ic_category_t119.png'),
    topTList: [{
        name: '鬼畜调教',
        tid: 22
      },
      {
        name: '音MAD',
        tid: 26
      },
      {
        name: '人力VOCALOID',
        tid: 126
      },
      {
        name: '教程演示',
        tid: 127
      }
    ]
  }
]

export const FocusNavList = [ // 排行榜
  {
    title: '全站',
    rid: 0,
    img: require('../../assets/img/category/ic_category_t1.png')
  },
  {
    title: '动画',
    rid: 1
  },
  {
    title: '番剧',
    rid: 33
  },
  {
    title: '国创',
    rid: 167
  },
  {
    title: '电影',
    rid: 23,
    img: require('../../assets/img/category/ic_category_t23.png')
  },
  {
    title: '电视剧',
    rid: 11,
    img: require('../../assets/img/category/ic_category_t11.png')
  },
  {
    title: '音乐',
    rid: 3
  },
  {
    title: '舞蹈',
    rid: 129
  },
  {
    title: '游戏',
    rid: 4
  },
  {
    title: '科技',
    rid: 36
  },
  {
    title: '生活',
    rid: 160,
    img: require('../../assets/img/category/ic_category_t160.png')
  },
  {
    title: '鬼畜',
    rid: 119
  },
  {
    title: '时尚',
    rid: 155,
    img: require('../../assets/img/category/ic_category_t155.png')
  },
  {
    title: '娱乐',
    rid: 5
  }
]
