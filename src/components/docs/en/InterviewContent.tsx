import { interviewStyles as styles } from '../styles/interview.style';

export default function InterviewContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>AI Mock Interview</h1>
        <p className={styles.subtitle}>
          Practice real conversations with an intelligent AI interviewer to improve your interview skills and confidence
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Feature Introduction</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            The AI Mock Interview feature uses advanced natural language processing technology to simulate real interview scenarios. The AI interviewer will ask relevant interview questions based on your target position and provide real-time analysis and feedback on your answers.
          </p>
          <p className="text-white/80">
            This feature helps you familiarize yourself with the interview process, improve your answering skills, and boost your confidence for better performance in real interviews.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Features</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎯 Personalized Questions</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Automatically generate relevant interview questions based on target position</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Cover multiple dimensions including technical skills, project experience, and soft skills</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Adaptive difficulty that adjusts based on your answers</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>💬 Real-time Conversation</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Support both text and voice conversation modes</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>AI interviewer follows up based on your responses</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Simulate real interview interactive experience</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📊 Instant Feedback</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Get instant scoring and suggestions for each answer</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Identify strengths and areas for improvement in your answers</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Provide better answer examples</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📈 Detailed Reports</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Generate complete analysis report after interview</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Include overall score, performance by dimension, and improvement suggestions</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>View historical interview records to track progress</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>How to Use</h2>
        <div className={styles.card}>
          <ol className="space-y-4 text-white/80">
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Select Target Position</p>
                <p className="text-white/60 text-sm">Choose an added position from the list, or click "Add New Position" to create a new target position</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Start Interview</p>
                <p className="text-white/60 text-sm">Click "Start Interview" button, and the AI interviewer will greet you and begin asking questions</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Answer Questions</p>
                <p className="text-white/60 text-sm">Think carefully and answer each question in detail. Use text input or voice input</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Review Feedback</p>
                <p className="text-white/60 text-sm">After each answer, AI will provide scoring and suggestions. Read the feedback carefully to understand your performance</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">5</span>
              <div>
                <p className="font-semibold mb-1">End Interview</p>
                <p className="text-white/60 text-sm">After completing all questions, click "End Interview" to view the complete analysis report</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Tips</h2>
        
        <div className={styles.note}>
          <p className="font-semibold mb-2">💡 Answering Tips</p>
          <ul className="space-y-2 text-sm">
            <li>• Use the STAR method (Situation, Task, Action, Result) to structure your answers</li>
            <li>• Provide specific data and examples rather than generalizations</li>
            <li>• Keep answers concise and clear, avoid being verbose</li>
            <li>• Demonstrate your thought process and problem-solving abilities</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Preparation Suggestions</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Before the interview, complete position information including job description and requirements</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Prepare your project experiences and achievements for easy reference when answering</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Find a quiet environment to ensure no interruptions</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Treat each mock interview as a real interview</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>FAQ</h2>
        
        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">How long does an interview typically take?</h3>
          <p className="text-white/60">
            A complete mock interview usually takes 15-30 minutes, depending on the number of questions and the detail of your answers.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">Can I pause the interview midway?</h3>
          <p className="text-white/60">
            Yes. You can close the page at any time and continue from where you left off next time. However, it's recommended to complete it in one session for a better experience.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">How long are interview records saved?</h3>
          <p className="text-white/60">
            All interview records are permanently saved, and you can view and review them in your history at any time.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">Are there usage limits for the free version?</h3>
          <p className="text-white/60">
            The free version allows 3 mock interviews per day. Upgrade to Pro to unlock unlimited usage.
          </p>
        </div>
      </div>
    </>
  );
}
