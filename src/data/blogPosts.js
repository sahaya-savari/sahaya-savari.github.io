// Blog posts data - HTML content is sanitized before rendering
export const blogPosts = [
  {
    slug: 'python-foundations-part-1',
    category: 'python',
    title: '🐍 Python Programming — Complete Practical Guide',
    date: 'February 10, 2026',
    excerpt: 'The ultimate professional roadmap for Python. From installation and variables to complex logic, loops, and functions.',
    content: `
      <h2>🚀 Introduction / Context</h2>
      <p>Python is the world's most popular language because it feels like English. 🟢 It is clean, logical, and designed to let you focus on solving problems rather than fighting with complex syntax.</p>

      <h2>📚 Table of Contents</h2>
      <ul>
        <li><a href="#setup">Installing Python</a></li>
        <li><a href="#variables">Variables & Data Types</a></li>
        <li><a href="#logic">Logic & Decisions (If/Else)</a></li>
        <li><a href="#loops">Loops & Automation</a></li>
        <li><a href="#functions">Functions & Reusability</a></li>
        <li><a href="#errors">Handling Errors</a></li>
      </ul>

      <h2 id="setup">💻 Installing Python (Windows)</h2>
      <p>1. Download the latest version from <strong>python.org</strong>. 🟢<br>
      2. <strong>IMPORTANT:</strong> Check the box "Add Python to PATH" during installation.<br>
      3. Open your terminal and type <code>python --version</code> to confirm.</p>

      <h2 id="variables">📦 Variables & Data Types</h2>
      <p>Think of variables as labeled boxes that store different types of information. 🟢</p>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>String</td>
            <td>Text data</td>
            <td><code>"Hello"</code></td>
          </tr>
          <tr>
            <td>Int</td>
            <td>Whole numbers</td>
            <td><code>42</code></td>
          </tr>
          <tr>
            <td>Float</td>
            <td>Decimal numbers</td>
            <td><code>3.14</code></td>
          </tr>
          <tr>
            <td>List</td>
            <td>Ordered collection</td>
            <td><code>[1, 2, 3]</code></td>
          </tr>
        </tbody>
      </table>

      <h2 id="logic">🧠 Logic & Decisions</h2>
      <p>Python uses <strong>Indentation</strong> (4 spaces) to define blocks of code. 🟢 It cares about how your code looks!</p>
      <pre><code>if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
else:
    print("Keep working!")</code></pre>

      <h2 id="loops">🔄 Loops & Automation</h2>
      <p>Loops allow you to repeat a task thousands of times without rewriting code. 🟢</p>
      <pre><code># Looping through a list
books = ["Python", "Git", "React"]
for book in books:
    print(f"Reading: {book}")</code></pre>

      <h2 id="functions">🛠 Functions & Reusability</h2>
      <p>Functions are packaged "recipes" of logic that you can name and call whenever you need them. 🟢</p>
      <pre><code>def greet(name):
    return f"Hello, {name}!"

print(greet("Savari"))</code></pre>

      <h2 id="errors">⚠️ Handling Errors</h2>
      <p>Even professional code crashes. Use <code>try/except</code> to handle errors gracefully. 🟢</p>
      <pre><code>try:
    number = int(input("Enter a number: "))
except ValueError:
    print("That's not a valid number!")</code></pre>

      <h2>🛠 Practical Understanding / Intuition</h2>
      <p>Logic is the core skill. 🟢 Languages are just tools. Once you understand <em>how</em> to solve a problem with Python's logic, you can learn any other language much faster.</p>

      <h2>✍️ Personal Learning / Reflection</h2>
      <p>I used to overcomplicate my code. 🟢 I've learned that "Simple is better than complex." If you can explain your code to a friend, it's good code.</p>

      <h2>🎯 Conclusion / Takeaway</h2>
      <p>You now have the full foundation of Python. 🟢 Start by building a small project—like a personal calculator or a to-do list—to seal this knowledge into memory.</p>
    `
  },
  {
    slug: 'github-guide-for-beginners',
    category: 'github',
    title: '🧰 Git & GitHub — Complete Practical Guide',
    date: 'February 10, 2026',
    excerpt: 'A strict, professional, beginner-friendly guide to Git and GitHub, covering every command from zero to hero.',
    content: `
      <h2>🚀 Introduction / Context</h2>
      <p>Git and GitHub help you <strong>track changes</strong>, <strong>avoid losing work</strong>, and <strong>collaborate safely</strong>. 🔵 This guide teaches Git from the ground up, starting with <em>what problem it solves</em> before showing <em>how to use it</em>.</p>

      <h2>🧠 What is Git</h2>
      <p>Git is a <strong>version control system</strong>. 🔵</p>
      <ul>
        <li>It keeps a <strong>history of your files</strong>.</li>
        <li>It lets you <strong>go back in time</strong> to any local version.</li>
        <li>It works <strong>locally on your computer</strong> (doesn't require internet).</li>
      </ul>

      <h2>🌍 What is GitHub</h2>
      <p>GitHub is a <strong>website</strong> that stores Git repositories online. 🔵 Think of it as the "Cloud" for your code. It helps with backups, sharing, and collaboration on larger projects.</p>

      <h2>📘 Core Terminology</h2>
      <table>
        <thead>
          <tr>
            <th>Term</th>
            <th>Plain English Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Repository (Repo)</td>
            <td>Your project folder + full history</td>
          </tr>
          <tr>
            <td>Commit</td>
            <td>A permanent save point</td>
          </tr>
          <tr>
            <td>Stage</td>
            <td>Waiting area before saving</td>
          </tr>
          <tr>
            <td>Branch</td>
            <td>A parallel version of the project</td>
          </tr>
          <tr>
            <td>Remote</td>
            <td>Online copy (GitHub)</td>
          </tr>
        </tbody>
      </table>

      <h2>💻 Installing Git (Windows)</h2>
      <p>1. Go to <strong>git-scm.com</strong> and download the installer. 🔵<br>
      2. Run the setup and keep the default settings.<br>
      3. Verify by typing <code>git --version</code> in your terminal.</p>

      <h2>⚙️ Initial Git Configuration</h2>
      <p>Git needs to know who you are to record who made which changes. 🔵</p>
      <pre><code>git config --global user.name "Your Name"
git config --global user.email "you@example.com"</code></pre>

      <h2>📁 Creating a Repository</h2>
      <p>To start tracking a folder, navigate to it in your terminal and type: 🔵</p>
      <pre><code>git init</code></pre>
      <p>This creates a hidden <code>.git</code> folder that stores all your project's history.</p>

      <h2>🔄 Git File Lifecycle</h2>
      <p>Files move through three main stages: 🔵<br>
      <strong>Untracked</strong> (Git ignores them) → <strong>Staged</strong> (Ready to save) → <strong>Committed</strong> (Permanently saved).</p>

      <h2>📥 Staging Files</h2>
      <p>The "Staging Area" is like a shopping cart where you put items before checking out. 🔵</p>
      <pre><code>git add index.html  # Adds one file
git add .           # Adds ALL changed files</code></pre>

      <h2>💾 Committing Changes</h2>
      <p>A commit is a snapshot of your project at a specific moment. 🔵</p>
      <pre><code>git commit -m "Add login feature"</code></pre>
      <p>Always write clear, descriptive messages so you know *why* you made a change.</p>

      <h2>🔗 Connecting to GitHub</h2>
      <p>Link your local folder to a repository you created on GitHub: 🔵</p>
      <pre><code>git remote add origin https://github.com/username/repo.git</code></pre>

      <h2>🚀 Pushing Code</h2>
      <p>Upload your local commits to the cloud: 🔵</p>
      <pre><code>git push origin main</code></pre>

      <h2>📥 Cloning Repositories</h2>
      <p>Download an existing project and its entire history: 🔵</p>
      <pre><code>git clone https://github.com/username/repo.git</code></pre>

      <h2>🌱 Branching & Merging</h2>
      <p><strong>Branches</strong> allow you to work on new features without breaking the main code. 🔵 Once finished, you <strong>Merge</strong> them back into the main branch.</p>
      <pre><code>git checkout -b new-feature  # Create and switch
git merge new-feature        # Combine changes</code></pre>

      <h2>⏪ Undoing Mistakes</h2>
      <p>Made a mistake? You can restore a file to its last healthy state: 🔵</p>
      <pre><code>git restore file.txt</code></pre>
      <p>Or undo a commit while keeping your work: <code>git reset --soft HEAD~1</code></p>

      <h2>🚫 .gitignore</h2>
      <p>Use a <code>.gitignore</code> file to tell Git to ignore files you don't want to upload, like passwords (<code>.env</code>) or large folders (<code>node_modules/</code>). 🔵</p>

      <h2>🗓️ Daily Git Workflow</h2>
      <p>A typical professional day looks like this: 🔵</p>
      <p><code>Edit Code</code> → <code>git add .</code> → <code>git commit -m "..."</code> → <code>git pull</code> → <code>git push</code></p>

      <h2>🎯 Conclusion / Takeaway</h2>
      <p>Mastering Git means less fear and better collaboration. 🔵 Practice these commands daily until they become muscle memory. Start by pushing one small project today!</p>
    `
  },
  {
    slug: 'how-to-learn-programming',
    category: 'programming',
    title: 'How to Learn Programming as a Beginner',
    date: 'February 9, 2026',
    excerpt: 'A universal roadmap for beginners to stay focused, consistent, and avoid burnout while learning to code.',
    content: `
      <h2>🚀 Introduction / Context</h2>
      <p>The hardest part of coding isn't the math—it is knowing where to start. 🟡 With thousands of tools, beginners often feel lost in the "tutorial hell".</p>

      <h2>❗ Problem or Motivation</h2>
      <p>Most people quit because they try to learn everything at once. 🟡 Burnout happens when you follow tutorials without actually building anything of your own.</p>

      <h2>🧠 Core Concept / Idea</h2>
      <p>Programming is <strong>Logic</strong>, not Memorization. 🟡 You are learning how to solve problems; the coding language is just the tool you use to do it.</p>

      <h2>🔑 Key Points or Observations</h2>

      <h3>1. Pick ONE Language 🟡</h3>
      <p>Don't jump between languages. Start with Python or JavaScript and stick with it until you can build a basic app.</p>

      <h3>2. The 20-Minute Rule 🟡</h3>
      <p>Consistency beats intensity. Coding for 20 minutes every day is better than a 5-hour marathon once a week.</p>

      <h3>3. Build "Useless" Things 🟡</h3>
      <p>Make a tip calculator or a name generator. Building something from scratch teaches more than 100 video tutorials.</p>

      <h2>🛠 Practical Understanding / Intuition</h2>
      <p>Think of learning to code like learning a <strong>Musical Instrument</strong>. 🟡</p>
      <p>Watching someone else play guitar doesn't make you a musician. You have to pick up the guitar, make some bad noises, and practice your scales every day.</p>

      <h2>⚠️ Limitations or Challenges</h2>
      <p>The "Imposter Syndrome" is real. 🟡 You will feel like you aren't "smart enough". Everyone feels this, even senior engineers at Google.</p>

      <h2>✍️ Personal Learning / Reflection</h2>
      <p>I spent months watching videos without writing a single line of code. 🟡 My progress only started when I tried to build a simple website and failed 50 times.</p>

      <h2>🎯 Conclusion / Takeaway</h2>
      <p>Stop overthinking the roadmap. 🟡 Pick a language, set a timer for 20 minutes, and write your first <code>print("Hello")</code> today.</p>
    `
  },
  {
    slug: 'getting-started-with-react',
    category: 'react',
    title: 'Getting Started with React',
    date: 'January 15, 2026',
    excerpt: 'A comprehensive guide to building modern web applications with React, covering components, hooks, and best practices.',
    content: `
      <h2>🚀 Introduction / Context</h2>
      <p>React is the engine behind modern websites like Facebook and Netflix. 🔵 It changes how we build the web by letting us create small, reusable pieces.</p>

      <h2>❗ Problem or Motivation</h2>
      <p>Old-school web coding required updating every single page manually. 🔵 It was slow and led to messy, hard-to-maintain code as apps grew larger.</p>

      <h2>🧠 Core Concept / Idea</h2>
      <p><strong>Components.</strong> 🔵 Think of your website as a set of LEGO bricks. You build a "Button" brick once and use it everywhere.</p>

      <h2>🔑 Key Points or Observations</h2>

      <h3>1. Components (The Bricks) 🔵</h3>
      <p>Every part of your UI—the header, the sidebar, the buttons—is a component. They are independent and easy to test.</p>

      <h3>2. State (The Memory) 🔵</h3>
      <p>State is how a component remembers things, like "Is this button clicked?" or "What is in the shopping cart?".</p>

      <h3>3. Hooks (The Simple Logic) 🔵</h3>
      <p>Hooks like <code>useState</code> allow you to add "life" and interactive behavior to your components with very little code.</p>

      <h2>🛠 Practical Understanding / Intuition</h2>
      <p>Think of React as a <strong>Smart Blueprint</strong>. 🔵</p>
      <p>Instead of drawing the whole house every time, you create blueprints for "Windows" and "Doors". When you want to change the color of all windows, you just update the blueprint once.</p>

      <h2>⚠️ Limitations or Challenges</h2>
      <p>React has a learning curve. 🔵 Concepts like "State" and "Props" can be confusing at first, and the setup (Vite/Node) can feel heavy.</p>

      <h2>✍️ Personal Learning / Reflection</h2>
      <p>I struggled with React until I stopped trying to understand the "whole app" and focused on building one tiny component at a time. 🔵 Small wins lead to big success.</p>

      <h2>🎯 Conclusion / Takeaway</h2>
      <p>React is a superpower for web devs. 🔵 Start by building a simple "Counter" button to see how components and state work together.</p>
    `
  },
  {
    slug: 'machine-learning-basics',
    category: 'python',
    title: 'Machine Learning Basics',
    date: 'January 10, 2026',
    excerpt: 'Understanding the fundamentals of machine learning, from supervised learning to neural networks.',
    content: `
      <h2>🚀 Introduction / Context</h2>
      <p>Machine Learning (ML) is the magic that lets computers learn patterns from data. 🟢 It is what powers your Netflix recommendations and face ID.</p>

      <h2>❗ Problem or Motivation</h2>
      <p>It's impossible to write code for every scenario (like recognizing every dog in the world). 🟢 We need a way for computers to "figure it out" themselves.</p>

      <h2>🧠 Core Concept / Idea</h2>
      <p><strong>Learning from Examples.</strong> 🟢 Instead of giving rules, you give the computer 10,000 photos and tell it: "These are dogs, these are not."</p>

      <h2>🔑 Key Points or Observations</h2>

      <h3>1. Supervised Learning 🟢</h3>
      <p>The "Teacher" method. You give labeled data (input + answer) so the computer can learn the relationship.</p>

      <h3>2. Features (The Clues) 🟢</h3>
      <p>Features are the specific details the computer looks at, like "ear shape" or "fur color", to make its decision.</p>

      <h3>3. The Model (The Prediction) 🟢</h3>
      <p>After training, the computer creates a "Model"—a math formula that can predict the answer for new data it hasn't seen before.</p>

      <h2>🛠 Practical Understanding / Intuition</h2>
      <p>Think of ML as a <strong>Child Learning</strong>. 🟢</p>
      <p>A child doesn't learn what a "chair" is through a technical definition. They learn by seeing 20 different chairs until their brain recognizes the pattern.</p>

      <h2>⚠️ Limitations or Challenges</h2>
      <p>ML requires <strong>Good Data</strong>. 🟢 If you give the computer bad examples (Bias), it will learn the wrong things and make bad predictions.</p>

      <h2>✍️ Personal Learning / Reflection</h2>
      <p>I thought I needed to be a math genius for ML. 🟢 I didn't. Most of it is about data cleaning and choosing the right tool for the job. Start with simple libraries!</p>

      <h2>🎯 Conclusion / Takeaway</h2>
      <p>ML is about finding patterns. 🟢 Start by playing with interactive tools like Google's Teachable Machine to see ML in action without any code.</p>
    `
  },
  {
    slug: 'data-visualization-tips',
    category: 'python',
    title: 'Data Visualization Tips',
    date: 'January 5, 2026',
    excerpt: 'Best practices for creating effective and beautiful data visualizations that tell compelling stories.',
    content: `
      <h2>🚀 Introduction / Context</h2>
      <p>Data visualization is the art of turning boring numbers into a story everyone can understand. 🟢 It is the bridge between data and decisions.</p>

      <h2>❗ Problem or Motivation</h2>
      <p>Spreadsheets are hard to read. 🟢 It is easy to miss a massive trend or a dangerous drop when it is buried in 1,000 rows of numbers.</p>

      <h2>🧠 Core Concept / Idea</h2>
      <p><strong>Visual Efficiency.</strong> 🟢 Humans process images 60,000 times faster than text. A good chart tells the whole story in 3 seconds.</p>

      <h2>🔑 Key Points or Observations</h2>

      <h3>1. Choose the Right Chart 🟢</h3>
      <ul>
        <li>Line Charts: For trends over time.</li>
        <li>Bar Charts: For comparing categories.</li>
        <li>Scatter Plots: For relationships between two things.</li>
      </ul>

      <h3>2. Less is More 🟢</h3>
      <p>Avoid "Chart Junk". Remove unnecessary lines, backgrounds, and 3D effects. Let the data speak for itself.</p>

      <h3>3. Color with Purpose 🟢</h3>
      <p>Use color to highlight what matters. Don't use 10 colors just because they look pretty; use them to guide the viewer's eye.</p>

      <h2>🛠 Practical Understanding / Intuition</h2>
      <p>Think of a chart like a <strong>Traffic Sign</strong>. 🟢</p>
      <p>A "Stop" sign is simple, clear, and uses color (Red) to tell you something vital instantly. Your data charts should be just as easy to understand at a glance.</p>

      <h2>⚠️ Limitations or Challenges</h2>
      <p>Charts can be <strong>Misleading</strong>. 🟢 Changing the scale of a graph can make a tiny change look like a huge disaster. Always be honest with your scales.</p>

      <h2>✍️ Personal Learning / Reflection</h2>
      <p>I used to try to make my charts look "complex" to seem smarter. 🟢 I learned that the most complex thing you can do is make something simple and clear.</p>

      <h2>🎯 Conclusion / Takeaway</h2>
      <p>Simplify your visuals. 🟢 Before you share a chart, ask: "Can a stranger understand this in 5 seconds?" If not, keep trimming.</p>
    `
  },
  {
    slug: 'python-for-data-science',
    category: 'python',
    title: 'Python for Data Science',
    date: 'December 28, 2025',
    excerpt: 'Exploring Python libraries and tools essential for data science and analysis.',
    content: `
      <h2>🚀 Introduction / Context</h2>
      <p>Python is the king of data science. 🟢 It has a massive library for every task, from cleaning messy data to training AI models.</p>

      <h2>❗ Problem or Motivation</h2>
      <p>Manually analyzing millions of data points in Excel is slow and prone to errors. 🟢 We need automation and mathematical power that scales with the data.</p>

      <h2>🧠 Core Concept / Idea</h2>
      <p><strong>The Ecosystem.</strong> 🟢 Python's strength isn't just the language, but the "Libraries"—pre-written code that handles the heavy lifting for you.</p>

      <h2>🔑 Key Points or Observations</h2>

      <h3>1. Pandas (The Master Table) 🟢</h3>
      <p>Pandas is like Excel on steroids. It can filter, clean, and merge millions of rows in a fraction of a second.</p>

      <h3>2. NumPy (The Engine) 🟢</h3>
      <p>NumPy handles the complex math and large arrays that make AI and data analysis possible at high speeds.</p>

      <h3>3. Scikit-Learn (The Toolkit) 🟢</h3>
      <p>This is where the actual "science" happens—building models that can predict trends or classify data automatically.</p>

      <h2>🛠 Practical Understanding / Intuition</h2>
      <p>Think of Python libraries like <strong>Power Tools</strong>. 🟢</p>
      <p>You can build a house with a hand saw (Excel), but if you have to build 100 houses, you want a circular saw and a nail gun (Python Libraries).</p>

      <h2>⚠️ Limitations or Challenges</h2>
      <p>The "Paradox of Choice". 🟢 There are so many libraries that it is easy to get overwhelmed. Focus on <strong>Pandas</strong> first; it is the most useful.</p>

      <h2>✍️ Personal Learning / Reflection</h2>
      <p>I spent too much time trying to learn the math behind the tools. 🟢 Learn the <strong>tools</strong> first. Use them to solve real problems, and the math will start making sense later.</p>

      <h2>🎯 Conclusion / Takeaway</h2>
      <p>Data science is about solving problems. 🟢 Start by importing a small CSV file of something you care about (like your spending) into a Pandas DataFrame.</p>
    `
  },
  {
    slug: 'understanding-neural-networks',
    category: 'python',
    title: 'Understanding Neural Networks',
    date: 'December 20, 2025',
    excerpt: 'A beginner-friendly introduction to neural networks and deep learning concepts.',
    content: `
      <h2>🚀 Introduction / Context</h2>
      <p>Neural networks are the "brain" of AI. 🟢 They are designed to mimic how human neurons fire to solve incredibly complex problems.</p>

      <h2>❗ Problem or Motivation</h2>
      <p>Simple code is great for math, but terrible for things like "understanding a face". 🟢 Faces have too many variations for a human to write rules for.</p>

      <h2>🧠 Core Concept / Idea</h2>
      <p><strong>Layers of Processing.</strong> 🟢 Information flows through layers of artificial neurons, with each layer finding more complex patterns than the last.</p>

      <h2>🔑 Key Points or Observations</h2>

      <h3>1. Input & Output 🟢</h3>
      <p>The network takes raw data (like pixels) at one end and produces a result (like "Cat") at the other.</p>

      <h3>2. Hidden Layers 🟢</h3>
      <p>This is the "Black Box". These middle layers find features like edges, then shapes, then objects, without being told what to look for.</p>

      <h3>3. Training (Weights) 🟢</h3>
      <p>Learning is just adjusting the "volume" (weights) of the connections between neurons until the correct answer comes out.</p>

      <h2>🛠 Practical Understanding / Intuition</h2>
      <p>Think of it as a <strong>Committee of Experts</strong>. 🟢</p>
      <p>The first committee looks for simple lines. The second committee combines those lines into shapes. The final expert looks at the shapes and decides if it's a cat.</p>

      <h2>⚠️ Limitations or Challenges</h2>
      <p>Neural networks are "Hungry". 🟢 They need massive amounts of data and huge computer power to learn effectively.</p>

      <h2>✍️ Personal Learning / Reflection</h2>
      <p>I used to think neural networks were "thinking". 🟢 They aren't. It's just massive amounts of very clever math. Realizing that made them much less intimidating.</p>

      <h2>🎯 Conclusion / Takeaway</h2>
      <p>Deep learning is powerful but specific. 🟢 Don't use a neural network if a simple <code>if/else</code> or a basic chart can solve the problem.</p>
    `
  },
  {
    slug: 'web-performance-optimization',
    category: 'react',
    title: 'Web Performance Optimization',
    date: 'December 15, 2025',
    excerpt: 'Techniques and strategies to make your web applications faster and more efficient.',
    content: `
      <h2>🚀 Introduction / Context</h2>
      <p>Performance is the most important "feature" of any website. 🔵 If your site is slow, users will leave before they even see your content.</p>

      <h2>❗ Problem or Motivation</h2>
      <p>Modern websites are heavy. 🔵 Large images and massive code files can make a site take 10 seconds to load on a mobile phone—that is too long.</p>

      <h2>🧠 Core Concept / Idea</h2>
      <p><strong>Perception vs Reality.</strong> 🔵 Making a site load faster is good, but making it <em>feel</em> fast (showing content early) is even more important.</p>

      <h2>🔑 Key Points or Observations</h2>

      <h3>1. Image Compression 🔵</h3>
      <p>Images are usually the biggest files. Modern formats like WebP can make them 80% smaller without losing quality.</p>

      <h3>2. Lazy Loading 🔵</h3>
      <p>Don't load what the user can't see. Only download images and code as the user scrolls down to them.</p>

      <h3>3. Minimize Code 🔵</h3>
      <p>Bundlers like Vite can automatically remove unused code and shrink your files so they fly over the internet.</p>

      <h2>🛠 Practical Understanding / Intuition</h2>
      <p>Think of your website as a <strong>Backpack</strong>. 🔵</p>
      <p>If you put everything you own in the backpack, you'll walk very slowly. Performance optimization is about only packing exactly what you need for today's trip.</p>

      <h2>⚠️ Limitations or Challenges</h2>
      <p>There is a balance. 🔵 Sometimes adding complex optimization tools can actually make your code harder for other developers to read and maintain.</p>

      <h2>✍️ Personal Learning / Reflection</h2>
      <p>I used to ignore performance until I tried to load my own site on a bad 3G connection. 🔵 It was a wake-up call. Always test on "slow" devices!</p>

      <h2>🎯 Conclusion / Takeaway</h2>
      <p>Start with the easy wins. 🔵 Compress your images today. It is the fastest way to make your site feel like a premium experience.</p>
    `
  }
];

// Helper function to get a single post by slug
export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};
