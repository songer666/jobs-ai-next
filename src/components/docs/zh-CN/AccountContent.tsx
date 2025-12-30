import { accountStyles as styles } from '../styles/account.style';

export default function AccountContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>账户设置</h1>
        <p className={styles.subtitle}>
          管理你的账户信息和个人资料
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>个人信息</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            完善个人信息可以帮助 AI 更好地了解你，从而提供更精准的服务。
            建议填写以下信息：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>姓名</strong> - 用于简历生成</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>当前职位</strong> - 帮助 AI 了解你的背景</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>工作年限</strong> - 用于匹配合适的题目难度</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>技能标签</strong> - 帮助生成更相关的内容</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>教育背景</strong> - 用于简历生成</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>工作经历</strong> - 用于简历生成和面试准备</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>目标职位管理</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            在"目标职位"页面，你可以添加和管理感兴趣的职位。每个职位可以包含：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>职位名称</strong> - 如"前端开发工程师"</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>公司名称</strong> - 目标公司</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>职位描述</strong> - JD 内容，越详细越好</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><strong>技能要求</strong> - 职位要求的技能</span>
            </li>
          </ul>
        </div>
        <div className={styles.note}>
          <p className="font-semibold mb-2">💡 提示</p>
          <p className="text-sm">
            添加详细的职位信息后，AI 模拟面试、简历生成、题目练习等功能都会针对该职位进行优化。
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>订阅管理</h2>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>当前套餐</h3>
          <p className="text-white/80 mb-4">
            在"订阅管理"页面查看和管理你的订阅状态：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>查看当前套餐和剩余使用次数</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>升级到专业版或企业版</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>查看账单历史</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>管理支付方式</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>套餐对比</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/80">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4">功能</th>
                  <th className="text-center py-3 px-4">免费版</th>
                  <th className="text-center py-3 px-4">专业版</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">AI 面试</td>
                  <td className="text-center py-3 px-4">10 次/天</td>
                  <td className="text-center py-3 px-4">50 次/天</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">简历生成</td>
                  <td className="text-center py-3 px-4">20 次/天</td>
                  <td className="text-center py-3 px-4">100 次/天</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4">简历分析</td>
                  <td className="text-center py-3 px-4">20 次/天</td>
                  <td className="text-center py-3 px-4">100 次/天</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">题目练习</td>
                  <td className="text-center py-3 px-4">20 题/天</td>
                  <td className="text-center py-3 px-4">100 题/天</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>安全设置</h2>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>密码修改</h3>
          <p className="text-white/80 mb-4">
            如果你使用邮箱注册，可以在设置页面修改密码。建议定期更换密码以保护账户安全。
          </p>
        </div>

        <div className={styles.warning}>
          <p className="font-semibold mb-2">⚠️ 注意</p>
          <p className="text-sm">
            如果你使用 GitHub 登录，密码由 GitHub 管理，请在 GitHub 上修改密码。
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>数据管理</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            你可以随时管理自己的数据：
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>删除面试记录</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>删除生成的简历</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>删除分析报告</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>删除练习记录</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>常见问题</h2>
        
        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">如何注销账户？</h3>
          <p className="text-white/60">
            如需注销账户，请联系客服。注销后所有数据将被永久删除，无法恢复。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">忘记密码怎么办？</h3>
          <p className="text-white/60">
            在登录页面点击"忘记密码"，通过邮箱验证后即可重置密码。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">如何联系客服？</h3>
          <p className="text-white/60">
            可以通过页脚的联系方式或发送邮件至 support@jobsai.com 联系我们。
          </p>
        </div>
      </div>
    </>
  );
}
