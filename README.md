# 📊 Modern Dashboard

A beautiful, responsive dashboard built with Next.js 15, featuring real-time analytics, interactive charts, and a stunning dark/light theme system.

## ✨ Features

- 🎨 **Beautiful UI/UX** - Modern design with shadcn/ui components
- 🌓 **Dark/Light Theme** - Seamless theme switching with next-themes
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 📊 **Interactive Charts** - Line charts, bar charts, and pie charts with Recharts
- 🎯 **Real-time Metrics** - Dashboard cards showing key business metrics
- 🎭 **Theme-Aware Charts** - Charts automatically adapt to light/dark mode
- ⚡ **Performance Optimized** - Built with Next.js 15 and Turbopack
- 🧩 **Component Architecture** - Modular, reusable components
- 🔔 **Notifications** - Bell icon dropdown with categorized notifications (success, info, warning)
- 🗂️ **Collapsible Sidebar** - Expandable/collapsible navigation on desktop; slide-over overlay on mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: next-themes
- **Typography**: Geist Font Family
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 Dashboard Features

### Analytics Cards
- **Total Revenue**: Track your business revenue with percentage changes
- **Active Users**: Monitor user engagement metrics
- **User Conversion**: Measure individual user conversion
- **Conversion Rate**: Measure overall conversion performance
- **Active Sessions**: Real-time session tracking

### Interactive Charts
- **Sales Overview**: Monthly sales performance line chart
- **User Engagement**: Weekly active users bar chart
- **Traffic Sources**: Desktop/Mobile/Tablet distribution donut chart

### Navigation & Layout
- **Sidebar**: Dashboard and Settings navigation items; collapses to icon-only view on desktop
- **Header**: Search, notifications bell (with dropdown), theme toggle, and user avatar
- **User Profile**: Persistent user section at the bottom of the sidebar

### Design System
- Consistent color palette that works in both themes
- Responsive grid layouts
- Smooth animations and transitions
- Accessible UI components

## 🎨 Theme System

The dashboard features a sophisticated theme system:
- **Light Mode**: Clean, bright interface perfect for daytime use
- **Dark Mode**: Easy-on-the-eyes dark interface for low-light environments
- **Automatic Chart Adaptation**: Charts dynamically update colors based on the current theme
- **System Preference Detection**: Respects user's OS theme preference

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablet viewing
- **Desktop Enhanced**: Full-featured desktop experience
- **Flexible Grids**: Charts and cards adapt to screen size

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Redirects to /dashboard
│   └── dashboard/
│       └── page.tsx         # Dashboard page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── AppHeader.tsx        # Application header with notifications and theme toggle
│   ├── AppSidebar.tsx       # Collapsible navigation sidebar with user profile
│   ├── DashboardCards.tsx   # Reusable metric card components
│   ├── DashboardCharts.tsx  # Stat cards and charts page component
│   ├── LayoutWrapper.tsx    # Layout container (sidebar + header + main)
│   ├── mode-toggle.tsx      # Theme toggle button
│   └── theme-provider.tsx   # Theme context provider
└── lib/
    ├── charts.tsx           # MiniLineChart and MiniBarChart utilities
    └── utils.ts             # Utility functions
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push

### Other Platforms
The built application can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Recharts](https://recharts.org/) - Composable charting library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons

---

Built with ❤️ using Next.js and modern web technologies.
