let recommendList = {
  status: 200,
  message: 'success',
  data: {
    sheet_list: [{
      id: 1,
      play_count: 1999924158,
      name: '纯音乐',
      cover_url: require('../assets/sheetcover.jpg')
    }, {
      id: 1,
      play_count: 199,
      name: '寂静|来自森林的声音',
      cover_url: require('../assets/sheetcover.jpg')
    }, {
      id: 1,
      play_count: 199,
      name: '民谣|她的家乡',
      cover_url: require('../assets/sheetcover.jpg')
    }, {
      id: 1,
      play_count: 199,
      name: '叙事谣',
      cover_url: require('../assets/sheetcover1.png')
    }, {
      id: 1,
      play_count: 199,
      name: '三月的雨，春天的云',
      cover_url: require('../assets/sheetcover.jpg')
    }, {
      id: 1,
      play_count: 199,
      name: '隔壁老樊与解忧',
      cover_url: require('../assets/sheetcover.jpg')
    }, {
      id: 1,
      play_count: 199,
      name: '冷门亦惊艳｜聆听女声与电音的心动交汇',
      cover_url: require('../assets/sheetcover.jpg')
    }, {
      id: 1,
      play_count: 199,
      name: '喜欢到循环播放的宝藏歌曲呀',
      cover_url: require('../assets/sheetcover.jpg')
    }, {
      id: 1,
      play_count: 199,
      name: '将清新人声完美融入的优质电音盘点',
      cover_url: require('../assets/sheetcover.jpg')
    }, {
      id: 1,
      play_count: 199,
      name: '史诗级节奏游戏战歌',
      cover_url: require('../assets/sheetcover.jpg')
    }]
  }
}

let sheet = {
  status: 200,
  message: 'success',
  data: {
    sheet: {
      id: 1,
      cover_url: require('../assets/sheetcover1.png'),
      name: '收藏的音乐',
      desc: '这是个简介',
      creator: {
        uid: '1',
        avatar_url: require('../assets/banner3.jpg'),
        nick_name: 'clarsw'
      },
      tracks: [{
        sid: '1',
        ar: [{
          uid: 1,
          name: 'AQVOL'
        }],
        dt: '306000',
        name: 'days',
        al: {
          id: 35834578,
          name: 'Grind Me Down (Jawster Remix)'
        }
      }, {
        sid: 2,
        name: 'bloodshot freestyle',
        ar: [{
          uid: 2,
          name: 'demxntia'
        }],
        dt: '206000',
        al: {
          id: 35834578,
          name: 'Grind  Down (Jawster Remix)'
        }
      }, {
        sid: 3,
        name: '雅俗共赏',
        ar: [{
          uid: 4,
          name: '许嵩'
        }],
        dt: '286000',
        al: {
          id: 35834578,
          name: 'Grind Me (Jawster Remix)'
        }
      }]
    }
  }
}

let cates = {
  status: 200,
  message: 'success',
  data: {
    cates: [{
      name: '语种',
      cate: ['华语', '欧美', '日语', '韩语', '日语']
    }, {
      name: '风格',
      cate: ['流行', '摇滚', '民谣', '电子', '舞曲', '说唱', '轻音乐', '爵士', '乡村', 'R&B', '古典', '民族', '英伦', '金属', '朋克', '蓝调', '拉丁', '古风', '后摇']
    }, {
      name: '场景',
      cate: ['清晨', '夜晚', '学习', '工作', '午休', '地铁', '驾车', '运动', '旅行', '散步', '酒吧']
    }, {
      name: '情感',
      cate: ['怀旧', '清新', '浪漫', '伤感', '治愈', '放松', '孤独', '感动', '兴奋', '快乐', '安静', '思念']
    }, {
      name: '主题',
      cate: ['影视原声', 'ACG', '儿童', '校园', '游戏', '网络歌曲', '翻唱', '经典', '榜单', '吉他', '钢琴']
    }]
  }
}
export default {
  'get|/mock/sheet/recommend': recommendList,
  'get|/mock/sheet/detail': sheet,
  'get|/mock/sheet/cates': cates
}