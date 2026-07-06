// All content sourced from Suraj Singh's resume (abc.tex).
// NOTE: projects marked `template: true` are aesthetic portfolio additions —
// swap their copy/links with your real work whenever you like.

export const profile = {
  name: 'Suraj Singh',
  firstName: 'Suraj',
  lastName: 'Singh',
  role: 'Data Engineer',
  specialization: 'Big Data & Analytics',
  location: 'Bangalore, India',
  stack: [
    'Python',
    'SQL',
    'PySpark',
    'Snowflake',
    'Microsoft Fabric',
    'Databricks',
    'Azure',
    'AWS',
  ],
  summary:
    'Data Engineer with more than a year of experience building batch and incremental ETL/ELT pipelines and Lakehouse solutions on Microsoft Fabric, Azure, Snowflake, and Databricks. Focused on dimensional data modeling, data quality, and performance optimization for production-grade analytics.',
  intro:
    "I build the invisible machinery behind analytics — batch & streaming pipelines, Lakehouse platforms, and data models that stay fast at scale. Right now I'm engineering cloud-native data systems at Endava.",
  stats: [
    { value: '80K+', label: 'Records processed daily' },
    { value: '99%+', label: 'Pipeline reliability' },
    { value: '6', label: 'Cloud & data certifications' },
    { value: '9.5', label: 'CGPA / 10' },
  ],
  contacts: {
    email: 'surajsinghshan53@gmail.com',
    phone: '+91-6005240994',
    linkedin: 'https://linkedin.com/in/surajsingh53',
    github: 'https://github.com/SurajSingh53',
  },
}

export const skills = [
  {
    title: 'Languages',
    items: ['Python', 'SQL', 'Spark SQL', 'C++', 'Java'],
  },
  {
    title: 'Data Engineering & ETL',
    items: [
      'PySpark',
      'Apache Spark',
      'Structured Streaming',
      'ETL / ELT',
      'Batch & Incremental Loading',
      'CDC',
      'Apache Kafka',
      'Apache Airflow',
      'dbt',
      'SSIS',
    ],
  },
  {
    title: 'Lakehouse & Warehousing',
    items: [
      'Delta Lake',
      'Medallion Architecture',
      'Data Lake',
      'Data Warehousing',
      'Microsoft Fabric (OneLake)',
      'Snowflake',
      'Databricks',
    ],
  },
  {
    title: 'Data Modeling',
    items: [
      'Dimensional Modeling',
      'Star Schema',
      'Fact & Dimension Tables',
      'SCD',
      'Data Marts',
      'Schema Evolution',
      'Partitioning',
    ],
  },
  {
    title: 'Data Quality & Governance',
    items: [
      'Data Validation',
      'Data Quality',
      'Data Governance',
      'Data Lineage',
      'Metadata Management',
      'Monitoring & Alerting',
      'Query Optimization',
    ],
  },
  {
    title: 'Cloud & DevOps',
    items: ['Azure', 'AWS', 'GCP', 'Git', 'Docker', 'CI/CD', 'Linux', 'FastAPI', 'REST APIs'],
  },
  {
    title: 'Databases & BI',
    items: [
      'PostgreSQL',
      'MySQL',
      'SQL Server',
      'MongoDB',
      'Redis',
      'Power BI',
      'Tableau',
    ],
  },
  {
    title: 'Machine Learning & AI',
    items: ['Machine Learning', 'NLP', 'LLMs', 'RAG', 'Vector Search', 'Hugging Face'],
  },
]

