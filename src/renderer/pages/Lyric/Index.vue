<template>
  <div class="desktop-lyric">
    <div class="playing-lyric" ref="lrc" id="lyric-box">{{current_lyric ? current_lyric : '听见好时光'}}</div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      name: 'DesktopLyric',
      current_lyric: '听见好时光'
    }
  },

  mounted () {
    this.$electron.ipcRenderer.on('updatelyric', (e, message) => {
      this.current_lyric = message
    })
  }

}
</script>

<style lang='scss' scoped>
.desktop-lyric {
  // &:hover{
  //   background: red;
  //   cursor: pointer;
  // }
  .playing-lyric {
    font-size: 40px;
    color: #fff;
    text-shadow: 1px 1px 5px $colorHeader, 1px -1px 3px $colorHeader;
    text-align: center;
    font-family: "Microsoft JhengHei", "明黑", Arial, Helvetica;
    line-height: 60px;
    text-indent: 2px;
    white-space: nowrap;
    -webkit-app-region: drag;
  }
  .control-wrapper {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .control-box {
      -webkit-app-region: no-drag;
      .icon {
        color: #fff;
        font-size: 18px;
        &:hover {
          cursor: pointer;
          text-shadow: 1px 1px 5px $colorHeader, 1px -1px 3px $colorHeader;
        }
      }
    }
  }
}
</style>
<style>
body {
  background: transparent;
}
</style>