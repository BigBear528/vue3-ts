<template>
  <div>
    <el-form label-width="60px" ref="ruleFormRef">
      <el-form-item label="手机号">
        <el-input v-model="phone.number" />
      </el-form-item>

      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phone = reactive({
      number: '',
      code: ''
    })

    return {
      phone
    }
  }
})
</script>

<style scoped lang="scss">
.verify-code {
  display: flex;

  .code-btn {
    margin-left: 5px;
  }
}
</style>
