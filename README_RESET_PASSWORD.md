# 找回密码功能说明

## 概述

根据新的API规范，我们实现了新的找回密码功能。用户可以通过邮箱和授权令牌来重置密码。

## API接口

### 发送验证码
- **请求方法**: GET
- **接口地址**: `/User/pwd/reset`
- **请求参数**:
  - `email` (string, 必需): 用户邮箱地址
- **请求头**:
  - `accept`: `application/json, text/plain, */*`
  - `accept-language`: `zh-CN,zh;q=0.9`
  - `content-type`: `application/json`
  - `priority`: `u=1, i`
  - `Authorization`: `Bearer {token}` (必需)

### 响应格式
```json
{
    "id": "string",
    "message": "string"
}
```

## 功能特点

1. **邮箱验证**: 使用正则表达式验证邮箱格式
2. **实时验证**: 输入时实时验证邮箱格式
3. **错误处理**: 完善的错误提示和成功反馈
4. **响应式设计**: 支持浅色和深色主题
5. **动画效果**: 使用Framer Motion提供流畅的动画

## 页面路由

- **路径**: `/send-verification-code`
- **组件**: `SendEmail` (复用现有组件)
- **功能**: 发送验证码页面

## 使用流程

1. 用户点击"忘记密码"链接
2. 跳转到发送验证码页面
3. 输入邮箱地址和验证码
4. 系统验证信息并调用API
5. 显示成功或错误消息
6. 成功后显示确认对话框

## 技术实现

### 组件结构
- 复用现有的 `SendEmail` 组件
- 支持不同的服务函数 (`sendService`)
- 使用Material-UI组件库
- 支持浅色/深色主题切换
- 响应式设计

### 验证逻辑
- 邮箱格式验证
- 必填字段验证
- 实时验证反馈

### API集成
- 使用新的 `sendVerificationCode` 函数
- 完整的错误处理
- 用户友好的提示信息
- 支持API返回的消息显示

## 更新内容

### 新增文件
- `src/apis/apis.ts`: 新增 `sendVerificationCode` API函数
- `src/apis/model.ts`: 新增 `SendVerificationCodeResponse` 接口类型

### 修改文件
- `src/Route.tsx`: 添加新的路由配置 `/send-verification-code`
- `src/views/HomePage.tsx`: 更新忘记密码链接
- `src/views/Login.tsx`: 更新忘记密码链接
- `src/views/SendEmail.tsx`: 增强错误处理和成功反馈

## 用户体验

1. **简洁的界面**: 清晰的表单布局和提示
2. **实时反馈**: 输入验证的即时反馈
3. **错误处理**: 友好的错误提示信息
4. **成功反馈**: 清晰的成功状态和消息显示
5. **主题支持**: 自动适应系统主题偏好

## 安全考虑

1. **邮箱验证**: 严格的邮箱格式验证
2. **验证码验证**: 需要有效的验证码
3. **API安全**: 使用Bearer Token认证
4. **错误信息**: 不暴露敏感的系统信息

## 兼容性

- 支持现代浏览器
- 响应式设计，适配各种屏幕尺寸
- 支持浅色和深色主题
- 使用TypeScript确保类型安全

## 注意事项

1. **API地址**: 当前使用 `https://api.corona.studio/User/pwd/reset`
2. **认证方式**: 需要有效的Bearer Token
3. **响应处理**: 支持API返回的message字段显示
4. **错误处理**: 保持与现有验证码系统的兼容性 