import request from './request'

const url = {
  demoList: '/parameter/query',
  playListDetail: '/mock/play/list',
  // playSong: '/mock/play/song',
  // banner: '/mock/recommend/banner',
  // -----------------------sheet-------------------------------------
  sheetRecommend: '/mock/sheet/recommend',
  sheetList: '/mock/sheet/list',
  // sheetDetail: '/mock/sheet/detail',
  sheetCates: '/mock/sheet/cates',
  // ------------------------other------------------
  banner: 'http://localhost:8090/music/bar/all',
  recommend: 'http://localhost:8090/music/recommend',
  // --------------------------user---------------------------------------
  register: 'http://localhost:8090/music/account/register',
  login: 'http://localhost:8090/music/account/login',
  checkLogin: 'http://localhost:8090/music/account/checklogin',
  logout: 'http://localhost:8090/music/account/logout',
  changeAvatar: 'http://localhost:8090/music/account/avatar',
  editAccount: 'http://localhost:8090/music/account/edit',
  userInfo: 'http://localhost:8090/music/account/userinfo',

  // ------------------------------cates-------------------
  allCates: 'http://localhost:8090/music/cates/all',
  // ---------------------------------singer-------------------
  singerApply: 'http://localhost:8090/music/singer/apply',
  singerInfo: 'http://localhost:8090/music/singer/singerinfo',
  allSinger: 'http://localhost:8090/music/singer/searchall',
  // ---------------------------------album---------------
  singerAlbum: 'http://localhost:8090/music/album/singer',
  albumApply: 'http://localhost:8090/music/album/apply',
  newestAlbum: 'http://localhost:8090/music/album/newest',
  albumPlay: 'http://localhost:8090/music/album/play',
  albumDetail: 'http://localhost:8090/music/album/detail',
  allAlbums: 'http://localhost:8090/music/album/searchall',
  albumData: 'http://localhost:8090/music/album/info',
  albumUpdate: 'http://localhost:8090/music/album/update',
  albumDelete: 'http://localhost:8090/music/album/delete',

  // ----------------------------song---------------------------
  newSong: 'http://localhost:8090/music/song/new',
  hotSong: 'http://localhost:8090/music/song/hotest',
  playSong: 'http://localhost:8090/music/song/play',
  speedSong: 'http://localhost:8090/music/song/speedest',
  allSong: 'http://localhost:8090/music/song/searchall',
  likeMusic: 'http://localhost:8090/music/song/like',

  // --------------------------------sheet--------------------------
  acccountSheet: 'http://localhost:8090/music/sheet/account',
  addSheet: 'http://localhost:8090/music/sheet/add',
  collectSong: 'http://localhost:8090/music/sheet/collect',
  sheetDetail: 'http://localhost:8090/music/sheet/detail',
  sheetPlay: 'http://localhost:8090/music/sheet/play',
  allSheet: 'http://localhost:8090/music/sheet/all',
  editSheet: 'http://localhost:8090/music/sheet/edit',
  searchSheet: 'http://localhost:8090/music/sheet/searchall',
  cancelCollect: 'http://localhost:8090/music/sheet/cancelcollect',
  deleteSheet: 'http://localhost:8090/music/sheet/delete',
  // ------------------------------------collect---------------
  collectSheet: 'http://localhost:8090/music/collect/sheet',
  collectSheets: 'http://localhost:8090/music/collect/allsheet',
  collectAlbum: 'http://localhost:8090/music/collect/album',
  collectAlbums: 'http://localhost:8090/music/collect/allalbum',
  // ------------------------------------lyric--------------------
  lyric: 'http://localhost:8090/music/lyric'
}

