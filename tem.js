{
  matchScore: 92,
  technicalQuestion: [
    `{
    "question":"Explain the difference between useState and useContext in React. When would you choose one over the other?",
    "intention":"To assess their understanding of React state management and context API, and their ability to choose appropriate tools.",
    "answer":"useState is a React Hook that lets you add React state to functional components. It's primarily used for managing component-specific local state. useContext is a Hook that lets you read and subscribe to context from your component. It's used for sharing state or functions that can be considered 'global' for a tree of React components, without having to pass props down manually at every level (prop drilling). You would use useState for simple, localized state management within a single component or between a parent and its direct children via props. You'd choose useContext when you have data (like user authentication, theme settings, or global configuration) that needs to be accessed by many components at different nesting levels throughout your application, avoiding prop drilling and making the code cleaner."
    } `,
    '{"question":"You mentioned improving API performance by 30% during your internship. Can you elaborate on how you identified the bottlenecks and what specific techniques you used to achieve this improvement?","intention":"To delve into their practical problem-solving skills, debugging, and optimization techniques for backend APIs, particularly in a real-world scenario.","answer":"(Candidate specific, but general answer) To identify bottlenecks, I first used logging and profiling tools (like Node.js `console.time`, or more sophisticated APM tools if available) to measure the execution time of different API endpoints and database operations. I looked for queries that were taking excessively long or for routes that had high latency under load. Common techniques I might have employed include: optimizing database queries by adding appropriate indexes to frequently queried fields in MongoDB, reducing the amount of data fetched from the database, implementing caching (e.g., Redis) for frequently accessed but less volatile data, or refactoring CPU-intensive synchronous code to be more efficient or asynchronous. For example, if it was a database issue, ensuring correct indexing on fields used in `find` operations or aggregations would be a primary step, often yielding significant improvements."} ',
    '{"question":"Describe the typical folder structure you would use for a Node.js/Express.js backend application. What considerations go into organizing your routes, controllers, and models?","intention":"To evaluate their experience with structuring backend applications, understanding of separation of concerns, and organizational best practices for scalability and maintainability.","answer":"A common and robust folder structure for a Node.js/Express.js application follows a modular pattern, often resembling an MVC (Model-View-Controller) approach. I would typically organize it as follows: `src/` (or `app/`) as the root for application logic. Inside, I\'d have `models/` for database schemas and interaction (e.g., Mongoose schemas for MongoDB), `controllers/` for handling business logic and request processing, `routes/` for defining API endpoints and mapping them to specific controller functions, `middleware/` for authentication, authorization, logging, or error handling. Additionally, `config/` for environment variables and application settings, `utils/` for helper functions, and `services/` for more complex business logic that might interact with multiple models. The key considerations are separation of concerns, making the codebase maintainable, scalable, and easy for new developers to understand and navigate."} ',
    '{"question":"How do you handle authentication and authorization in a MERN stack application, specifically using JSON Web Tokens (JWTs)?","intention":"To assess practical knowledge of security, JWT implementation, and best practices within the MERN stack.","answer":"For authentication using JWTs in a MERN stack application, when a user successfully logs in, the Node.js/Express server generates a JWT containing a payload (typically the user ID and roles/permissions). This token is signed with a secret key and sent back to the client, usually stored in `localStorage` or `httpOnly` cookies. For subsequent requests, the client sends this JWT (commonly in the `Authorization` header as a Bearer token) to the server. On the server, a middleware verifies the token\'s signature, checks for expiration, decodes the payload, and attaches the user information to the request object. For authorization, the decoded user roles or permissions from the JWT payload are then used in subsequent middleware or controller logic to determine if the authenticated user has access to a specific resource or can perform a particular action, enforcing access control."} ',
    `{"question":"Your resume mentions building an 'AI Resume Analyzer'. Can you explain how you integrated AI into this project, specifically what technologies or libraries you used, and what challenges you faced?","intention":"To understand their practical experience with AI integration, ability to articulate technical details, and problem-solving skills related to external service integration.","answer":"(Candidate specific, but general answer) For the AI Resume Analyzer, the core AI integration involved natural language processing (NLP) to extract relevant information from resumes and compare it against job descriptions to calculate a match score, and then to generate interview questions. I primarily utilized Python for the AI/NLP backend, leveraging libraries such as SpaCy or NLTK for text parsing and entity recognition from resumes and job descriptions. For generating interview questions, I explored using pre-trained language models or integrating with a service like OpenAI's API. The main challenges included accurately parsing diverse resume formats, handling varying levels of detail, fine-tuning the matching algorithm for relevance, and efficiently integrating the Python-based AI logic with the main MERN application (e.g., via a REST API endpoint exposed by the Python backend that the Node.js server would call)."} `
  ],
  behavioralQuestion: [
    `{"question":"Tell me about a time you had to learn a new technology or framework quickly for a project. How did you approach it, and what was the outcome?","intention":"To assess their adaptability, self-learning capability, and ability to quickly acquire and apply new technical skills, which is crucial in a dynamic development environment.","answer":"(Candidate specific) During one of my personal projects, I decided to incorporate real-time functionality. While I had some basic JavaScript knowledge, I hadn't worked with WebSockets before. I approached learning Socket.io by first reviewing its official documentation, then watching several tutorial videos to grasp the core concepts of client-server communication. I started with a very simple chat application to solidify my understanding, building it incrementally. After I felt comfortable, I integrated it into my Task Management System project to add drag-and-drop functionality with real-time updates. The outcome was successful: I was able to implement the real-time feature efficiently, and it significantly enhanced the user experience of the application, allowing multiple users to see task changes instantly."} `,
    `{"question":"You mentioned participating in Agile development during your internship. Can you describe a challenging situation you encountered within an Agile sprint and how you contributed to resolving it?","intention":"To evaluate their experience with Agile methodologies, problem-solving within a team context, and proactive contributions to sprint goals.","answer":"(Candidate specific) During my internship at ABC Technologies, we were in the middle of a sprint, and I was assigned to develop a new API endpoint. Halfway through, we discovered a significant dependency issue with another team's service that our API relied on, which was not going to be ready in time. This put our sprint goal at risk. I immediately communicated the blockage to our scrum master and the team during the daily stand-up. Instead of waiting, I proactively suggested an alternative approach: to mock the external service's responses for our immediate development and testing, allowing me to continue building and testing our API in isolation. I also helped outline the exact data contract we would need from the external service. This allowed us to keep development moving forward without blocking the entire sprint, and once the external service was ready, integrating it was a smoother process due to the clear contract and pre-tested API."} `,
    '{"question":"Describe a project where you collaborated closely with other developers or team members. What was your role, and how did you ensure effective communication and successful project delivery?","intention":"To assess teamwork skills, communication effectiveness, and ability to contribute positively within a collaborative development setting, especially in a technical role.","answer":"(Candidate specific) For my E-Commerce Platform project, it was a team effort during a university hackathon. My primary role was leading the backend development, focusing on implementing JWT authentication and integrating the Stripe payment gateway using Node.js and Express.js, while another team member focused on the React frontend. To ensure effective communication, we utilized GitHub for version control and issue tracking, conducting frequent code reviews to maintain quality and share knowledge. We also had daily sync-up meetings (even virtual ones during the hackathon) to discuss progress, roadblocks, and any API contract changes. I ensured the backend API was well-documented and tested so the frontend team could consume it efficiently. This clear division of labor, combined with constant communication and shared goals, led to a successful demonstration and allowed us to complete a functional full-stack application within the hackathon timeframe."} ',
    `{"question":"Tell me about a time you received constructive feedback on your code. How did you react to it, and what did you learn from the experience?","intention":"To gauge their receptiveness to feedback, humility, willingness to learn, and commitment to improving code quality and adhering to best practices.","answer":"(Candidate specific) During a code review for a feature I developed at my internship, a senior developer provided feedback on my error handling logic. While my code caught errors, it didn't provide specific enough messages for debugging or user notification, and it wasn't consistently formatted across the module. Initially, I felt a bit defensive, but I quickly realized the feedback was meant to improve the codebase. I reacted by asking clarifying questions to fully understand the implications of inconsistent error messages and how better error handling could improve both developer experience and user experience. I then revised my code to implement a standardized error response structure, utilized custom error classes, and added more descriptive logging. I learned the importance of anticipating how others will use and debug your code, and that consistent, informative error handling is just as crucial as the core logic itself. It made me a stronger advocate for defensive programming and clearer communication through code."} `,
    `{"question":"You enjoy solving real-world problems through clean, maintainable code. Can you give an example of a time when you prioritized code maintainability over a quicker, less elegant solution? What was the context and outcome?","intention":"To understand their commitment to software engineering best practices, long-term thinking, and decision-making regarding code quality and its impact.","answer":"(Candidate specific) In my E-Commerce Platform project, when designing the product management module for the admin dashboard, I initially considered a simpler, monolithic approach for fetching and updating product data. This would have involved a single large API endpoint and a somewhat convoluted component responsible for many different actions. However, anticipating future features like product variations, promotions, and analytics, I decided against the quicker path. Instead, I invested time in creating granular RESTful API endpoints for specific actions (e.g., GET /products, POST /products, PUT /products/:id), implemented a clear separation of concerns in the frontend components (e.g., ProductList, ProductForm, ProductDetail), and ensured proper validation and error handling on both ends. This took a bit longer upfront, but the outcome was a much more modular, readable, and maintainable codebase. When we later decided to add a 'discount management' feature, it was straightforward to integrate without rewriting existing logic, proving the value of the initial investment in maintainability."} `
  ],
  skillGap: [
    '{"skill":"CI/CD Pipelines","severity":"Medium"}',
    '{"skill":"Hands-on AWS/Azure Deployment/Integration","severity":"Low"}',
    '{"skill":"Advanced TypeScript Application","severity":"Low"}',
    '{"skill":"Deep Database Performance Tuning","severity":"Low"}',
    '{"skill":"Advanced State Management Patterns (e.g., Saga, Thunk for Redux)","severity":"Low"}'
  ],
  preparationPlan: [
    '{"day":1,"focus":"MERN Core Concepts - React & Redux","tasks":"Review React lifecycle methods, hooks (useState, useEffect, useContext), and basic Redux flow (actions, reducers, store). Practice building a simple feature demonstrating state management."} ',
    '{"day":2,"focus":"MERN Core Concepts - Node.js & Express.js","tasks":"Review Express.js middleware, routing, error handling, and security best practices (e.g.,helmet, CORS). Build a simple API with basic authentication."} ',
    '{"day":3,"focus":"MongoDB & Mongoose Deep Dive","tasks":"Review advanced MongoDB querying, indexing strategies, aggregation pipelines, and Mongoose schema design best practices. Practice optimizing a slow query in a sample dataset."} ',
    '{"day":4,"focus":"JWT Authentication & Authorization Refinement","tasks":"Implement and review JWT-based authentication and role-based authorization in a sample MERN application. Focus on secure token handling (httpOnly cookies, refresh tokens) and middleware."} ',
    '{"day":5,"focus":"API Design & REST Principles","tasks":"Review advanced RESTful API design principles, idempotency, and versioning. Design and document a new API endpoint for an existing project using OpenAPI/Swagger or Postman documentation features."} ',
    '{"day":6,"focus":"Docker for MERN Applications","tasks":"Containerize a full MERN stack application (frontend, backend, database) using Docker Compose. Understand Dockerfiles for Node.js and React, and basic container networking. Deploy locally."} ',
    '{"day":7,"focus":"Introduction to CI/CD for Web Applications","tasks":"Research fundamental CI/CD concepts (Continuous Integration, Continuous Delivery/Deployment). Watch tutorials on setting up a basic CI/CD pipeline using GitHub Actions or GitLab CI for a simple web app project."} ',
    '{"day":8,"focus":"AWS Cloud Services for Web Deployments (Practical)","tasks":"Hands-on: Attempt to deploy a simple Node.js API and a React frontend to AWS using services like EC2, S3, or Elastic Beanstalk. Understand networking and database setup in the cloud."} ',
    `{"day":9,"focus":"Frontend Performance Optimization","tasks":"Learn about techniques to optimize React application performance: code splitting, lazy loading, memoization (React.memo, useCallback, useMemo), virtualized lists. Analyze a sample app's performance with Lighthouse."} `,
    '{"day":10,"focus":"Backend Performance & Scalability","tasks":"Research Node.js performance tuning (clustering, async operations, caching strategies). Understand basic concepts of load balancing and horizontal scaling for MERN applications. Implement a simple caching mechanism."} ',
    `{"day":11,"focus":"TypeScript Practical Application","tasks":"Convert a small JavaScript React component and a Node.js Express route to TypeScript. Focus on defining interfaces, types, and leveraging TypeScript's benefits to catch errors at compile time."} `,
    '{"day":12,"focus":"Behavioral Interview Practice","tasks":"Practice answering common behavioral questions using the STAR method. Focus on experiences related to teamwork, problem-solving, learning new technologies, handling feedback, and overcoming challenges."} ',
    '{"day":13,"focus":"Technical Interview Practice - Coding Challenges","tasks":"Solve 2-3 medium-difficulty coding problems on platforms like LeetCode or HackerRank, focusing on data structures and algorithms commonly asked in full-stack interviews (e.g., array manipulation, string processing, hash maps)."} ',
    '{"day":14,"focus":"Final Review & Interview Strategy","tasks":"Review all core MERN concepts, your projects, and internship contributions. Prepare insightful questions to ask the interviewer. Ensure a clear understanding of your career goals and how they align with the role. Get adequate rest."} '
  ]
}


