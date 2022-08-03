<template>
  <div>
    <el-form
      label-width="60px"
      :rules="rules"
      :model="account"
      ref="ruleFormRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { FormRules, FormInstance } from 'element-plus'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const ruleFormRef = ref<FormInstance>()

    const rules = reactive<FormRules>({
      name: [
        {
          required: true,
          message: '账号不能为空~',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '密码不能为空~',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: '用户名必须是3位以上的字母或者数字~',
          trigger: 'blur'
        }
      ]
    })

    const loginAction = (isKeepPassword: boolean) => {
      ruleFormRef.value?.validate((valid) => {
        // 表单验证
        if (valid) {
          // 判断是否保存密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }

          //开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      ruleFormRef,
      loginAction
    }
  }
})
</script>

<style scoped></style>
