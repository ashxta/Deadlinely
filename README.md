
# Deadlinely - AI-Powered Productivity & Task Management

Boost your productivity with **Deadlinely**, an AI-powered task management app that intelligently organizes your to-do list based on priorities, deadlines, and estimated completion times.  
It features a futuristic, **cyberpunk-inspired user interface** designed to make task management an engaging experience.

---

## ✨ Features

- **Intelligent Task Management** → Create, track, complete, and delete tasks with ease.  
- **AI-Powered Planning** → Leverage the AI Planning Assistant to automatically generate an optimized schedule for your day based on task priority, deadlines, and estimated time.  
- **Dynamic Prioritization** → Use a 5-star rating system to set task priorities, which dynamically reorders your task list.  
- **Productivity Insights** → Visualize your progress with a dynamic productivity score and detailed stats, including completion rate, overdue tasks, and estimated time remaining.  
- **Futuristic UI** → A unique, cyberpunk-themed interface with neon glows, floating elements, and smooth animations to keep you engaged.  
- **Persistent State** → Your tasks are automatically saved to `localStorage`, so you never lose your progress.  
- **Responsive Design** → A seamless experience across desktop and mobile devices.  

---

## 🛠️ Technologies Used

This project is built with a modern, robust tech stack:

- **Framework**: [React](https://reactjs.org/)  
- **Build Tool**: [Vite](https://vitejs.dev/)  
- **Language**: [TypeScript](https://www.typescriptlang.org/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)  
- **Routing**: [React Router DOM](https://reactrouter.com/)  
- **State Management**: [TanStack Query](https://tanstack.com/query/)  
- **Forms**: [React Hook Form](https://react-hook-form.com/)  
- **Animations**: [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)  

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

Ensure you have Node.js installed.  
It’s recommended to use **nvm** (Node Version Manager) to manage Node.js versions:

- [Install Node.js with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/ashxta/deadline-genius.git
````

2. **Navigate to the project directory**

   ```sh
   cd deadline-genius
   ```

3. **Install dependencies**

   ```sh
   npm install
   ```

4. **Run the development server**

   ```sh
   npm run dev
   ```

The app will be available at 👉 `http://localhost:8080` (or the next available port).

---

## 📂 Project Structure

```
/
├── public/              # Static assets (icons, images)
├── src/
│   ├── components/      # Reusable components (UI, TaskCard, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Application pages (Index, NotFound)
│   ├── App.tsx          # Main application component with routing
│   ├── index.css        # Global styles and Tailwind directives
│   └── main.tsx         # Application entry point
├── tailwind.config.ts   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```




