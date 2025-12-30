import { quickStartStyles as styles } from '../styles/quick-start.style';

export default function QuickStartContent() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Quick Start</h1>
        <p className={styles.subtitle}>
          Get started with Jobs AI in 5 minutes and begin your job search journey
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Step 1: Register Account</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            Visit the Jobs AI homepage and click the "Register" button to create an account. The following registration methods are supported:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Email Registration - Register with email and password</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>GitHub Login - Quick login with GitHub account</span>
            </li>
          </ul>
        </div>
        <div className={styles.note}>
          <p className="font-semibold mb-1">💡 Tip</p>
          <p className="text-sm">
            Using GitHub login is more convenient and doesn't require remembering an additional password.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Step 2: Complete Personal Information</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            After logging in, go to the "Account Settings" page to complete your personal information. This information will help AI serve you better:
          </p>
          <ol className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.number}>1</span>
              <div>
                <p className="font-semibold mb-1">Basic Information</p>
                <p className="text-white/60 text-sm">Name, contact information, current position, etc.</p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className={styles.number}>2</span>
              <div>
                <p className="font-semibold mb-1">Education Background</p>
                <p className="text-white/60 text-sm">School, major, degree, etc.</p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className={styles.number}>3</span>
              <div>
                <p className="font-semibold mb-1">Work Experience</p>
                <p className="text-white/60 text-sm">Company, position, job responsibilities, achievements, etc.</p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className={styles.number}>4</span>
              <div>
                <p className="font-semibold mb-1">Skills and Expertise</p>
                <p className="text-white/60 text-sm">Programming languages, frameworks, tools, etc.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Step 3: Add Target Position</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            Add positions you're interested in on the "Target Positions" page. Detailed position information enables AI to provide more accurate services:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <div>
                <p className="font-semibold">Position Title</p>
                <p className="text-white/60 text-sm">Such as "Frontend Developer", "Product Manager", etc.</p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <div>
                <p className="font-semibold">Company Name</p>
                <p className="text-white/60 text-sm">Target company (optional)</p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <div>
                <p className="font-semibold">Job Description</p>
                <p className="text-white/60 text-sm">Complete JD content, the more detailed the better</p>
              </div>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <div>
                <p className="font-semibold">Required Skills</p>
                <p className="text-white/60 text-sm">Skills and experience required for the position</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Step 4: Start Using Features</h2>
        <div className={styles.card}>
          <p className="text-white/80 mb-4">
            Now you can start using Jobs AI's various features:
          </p>
          
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">🎯 AI Mock Interview</h4>
              <p className="text-white/60 text-sm mb-2">
                Select target position and start conversation practice with AI interviewer.
              </p>
              <p className="text-white/60 text-sm">
                Recommended frequency: 2-3 times per week
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">📝 Resume Generation</h4>
              <p className="text-white/60 text-sm mb-2">
                Choose position and template, let AI help you generate professional resume.
              </p>
              <p className="text-white/60 text-sm">
                Recommended scenario: Before applying for new position
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">📊 Resume Analysis</h4>
              <p className="text-white/60 text-sm mb-2">
                Upload resume and get professional optimization suggestions.
              </p>
              <p className="text-white/60 text-sm">
                Recommended scenario: Verify after resume modification
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">📚 Question Practice</h4>
              <p className="text-white/60 text-sm mb-2">
                Practice technical questions to improve professional skills.
              </p>
              <p className="text-white/60 text-sm">
                Recommended frequency: 5-10 questions daily
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Usage Recommendations</h2>
        
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📅 Create Learning Plan</h3>
          <p className="text-white/60 text-sm mb-3">
            We recommend creating a systematic learning plan to fully utilize all features:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>2-3 AI mock interviews per week</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Practice 5-10 questions daily</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Regularly update and optimize resume</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Use resume analysis feature before submission</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🎯 Set Goals</h3>
          <p className="text-white/60 text-sm mb-3">
            Clear goals help you use Jobs AI more effectively:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Short-term goal: Master interview skills, optimize resume</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Medium-term goal: Get interview opportunities from ideal companies</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Long-term goal: Successfully receive job offer</span>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📈 Track Progress</h3>
          <p className="text-white/60 text-sm mb-3">
            Regularly review your usage records and progress:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>View historical interview records and compare score changes</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Review questions you got wrong to consolidate knowledge</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span>Compare resume analysis results before and after optimization</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>FAQ</h2>
        
        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">Is payment required?</h3>
          <p className="text-white/60">
            Jobs AI offers a free version with daily usage limits. For unlimited use, you can upgrade to Pro version.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">Is my data secure?</h3>
          <p className="text-white/60">
            We take data security very seriously. All data is encrypted and stored, and will not be disclosed to third parties.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className="text-lg font-semibold text-white mb-2">What if I encounter problems?</h3>
          <p className="text-white/60">
            You can check detailed feature documentation or contact customer service for help.
          </p>
        </div>
      </div>
    </>
  );
}
