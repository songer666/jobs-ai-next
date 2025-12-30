import { questionsStyles as styles } from '../styles/questions.style';

export default function QuestionsContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Question Practice</h1>
        <p className={styles.subtitle}>
          Practice technical questions to enhance your job search competitiveness
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Feature Introduction</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            The Question Practice feature automatically generates relevant technical interview questions based on your target position.
            You can practice these questions to familiarize yourself with potential interview questions and receive professional AI feedback.
          </p>
          <p className="text-white/80">
            Supports multiple difficulty levels, from basic to advanced, meeting practice needs at different stages.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Features</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎯 Smart Question Generation</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Generate relevant questions based on target position</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Cover common technical interview knowledge points</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Diverse question types (concepts, algorithms, design, etc.)</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📊 Difficulty Levels</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><span className={styles.code}>Easy</span> - Basic concepts and common questions</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><span className={styles.code}>Medium</span> - Questions requiring some thought</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><span className={styles.code}>Hard</span> - Complex technical challenges</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>💡 Smart Feedback</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>AI automatic scoring</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Identify strengths and weaknesses in answers</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Provide reference answers and explanations</span>
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
                <p className="font-semibold mb-1">Select Position and Difficulty</p>
                <p className="text-white/60 text-sm">Choose target position and desired question difficulty</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">Generate Question</p>
                <p className="text-white/60 text-sm">Click generate, and AI will create a relevant question</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">Answer Question</p>
                <p className="text-white/60 text-sm">Think carefully and enter your answer</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">4</span>
              <div>
                <p className="font-semibold mb-1">Get Feedback</p>
                <p className="text-white/60 text-sm">View AI scoring and feedback after submitting your answer</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Practice Tips</h2>
        <div className={styles.note}>
          <p className="font-semibold mb-2">💡 Effective Practice Tips</p>
          <ul className="space-y-2 text-sm">
            <li>• Start with easy difficulty and gradually increase</li>
            <li>• Think independently before viewing reference answers</li>
            <li>• Read AI feedback carefully to understand improvement areas</li>
            <li>• Regularly review questions you got wrong</li>
            <li>• Practice daily to maintain proficiency</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>FAQ</h2>
        
        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">Will questions repeat?</h3>
          <p className="text-white/60">
            AI dynamically generates new questions based on position requirements each time, with minimal repetition.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">Can I select specific knowledge points?</h3>
          <p className="text-white/60">
            Currently generates questions automatically based on position. Knowledge point filtering will be supported in the future.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">What are the free version limitations?</h3>
          <p className="text-white/60">
            The free version allows 10 practice questions per day. Upgrade to Pro to unlock unlimited usage.
          </p>
        </div>
      </div>
    </>
  );
}
