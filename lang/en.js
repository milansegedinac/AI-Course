window.__translations__ = {
  "nav": {
    "about":   "About",
    "setup":   "Course",
    "lessons": "Lessons",
    "contact": "Contact",
    "cta":     "Apply"
  },
  "hero": {
    "tag":      "Sokraft & FTN Novi Sad",
    "title": {
      "bold":   "Master AI.",
      "italic": "Build Real Systems."
    },
"subtitle": "A hands-on engineering course covering machine learning, neural networks, LLMs, and autonomous AI agents — taught by researchers with 15+ years of production AI experience.",
    "cta":      "Apply today",
    "cta2":     "View curriculum"
  },
  "stats": {
    "sessions": { "num": "14", "label": "Sessions" },
    "duration": { "num": "2h",        "label": "Per session" },
    "months":   { "num": "2",         "label": "Months" },
    "start":    { "num": "Fall 2026", "label": "Next cohort" },
    "price":    { "num": "1200€",     "label": "Course price" }
  },
  "curriculum": {
    "heading": "Lessons",
    "part0": {
      "label": "Intro",
      "title": "What Can AI Do?",
      "session0": "Introductory lecture: ML and AI agents",
      "session0_content": "Through the analysis of a real-world FinTech system for loan application processing, participants trace the evolution of information systems—from classic digitalization, through the integration of AI services, to the introduction of intelligent agents. The lecture focuses on the specific problems that artificial intelligence solves, providing a clear motivation for introducing each individual technique. The first section analyzes traditional web systems, mapping out the processes where employees are still forced to manually perform reasoning tasks and process unstructured data. The second section introduces AI services (such as computer vision, machine learning, and LLMs) to automate specific tasks, explaining their advantages as well as their limitations regarding business process rigidity. The third section presents the transition to systems based on intelligent agents and orchestrators that manage the process flow declaratively. By positioning AI tools within the continuum of digitalization, participants gain a broader perspective and a solid conceptual framework for understanding advanced techniques in the remainder of the course."
    },
    "part1": {
      "label": "Module 1",
      "title": "What AI Is?",
      "session1": "Learning from data: Introduction to AI and machine learning",
      "session1_content": "In this lesson, participants are introduced to the concept of generalization from data. The key question we address is how a program, using available examples, can independently improve its performance — for instance, how a program that estimates property values can use historical data to make more accurate decisions in the future. In addition, the concepts of supervised and unsupervised learning are elaborated in detail, along with data preparation methods for extracting maximum information. The lesson describes the workflow of a typical machine learning project and introduces the project phases and types of machine learning.",
      "session2": "Working with tabular data: prediction models (regression and decision trees)",
      "session2_content": "In this lesson, participants are introduced to exploratory data analysis, covering the loading of tabular data, its inspection, and the interpretation of descriptive statistics parameters. Special attention is given to feature engineering as a critical step in data preparation. Regression models are then applied to the prepared dataset, where participants learn how an algorithm trained on a limited set of data successfully generalizes and predicts values for entirely new, unseen examples. Linear regression is applied first, through which it is explained how a mathematical (parametric) model is derived from data. In addition to this classical approach, participants also learn non-parametric regression through the XGBoost algorithm.",
      "session3": "Categorizing data (classification)",
      "session3_content": "Using classification models, a program automatically recognizes the category to which a given data point belongs, based on examples it has previously encountered during training. In this way, the model can determine, for example, whether an X-ray contains pathological changes or whether a given property is a worthwhile investment. In this lesson, participants are introduced in detail to the concept of classification and its practical applications. Through concrete examples, it is analyzed how parametric models, such as logistic regression, and non-parametric models, such as the XGBoost algorithm, are used to effectively solve such problems.",
      "session4": "AI-driven reasoning: Neural networks",
      "session4_content": "In this lesson, participants are introduced to the fundamentals of deep learning and the key mathematical concepts behind neural networks. The anatomy of an artificial neuron is analyzed first, including characteristic activation functions, followed by the architecture of the Multilayer Perceptron. Special focus is placed on the mechanisms of forward propagation, backward propagation, and network parameter optimization via gradient descent. Participants will learn the role of key hyperparameters, loss functions, batch sizes, and epochs. Finally, neural networks are connected to previously studied concepts through a practical demonstration of their application to regression and classification problems.",
      "session5": "Handling visual information: Applied computer vision",
      "session5_content": "In this lesson, participants are introduced to the field of computer vision as a branch of artificial intelligence. The lecture covers fundamental concepts and practical applications of computer vision, such as object recognition and classification, detection of shapes, colors, textures, and motion, as well as motion analysis and scene structure understanding. The process of loading images from storage, along with their inspection and display within the development environment, is analyzed in detail.",
      "session6": "Generating and interpreting natural language using AI: LLMs",
      "session6_content": "Participants are introduced to the architecture and working principles of Large Language Models (LLMs), viewed through the lens of engineering practice and natural language processing mechanisms. The lecture covers the concept of autoregressive text generation, explaining how the model predicts the next token through the process of tokenization and vocabulary probability distribution, and how the temperature parameter controls the stochasticity of the response. The Transformer architecture is analyzed in detail through the steps of creating semantic embeddings and positional encoding, with a specific focus on the Self-Attention mechanism and the interaction between query, key, and value vectors during token contextualization. The course also encompasses the internal dynamics of the Transformer block—from expanding dimensionality within the feed-forward network and stabilization through residual connections and normalization, to mapping output vectors into concrete probability distributions—concluding the lesson with an analysis of inherent model limitations such as the context window and the nature of knowledge storage within network weights.",
      "session7": "Applying LLMs — RAG, MCP",
      "session7_content": "",
      "session8": "From content to actions: AI-driven architectures and agents. Team formation and project task presentation.",
      "session8_content": "Students are introduced to the role and integration of AI models within the architectures of real-world, production applications. The lecture covers the process of embedding a trained model into a web service and the mechanisms for accessing its functionalities via a REST API. The challenges of asynchronous access in high-load systems are analyzed in detail, alongside the necessity of introducing message queues for secure and reliable inter-service communication, with a specific focus on orchestrating multiple isolated AI services into complex business workflows. The session concludes with team formation and the presentation of project tasks that participants will develop throughout the second module.",
      "session9": "Test",
      "session9_content": ""
    },
    "part2": {
      "label": "Module 2",
      "title": "Project Work",
      "session10": "Solution architecture",
      "session10_content": "Teams present and explain their proposed architecture and datasets. They come with a list of open questions and dilemmas that are discussed as a group.",
      "session11": "AI model in the project solution",
      "session11_content": "Teams present and explain their technical solutions, with a focus on the choice of AI models they are using. They come with a list of dilemmas that are discussed as a group.",
      "session12": "Integrated project solution",
      "session12_content": "Teams demonstrate a software application that integrates AI models, user interaction, and software services.",
      "session13": "Final discussion and project presentations",
      "session13_content": "Teams present their final project implementations. Projects are evaluated and graded."
    }
  },
  "contact": {
    "heading": "Contact",
    "infoTitle": "Get in touch",
    "infoDesc": "Have questions about the course? Feel free to contact us via the form or directly.",
    "partner": "In collaboration with FTN Novi Sad",
    "form": {
      "name": "Full name",
      "namePlaceholder": "Your full name",
      "email": "Email address",
      "company": "Company",
      "companyPlaceholder": "Company name (optional)",
      "message": "Message",
      "messagePlaceholder": "Your message or question...",
      "submit": "Send application"
    }
  },
  "cta": {
    "label": "Investment in your career",
    "amount": "1000",
    "currency": " EUR",
    "note": "Participants use their own laptops for practical exercises",
    "button": "Apply today"
  },
  "courseSetup": {
    "heading": "Course Organization",
    "group1": {
      "title": "What is the course?",
      "pos": "The course covers AI and ML concepts that are becoming indispensable in solving software problems. The goal is to gain an understanding of AI concepts and adopt techniques for their use so you can integrate AI into real software systems.",
      "neg": "This is not a course on using AI coding assistants for faster software development. The focus is on understanding, implementing, and applying artificial intelligence techniques."
    },
    "group2": {
      "title": "Who is the course for?",
      "pos": "The course is intended for people who work in software development but are not familiar with AI and have not built software solutions that apply artificial intelligence.",
      "neg": "The course is not intended for those who already know ML algorithms, use ML models, RAG systems, and implement LLM agents in their solutions."
    },
    "p1": "The course consists of 14 sessions held in the evening, with the workload and commitment fully tailored to employed participants. The course lasts 2.5 months. Each session lasts 2 hours. Participants work on their own laptops.",
    "p2": "The first, introductory session presents the course content and provides a clear insight into the application of artificial intelligence in production applications, tracing the evolution and adoption of AI techniques through a real-world FinTech application example. The remaining sessions are split into two specialized modules.",
    "p3": "The first module is designed for participants to acquire a deep and intuitive understanding of the problems solved by artificial intelligence, as well as the techniques utilized in the process. During this section, significant theoretical, practical, and mathematical foundations of modern AI models are discussed in detail.",
    "p4": "The second module covers the direct application of artificial intelligence techniques in software solutions through hands-on project work. In this module, participants work in teams, and the sessions are dedicated to guiding them through the ideation and realization of their project solutions.",
    "p5": "The total price of the course is 1500 Euros."
  },
  "apply": {
    "heading": "Invest in your future",
    "note": "Participants work on their own laptops",
    "amount": "1500",
    "currency": " EUR",
    "button": "Apply now"
  },
  "about": {
    "heading": "Who are we?",
    "p1": "We are Sokraft, a software company from Novi Sad, led by professors from the Faculty of Technical Sciences. We have been working in the field of artificial intelligence for over 15 years, a track record backed by more than 50 scientific papers we have published in the AI domain. Alongside our research, we are actively engaged in commercial software development, having successfully participated in the realization of over 30 commercial projects, a large portion of which involves AI. Through our educational company Aleph, we organized web programming courses where hundreds of participants successfully launched their careers and secured jobs in the IT sector. Just as knowledge of web technologies was essential for serious development during the boom of web programming, today we are witnessing that practically all modern IT projects require operational knowledge of artificial intelligence. That is why we designed this course, which covers both the theoretical foundations and the real-world practical applications of modern AI, equipping participants to productively join new projects. We created this course with the goal of directly addressing the shortage of qualified AI engineers, passing on knowledge that bridges conceptual rigor and hands-on engineering practice.",
    "p2": "The course is intended for participants who already have prior programming experience. It is designed as an intensive program built to elevate participants' existing engineering skills to the level required for building modern AI solutions."
  }
};
