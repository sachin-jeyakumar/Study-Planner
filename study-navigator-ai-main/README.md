# Study Planner

An intelligent study planning application built with React, TypeScript, and shadcn/ui that helps students organize their learning journey with AI-powered features.

## 🚀 Features

- **Interactive Dashboard**: View your study progress, upcoming deadlines, and course statistics
- **AI Chat Interface**: Get instant help and study recommendations
- **Smart Quiz System**: Test your knowledge with interactive quizzes
- **File Upload**: Upload and manage your study materials
- **Progress Tracking**: Visual progress indicators and study analytics
- **Course Management**: Organize and track multiple courses
- **Topic Navigation**: Navigate through course topics with an intuitive interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Setup

1. Clone the repository:
```bash
git clone https://github.com/sachin-jeyakumar/Study-Planner.git
cd Study-Planner
```

2. Navigate to the project directory:
```bash
cd study-navigator-ai-main
```

3. Install dependencies:
```bash
npm install
# or
bun install
```

4. Start the development server:
```bash
npm run dev
# or
bun dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 📁 Project Structure

```
study-navigator-ai-main/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ChatInterface.tsx
│   │   ├── CourseCard.tsx
│   │   ├── FileUpload.tsx
│   │   ├── QuizInterface.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── data/               # Mock data and constants
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Key Components

- **ChatInterface**: AI-powered chat for study assistance
- **QuizInterface**: Interactive quiz system with multiple question types
- **CourseCard**: Display course information and progress
- **FileUpload**: Handle file uploads for study materials
- **ProgressRing**: Visual progress indicators
- **TopicNode**: Navigate through course topics

## 🌟 Usage

1. **Dashboard**: View your study overview, progress, and statistics
2. **Chat**: Ask questions and get AI-powered study recommendations
3. **Quiz**: Test your knowledge with interactive quizzes
4. **Upload**: Add your study materials and documents
5. **Courses**: Manage and track your enrolled courses

## 🔧 Configuration

The project uses several configuration files:

- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript compiler options
- `components.json` - shadcn/ui component configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Sachin Jeyakumar**

- GitHub: [@sachin-jeyakumar](https://github.com/sachin-jeyakumar)

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Powered by [Vite](https://vitejs.dev/)

