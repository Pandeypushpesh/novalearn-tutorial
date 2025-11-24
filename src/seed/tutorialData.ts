import { TutorialDocument } from "@/lib/models/Tutorial";

const tutorialData: Partial<TutorialDocument>[] = [
  {
    title: "HTML Basics",
    slug: "html-basics",
    category: "HTML",
    summary: "Start with the building blocks of the web.",
    content: `
## Welcome to HTML
HTML is the structure of every web page. In this lesson you will learn about:

- Basic document structure
- Headings and paragraphs
- Links and images

### Sample Markup
\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello NovaLearn!</h1>
  </body>
</html>
\`\`\`
`,
    codeExamples: [
      {
        language: "html",
        code: `<!DOCTYPE html>
<html>
  <head>
    <title>NovaLearn</title>
    <style>
      body { font-family: system-ui; padding: 2rem; }
      h1 { color: #0ea5e9; }
    </style>
  </head>
  <body>
    <h1>Hello from HTML Basics</h1>
    <p>Edit the text and click Run.</p>
  </body>
</html>`
      }
    ],
    order: 1,
    nextSlug: "css-essentials"
  },
  {
    title: "CSS Essentials",
    slug: "css-essentials",
    category: "CSS",
    summary: "Add color, layout, and responsive design.",
    content: `
## Styling Fundamentals

CSS controls presentation. Key topics:

1. Selectors
2. The box model
3. Layout with Flexbox

\`\`\`css
.card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
}
\`\`\`
`,
    codeExamples: [
      {
        language: "html",
        code: `<style>
body { font-family: system-ui; }
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.1);
}
</style>
<div class="card">
  <h2>CSS Essentials</h2>
  <p>Experiment with colors and spacing.</p>
</div>`
      }
    ],
    order: 2,
    previousSlug: "html-basics",
    nextSlug: "javascript-fundamentals"
  },
  {
    title: "JavaScript Fundamentals",
    slug: "javascript-fundamentals",
    category: "JavaScript",
    summary: "Make pages alive with logic and interactivity.",
    content: `
## Program the browser

JavaScript gives you:

- Variables and data types
- Functions and events
- DOM access

\`\`\`js
const button = document.querySelector("button");
button.addEventListener("click", () => alert("Clicked!"));
\`\`\`
`,
    codeExamples: [
      {
        language: "javascript",
        code: `const log = (value) => {
  const output = document.getElementById("output");
  output.textContent += value + "\\n";
};

log("Welcome to JavaScript Fundamentals!");
`
      }
    ],
    order: 3,
    previousSlug: "css-essentials",
    nextSlug: "node-overview"
  },
  {
    title: "Node.js Overview",
    slug: "node-overview",
    category: "Node",
    summary: "Move JavaScript to the backend.",
    content: `
## Why Node?

- Single language workflow
- Huge package ecosystem
- Event-driven I/O
`,
    codeExamples: [
      {
        language: "javascript",
        code: `console.log("Node basics go here");`
      }
    ],
    order: 4,
    previousSlug: "javascript-fundamentals",
    nextSlug: "react-essentials"
  },
  {
    title: "React Essentials",
    slug: "react-essentials",
    category: "React",
    summary: "Component-driven UIs with hooks.",
    content: `
## React Concepts

- Components
- Props and state
- Effects
`,
    codeExamples: [
      {
        language: "jsx",
        code: `function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ fontFamily: "system-ui", padding: 16 }}>
      <h1>React Essentials</h1>
      <button onClick={() => setCount((c) => c + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`
      }
    ],
    order: 5,
    previousSlug: "node-overview"
  }
];

export default tutorialData;

