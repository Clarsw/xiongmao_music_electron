<template>
  <!-- <div>12</div> -->
  <div class="c-sheet-item" @click="itemClick">
    <div class="cover">
      <img :src="item.cover_url ? item.cover_url :require('../../../assets/sheetcover.jpg')" />
      <div class="bg hover-bg">
        <icon type="play1" @click.native="playClick" onclick="event.cancelBubble = true"></icon>
      </div>
    </div>
    <div class="info">
      <div class="title hover-color">{{item.name}}</div>
      <div class="title hover-color">{{item.ar}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    itemClick () {
      this.$router.push({ name: 'album', query: { id: this.item.aid } })
    },
    playClick () {
      this.$store.commit('SET_PLAYER_DATA', { is_play: false })
      this.$store.dispatch('playAlbum', this.item.aid)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-sheet-item {
  .cover {
    cursor: pointer;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0);
      .panda-icon {
        font-size: 30px;
        color: white;
        opacity: 0;
        position: absolute;
        bottom: 5px;
        right: 5px;
        cursor: pointer;
        transition: color 0.8s linear;
      }
    }
    .bg:hover {
      background: rgba(0, 0, 0, 0.3);
      .panda-icon {
        transition: color 0.3s linear;
        opacity: 1;
        color: white;
      }
      .panda-icon:hover {
        color: #51abf9;
      }
    }
    .play-count {
      position: absolute;
      left: 8px;
      bottom: 5px;
      color: white;
      font-size: 13px;
    }
  }
  .info {
    height: 60px;
    padding: 10px 0;
    overflow: hidden;
    .title {
      font-size: 13px;
      color: $colorText2;
      line-height: 20px;
      height: 20px;
      overflow: hidden;
      cursor: pointer;
    }
    .title:hover {
      color: #000000;
    }
  }
}

.c-sheet-item:first-child {
  margin-left: 0;
}
</style>
