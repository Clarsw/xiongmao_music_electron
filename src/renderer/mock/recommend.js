let banner = {
  status: 200,
  message: 'success',
  data: {
    banner: [{
      link_url: 'test',
      cover_url: require('../assets/banner1.jpg'),
      type: 'song'
    }, {
      link_url: 'test',
      cover_url: require('../assets/banner2.jpg'),
      type: 'sheet'
    }, {
      link_url: 'test',
      cover_url: require('../assets/banner3.jpg'),
      type: 'song'
    }, {
      link_url: 'test',
      cover_url: require('../assets/banner4.jpg'),
      type: 'album'
    }, {
      link_url: 'test',
      cover_url: require('../assets/banner5.jpg'),
      type: 'song'
    }]
  }
}
export default {
  'get|/mock/recommend/banner': banner
}