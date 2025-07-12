// const dummyData = [
//     {
//       title: "How does JavaScript's event loop work?",
//       description: "<p>Can someone explain how the event loop works in JavaScript with examples?</p>",
//       tags: ["javascript", "event-loop", "async"],
//       author: "66ae22d1a9f45abc12345678",
//       createdAt: "2024-07-01T10:00:00.000Z"
//     },
//     {
//       title: "Difference between let, const, and var?",
//       description: "<p>What are the key differences between let, const, and var in JavaScript?</p>",
//       tags: ["javascript", "es6", "variables"],
//       author: "66ae22d1a9f45abc12345679",
//       createdAt: "2024-07-02T12:30:00.000Z"
//     },
//     {
//       title: "What is closure in JavaScript?",
//       description: "<p>How do closures work and where are they used?</p>",
//       tags: ["javascript", "closure", "functions"],
//       author: "66ae22d1a9f45abc12345680",
//       createdAt: "2024-07-03T08:15:00.000Z"
//     },
//     {
//       title: "How to center a div using CSS?",
//       description: "<p>I am struggling to center a div. What's the most reliable way?</p>",
//       tags: ["css", "html", "frontend"],
//       author: "66ae22d1a9f45abc12345681",
//       createdAt: "2024-07-04T09:45:00.000Z"
//     },
//     {
//       title: "Difference between == and === in JavaScript?",
//       description: "<p>What’s the difference between == and ===? When should we use each?</p>",
//       tags: ["javascript", "operators"],
//       author: "66ae22d1a9f45abc12345682",
//       createdAt: "2024-07-05T14:20:00.000Z"
//     },
//     {
//       title: "What is useEffect in React?",
//       description: "<p>Can someone explain useEffect with dependencies and cleanup?</p>",
//       tags: ["react", "hooks", "useeffect"],
//       author: "66ae22d1a9f45abc12345678",
//       createdAt: "2024-07-06T10:00:00.000Z"
//     },
//     {
//       title: "SQL vs NoSQL databases?",
//       description: "<p>When should we use SQL or NoSQL? What are the pros and cons?</p>",
//       tags: ["database", "sql", "nosql"],
//       author: "66ae22d1a9f45abc12345679",
//       createdAt: "2024-07-06T12:00:00.000Z"
//     },
//     {
//       title: "How to debounce input in JavaScript?",
//       description: "<p>I want to delay search execution on input. How to debounce?</p>",
//       tags: ["javascript", "debounce", "performance"],
//       author: "66ae22d1a9f45abc12345680",
//       createdAt: "2024-07-07T09:00:00.000Z"
//     },
//     {
//       title: "What is Flexbox in CSS?",
//       description: "<p>What is Flexbox and how is it different from Grid?</p>",
//       tags: ["css", "flexbox", "layout"],
//       author: "66ae22d1a9f45abc12345681",
//       createdAt: "2024-07-08T11:00:00.000Z"
//     },
//     {
//       title: "Explain async/await in JavaScript.",
//       description: "<p>How do async and await work internally?</p>",
//       tags: ["javascript", "async", "promises"],
//       author: "66ae22d1a9f45abc12345682",
//       createdAt: "2024-07-08T16:00:00.000Z"
//     },
//     {
//       title: "What is prop drilling in React?",
//       description: "<p>How do we avoid prop drilling in larger applications?</p>",
//       tags: ["react", "props", "state-management"],
//       author: "66ae22d1a9f45abc12345678",
//       createdAt: "2024-07-09T10:30:00.000Z"
//     },
//     {
//       title: "What is REST API?",
//       description: "<p>Can someone explain REST API principles with examples?</p>",
//       tags: ["api", "rest", "web"],
//       author: "66ae22d1a9f45abc12345679",
//       createdAt: "2024-07-09T13:00:00.000Z"
//     },
//     {
//       title: "Difference between GET and POST?",
//       description: "<p>When should I use GET vs POST in HTTP requests?</p>",
//       tags: ["http", "get", "post"],
//       author: "66ae22d1a9f45abc12345680",
//       createdAt: "2024-07-10T08:20:00.000Z"
//     },
//     {
//       title: "What is useState in React?",
//       description: "<p>How does the useState hook work and how to update state?</p>",
//       tags: ["react", "hooks", "usestate"],
//       author: "66ae22d1a9f45abc12345681",
//       createdAt: "2024-07-10T14:10:00.000Z"
//     },
//     {
//       title: "Why use MongoDB over SQL?",
//       description: "<p>What are the benefits of MongoDB in modern apps?</p>",
//       tags: ["mongodb", "database", "nosql"],
//       author: "66ae22d1a9f45abc12345682",
//       createdAt: "2024-07-10T17:00:00.000Z"
//     },
//     {
//       title: "What is a promise in JavaScript?",
//       description: "<p>How do promises help in asynchronous code?</p>",
//       tags: ["javascript", "promise", "async"],
//       author: "66ae22d1a9f45abc12345678",
//       createdAt: "2024-07-11T08:00:00.000Z"
//     },
//     {
//       title: "CSS Grid vs Flexbox?",
//       description: "<p>When should we use Grid and when Flexbox in layouts?</p>",
//       tags: ["css", "grid", "flexbox"],
//       author: "66ae22d1a9f45abc12345679",
//       createdAt: "2024-07-11T10:45:00.000Z"
//     },
//     {
//       title: "What is JSX in React?",
//       description: "<p>Why do we use JSX and how is it compiled?</p>",
//       tags: ["react", "jsx"],
//       author: "66ae22d1a9f45abc12345680",
//       createdAt: "2024-07-11T15:20:00.000Z"
//     },
//     {
//       title: "Explain virtual DOM.",
//       description: "<p>How does the virtual DOM improve performance in React?</p>",
//       tags: ["react", "virtual-dom", "performance"],
//       author: "66ae22d1a9f45abc12345681",
//       createdAt: "2024-07-12T09:00:00.000Z"
//     },
//     {
//       title: "What is CORS and how to fix it?",
//       description: "<p>What is CORS error and how can I resolve it in development?</p>",
//       tags: ["cors", "api", "security"],
//       author: "66ae22d1a9f45abc12345682",
//       createdAt: "2024-07-12T12:30:00.000Z"
//     }
//   ];
  