{
  import React, { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router";

const NAV_ITEMS = [
    {
        id: "technical",
        label: "Technical Questions",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        id: "behavioral",
        label: "Behavioral Questions",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        id: "roadmap",
        label: "Road Map",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
        ),
    },
];

const sampleReport = {
    matchScore: 92,
    technicalQuestion: [
        '{"question":"Explain the difference between useState and useContext in React.","intention":"To check React state management understanding.","answer":"useState manages local component state. useContext shares state across a component tree without prop drilling."}',
        '{"question":"How do you handle JWT authentication in a MERN app?","intention":"To assess practical security knowledge.","answer":"Create tokens after login, store them safely, verify them in middleware, and attach the decoded user to the request."}',
    ],
    behavioralQuestion: [
        '{"question":"Tell me about a time you learned a new technology quickly.","intention":"To assess adaptability.","answer":"Use the STAR method and explain the situation, learning process, action, and result."}',
    ],
    skillGap: [
        '{"skill":"CI/CD Pipelines","severity":"medium"}',
        '{"skill":"AWS/Azure Deployment","severity":"low"}',
        '{"skill":"Advanced TypeScript","severity":"low"}',
    ],
    preparationPlan: [
        '{"day":1,"focus":"React Core Concepts","tasks":"Review hooks, context, props, and component state."}',
        '{"day":2,"focus":"Node.js and Express","tasks":"Practice routes, middleware, validation, and error handling."}',
        '{"day":3,"focus":"MongoDB and Mongoose","tasks":"Review schemas, indexes, queries, and aggregation basics."}',
    ],
};

const parseItem = (item) => {
    if (!item) return {};
    if (typeof item === "object") return item;

    try {
        return JSON.parse(item.trim());
    } catch {
        return { text: item };
    }
};

const normalizeList = (list = []) => list.map(parseItem);

const normalizeTasks = (tasks) => {
    if (Array.isArray(tasks)) return tasks;
    if (!tasks) return [];
    return [tasks];
};

const getScoreColor = (score = 0) => {
    if (score >= 80) return "border-emerald-400/60 bg-emerald-500/10 text-emerald-300";
    if (score >= 60) return "border-amber-400/60 bg-amber-500/10 text-amber-300";
    return "border-rose-400/60 bg-rose-500/10 text-rose-300";
};

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(index === 0);

    return (
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="flex w-full items-center gap-4 p-5 text-left"
            >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                    Q{index + 1}
                </span>
                <p className="min-w-0 flex-1 text-base font-semibold leading-7 text-white">
                    {item.question || item.text || "Question unavailable"}
                </p>
                <span className={`text-gray-400 transition ${open ? "rotate-180" : ""}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </button>

            {open && (
                <div className="space-y-4 border-t border-white/10 p-5 pt-4">
                    {item.intention && (
                        <section>
                            <span className="mb-2 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
                                Intention
                            </span>
                            <p className="text-sm leading-6 text-gray-300">{item.intention}</p>
                        </section>
                    )}

                    {item.answer && (
                        <section>
                            <span className="mb-2 inline-flex rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">
                                Model Answer
                            </span>
                            <p className="text-sm leading-6 text-gray-300">{item.answer}</p>
                        </section>
                    )}
                </div>
            )}
        </article>
    );
};

const RoadMapDay = ({ day }) => (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/20">
        <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-4 py-2 text-sm font-bold text-indigo-200">
                Day {day.day}
            </span>
            <h3 className="text-lg font-semibold text-white">{day.focus || "Practice"}</h3>
        </div>

        <ul className="space-y-3">
            {normalizeTasks(day.tasks).map((task, index) => (
                <li key={index} className="flex gap-3 rounded-xl border border-white/10 bg-gray-950/50 p-3 text-sm leading-6 text-gray-300">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-400" />
                    {task}
                </li>
            ))}
        </ul>
    </article>
);

const Interview = () => {
    const [activeNav, setActiveNav] = useState("technical");
    const location = useLocation();
    const { interviewId } = useParams();
    const report = location.state?.report || sampleReport;

    const technicalQuestions = useMemo(
        () => normalizeList(report.technicalQuestions || report.technicalQuestion),
        [report.technicalQuestions, report.technicalQuestion]
    );
    const behavioralQuestions = useMemo(
        () => normalizeList(report.behavioralQuestions || report.behavioralQuestion),
        [report.behavioralQuestions, report.behavioralQuestion]
    );
    const preparationPlan = useMemo(
        () => normalizeList(report.preparationPlan),
        [report.preparationPlan]
    );
    const skillGaps = useMemo(
        () => normalizeList(report.skillGaps || report.skillGap),
        [report.skillGaps, report.skillGap]
    );

    const scoreColor = getScoreColor(report.matchScore);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black px-6 py-10 text-white">
            <div className="mx-auto grid min-h-[850px] max-w-7xl grid-cols-1 overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-[260px_minmax(0,1fr)_310px]">
                <nav className="flex flex-col justify-between gap-8 border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:border-white/15">
                    <div className="lg:mt-56">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                            Sections
                        </p>

                        <div className="flex flex-row gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
                            {NAV_ITEMS.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActiveNav(item.id)}
                                    className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                                        activeNav === item.id
                                            ? "border-indigo-400 bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/20"
                                            : "border-white/15 bg-gray-950/40 text-gray-300 hover:border-indigo-400/70 hover:text-white"
                                    }`}
                                >
                                    <span className="text-indigo-300">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        <span>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 16 6 10h4V3h4v7h4l-6 6Zm-7 5v-2h14v2H5Z" />
                            </svg>
                        </span>
                        Download Resume
                        {interviewId ? "" : ""}
                    </button>
                </nav>

                <section className="min-h-[650px] border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:border-white/15">
                    {activeNav === "technical" && (
                        <section>
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <h2 className="text-3xl font-bold text-white">Technical Questions</h2>
                                <span className="rounded-full border border-white/10 bg-gray-950/50 px-4 py-2 text-sm text-gray-300">
                                    {technicalQuestions.length} questions
                                </span>
                            </div>

                            <div className="max-h-[720px] space-y-4 overflow-y-auto pr-2">
                                {technicalQuestions.map((question, index) => (
                                    <QuestionCard key={index} item={question} index={index} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === "behavioral" && (
                        <section>
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <h2 className="text-3xl font-bold text-white">Behavioral Questions</h2>
                                <span className="rounded-full border border-white/10 bg-gray-950/50 px-4 py-2 text-sm text-gray-300">
                                    {behavioralQuestions.length} questions
                                </span>
                            </div>

                            <div className="max-h-[720px] space-y-4 overflow-y-auto pr-2">
                                {behavioralQuestions.map((question, index) => (
                                    <QuestionCard key={index} item={question} index={index} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === "roadmap" && (
                        <section>
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <h2 className="text-3xl font-bold text-white">Preparation Road Map</h2>
                                <span className="rounded-full border border-white/10 bg-gray-950/50 px-4 py-2 text-sm text-gray-300">
                                    {preparationPlan.length}-day plan
                                </span>
                            </div>

                            <div className="max-h-[720px] space-y-4 overflow-y-auto pr-2">
                                {preparationPlan.map((day, index) => (
                                    <RoadMapDay key={day.day || index} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </section>

                <aside className="p-6">
                    <div className="mb-8 rounded-3xl border border-white/10 bg-gray-950/50 p-6 text-center">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                            Match Score
                        </p>
                        <div className={`mx-auto flex h-32 w-32 items-center justify-center rounded-full border-4 ${scoreColor}`}>
                            <span className="text-4xl font-black">{report.matchScore ?? "--"}</span>
                            <span className="mt-3 text-lg font-bold">%</span>
                        </div>
                        <p className="mt-4 text-sm text-gray-400">Strong match for this role</p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <p className="mb-4 inline-flex rounded-lg border border-white/15 bg-gray-950/50 px-4 py-2 text-lg font-semibold text-white">
                            Skill Gaps
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {skillGaps.map((gap, index) => (
                                <span
                                    key={index}
                                    className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                                        gap.severity === "high"
                                            ? "border-rose-400/40 bg-rose-500/10 text-rose-200"
                                            : gap.severity === "medium"
                                                ? "border-amber-400/40 bg-amber-500/10 text-amber-200"
                                                : "border-indigo-400/40 bg-indigo-500/10 text-indigo-200"
                                    }`}
                                >
                                    {gap.skill || gap.text}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default Interview;

}