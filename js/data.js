"use strict";
/* Ascent — reference data (curriculum, skills, certificates, career arc). */
const MARKET_ASOF="Sept 2026";

/* ---------------- TECHNICAL ROADMAP (12 stages) ---------------- */
const YT="youtube",SRCH="search";
const CURRICULUM=[
 {id:"p1",month:1,title:"Math, Statistics & Python Foundations",focus:"Build the programming + quantitative base everything else depends on.",hours:"10–12",
  weeks:["Python syntax, variables, data types, loops, conditionals","Functions, OOP basics, error handling, file I/O","Statistics & probability — mean/median, std dev, distributions, correlation; Excel basics","30+ practice scripts + mini project"],
  res:[{t:"Python for Beginners (Full Course)",a:"CodeWithHarry",k:YT,u:"https://www.youtube.com/playlist?list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg"},
       {t:"100 Days of Python (Days 1–25)",a:"CampusX",k:YT,u:"https://www.youtube.com/playlist?list=PLKnIA16_Rmvb1RYR-iTA_hzckhdONtSW4"},
       {t:"Statistics for Data Science",a:"pick any well-rated playlist",k:SRCH,u:""}],
  skills:["prog","oop","stats","excel"],certs:["cert_gpm","cert_aife"]},
 {id:"p2",month:2,title:"Python for Data Analysis + Git/GitHub",focus:"Move to real data manipulation, and start version-controlling like a professional.",hours:"10–12",
  weeks:["NumPy — arrays, vectorized ops, broadcasting","Pandas — DataFrames, filtering, groupby, merging, missing data","Git & GitHub — commits, branches, PRs; Colab workflow","Apply everything on a real dataset + push to GitHub"],
  res:[{t:"100 Days of Python (Days 26–60)",a:"CampusX",k:YT,u:"https://www.youtube.com/playlist?list=PLKnIA16_Rmvb1RYR-iTA_hzckhdONtSW4"},
       {t:"Git and GitHub for Beginners",a:"any well-rated crash course",k:SRCH,u:""}],
  skills:["python","clean","git","nb"],certs:[]},
 {id:"p3",month:3,title:"Exploratory Data Analysis & Visualization",focus:"Understand data before modeling it — the skill most beginners skip and regret.",hours:"10",
  weeks:["Matplotlib & Seaborn — plots, styling, subplots","The EDA process — univariate/bivariate, outliers, missing values","EDA + feature engineering on a real project","Full EDA report on a Kaggle dataset"],
  res:[{t:"Session 29: Exploratory Data Analysis (DSMP)",a:"CampusX",k:YT,u:"https://www.youtube.com/live/PPEHpg2RixQ"},
       {t:"Step-by-Step EDA & Feature Engineering",a:"Krish Naik",k:YT,u:"https://youtu.be/xhB-dmKmzRk"}],
  skills:["viz","eda"],certs:[]},
 {id:"p4",month:4,title:"SQL & BI Tools (Power BI / Tableau)",focus:"Query databases and communicate insight through dashboards — expected in almost every job.",hours:"8–10",
  weeks:["SQL basics — SELECT, WHERE, GROUP BY, JOINS","Advanced SQL — subqueries, window functions, CTEs","Power BI or Tableau — connect data, build visuals, KPIs","Build a full interactive dashboard"],
  res:[{t:"SQL for Data Science (full course)",a:"CampusX SQL playlist recommended",k:SRCH,u:""},
       {t:"Power BI full course  ·  or  ·  Tableau full course",a:"pick one",k:SRCH,u:""}],
  skills:["sql","powerbi","tableau","dash","datadriven"],certs:["cert_gda","cert_tableau","cert_dpm","cert_finmodel"]},
 {id:"p5",month:5,title:"Machine Learning Foundations",focus:"Understand core ML algorithms and why they work — not just how to call .fit().",hours:"12–14",
  weeks:["Linear & Logistic Regression, cost functions, gradient descent","Classification — KNN, Decision Trees, Naive Bayes","Unsupervised — K-Means, PCA; evaluation metrics","End-to-end ML project"],
  res:[{t:"100 Days of Machine Learning",a:"CampusX",k:YT,u:"https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH"}],
  skills:["reg","clf","clus","eval","sklearn","ml"],certs:["cert_mlspec"]},
 {id:"p6",month:6,title:"Advanced ML, Feature Engineering & Evaluation",focus:"Go from a notebook model to something closer to production quality.",hours:"10–12",
  weeks:["Feature engineering & selection","Ensembles — Random Forest, Gradient Boosting, XGBoost","Hyperparameter tuning, cross-validation, avoiding overfitting","Structure an ML project properly with Git"],
  res:[{t:"100 Days of Machine Learning (deeper modules)",a:"CampusX",k:YT,u:"https://www.youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH"},
       {t:"XGBoost tutorial for beginners",a:"official docs / any tutorial",k:SRCH,u:""}],
  skills:["fe","ens","tune"],certs:[]},
 {id:"p7",month:7,title:"Deep Learning & Neural Networks",focus:"Understand neural nets from first principles — what makes LLMs make sense later.",hours:"12–14",
  weeks:["Perceptron, activations, forward/backward propagation","Convolutional Neural Networks (CNNs) for images","Recurrent Neural Networks (RNNs/LSTMs) for sequences","Train and evaluate a deep-learning model"],
  res:[{t:"100 Days of Deep Learning",a:"CampusX",k:YT,u:"https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn"}],
  skills:["nn","cnn","rnn","tf"],certs:["cert_dl"]},
 {id:"p8",month:8,title:"Cloud (GCP/AWS/Azure) + FastAPI Deployment",focus:"A model in a notebook isn't a skill employers can use — serve it as an API, host it on the cloud.",hours:"12–14",
  weeks:["Cloud fundamentals — compute, storage, IAM (skim all three)","Go deep on one cloud (Azure recommended) + Docker basics","FastAPI — REST API around an ML model, Pydantic validation","Deploy the FastAPI app to your chosen cloud"],
  res:[{t:"GCP Zero to Hero",a:"Abhishek Veeramalla",k:YT,u:"https://youtu.be/N5rXROueKhw"},
       {t:"AWS Zero to Hero (DevOps)",a:"Abhishek Veeramalla",k:YT,u:"https://youtu.be/GkKNxyLp_V0"},
       {t:"Azure Zero to Hero (AZ-900/AZ-104)",a:"Abhishek Veeramalla",k:YT,u:"https://youtu.be/10jm7Waan8M"},
       {t:"FastAPI for Machine Learning",a:"CampusX",k:YT,u:"https://www.youtube.com/playlist?list=PLKnIA16_RmvZ41tjbKB2ZnwchfniNsMuQ"}],
  skills:["cloud","docker","fastapi","deploy","cicd"],certs:[]},
 {id:"p9",month:9,title:"Generative AI, LLMs & LangChain",focus:"Shift from training models to building products on top of foundation models.",hours:"10–12",
  weeks:["LLM fundamentals — tokens, context windows, generation","Prompt engineering — zero/few-shot, structured outputs","Embeddings & vector representations","LangChain — chains, memory, tool use"],
  res:[{t:"Generative AI using LangChain",a:"CampusX",k:YT,u:"https://www.youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0"}],
  skills:["llm","prompt","embed","langchain"],certs:["cert_genai"]},
 {id:"p10",month:10,title:"RAG Chatbots & Applied GenAI",focus:"The most in-demand GenAI pattern: connect an LLM to your own data so it answers accurately.",hours:"12–14",
  weeks:["RAG theory — retrieval + generation, chunking","Vector databases — FAISS/Chroma/Pinecone","Full RAG pipeline over your own PDFs/documents","Wrap RAG in FastAPI + a Streamlit/Gradio UI"],
  res:[{t:"Complete RAG Playlist",a:"Krish Naik",k:YT,u:"https://www.youtube.com/playlist?list=PLZoTAELRMXVM8Pf4U67L4UuDRgV4TNX9D"},
       {t:"FastAPI for Machine Learning (backend)",a:"CampusX",k:YT,u:"https://www.youtube.com/playlist?list=PLKnIA16_RmvZ41tjbKB2ZnwchfniNsMuQ"}],
  skills:["rag","vecdb","ui"],certs:[]},
 {id:"p11",month:11,title:"Agentic AI (LangGraph), MCP & Claude Code",focus:"The frontier — and the best-paid AI skill of 2026: agents that plan, use tools and finish tasks.",hours:"12–14",
  weeks:["Agentic concepts — planning, memory, tool-calling; LangGraph","Build a multi-step agent workflow","MCP — the standard way to connect agents to tools/data","Claude Code — ship a real project faster with an AI coding agent"],
  res:[{t:"Agentic AI using LangGraph",a:"CampusX",k:YT,u:"https://www.youtube.com/playlist?list=PLKnIA16_RmvYsvB8qkUQuJmJNuiCUJFPL"},
       {t:"Model Context Protocol (MCP)",a:"CampusX",k:YT,u:"https://www.youtube.com/playlist?list=PLKnIA16_Rmva_oZ9F4ayUu9qcWgF7Fyc0"},
       {t:"Claude Code Full Course (12 hrs)",a:"Mayank Aggarwal",k:YT,u:"https://youtu.be/05aY2LRIC3s"}],
  skills:["langgraph","agents","mcp","claudecode","aiprod"],certs:[]},
 {id:"p12",month:12,title:"Capstones, Portfolio & Job Readiness",focus:"Consolidate everything into a portfolio that gets interviews — then go get them.",hours:"10–12",
  weeks:["Pick 1–2 capstones combining ML + GenAI + Cloud + FastAPI","Polish all GitHub repos — READMEs, docs, tests, structure","Portfolio website; 3–4 LinkedIn posts on your projects","Résumé, mock interviews, start applying"],
  res:[{t:"No new resources — refine Months 5–11",a:"execution & polish time",k:SRCH,u:""}],
  skills:["storytelling"],certs:[]}
];