export const experience = [
  {
    role: 'Junior Data Engineer',
    company: 'Endava LLC',
    logoUrl: '/logos/endava.png',
    location: 'Bangalore, India',
    period: 'Feb 2025 — Present',
    current: true,
    points: [
      'Engineered an AI-powered student application and course-recommendation platform on Microsoft Azure (Copilot Studio, Dynamics 365 CRM, Power Apps), building data-integration workflows across 5+ admission processes handling 10K+ student records and cutting manual review effort by 35%.',
      'Migrated 15+ services of a grant-management platform to GCP, re-architecting Python batch and incremental pipelines with monitoring and error handling that reduced document-processing time by 45% and infrastructure costs by 20%.',
      'Co-designed a modular AI guardrail and data-governance framework adopted across 3+ enterprise initiatives, with deterministic validation pipelines and locally deployed LLMs (Ollama) that flagged 95%+ of sensitive PII/PHI.',
      'Built cloud-native batch and incremental ETL pipelines (Python, FastAPI, REST APIs) with data-quality checks, ingesting and transforming 50K+ business records daily at 99%+ pipeline reliability.',
      'Partnered with solution architects, platform engineers, and client stakeholders across Azure and GCP, using Git-based CI/CD and Agile delivery to ship production-ready data and AI solutions.',
    ],
  },
  {
    role: 'Machine Learning Engineer Intern',
    company: 'Ignitus',
    logoUrl: '/logos/ignitus.png',
    location: 'Remote',
    period: 'Sep 2023 — Mar 2024',
    current: false,
    points: [
      'Built a custom text-generation system using Markov Models and Hidden Markov Models on 100K+ Reddit posts in Python, cutting manual content-generation effort by 30%.',
      'Developed an NLP sentiment-analysis pipeline processing 1,000+ URLs per run, engineering 10+ sentiment features with overall polarity scoring for downstream analytics.',
      'Designed reproducible ML pipelines processing 50K+ text records end-to-end — data ingestion, feature engineering, model evaluation, and experiment tracking.',
    ],
  },
]

const GITHUB = 'https://github.com/SurajSingh53'

export const projects = [
  {
    title: 'Manufacturing Analytics Platform',
    kind: 'lakehouse',
    repoUrl: GITHUB,
    year: '2026',
    summary:
      'Lakehouse analytics platform on Microsoft Fabric (OneLake) and Snowflake using Medallion Architecture with Delta Lake to unify raw manufacturing data into analytics-ready layers.',
    detail:
      'Built batch and incremental PySpark & Spark SQL ETL pipelines with partitioning, schema evolution, and data-quality checks, modeling Star-Schema Gold marts consumed by Power BI.',
    tags: ['PySpark', 'Microsoft Fabric', 'Delta Lake', 'Snowflake', 'Power BI'],
    accent: 'from-indigo-500/30 to-sky-500/20',
    template: false,
  },
  {
    title: 'Alex — RAG Assistant',
    kind: 'rag',
    repoUrl: 'https://github.com/SurajSingh53/alex',
    year: '2025',
    summary:
      'LLM-powered document-intelligence platform for contextual question answering and knowledge retrieval over unstructured documents.',
    detail:
      'Implemented a RAG pipeline with semantic search using Sentence Transformers and a vector database (Pinecone / Chroma), delivering source-grounded responses to reduce hallucinations.',
    tags: ['Python', 'LLMs', 'RAG', 'Vector Search', 'NLP'],
    accent: 'from-violet-500/30 to-fuchsia-500/20',
    template: false,
  },
  {
    title: 'Real-Time Market Data Pipeline',
    kind: 'streaming',
    repoUrl: 'https://github.com/SurajSingh53/end-to-end-pipeline',
    year: '2025',
    summary:
      'Real-time market-data platform using Apache Kafka and Spark Structured Streaming with incremental loading and CDC into Snowflake.',
    detail:
      'Orchestrated batch and streaming workflows with Apache Airflow and implemented modular SQL transformations with dbt tests for data quality and analytics-ready datasets.',
    tags: ['Kafka', 'Structured Streaming', 'Airflow', 'Snowflake', 'dbt'],
    accent: 'from-sky-500/30 to-emerald-500/20',
    template: false,
  },
  {
    title: 'Streaming Fraud Detection Engine',
    kind: 'fraud',
    repoUrl: GITHUB,
    year: '2025',
    summary:
      'Sub-second anomaly-scoring service on high-velocity transaction streams, flagging suspicious activity before settlement.',
    detail:
      'Kafka ingestion into Spark Structured Streaming with stateful windowing and feature enrichment, writing scored events to Delta Lake on Databricks with alerting hooks.',
    tags: ['Kafka', 'Spark Streaming', 'Delta Lake', 'Databricks'],
    accent: 'from-rose-500/30 to-orange-500/20',
    template: true,
  },
  {
    title: 'Serverless Lakehouse on Azure',
    kind: 'serverless',
    repoUrl: GITHUB,
    year: '2024',
    summary:
      'Cost-efficient, fully serverless Lakehouse blueprint automating ingestion, transformation, and governance across domains.',
    detail:
      'Azure Data Factory orchestration into Microsoft Fabric with Delta Lake medallion layers, dbt transformations, and column-level lineage for auditable analytics.',
    tags: ['Azure Data Factory', 'Microsoft Fabric', 'Delta Lake', 'dbt'],
    accent: 'from-cyan-500/30 to-blue-500/20',
    template: true,
  },
  {
    title: 'Retail Demand Forecasting Warehouse',
    kind: 'warehouse',
    repoUrl: GITHUB,
    year: '2024',
    summary:
      'Analytics warehouse powering SKU-level demand forecasts and inventory insights for merchandising teams.',
    detail:
      'Airflow-scheduled ELT into Snowflake with dbt-tested star-schema marts, feeding forecasting models and executive Power BI dashboards.',
    tags: ['Snowflake', 'dbt', 'Airflow', 'Power BI'],
    accent: 'from-emerald-500/30 to-teal-500/20',
    template: true,
  },
]

