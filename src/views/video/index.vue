<template>
  <div>
    <el-button type="primary" @click="joinChat">加入房间</el-button>
    <el-button type="primary" @click="leaveChat">退出房间</el-button>
    <div id="huaBu" class="one" />
    <div id="jieShou" class="one" />
  </div>
</template>

<script>
import HRTC from 'hrtc'
import { Loading } from 'element-ui'
let config = null
let client = null
let otherStream = null
let stream = null
export default {
  name: 'Splt',
  data() {
    return {
      m: {},
      userId: this.$store.getters.token,
      userName: this.$store.getters.name
    }
  },
  created() {

  },
  async mounted() {
    console.log(HRTC.VERSION)
    const isMatch = HRTC.checkSystemRequirements()
    if (isMatch) {
      console.log('兼容')
    } else {
      console.log('不兼容')
    }
    const loadingInstance = Loading.service({ text: '加载中', spinner: 'el-icon-loading', lock: true })

    await this.$store.dispatch('user/getSpltInfo').then((res) => {
      const { code, msg, data } = res
      if (code > 0) {
        const m = data
        this.m = m
        config = { appId: this.m.appId, appKey: this.m.appKey }
        client = HRTC.createClient(config)

        // console.log(data)
        loadingInstance.close()
      } else {
        loadingInstance.close()
        this.$message({
          showClose: true,
          message: msg
        })
      }
    }).catch(() => {
      loadingInstance.close()
    })
    // 当收到服务器发送的“stream-added”事件通知时，可以订阅远端媒体。
    client.on('stream-added', (event) => {
      const stream = event.stream
      client.subscribe(stream, { video: true, audio: true })
    })
    // 订阅完成之后，本端会收到“stream-subscribed”事件通知，可设置对端窗口，播放对端音视频。
    client.on('stream-subscribed', (event) => {
      const stream = event.stream
      otherStream = stream
      stream.play('jieShou', { objectFit: 'contain', muted: false })
    })
    // 当远端离开房间，本端会收到“peer-leave”事件通知，清理远端用户的资源。
    client.on('peer-leave', (event) => {
      // just do something…
      this.$message({
        showClose: true,
        message: '有人离开了'
      })
      client.unsubscribe(otherStream)
    })
    // 远端用户退出，本端同时会收到“stream-removed”事件通知，可在事件处理函数中，关掉视频窗口。
    client.on('stream-removed', (event) => {
      this.$message({
        showClose: true,
        message: '有人退出了'
      })
      event.stream.close()
    })
  },
  destroyed() {
    this.$message({
      showClose: true,
      message: '离开页面'
    })
    stream.close()
    otherStream.close()
    client.leave()
  },
  methods: {
    joinChat: async function() {
      const option = { userId: this.userId, userName: this.userName, signature: this.m.signature, ctime: this.m.ctime, role: this.m.role }
      try {
        await client.join(this.m.roomId, option)
        console.log('加入成功')
        stream = HRTC.createStream({ audio: true, microphoneId: null, video: true, cameraId: null })
        // 创建本地流并发布。
        stream.initialize().then(() => {
          client.publish(stream)
          stream.play('huaBu', { muted: false }) // 播放本地流
        })
      } catch (e) {
        console.log('加入失败')
      }
    },
    leaveChat: function() {
      stream.close()
      otherStream.close()
      client.leave()
    }
  }
}
</script>

<style scoped>
    .one{
        border: 1px solid red;
        width: 200px;
        height: 200px;
        margin: 0 auto;
    }

</style>