const api = {
  // getSongDetail: (params) =>
  //   request({
  //     method: 'get',
  //     url: url.playSong,
  //     params
  //   }),
  getLyric: (params) =>
    request({
      method: 'get',
      url: url.lyric,
      params
    }),
  getPlaylistDetail: (params) =>
    request({
      method: 'get',
      url: url.playListDetail,
      params
    }),

  getBanner: () =>
    request({
      method: 'get',
      url: url.banner
    }),

  getRecommendSheet: (params) =>
    request({
      method: 'get',
      url: url.sheetRecommend,
      params
    }),
  getRecommend: () => request({
    method: 'get',
    url: url.recommend
  }),

  getSheetDetail: (params) =>
    request({
      method: 'get',
      url: url.sheetDetail,
      params
    }),

  getSheetCates: () =>
    request({
      method: 'get',
      url: url.allCates
    }),

  testNode: () =>
    request({
      method: 'get',
      url: 'http://localhost:8090/music/getData'
    }),

  // ---------------------------user--------------------------
  register: (data) =>
    request({
      method: 'post',
      url: url.register,
      data
    }),
  login: (data) =>
    request({
      method: 'post',
      url: url.login,
      data
    }),
  checkLogin: () =>
    request({
      method: 'get',
      url: url.checkLogin
    }),
  logout: () =>
    request({
      method: 'get',
      url: url.logout
    }),
  // upload() {
  //   request({
  //     method: 'post',
  //     url: 'http://localhost:8090/music/upload'
  //   })
  // }
  changeAvatar: (data) =>
    request({
      method: 'post',
      url: url.changeAvatar,
      data
    }),
  editAccount: (data) =>
    request({
      method: 'post',
      url: url.editAccount,
      data
    }),
  getUserInfo: (params) =>
    request({
      method: 'get',
      url: url.userInfo,
      params
    }),

  // ---------------------------------cates----------------------------
  getAllCates: () =>
    request({
      method: 'get',
      url: url.allCates
    }),
  // ---------------------singer----------------------------------
  singerApply: (data) =>
    request({
      method: 'post',
      url: url.singerApply,
      data
    }),
  getSingerInfo: (params) =>
    request({
      method: 'get',
      url: url.singerInfo,
      params
    }),
  getAllSingers: (params) =>
    request({
      method: 'get',
      url: url.allSinger,
      params
    }),
  // ------------------album----------------------
  albumDelete: (data) => request({
    method: 'post',
    url: url.albumDelete,
    data
  }),
  albumUpdate: (data) => request({
    method: 'post',
    url: url.albumUpdate,
    data
  }),
  getAlbumData: (params) => request({
    method: 'get',
    url: url.albumData,
    params
  }),
  getSingerAlbum: (params) => request({
    method: 'get',
    url: url.singerAlbum,
    params
  }),

  albumApply: (data) => request({
    method: 'post',
    url: url.albumApply,
    data
  }),
  newestAlbum: (params) => request({
    method: 'get',
    url: url.newestAlbum,
    params
  }),

  getNewSong: () => request({
    method: 'get',
    url: url.newSong
  }),
  getHotSong: () => request({
    method: 'get',
    url: url.hotSong
  }),
  getSpeedSong: () => request({
    method: 'get',
    url: url.speedSong
  }),

  getSongDetail: (params) =>
    request({
      method: 'get',
      url: url.playSong,
      params
    }),

  getPlayAlbumList: (params) => request({
    method: 'get',
    url: url.albumPlay,
    params
  }),
  getAlbumDetail: (params) => request({
    method: 'get',
    url: url.albumDetail,
    params
  }),
  getAllAlbums: (params) => request({
    method: 'get',
    url: url.allAlbums,
    params
  }),
  // --------------------sheet--------------
  deleteSheet: (data) => request({
    method: 'post',
    url: url.deleteSheet,
    data
  }),
  cancelCollect: (data) => request({
    method: 'post',
    url: url.cancelCollect,
    data
  }),
  editSheet: (data) => request({
    method: 'post',
    url: url.editSheet,
    data
  }),
  accountSheet: (params) => request({
    method: 'get',
    url: url.acccountSheet,
    params
  }),
  addSheet: (data) => request({
    method: 'post',
    url: url.addSheet,
    data
  }),
  collectSong: (data) => request({
    method: 'post',
    url: url.collectSong,
    data
  }),
  getPlaySheetList: (params) => request({
    method: 'get',
    url: url.sheetPlay,
    params
  }),
  getAccountSheet: (params) => request({
    method: 'get',
    url: url.acccountSheet,
    params
  }),
  allSheet: (params) => request({
    method: 'get',
    url: url.allSheet,
    params
  }),
  getSearchSheets: (params) => request({
    method: 'get',
    url: url.searchSheet,
    params
  }),
  // -------------------------------collect--------------------
  collectSheet: (data) => request({
    method: 'post',
    url: url.collectSheet,
    data
  }),
  collectAlbum: (data) => request({
    method: 'post',
    url: url.collectAlbum,
    data
  }),
  getCollectSheet: (params) => request({
    method: 'get',
    url: url.collectSheets,
    params
  }),
  getCollectAlbum: (params) => request({
    method: 'get',
    url: url.collectAlbums,
    params
  }),
  // ----------------------------------------song----------------
  getAllSongs: (params) => request({
    method: 'get',
    url: url.allSong,
    params
  }),
  likeMusic: (data) => request({
    method: 'post',
    url: url.likeMusic,
    data
  })
}

export default api