/* ---------------- LEADERSHIP & MANAGEMENT TRACK (parallel modules) ---------------- */
const LEADERSHIP=[
 {id:"lm1",title:"Become an AI-literate leader",goal:"AI literacy is the #1 skill on the rise in 2026 (LinkedIn). Lead the shift instead of being replaced by it.",
  learn:{t:"AI For Everyone",a:"DeepLearning.AI · Coursera",cert:"cert_aife"},apply:"Spot one AI use-case in your current company and run a small pilot.",skills:["ai_lit"]},
 {id:"lm2",title:"Decide with data, not gut",goal:"Data-driven decision-making is now core to every leadership role — and the foundation of BI.",
  learn:{t:"Google Data Analytics (foundations)",a:"Google · Coursera",cert:"cert_gda"},apply:"Replace one recurring gut decision with a dashboard you built.",skills:["datadriven","storytelling"]},
 {id:"lm3",title:"Think like a product leader",goal:"Product thinking + roadmapping is what turns an operator into a PM. AI-product PMs earn +18%.",
  learn:{t:"Digital Product Management",a:"UVA · Coursera",cert:"cert_dpm"},apply:"Write a one-page PRD for a real problem in your business.",skills:["pm","roadmap","aiprod"]},
 {id:"lm4",title:"Lead strategy in the AI era",goal:"Strategic thinking, adaptability and change leadership top the WEF Future of Jobs skill list.",
  learn:{t:"Strategic Leadership & Management",a:"U. Illinois · Coursera",cert:"cert_stratlead"},apply:"Draft a quarterly OKR set for your team and review it monthly.",skills:["strategy","change"]},
 {id:"lm5",title:"Communicate like an executive",goal:"Data storytelling + stakeholder communication is what 'gets you the promotion' (2026 reports).",
  learn:{t:"Data Storytelling & presentation",a:"practice + short course",cert:null},apply:"Turn one analysis into a 5-slide story and present it to stakeholders.",skills:["storytelling","execcomm"]},
 {id:"lm6",title:"Grow and retain people",goal:"Developing and retaining talent is a defining 2026 leadership skill as teams reshape around AI.",
  learn:{t:"Leading People and Teams",a:"U. Michigan · Coursera",cert:"cert_leadteams"},apply:"Run a structured weekly 1:1 + feedback ritual for a month.",skills:["leadership","mentorship","eq"]}
];

