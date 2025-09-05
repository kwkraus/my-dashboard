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
git clone https://github.com/kwkraus/my-dashboard.git
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
- **Total Revenue**: $45,231.89 with +20.1% growth from last month
- **Active Users**: 2,350 users with +180.1% growth from last month
- **User Conversion**: 2.5% rate with +0.3% improvement from last month
- **Conversion Rate**: 12.5% with -4.3% change from last month
- **Active Sessions**: 573 sessions with +12.1% growth from last month

### Interactive Charts
- **Sales Overview**: Monthly sales performance line chart
- **User Engagement**: Weekly active users bar chart  
- **Traffic Sources**: Distribution pie chart for traffic analysis

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
│   ├── page.tsx             # Home page (redirects to /dashboard)
│   └── dashboard/
│       └── page.tsx         # Dashboard page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── AppHeader.tsx        # Application header
│   ├── AppSidebar.tsx       # Navigation sidebar
│   ├── DashboardCards.tsx   # Metric cards component
│   ├── DashboardCharts.tsx  # Charts components
│   ├── LayoutWrapper.tsx    # Layout container
│   ├── mode-toggle.tsx      # Theme toggle button
│   └── theme-provider.tsx   # Theme context provider
└── lib/
    ├── charts.tsx           # Mini chart components
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