const dummyData = [
    {
      title: "What is the event loop in JavaScript?",
      description: "<p>How does the event loop work in JavaScript and how does it handle asynchronous code?</p>",
      tags: ["javascript", "event-loop", "async"],
      author: "user1",
      createdAt: "2024-07-01T10:00:00.000Z"
    },
    {
      title: "How do I use useEffect in React?",
      description: "<p>I'm having trouble understanding how to use the useEffect hook with dependencies and cleanup functions. Any clear examples?</p>",
      tags: ["react", "useeffect", "hooks"],
      author: "user2",
      createdAt: "2024-07-02T11:15:00.000Z"
    },
    {
      title: "Difference between SQL and NoSQL?",
      description: "<p>Can someone explain when to use SQL databases versus NoSQL databases, and their pros/cons?</p>",
      tags: ["database", "sql", "nosql"],
      author: "user3",
      createdAt: "2024-07-03T13:20:00.000Z"
    },
    {
      title: "What is JSX in React?",
      description: "<p>What is JSX and why do we use it in React applications?</p>",
      tags: ["react", "jsx"],
      author: "user4",
      createdAt: "2024-07-04T14:40:00.000Z"
    },
    {
      title: "How does Flexbox work in CSS?",
      description: "<p>I'm trying to layout elements using Flexbox but struggling with align-items and justify-content. Can someone explain with a demo?</p>",
      tags: ["css", "flexbox", "layout"],
      author: "user5",
      createdAt: "2024-07-05T09:30:00.000Z"
    }
  ];
  
  module.exports = dummyData;