/* ---------------- PROJECTS ---------------- */
const PROJECTS=[
 {id:"pr1",phase:"p1",title:"Excel sales dashboard + 3 Python mini-scripts",sub:"Warm-up — no GitHub needed yet",num:null,steps:["Build a sales dashboard in Excel (pivot tables + a chart)","Unit converter script","Expense tracker script","Basic data-cleaner script"]},
 {id:"pr2",phase:"p2",title:"Clean & analyze an HR/Sales dataset in Pandas",sub:"Your first GitHub repo",num:null,steps:["Load & clean the dataset in Pandas","Write up 3–4 key insights","Add a clear README","Push the notebook to GitHub"]},
 {id:"pr3",phase:"p3",title:"Full EDA report on a Kaggle dataset",sub:"Portfolio piece #1",num:1,steps:["Pick a Kaggle dataset (house prices, HR attrition…)","Univariate + bivariate analysis with visuals","Written insights + conclusions","Publish notebook + README to GitHub"]},
 {id:"pr4",phase:"p4",title:"Interactive BI dashboard (Power BI / Tableau)",sub:"Portfolio piece #2 · the BI hiring test",num:2,steps:["Model an HR or Sales dataset","≥4 KPIs defined","≥3 interactive visuals","Publish + screenshot in your repo README"]},
 {id:"pr5",phase:"p5",title:"Churn or house-price prediction model",sub:"Portfolio piece #3",num:3,steps:["Raw data → cleaned features","Train baseline model","Evaluate with proper metrics","End-to-end notebook on GitHub"]},
 {id:"pr6",phase:"p6",title:"Rebuild it: feature engineering + XGBoost + CV",sub:"Clean, structured repo",num:null,steps:["Proper feature engineering","XGBoost model","Cross-validated performance comparison","Clean repo layout (config, structure)"]},
 {id:"pr7",phase:"p7",title:"CNN image classifier",sub:"Portfolio piece #4",num:4,steps:["Pick a dataset (cats vs dogs / digits)","Build & train a CNN","Evaluate accuracy","Notebook + README on GitHub"]},
 {id:"pr8",phase:"p8",title:"Deploy your model as a live FastAPI service",sub:"Portfolio piece #5 — a real, public API",num:5,steps:["Wrap the Month-6 model in FastAPI","Containerize with Docker","Deploy to GCP/AWS/Azure","Public URL in your README"]},
 {id:"pr9",phase:"p9",title:"LLM app — summarizer or Q&A bot (LangChain)",sub:"Portfolio piece #6",num:6,steps:["Design the chain","Wire an LLM + prompt templates","Simple interface","Deploy + document"]},
 {id:"pr10",phase:"p10",title:"RAG chatbot over your own documents",sub:"Portfolio piece #7 — flagship",num:7,flagship:true,steps:["Chunk + embed your documents","Vector DB retrieval","FastAPI backend + Streamlit/Gradio UI","Deploy to cloud + write it up"]},
 {id:"pr11",phase:"p11",title:"LangGraph agent workflow with an MCP tool",sub:"Portfolio piece #8 — flagship · best-paid AI skill",num:8,flagship:true,steps:["Design a multi-step agent (research / triage)","Connect at least one MCP tool","Use Claude Code to extend/refactor it","Deploy + document the architecture"]},
 {id:"pr12",phase:"p12",title:"Capstone bundle + portfolio site",sub:"3–4 flagship projects, presented",num:null,flagship:true,steps:["Pick your 3–4 strongest projects","Consistent READMEs + docs","Portfolio website linking them all","3–4 LinkedIn posts documenting the build"]}
];