// All certifications link to your LinkedIn certifications section by default.
// Replace individual `verifyUrl` values with the exact Credly / vendor
// credential URLs whenever you have them.
const LINKEDIN_CERTS = 'https://www.linkedin.com/in/surajsingh53/details/certifications/'

export const certifications = [
  {
    name: 'Fabric Data Engineer Associate',
    code: 'DP-700',
    issuer: 'Microsoft',
    logo: '/logos/microsoft.svg',
    verifyUrl: 'https://learn.microsoft.com/en-in/users/surajsingh-5840/credentials/89026df373673c1',
  },
  {
    name: 'Fabric Analytics Engineer Associate',
    code: 'DP-600',
    issuer: 'Microsoft',
    logo: '/logos/microsoft.svg',
    verifyUrl: 'https://learn.microsoft.com/en-in/users/SurajSingh-5840/credentials/1B1C0CF712D31EE2',
  },
  {
    name: 'SnowPro Core Certified',
    code: 'Snowflake',
    issuer: 'Snowflake',
    logo: '/logos/snowflake.svg',
    verifyUrl: 'https://achieve.snowflake.com/6c366bd9-1f25-474e-b4b0-506f23af4f10',
  },
  {
    name: 'Data Engineer Associate',
    code: 'Databricks',
    issuer: 'Databricks',
    logo: '/logos/databricks.svg',
    verifyUrl: 'https://credentials.databricks.com/61f20d9d-556c-4431-9543-cbd47def800e',
  },
  {
    name: 'Cloud Practitioner',
    code: 'AWS',
    issuer: 'Amazon Web Services',
    logo: '/logos/aws.svg',
    verifyUrl: 'https://www.credly.com/badges/258dd3be-8470-4383-a136-d30d6129dced',
  },
  {
    name: 'Data Analytics',
    code: 'IBM',
    issuer: 'IBM',
    logo: '/logos/ibm.svg',
    verifyUrl: LINKEDIN_CERTS,
  },
]

export const education = {
  school: 'Walchand Institute of Technology',
  degree: 'B.Tech in Computer Science Engineering (AI & ML)',
  period: '2021 — 2025',
  score: 'CGPA 9.5 / 10',
}

export const achievements = [
  {
    title: 'Smart India Hackathon Finalist',
    detail: 'AI-Based Power System Vulnerability Detection',
  },
  {
    title: 'Scopus-Indexed Publication',
    detail: 'ML-Based Legal Document Translation and Simplification',
  },
]
