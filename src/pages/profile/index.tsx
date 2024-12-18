import React, { useState } from 'react'
import { Button, Checkbox, Input, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'
import { useDispatch } from 'react-redux'
import {
  useChangePasswordMutation,
  useCheckPhoneNumberRegisteredMutation,
  useCheckUsernameAvailabilityMutation,
  useLoginMutation,
  useRegisterUserMutation,
  useSendDmCodeMutation,
  useSendSmsCodeMutation,
  useVerifyDmCodeMutation,
  useVerifySmsCodeMutation,
} from '@/api/users'
import { setToken, setUserName } from '@/features/users/userSlice'

function Login() {
  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState(0) // 0: 手机登录/注册, 1: 账号登录/注册
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    verificationCode: '',
    email: '',
  })
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [isPwResetMode, setIsPwResetMode] = useState(false)
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false)
  const [verificationTimeout, setVerificationTimeout] = useState(60)
  const [isUsernameValid, setIsUsernameValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [usernameExists, setUsernameExists] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const [sendSmsCode] = useSendSmsCodeMutation()
  const [verifySmsCode] = useVerifySmsCodeMutation()
  const [sendDmCode] = useSendDmCodeMutation()
  const [verifyDmCode] = useVerifyDmCodeMutation()
  const [registerUser] = useRegisterUserMutation()
  const [login] = useLoginMutation()
  const [checkUsernameAvailability] = useCheckUsernameAvailabilityMutation()
  const [checkPhoneNumberRegistered] = useCheckPhoneNumberRegisteredMutation()
  const [changePassword] = useChangePasswordMutation()

  // 验证函数
  const validateUsername = (username) => {
    const regex = /^[\w-]{3,16}$/
    setIsUsernameValid(regex.test(username))
  }
  const handleClose = () => {
    setForm({
      username: '',
      password: '',
      confirmPassword: '',
      phone: '',
      verificationCode: '',
      email: '',
    })
    setIsPhoneValid(false)
    setIsEmailValid(false)
    setIsRegisterMode(false)
    setUsernameExists(false)
    setIsPwResetMode(false)
    setActiveTab(0)
  }
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{8,}$/i
    setIsPasswordValid(regex.test(password))
  }

  const validatePhone = (phone) => {
    const regex = /^[1-9]\d{10}$/
    setIsPhoneValid(regex.test(phone))
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    setIsEmailValid(regex.test(email))
  }

  const handleInputChange = (name, value) => {
    setForm(prevForm => ({ ...prevForm, [name]: value }))

    if (name === 'phone') {
      validatePhone(value)
    }

    if (name === 'username') {
      validateUsername(value)
    }

    if (name === 'password') {
      validatePassword(value)
    }

    if (name === 'email') {
      validateEmail(value)
    }
  }

  const handleUsernameBlur = async () => {
    if (isUsernameValid && form.username && isRegisterMode) {
      try {
        const response = await checkUsernameAvailability(form.username).unwrap()
        setUsernameExists(!response.available)
      }
      catch (error) {
        console.log(error)
      }
    }
  }

  const handleSendSmsVerificationCode = async () => {
    if (!isPhoneValid)
      return
    try {
      const response = await sendSmsCode(form.phone).unwrap()
      if (response.message) {
        Taro.showToast({ title: '验证码已发送，5分钟有效期，请注意查收！', icon: 'success' })
        setIsVerificationCodeSent(true)
        setVerificationTimeout(60)
        const interval = setInterval(() => {
          setVerificationTimeout((prevTimeout) => {
            if (prevTimeout <= 1) {
              clearInterval(interval)
              setIsVerificationCodeSent(false)
              return 60
            }
            return prevTimeout - 1
          })
        }, 1000)
      }
      else if (response.error) {
        Taro.showToast({ title: response.error || '发送验证码失败，请重试！', icon: 'none' })
        console.error(response.error)
      }
    }
    catch (error) {
      Taro.showToast({ title: '发送验证码失败，请重试！', icon: 'none' })
      console.error(error)
    }
  }

  const handleSendDmVerificationCode = async () => {
    if (!isUsernameValid) {
      Taro.showToast({ title: '用户名格式不正确，请检查！', icon: 'none' })
      return
    }

    if (!isEmailValid) {
      Taro.showToast({ title: '邮箱格式不正确，请检查！', icon: 'none' })
      return
    }

    try {
      const response = await sendDmCode({
        userName: form.username,
        email: form.email,
      }).unwrap()

      if (response.message) {
        Taro.showToast({ title: '验证码已发送，5分钟有效期，请注意查收！', icon: 'success' })
        setIsVerificationCodeSent(true)
        setVerificationTimeout(60)
        const interval = setInterval(() => {
          setVerificationTimeout((prevTimeout) => {
            if (prevTimeout <= 1) {
              clearInterval(interval)
              setIsVerificationCodeSent(false)
              return 60
            }
            return prevTimeout - 1
          })
        }, 1000)
      }
      else if (response.error) {
        Taro.showToast({ title: response.error || '发送验证码失败，请重试！', icon: 'none' })
        console.error(response.error)
      }
    }
    catch (error) {
      Taro.showToast({ title: error.data.error || '发送验证码失败，请重试！', icon: 'none' })
      console.error(error)
    }
  }

  const handleAgreeChange = () => {
    setAgreed(!agreed)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    if (!agreed) {
      Taro.showToast({ title: '请先同意《黑沙盒子》用户使用条款', icon: 'none' })
      setIsSubmitting(false)
      return
    }

    try {
      if (isPwResetMode) {
        if (!isEmailValid) {
          Taro.showToast({ title: '邮箱格式不正确', icon: 'none' })
          setIsSubmitting(false)
          return
        }
        const { token, verificationResult } = await verifyDmCode({
          userName: form.username,
          email: form.email,
          code: form.verificationCode,
        }).unwrap()

        if (verificationResult === 'true') {
          const response = await changePassword({
            token,
            newPassword: form.confirmPassword,
          }).unwrap()

          if (response.message) {
            Taro.showToast({ title: response.message, icon: 'success' })
            handleClose()
          }
          return
        }

        Taro.showToast({ title: '验证码不正确，请重新确认！', icon: 'none' })
        return
      }

      if (activeTab === 0 && isPhoneValid && form.verificationCode) {
        // 手机登录/注册逻辑
        const isAvailable = await checkPhoneNumberRegistered({ phoneNumber: form.phone }).unwrap()

        const verified = await verifySmsCode({ phoneNumber: form.phone, code: form.verificationCode }).unwrap()

        if (!verified) {
          Taro.showToast({ title: '验证码不正确，请重试！', icon: 'none' })
          return
        }

        if (isAvailable) {
          await registerUser({
            phoneNumber: form.phone,
          }).unwrap()
          Taro.showToast({ title: '注册成功', icon: 'success' })
        }

        const { token, userName } = await login({
          phoneNumber: form.phone,
        }).unwrap()
        dispatch(setUserName(form.phone))
        dispatch(setToken(token))
        Taro.showToast({ title: `登录成功，欢迎 ${form.phone}！`, icon: 'success' })
        handleClose()
      }
      else if (
        activeTab === 1
        && form.username
        && form.password.length >= 8
        && (!isRegisterMode || (form.password === form.confirmPassword && !usernameExists))
      ) {
        if (isRegisterMode) {
          if (!isEmailValid) {
            Taro.showToast({ title: '邮箱格式不正确', icon: 'none' })
            setIsSubmitting(false)
            return
          }
          await registerUser({
            userName: form.username,
            password: form.password,
            email: form.email,
          }).unwrap()
          Taro.showToast({ title: '注册成功', icon: 'success' })
        }

        const { token } = await login({
          userName: form.username,
          password: form.password,
        }).unwrap()
        dispatch(setUserName(form.username))
        dispatch(setToken(token))
        Taro.showToast({ title: `登录成功，欢迎 ${form.username}！`, icon: 'success' })
        console.log(213123)
        handleClose()
      }
    }
    catch (error) {
      Taro.showToast({ title: '登录或注册失败', icon: 'none' })
      console.error('Error during login/registration:', error)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className="login-container">
      <View className="login-card">
        <Text className="login-title">
          {isPwResetMode ? '重置密码' : isRegisterMode ? '注册' : '登录'}
        </Text>

        {!isPwResetMode && (
          <View className="login-tabs">
            <Button
              onClick={() => setActiveTab(0)}
              className={`login-tab ${activeTab === 0 ? 'active' : ''}`}
            >
              手机登录/注册
            </Button>
            <Button
              onClick={() => setActiveTab(1)}
              className={`login-tab ${activeTab === 1 ? 'active' : ''}`}
            >
              账号登录/注册
            </Button>
          </View>
        )}

        <View className="login-form">
          {isPwResetMode
            ? (
                <>
                  <Input
                    placeholder="用户名"
                    value={form.username}
                    onInput={e => handleInputChange('username', e.detail.value)}
                    className="login-input"
                  />
                  <Input
                    placeholder="邮箱"
                    value={form.email}
                    onInput={e => handleInputChange('email', e.detail.value)}
                    className="login-input"
                  />
                  <View className="flex">
                    <Input
                      placeholder="验证码"
                      value={form.verificationCode}
                      onInput={e => handleInputChange('verificationCode', e.detail.value)}
                      className="login-input"
                    />
                    <Button
                      onClick={handleSendDmVerificationCode}
                      className={`send-code-button ${isVerificationCodeSent ? 'disabled' : ''}`}
                      disabled={isVerificationCodeSent}
                    >
                      {isVerificationCodeSent ? `${verificationTimeout}s` : '发送验证码'}
                    </Button>
                  </View>
                  <Input
                    type="password"
                    placeholder="新密码"
                    value={form.password}
                    onInput={e => handleInputChange('password', e.detail.value)}
                    className="login-input"
                  />
                  <Input
                    type="password"
                    placeholder="确认新密码"
                    value={form.confirmPassword}
                    onInput={e => handleInputChange('confirmPassword', e.detail.value)}
                    className="login-input"
                  />
                </>
              )
            : activeTab === 0
              ? (
                  <>
                    <Input
                      placeholder="手机号"
                      value={form.phone}
                      onInput={e => handleInputChange('phone', e.detail.value)}
                      className="login-input"
                      type="number"
                      maxLength={11}
                    />
                    <View className="flex">
                      <Input
                        placeholder="验证码"
                        value={form.verificationCode}
                        onInput={e => handleInputChange('verificationCode', e.detail.value)}
                        className="login-input"
                        type="number"
                        maxLength={6}
                      />
                      <Button
                        onClick={handleSendSmsVerificationCode}
                        className={`send-code-button ${isVerificationCodeSent ? 'disabled' : ''}`}
                        disabled={!isPhoneValid || isVerificationCodeSent}
                      >
                        {isVerificationCodeSent ? `${verificationTimeout}s` : '发送验证码'}
                      </Button>
                    </View>
                  </>
                )
              : (
                  <>
                    <Input
                      placeholder="用户名"
                      value={form.username}
                      onInput={e => handleInputChange('username', e.detail.value)}
                      onBlur={handleUsernameBlur}
                      className="login-input"
                    />
                    {isRegisterMode && !isUsernameValid && form.username && (
                      <Text className="error-text">用户名格式不正确，仅允许字母、数字、下划线和短横线，长度为3到16个字符</Text>
                    )}
                    {isRegisterMode && usernameExists && (
                      <Text className="error-text">用户名已存在</Text>
                    )}
                    {isRegisterMode && (
                      <Input
                        placeholder="邮箱"
                        value={form.email}
                        onInput={e => handleInputChange('email', e.detail.value)}
                        className="login-input"
                      />
                    )}
                    {isRegisterMode && !isEmailValid && form.email && (
                      <Text className="error-text">邮箱格式不正确</Text>
                    )}
                    <Input
                      type="password"
                      placeholder="密码"
                      value={form.password}
                      onInput={e => handleInputChange('password', e.detail.value)}
                      className="login-input"
                    />
                    {isRegisterMode && (
                      <Input
                        type="password"
                        placeholder="确认密码"
                        value={form.confirmPassword}
                        onInput={e => handleInputChange('confirmPassword', e.detail.value)}
                        className="login-input"
                      />
                    )}
                    {isRegisterMode && form.password !== form.confirmPassword && (
                      <Text className="error-text">两次输入的密码不一致</Text>
                    )}
                    {isRegisterMode && !isPasswordValid && (
                      <Text className="error-text">密码必须至少包含8位字母与数字组合</Text>
                    )}
                  </>
                )}
        </View>

        <Button
          onClick={handleSubmit}
          className="login-button"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? '处理中...'
            : isPwResetMode
              ? '重置密码'
              : isRegisterMode
                ? '注册'
                : '登录'}
        </Button>

        {!isPwResetMode && (
          <View className="login-links">
            {isRegisterMode
              ? (
                  <Text className="login-link">
                    已有账号？
                    <Text
                      onClick={() => setIsRegisterMode(false)}
                      className="login-link-highlight"
                    >
                      登录
                    </Text>
                  </Text>
                )
              : (
                  <Text className="login-link">
                    没有账号？
                    <Text
                      onClick={() => setIsRegisterMode(true)}
                      className="login-link-highlight"
                    >
                      注册
                    </Text>
                  </Text>
                )}
            <Text
              onClick={() => setIsPwResetMode(!isPwResetMode)}
              className="login-link-highlight"
            >
              {isPwResetMode ? '返回登录' : '忘记密码？'}
            </Text>
          </View>
        )}

        {/* 同意条款 */}
        <View className="agreement">
          <Checkbox
            className="agreement-checkbox"
            checked={agreed}
            value="agreed"
            onClick={handleAgreeChange}
          />
          <Text className="agreement-text">
            点击登录、注册即表示您已阅读并同意
            <Text
              onClick={() => Taro.navigateTo({ url: '/pages/tos/Tos' })}
              className="agreement-link"
            >
              《黑沙盒子》用户使用条款
            </Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Login
