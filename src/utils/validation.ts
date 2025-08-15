// 验证工具函数
export const validationRules = {
  // 用户名验证规则：6-18位，允许大小写字母、横线、下划线和数字
  username: {
    pattern: /^[a-zA-Z0-9_-]{6,18}$/,
    message: "用户名长度在6-18位之间，只能包含大小写字母、数字、横线和下划线"
  },
  
  // 密码验证规则：至少8位，包含至少一个大写字母、小写字母、数字和符号
  password: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
    message: "密码至少8位，必须包含至少一个大写字母、小写字母、数字和符号"
  },
  
  // 邮箱验证规则
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "请输入有效的邮箱地址"
  }
};

// 验证函数
export const validateUsername = (username: string): { isValid: boolean; message: string } => {
  if (!username || username.trim() === '') {
    return { isValid: false, message: "用户名不能为空" };
  }
  
  if (!validationRules.username.pattern.test(username)) {
    return { isValid: false, message: validationRules.username.message };
  }
  
  return { isValid: true, message: "" };
};

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (!password || password.trim() === '') {
    return { isValid: false, message: "密码不能为空" };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: "密码长度至少8位" };
  }
  
  if (!validationRules.password.pattern.test(password)) {
    return { isValid: false, message: validationRules.password.message };
  }
  
  return { isValid: true, message: "" };
};

export const validateEmail = (email: string): { isValid: boolean; message: string } => {
  if (!email || email.trim() === '') {
    return { isValid: false, message: "邮箱不能为空" };
  }
  
  if (!validationRules.email.pattern.test(email)) {
    return { isValid: false, message: validationRules.email.message };
  }
  
  return { isValid: true, message: "" };
};

// 获取密码强度
export const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong'; score: number } => {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;
  
  if (score <= 2) return { strength: 'weak', score };
  if (score <= 4) return { strength: 'medium', score };
  return { strength: 'strong', score };
};

// 密码强度颜色
export const getPasswordStrengthColor = (strength: 'weak' | 'medium' | 'strong') => {
  switch (strength) {
    case 'weak': return '#f44336';
    case 'medium': return '#ff9800';
    case 'strong': return '#4caf50';
    default: return '#757575';
  }
}; 