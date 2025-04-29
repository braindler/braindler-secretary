## What is Braindler-Assistant?

Braindler-Assistant представляет собой мультиканального AI-помощника, ориентированного на поддержку и продажи через мессенджеры.

## 🧠 Что такое Braindler-Assistant?

**Braindler-Assistant** — это интеллектуальный бот, работающий в мессенджерах (Telegram, WhatsApp, Line, WeChat, Instagram), который:

- Следует заранее заданному **AI-чат-скрипту** — блочной структуре с описанием сообщений и возможными ответами.
- Если пользователь выходит за рамки **AI-чат-скрипта**, бот пытается **импровизировать**
- Предлагаются пожелания для улучшения **AI-чат-скрипта** на основе пользовательских диалогов.
- При неоюходимости параллельно пересылает сообщения оператору, позволяя ему вмешиваться в диалог в реальном времени.
- Если оператор не отвечает в течение определенного времени, ии-автоматически продолжает диалог.
- Запоминает уникальный стиль ответов разных операторов и старается не смешивать их между собой.
- Поддерживает мультиязычное общение, корректируя ответы для улучшения пользовательского опыта

---

## 🚀 Основные возможности

- **Мультиканальная поддержка**: Telegram, WhatsApp, Line, WeChat, Instagram.
- **AI-чат-скрипты**: гибкая настройка диалогов с возможностью импровизации.
- **Полуавтоматический режим**: оператор может вмешиваться в диалог в реальном времени.
- **Обучение на опыте**: бот предлагает обновления скриптов на основе предыдущих диалогов.
- **Уникальные стили операторов**: бот запоминает и различает стили общения разных операторов.
- **Мультиязычность**: поддержка общения на разных языках с автоматической коррекцией. 
---

## 🧩 Применение

- **Поддержка клиентов**: автоматизация ответов на часто задаваемые вопросы.
- **Продажи**: ведение диалогов с потенциальными клиентами и сопровождение сделок.
- **Маркетинг**: проведение опросов, рассылок и акций через мессенджеры по клиентской базе с согласия пользователя.
- **Обратная связь**: сбор отзывов и предложений от пользователей.

---

## 🔧 Технологии

-
- **Интеграции**: Telegram API, WhatsApp Business API, Line Messaging API и другие.


Braindler-Assistant — это мощный инструмент для автоматизации общения с клиентами, сочетающий в себе гибкость AI и контроль оператора.

# 🧠 Braindler LLM-RAG Core

**Braindler-llm-rag** is the core engine behind the Braindler intelligent assistant platform, combining the power of a Large Language Model (LLM) with Retrieval-Augmented Generation (RAG) techniques.  
The project provides a universal backend for retrieving knowledge from user data and generating precise, factual responses.

---

## 📚 Project Overview

Braindler-llm-rag enables:
- Indexing user documents into a vector database.
- Retrieving relevant knowledge fragments in response to user queries.
- Building a context prompt for the LLM based on retrieved data.
- Generating accurate, fact-based answers using private information.

The system is designed for **data privacy**, **scalability**, and **easy integration** with various clients (such as Telegram bots, web apps, etc.).

---

## 🏛️ Architecture

The Braindler-llm-rag architecture consists of the following core components:

### 1. **User Query**  
The user sends a query via an external client (e.g., bot, web interface, API gateway).

### 2. **Preprocessing**  
The backend:
- Normalizes the text.
- Detects the query language.
- Prepares the query for retrieval.

### 3. **RAG Pipeline**

**Retrieval:**
- The query is embedded into a vector using an embedding model.
- A vector search is performed against the vector database (e.g., FAISS, Milvus, Pinecone).
- The top-N most relevant document fragments are retrieved.

**Augmentation:**
- Retrieved fragments are assembled into a context.
- The user query + context are combined into a structured prompt for the LLM.

### 4. **Generation**
- The prompt is sent to the LLM (e.g., Llama 3.1 hosted locally or via API).
- The LLM generates a natural language response based on the provided context.

### 5. **Postprocessing**
- The response is cleaned, formatted, and prepared for delivery.
- The answer is sent back to the client (bot, frontend, API).

---

## 🔥 Key Technical Components

| Component | Description |
|:----------|:------------|
| **Backend** | FastAPI server implementing the RAG pipeline and exposing public/private APIs. |
| **Embedding Model** | Sentence-Transformer (e.g., `all-MiniLM-L6-v2`) or a domain-specific multilingual model. |
| **Vector Store** | FAISS (local) or Milvus/Pinecone (cloud) for vector search and knowledge retrieval. |
| **LLM Core** | Llama 3.1 model deployed locally on GPU, accessed via HuggingFace or llama.cpp server. |
| **Monitoring** | Prometheus/Grafana stack to monitor system metrics and performance KPIs. |

---

## 🚀 Quick Start

```bash
git clone https://github.com/braindler/braindler-llm-rag.git
cd braindler-llm-rag
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Index documents into the knowledge base:
```bash
python scripts/index_documents.py --path ./knowledge_base/
```

Run the backend server:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Start the LLM inference server separately (if needed):
```bash
python scripts/run_llm_server.py
```

---

## ⚙️ Main API Endpoints

| Method | URL | Description |
|:------|:----|:------------|
| `POST` | `/query` | Send a user question and receive a generated response. |
| `POST` | `/upload` | Upload new documents to index into the knowledge base. |
| `GET` | `/health` | Health check of the service. |

---

## 🧩 Configuration (.env Example)

```env
VECTOR_DB_TYPE=faiss
VECTOR_DB_PATH=./vector_store
EMBEDDING_MODEL=all-MiniLM-L6-v2
LLM_API_URL=http://localhost:5000/generate
TOP_K_DOCUMENTS=5
PROMPT_TEMPLATE_PATH=./prompts/default.txt
```

---

## 📈 Monitoring and Metrics

Braindler-llm-rag exports Prometheus metrics:
- `request_processing_time_seconds`
- `vector_search_time_seconds`
- `llm_inference_time_seconds`
- `query_success_rate`

A pre-built Grafana dashboard is available for quick setup.

---

## ⚡ Usage Examples

Example query:
```bash
curl -X POST http://localhost:8000/query \
-H "Content-Type: application/json" \
-d '{"question": "What is the duration of the lease agreement?"}'
```

Example response:
```json
{
  "answer": "The lease agreement is valid for 11 months with the possibility of extension."
}
```

---

## 📜 License

The project is distributed under the MIT License.  
We welcome contributions via Pull Requests and Issue reports!

---

# 🚀 Join the Braindler Journey!

Braindler-llm-rag powers intelligent systems where your data stays private, and knowledge is always within reach.
