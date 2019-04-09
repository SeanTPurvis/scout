<template>
    <div class="camera-modal">
        <video ref="video" class="camera-stream"/>
    </div>
</template>
<script>
  export default {
    mounted () {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(mediaStream => {
          this.$refs.video.srcObject = mediaStream
          this.$refs.video.play()
        })
        .catch(error => console.log('getUserMedia() error:', error))
    }
  }
</script>

<style scoped>
    .camera-modal {
        width: 100%;
        height: 75%;
        top: 30;
        left: 0;
        position: absolute;
        background-color: white;
        z-index: 10;
    }
    .camera-stream {
        width: 100%;
        max-height: 100%;
    }
</style>
