# Blox Fruits Stock Monitor

A modern Next.js application for monitoring Blox Fruits stock availability and market trends.

## Features

- 🎯 Real-time stock monitoring
- 📊 Market statistics and analytics
- 🔍 Advanced search and filtering
- 📱 Responsive design
- 🌙 Dark theme
- ⚡ Fast and modern UI

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom components with modern design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bloxfruits-stock
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # Base UI components
│   ├── layout/        # Layout components
│   └── features/      # Feature components
├── lib/               # Utility functions
├── types/             # TypeScript type definitions
└── data/              # Static data and mock data
```

## Color Theme

The application uses a dark theme inspired by modern trading platforms:

- **Background**: `#1a1b23` (Deep blue-gray)
- **Secondary Background**: `#2a2d3a` (Lighter dark)
- **Primary**: `#3b82f6` (Blue)
- **Success**: `#10b981` (Green)
- **Danger**: `#ef4444` (Red)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