/* ---------------- SKILLS (market-tagged, grouped by 2026 demand clusters) ---------------- */
const SKILL_GROUPS=[
 {id:"people",name:"People & Leadership",badge:"7 of LinkedIn's top-10 skills for 2026 are soft skills"},
 {id:"ai",name:"AI & Automation",badge:"highest-paid cluster · up to +56% pay"},
 {id:"biz",name:"Business & Product",badge:"PM median ≈ $192k (US, 2026)"},
 {id:"data",name:"Data & Analytics",badge:"Excel 81% · SQL 60% · Power BI 43% of postings"},
 {id:"cloud",name:"Cloud & Engineering",badge:"cloud certs +15–25% pay"},
 {id:"found",name:"Foundations",badge:""}
];
const SKILLS=[
 /* People & Leadership — several already yours */
 {id:"leadership",n:"Team & people management",g:"people",owned:true,tag:"top-10 skill, 2026"},
 {id:"crossfn",n:"Cross-functional collaboration",g:"people",owned:true,tag:"rising fast (LinkedIn)"},
 {id:"stakeholder",n:"Stakeholder management",g:"people",owned:true,tag:"top consulting skill"},
 {id:"strategy",n:"Strategic thinking",g:"people",owned:true,tag:"WEF top skill"},
 {id:"change",n:"Change & adaptability",g:"people",owned:true,tag:"WEF Future of Jobs"},
 {id:"eq",n:"Emotional intelligence",g:"people",owned:true,tag:"top-10 future skill"},
 {id:"negotiation",n:"Negotiation",g:"people",owned:true,tag:"'gets you promoted'"},
 {id:"execcomm",n:"Executive communication",g:"people",owned:true,tag:"LinkedIn 2026 cluster"},
 {id:"mentorship",n:"Mentorship & coaching",g:"people",owned:true},
 {id:"ai_lit",n:"AI literacy for leaders",g:"people",fire:true,tag:"#1 skill on the rise, 2026",cert:"cert_aife"},
 {id:"datadriven",n:"Data-driven decisions",g:"people",p:"p4",tag:"core to every leader now"},
 {id:"storytelling",n:"Data storytelling",g:"people",tag:"communication in 27% of postings"},
 /* AI & Automation — the pay premium */
 {id:"prompt",n:"Prompt engineering",g:"ai",p:"p9",fire:true,tag:"LinkedIn top AI skill"},
 {id:"llm",n:"LLMs & foundation models",g:"ai",p:"p9",fire:true,tag:"$190k+ skill"},
 {id:"rag",n:"RAG pipelines",g:"ai",p:"p10",fire:true,tag:"core GenAI-engineer skill"},
 {id:"vecdb",n:"Vector databases",g:"ai",p:"p10",tag:"vector search $190k+"},
 {id:"langchain",n:"LangChain",g:"ai",p:"p9",tag:"agent framework"},
 {id:"langgraph",n:"LangGraph / agent orchestration",g:"ai",p:"p11",fire:true,tag:"best-paid AI skill ≈ $209k"},
 {id:"agents",n:"Agentic AI & tool-calling",g:"ai",p:"p11",fire:true,tag:"AI engineer +143% YoY"},
 {id:"mcp",n:"MCP (Model Context Protocol)",g:"ai",p:"p11",tag:"emerging standard"},
 {id:"claudecode",n:"Claude Code / AI coding",g:"ai",p:"p11",tag:"ship faster"},
 {id:"ml",n:"Machine learning",g:"ai",p:"p5",fire:true,tag:"+40% wage premium"},
 {id:"dl",n:"Deep learning (CNN/RNN)",g:"ai",p:"p7",tag:"+27% premium"},
 {id:"tf",n:"TensorFlow / PyTorch",g:"ai",p:"p7",tag:"PyTorch in 37.7% of AI jobs"},
 {id:"aiprod",n:"AI product strategy",g:"ai",tag:"AI-product PM +18% pay"},
 /* Business & Product */
 {id:"pm",n:"Product management",g:"biz",tag:"PM median ≈ $192k",cert:"cert_dpm"},
 {id:"roadmap",n:"Roadmapping & prioritization",g:"biz",cert:"cert_dpm"},
 {id:"exp",n:"A/B testing & experimentation",g:"biz",cert:"cert_dpm"},
 {id:"gtm",n:"Go-to-market strategy",g:"biz",owned:true,tag:"LinkedIn growth cluster"},
 {id:"revenue",n:"Revenue & pricing strategy",g:"biz",owned:true,tag:"PM +11% pay"},
 {id:"finmodel",n:"Financial modeling & acumen",g:"biz",tag:"high-pay finance skill",cert:"cert_finmodel"},
 {id:"growth",n:"Digital marketing & growth",g:"biz",owned:true},
 {id:"ops",n:"Operations & systems design",g:"biz",owned:true},
 {id:"bizdev",n:"Business development",g:"biz",owned:true},
 /* Data & Analytics */
 {id:"excel",n:"Excel (pivots, modeling)",g:"data",p:"p1",tag:"in 81% of analyst postings"},
 {id:"sql",n:"SQL (joins, CTEs, windows)",g:"data",p:"p4",fire:true,tag:"60% of postings — still #1"},
 {id:"python",n:"Python (Pandas / NumPy)",g:"data",p:"p2",tag:"41% of postings"},
 {id:"powerbi",n:"Power BI",g:"data",p:"p4",tag:"43% of postings"},
 {id:"tableau",n:"Tableau",g:"data",p:"p4",tag:"visual storytelling"},
 {id:"viz",n:"Data visualization",g:"data",p:"p3",tag:"~57% above basic analyst pay"},
 {id:"dash",n:"Dashboard & KPI design",g:"data",p:"p4"},
 {id:"eda",n:"Exploratory data analysis",g:"data",p:"p3"},
 {id:"clean",n:"Data cleaning & wrangling",g:"data",p:"p2"},
 {id:"reg",n:"Regression",g:"data",p:"p5"},{id:"clf",n:"Classification",g:"data",p:"p5"},
 {id:"clus",n:"Clustering & PCA",g:"data",p:"p5"},{id:"eval",n:"Model evaluation",g:"data",p:"p5"},
 {id:"sklearn",n:"scikit-learn",g:"data",p:"p5"},{id:"fe",n:"Feature engineering",g:"data",p:"p6"},
 {id:"ens",n:"Ensembles & XGBoost",g:"data",p:"p6"},{id:"tune",n:"Tuning & cross-validation",g:"data",p:"p6"},
 /* Cloud & Engineering */
 {id:"cloud",n:"Cloud (GCP/AWS/Azure)",g:"cloud",p:"p8",tag:"cert +15–25% pay"},
 {id:"docker",n:"Docker",g:"cloud",p:"p8"},{id:"fastapi",n:"FastAPI",g:"cloud",p:"p8"},
 {id:"deploy",n:"Model deployment",g:"cloud",p:"p8",tag:"ships products, not notebooks"},
 {id:"cicd",n:"CI/CD",g:"cloud",p:"p8"},{id:"git",n:"Git & GitHub",g:"cloud",p:"p2",tag:"non-negotiable"},
 /* Foundations */
 {id:"prog",n:"Programming fundamentals",g:"found",p:"p1"},{id:"oop",n:"OOP & clean code",g:"found",p:"p1"},
 {id:"stats",n:"Statistics & probability",g:"found",p:"p1"},{id:"nb",n:"Jupyter / Colab",g:"found",p:"p2"},
 {id:"nn",n:"Neural network fundamentals",g:"found",p:"p7"}
];

