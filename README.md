# UCourseMap

A University of Alberta course planning tool that helps students visualize course prerequisites, build schedules, and navigate degree requirements through an interactive web interface.

## Features

- **Course Search**: Find courses by department, code, or keywords
- **Prerequisite Visualization**: Interactive tree view of course prerequisites and corequisites
- **Course Details**: Comprehensive course information including descriptions, units, and requirements
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL via Supabase with Prisma ORM
- **State Management**: React Query for server state

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (Supabase recommended)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd u-coursemap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env .env.local
   ```

   Configure your environment variables:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   ```

4. **Database setup**
   ```bash
   npm run migrate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Usage

### Course Search
- Navigate to the main page
- Use the search bar to find courses by department (e.g., "CMPUT") or course code (e.g., "CMPUT 101")
- Browse results with course titles, codes, and units

### Viewing Prerequisites
- Click on any course to view detailed information
- Explore the prerequisite tree to understand course dependencies
- Navigate through connected courses by clicking prerequisite links

### Course Information
- View comprehensive course details including:
  - Course description and learning objectives
  - Credit units and grading schemes
  - Prerequisite and corequisite requirements
  - Discussions about the course in Reddit ( Future implementation )

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run migrate` - Run database migrations

### Project Structure

```
actions/           # Server actions for data fetching
app/              # Next.js app router pages and layouts
components/       # Reusable UI components
db/               # Database schema and types
hooks/            # Custom React hooks
lib/              # Utility functions and helpers
scripts/          # Data processing scripts
styles/           # Global styles and Tailwind config
```

### Key Components

- **CourseSearch**: Main search interface with debounced input
- **RequisiteTree**: Interactive prerequisite visualization
- **CourseCard**: Course information display component
- **ThemeProvider**: Dark/light mode toggle functionality

## API

The application uses Next.js Server Actions for data fetching:

- `getCourseDetails(courseCode)` - Fetch detailed course information
- Course data is cached and optimized for performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting: `npm run lint && npm run format`
5. Submit a pull request

## License

This project is for educational purposes at the University of Alberta.