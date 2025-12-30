import { docsStyles as styles } from '../styles/docs.style';

export default function DocsContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to Jobs AI</h1>
        <p className={styles.subtitle}>
          Jobs AI is an AI-powered job search assistance platform that helps you stand out in your job search.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>What is Jobs AI?</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            Jobs AI is an integrated AI-powered job search tool designed to help job seekers improve interview performance, optimize resume quality, and practice technical questions.
            We leverage advanced artificial intelligence technology to provide personalized job search guidance and feedback.
          </p>
          <p className="text-white/80">
            Whether you're a fresh graduate or an experienced professional, Jobs AI can provide valuable assistance.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Features</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎯 AI Mock Interview</h3>
          <p className={styles.cardDesc}>
            Practice real conversations with an intelligent AI interviewer to improve your interview skills.
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Customized interview questions based on target position</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Real-time voice/text conversation simulating real scenarios</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Instant professional feedback for each answer</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Detailed analysis report generated after interview</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📝 Resume Generation</h3>
          <p className={styles.cardDesc}>
            AI generates professional resumes with one click, saving time and improving quality.
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Intelligently generate resume content based on position requirements</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Multiple professional templates to choose from</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Customize styles and formats</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Export in Markdown format</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📊 Resume Analysis</h3>
          <p className={styles.cardDesc}>
            Deep analysis of your resume with professional optimization suggestions.
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Multi-dimensional resume scoring and diagnosis</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Intelligent content optimization for target positions</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Identify issues and improvement areas in resume</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Provide specific modification suggestions</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📚 Question Practice</h3>
          <p className={styles.cardDesc}>
            Practice technical questions to enhance your job search competitiveness.
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Generate relevant practice questions based on position</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Support multiple difficulty levels</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>AI automatic scoring and feedback</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Track practice history and progress</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Start</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            Getting started with Jobs AI is simple, just follow these steps:
          </p>
          <ol className="space-y-3 text-white/80">
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">1</span>
              <span>Register an account and log in</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">2</span>
              <span>Choose the feature you want to use (interview, resume generation, resume analysis, or question practice)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">3</span>
              <span>Fill in relevant information (such as target position, personal experience, etc.)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary text-black font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">4</span>
              <span>Start using AI features and get personalized advice</span>
            </li>
          </ol>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Usage Limits</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            To ensure service quality, we have set daily usage limits for different features:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><span className={styles.code}>Free Version</span>: 3 AI interviews, 3 resume generations, 3 resume analyses, 10 practice questions per day</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><span className={styles.code}>Pro Version</span>: Unlimited use of all features</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span><span className={styles.code}>Enterprise Version</span>: All Pro features + team management + API access</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Need Help?</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            If you encounter any issues while using the platform, you can:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Check detailed feature documentation in the left navigation bar</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Visit the account settings page to manage your personal information</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Contact our customer service team for support</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
