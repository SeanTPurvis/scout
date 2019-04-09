<template>
<span>
  <div class="home">
    <Webcam/>
  </div>
</span>
</template>

<script>
import Webcam from '@/components/sensors/Webcam.vue'

export default {
  name: 'home',
  components: {
    Webcam
  }
}
</script>
