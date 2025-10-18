# Braindler Admin

Modern admin panel for Braindler Secretary - AI Secretary Bot management system.

## Features

- **AICS Scripts Management**: Create, edit and manage AI Chat Scripts
- **Dialog History**: View and analyze conversation history
- **Document Management**: Manage knowledge base documents
- **Monitoring**: Real-time system monitoring and analytics
- **Responsive Design**: Works on desktop, tablet and mobile

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Query
- React Router
- Recharts for analytics

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at http://localhost:8080

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Backend API

The admin panel connects to the Braindler Assistant Backend API:

- Base URL: http://localhost:3000
- API endpoints:
  - `/scripts` - AICS scripts management
  - More endpoints to be added...

## Project Structure

```
braindler-admin/
├── src/
│   ├── components/       # Reusable components
│   │   ├── layout/      # Layout components
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── lib/             # Utilities
│   └── ...
├── public/              # Static assets
└── ...
```

## License

MIT

