let demoList = {
  status: 200,
  message: 'success',
  data: [{
    id: 1,
    name: 'zs',
    age: '23',
    job: '前端工程师'
  }, {
    id: 2,
    name: 'ww',
    age: '24',
    job: '后端工程师'
  }]
}
let playList = {
  status: 200,
  message: 'success',
  data: {
    playlist: [{
      id: 1,
      name: 'days',
      ar: [{
        uid: 1,
        name: 'AQVOL'
      }],
      dt: '306000'
    }, {
      id: 2,
      name: 'bloodshot freestyle',
      ar: [{
        uid: 2,
        name: 'demxntia'
      }],
      dt: '206000'
    }, {
      id: 3,
      name: '雅俗共赏',
      ar: [{
        uid: 4,
        name: '许嵩'
      }],
      dt: '286000'
    }, {
      id: 3,
      name: '雅俗共赏',
      ar: [{
        uid: 4,
        name: '许嵩'
      }],
      dt: '131000'
    }, {
      id: 3,
      name: '雅俗共赏',
      ar: [{
        uid: 4,
        name: '许嵩'
      }],
      dt: '286000'
    }, {
      id: 3,
      name: '雅俗共赏',
      ar: [{
        uid: 4,
        name: '许嵩'
      }],
      dt: '286000'
    }, {
      id: 3,
      name: '雅俗共赏',
      ar: [{
        uid: 4,
        name: '许嵩'
      }],
      dt: '286000'
    }, {
      id: 3,
      name: '雅俗共赏',
      ar: [{
        uid: 4,
        name: '许嵩'
      }],
      dt: '286000'
    }, {
      id: 3,
      name: '雅俗共赏',
      ar: [{
        uid: 4,
        name: '许嵩'
      }],
      dt: '286000'
    }, {
      id: 3,
      name: '雅俗共赏',
      ar: [{
        uid: 4,
        name: '许嵩'
      }],
      dt: '286000'
    }, {
      id: 3,
      name: '雅俗共赏',
      ar: [{
        uid: 4,
        name: '许嵩'
      }],
      dt: '286000'
    }, {
      id: 3,
      name: '雅俗共赏',
      ar: [{
        uid: 4,
        name: '许嵩'
      }],
      dt: '286000'
    }, {
      id: 3,
      name: '雅俗共赏',
      ar: [{
        uid: 4,
        name: '许嵩'
      }],
      dt: '286000'
    }, {
      id: 3,
      name: '雅俗共赏',
      ar: [{
        uid: 4,
        name: '许嵩'
      }],
      dt: '286000'
    }]
  }
}
let songDetail = {
  status: 200,
  message: 'success',
  data: {
    song: {
      id: 2,
      name: 'bloodshot freestyle',
      ar: [{
        uid: 2,
        name: 'demxntia'
      }],
      dt: '206000',
      music_url: require('../assets/demxntia - bloodshot freestyle.mp3')
    }
  }
}
export default {
  'get|/list/index': demoList,
  'get|/parameter/query': demoList,
  'get|/mock/play/list': playList,
  'get|/mock/play/song': songDetail
}