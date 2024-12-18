export interface UserInfo {
  platformUserId: string;
  phoneNumber: string;  // 手机号
  weChatOpenId: string;  // 微信 OpenID
  qqOpenId: string;      // QQ OpenID
  nickname: string;      // 用户昵称
  avatarUrl: string;     // 头像 URL
  userName: string;      // 用户名
  registeredAt: Date;    // 注册时间
  lastLoginAt: Date;     // 最后登录时间
  activityPoints: number;  // 活动积分
  platformRanking: number;  // 头衔
  isActive: boolean;     // 是否激活
  isVerified: boolean;   // 手机号是否已验证
}