/* ---------------- CERTIFICATES ---------------- */
const CERTS=[
 {id:"cert_aife",n:"AI For Everyone",prov:"DeepLearning.AI · Coursera",track:"Leadership",after:"p1",
  why:"AI literacy is the #1 skill on the rise in 2026 (LinkedIn). This is the non-technical, leader's version — start it in week 1.",
  li:"AI For Everyone — Coursera (DeepLearning.AI)",skills:["ai_lit"]},
 {id:"cert_gpm",n:"Google Project Management Professional Certificate",prov:"Google · Coursera",track:"Leadership",after:"p1",
  why:"Your fastest brand-name credential — it leans directly on the leadership, ops and stakeholder skills you already have.",
  li:"Google Project Management Professional Certificate — Coursera (Google)",skills:["pm","roadmap","stakeholder"]},
 {id:"cert_stratlead",n:"Strategic Leadership & Management Specialization",prov:"U. Illinois · Coursera",track:"Leadership",after:"p1",
  why:"Strategic thinking, adaptability and change leadership top the WEF Future of Jobs list — this formalises what you already do.",
  li:"Strategic Leadership and Management Specialization — Coursera (University of Illinois)",skills:["strategy","change"]},
 {id:"cert_leadteams",n:"Leading People and Teams Specialization",prov:"U. Michigan · Coursera",track:"Leadership",after:"p1",optional:true,
  why:"Developing and retaining talent is a defining 2026 leadership skill. Optional, but it rounds out the people-leadership story.",
  li:"Leading People and Teams Specialization — Coursera (University of Michigan)",skills:["leadership","mentorship"]},
 {id:"cert_dpm",n:"Digital Product Management Specialization",prov:"U. Virginia · Coursera",track:"Product",after:"p4",
  why:"Turns operator into product leader: discovery, agile delivery and metrics. AI-product PMs earn +18% (2026).",
  li:"Digital Product Management Specialization — Coursera (University of Virginia)",skills:["pm","roadmap","exp","aiprod"]},
 {id:"cert_finmodel",n:"Business & Financial Modeling Specialization",prov:"Wharton · Coursera",track:"Product",after:"p4",optional:true,
  why:"Financial modeling is a high-pay finance/consulting skill and pairs with your P&L experience.",
  li:"Business and Financial Modeling Specialization — Coursera (Wharton, UPenn)",skills:["finmodel","revenue"]},
 {id:"cert_gda",n:"Google Data Analytics Professional Certificate",prov:"Google · Coursera",track:"Data / BI",after:"p4",
  why:"The exact analyst credential in your benchmark's profile. Covers SQL, R, Tableau, cleaning — the recognised proof for BI roles.",
  li:"Google Data Analytics Professional Certificate — Coursera (Google)",skills:["sql","clean","tableau","viz","datadriven"]},
 {id:"cert_tableau",n:"Data Visualization with Tableau Specialization",prov:"UC Davis · Coursera",track:"Data / BI",after:"p4",
  why:"Dashboards + visual storytelling are what BI interviews test — and data-viz skills pay ~57% above basic analyst.",
  li:"Data Visualization with Tableau Specialization — Coursera (UC Davis)",skills:["tableau","dash","viz"]},
 {id:"cert_mlspec",n:"Machine Learning Specialization",prov:"DeepLearning.AI & Stanford · Coursera",track:"Data Science",after:"p6",
  why:"The gold-standard ML credential (Andrew Ng). ML carries a ~40% wage premium in 2026 — do it alongside the ML months.",
  li:"Machine Learning Specialization — Coursera (DeepLearning.AI & Stanford)",skills:["reg","clf","eval","ml"]},
 {id:"cert_genai",n:"Generative AI with LLMs",prov:"DeepLearning.AI & AWS · Coursera",track:"Generative AI",after:"p9",
  why:"A credible GenAI credential beside your RAG + agent projects — the combination hiring fastest (AI engineer +143% YoY).",
  li:"Generative AI with LLMs — Coursera (DeepLearning.AI & AWS)",skills:["llm","prompt","embed"]},
 {id:"cert_dl",n:"Deep Learning Specialization",prov:"DeepLearning.AI · Coursera",track:"Data Science",after:"p7",optional:true,
  why:"Optional depth. Take it only if you're targeting core ML/DS engineering rather than BI/PM.",
  li:"Deep Learning Specialization — Coursera (DeepLearning.AI)",skills:["nn","cnn","dl"]}
];

