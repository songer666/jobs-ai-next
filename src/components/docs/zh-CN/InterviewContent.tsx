import { interviewStyles as styles } from '../styles/interview.style';

export default function InterviewContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>AI 模拟面试</h1>
        <p className={styles.subtitle}>
          与智能 AI 面试官进行真实对话练习，提升面试技巧和自信心
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>功能介绍</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            AI 模拟面试功能使用先进的自然语言处理技术，模拟真实的面试场景。AI 面试官会根据你选择的目标职位，
            提出相关的面试问题，并对你的回答进行实时分析和反馈。
          </p>
          <p className="text-white/80">
            这个功能可以帮助你熟悉面试流程、提升回答技巧、增强自信心，让你在真实面试中表现更出色。
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>核心特性</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎯 个性化问题</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>根据目标职位自动生成相关面试问题</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>涵盖技术能力、项目经验、软技能等多个维度</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>难度自适应，根据你的回答调整问题难度</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>💬 实时对话</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>支持文字和语音两种对话方式</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>AI 面试官会根据你的回答进行追问</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>模拟真实面试的互动体验</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📊 即时反馈</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>每个回答都会获得即时评分和建议</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>指出回答中的优点和改进空间</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>提供更好的回答示例</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📈 详细报告</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>面试结束后生成完整的分析报告</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>包含总体评分、各维度表现、改进建议</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>可以查看历史面试记录，追踪进步</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>使用步骤</h2>
        <div className={styles.card}>
          <ol className="space-y-4 text-white/80">
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">选择目标职位</p>
                <p className="text-white/60 text-sm">在职位列表中选择一个已添加的职位，或点击"添加新职位"创建新的目标职位</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">开始面试</p>
                <p className="text-white/60 text-sm">点击"开始面试"按钮，AI 面试官会向你问好并开始提问</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">回答问题</p>
                <p className="text-white/60 text-sm">认真思考并回答每个问题，尽量详细和具体。可以使用文字输入或语音输入</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">查看反馈</p>
                <p className="text-white/60 text-sm">每次回答后，AI 会给出评分和建议。仔细阅读反馈，了解自己的表现</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">5</span>
              <div>
                <p className="font-semibold mb-1">结束面试</p>
                <p className="text-white/60 text-sm">完成所有问题后，点击"结束面试"查看完整的分析报告</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>使用技巧</h2>
        
        <div className={styles.note}>
          <p className="font-semibold mb-2">💡 回答技巧</p>
          <ul className="space-y-2 text-sm">
            <li>• 使用 STAR 法则（情境、任务、行动、结果）组织回答</li>
            <li>• 提供具体的数据和案例，而不是泛泛而谈</li>
            <li>• 保持回答简洁明了，避免冗长</li>
            <li>• 展现你的思考过程和解决问题的能力</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>准备建议</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>在面试前，先完善职位信息，包括职位描述、要求等</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>准备好你的项目经历和成就，方便在回答时引用</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>找一个安静的环境，确保不被打扰</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>把每次模拟面试都当作真实面试来对待</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>常见问题</h2>
        
        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">一次面试大约需要多长时间？</h3>
          <p className="text-white/60">
            通常一次完整的模拟面试需要 15-30 分钟，具体时间取决于问题数量和你的回答详细程度。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">可以中途暂停面试吗？</h3>
          <p className="text-white/60">
            可以。你可以随时关闭页面，下次进入时会从上次的位置继续。但建议一次性完成，以获得更好的体验。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">面试记录会保存多久？</h3>
          <p className="text-white/60">
            所有面试记录都会永久保存，你可以随时在历史记录中查看和复习。
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">免费版有使用限制吗？</h3>
          <p className="text-white/60">
            免费版每日可进行 3 次模拟面试。升级到专业版可解锁无限次使用。
          </p>
        </div>
      </div>
    </>
  );
}