/* ---------------- CAREER ARC (dashboard) ---------------- */
const ARC=[
 {id:"a0",title:"You are here",sub:"Operator & CEO — P&L, team-scaling, ops and marketing already banked.",nav:"skills",icon:"flag",done:()=>true},
 {id:"a1",title:"Foundations & AI literacy",sub:"Python, stats, data thinking + AI For Everyone.",nav:"roadmap",icon:"book",
  pct:()=>Math.round((phaseWeeksDone("p1")+phaseWeeksDone("p2")+phaseWeeksDone("p3"))/12*100)},
 {id:"a2",title:"Analyst toolkit + first certs",sub:"SQL · Power BI/Tableau · Google Data Analytics — your first hireable skill set.",nav:"roadmap",icon:"chart",
  pct:()=>{let a=phaseWeeksDone("p4")/4*60;a+=(certEarned("cert_gda")?20:0)+(certEarned("cert_tableau")?20:0);return Math.round(a);}},
 {id:"a3",title:"Proof of work",sub:"GitHub portfolio — the proof that replaces a brand-name employer.",nav:"projects",icon:"cube",
  pct:()=>Math.round(Math.min(projDoneCount(),6)/6*100)},
 {id:"a4",title:"Premium AI/ML edge",sub:"ML → Cloud → GenAI → Agents — the highest-paid differentiator.",nav:"roadmap",icon:"spark",
  pct:()=>{const ps=["p5","p6","p7","p8","p9","p10","p11"];return Math.round(ps.reduce((a,p)=>a+phaseWeeksDone(p),0)/(ps.length*4)*100);}},
 {id:"a5",title:"Leadership layer",sub:"Management modules + PM/leadership certs — grow right, not just technical.",nav:"roadmap",icon:"crown",
  pct:()=>Math.round(LEADERSHIP.filter(m=>modDone(m.id)).length/LEADERSHIP.length*100)},
 {id:"a6",title:"Positioned to apply",sub:"LinkedIn, Naukri & résumé rebuilt around your new skills and certs.",nav:"jobs",icon:"target",
  pct:()=>state.profile.positioned?100:0,toggle:true},
 {id:"a7",title:"Hired",sub:"A high-paying Product / BI / Data role at a recognised company.",nav:"jobs",icon:"trophy",summit:true,
  pct:()=>Object.values(state.jobs).some(j=>j&&j.status==="Offer")?100:0}
];

const DEFAULT_SUGGESTIONS=[
 {id:"s1",text:"Start Month 1 — Python foundations",detail:"Open the Roadmap, expand Stage 1, and begin the CodeWithHarry Python course. Aim for 10–12 hrs this week.",prio:"hi"},
 {id:"s2",text:"Create your GitHub account today",detail:"It's the proof that replaces a brand-name employer. Every project lands here — I'll walk you through your first repo in Month 2.",prio:"hi"},
 {id:"s3",text:"Enrol in AI For Everyone + Google PM (Coursera)",detail:"Your two parallel leadership credentials. AI literacy is the #1 skill on the rise in 2026 — start both in week 1.",prio:"med"},
 {id:"s4",text:"Log your study hours every Sunday",detail:"Open Weekly Log and record what you studied. Consistency (10–14 hrs/wk) is the entire game — not intensity.",prio:"med"},
 {id:"s5",text:"Tell me whenever you finish a course",detail:"I'll tick the skills, hand you the exact LinkedIn + résumé text, and give you the next project to build.",prio:"low"}
];

const NAV=[
 {id:"dashboard",label:"Base Camp",short:"Base",tag:"map"},{id:"roadmap",label:"Roadmap",short:"Roadmap",tag:"12+6"},
 {id:"skills",label:"Skills",short:"Skills",tag:""},{id:"certs",label:"Certificates",short:"Certs",tag:""},
 {id:"projects",label:"Projects",short:"Projects",tag:""},{id:"log",label:"Weekly Log",short:"Log",tag:""},{id:"jobs",label:"Job Hunt",short:"Jobs",tag:""}
];
const ICONS={
 dashboard:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
 roadmap:'<path d="M9 4l6 2 5-2v14l-5 2-6-2-5 2V6z"/><path d="M9 4v14M15 6v14"/>',
 skills:'<path d="M9 12l2 2 4-4"/><path d="M12 3l7 4v5c0 4.4-3 8.3-7 9-4-.7-7-4.6-7-9V7z"/>',
 certs:'<circle cx="12" cy="9" r="5"/><path d="M9 13l-2 8 5-3 5 3-2-8"/>',
 projects:'<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>',
 log:'<path d="M4 20V4M4 20h16M8 16V9M13 16V6M18 16v-4"/>',
 jobs:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>'};
const ARCICON={
 flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',book:'<path d="M4 5a2 2 0 0 1 2-2h9v16H6a2 2 0 0 0-2 2z"/><path d="M15 3h3a1 1 0 0 1 1 1v15"/>',
 chart:'<path d="M4 20V4M4 20h16M8 16V9M13 16V6M18 16v-4"/>',cube:'<path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8"/>',
 spark:'<path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
 crown:'<path d="M3 8l4 4 5-7 5 7 4-4v10H3z"/>',target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
 trophy:'<path d="M7 4h10v4a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M9 20h6M12 15v5"/>'};

/* ===================================================================== */
