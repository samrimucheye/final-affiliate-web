
# AffiliateLink Hub (Firebase Removed Version)

AffiliateLink Hub is a Next.js application designed to help manage and promote affiliate links. This version has had Firebase (Authentication and Firestore) removed. It features AI-powered description generation.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Environment Variables (`.env` file)](#2-environment-variables-env-file)
  - [3. Install Dependencies](#3-install-dependencies)
  - [4. Run the Development Server](#4-run-the-development-server)
- [Troubleshooting](#troubleshooting)
  - [AI Description Generation Issues](#ai-description-generation-issues)
  - [Email Sending Issues (Contact Form)](#email-sending-issues-contact-form)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

- Display a static list of affiliate links.
- AI-powered product description generation using Genkit.
- Contact form with Nodemailer.
- Blog section with categories and posts (linked to Amazon products).
- Pricing page (placeholder).
- Dark/Light mode.
- Accessibility options dialog (font size, contrast, link highlighting).
- **Note:** User authentication, dynamic link management, and admin roles have been removed in this version.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ShadCN UI Components
- Genkit (for AI features - Google Generative AI)
- Nodemailer (for contact form)
- Zod (for validation)
- React Hook Form

## Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm
- A Google Cloud project with the Generative Language API enabled (for AI features)
- An SMTP server or email sending service (for the contact form)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd affiliate-link-hub # Or your project's directory name
```

### 2. Environment Variables (`.env` file)

Create a `.env` file in the **absolute root** of your project (at the same level as `package.json`).

**CRITICAL: You MUST add `.env` to your `.gitignore` file** to prevent committing sensitive credentials to your Git repository. If your `.gitignore` doesn't already have a line `*.env` or `.env`, add it. A common line to add to `.gitignore` is:
```
.env
```

Populate your `.env` file with the following variables.
**Replace `your_...` placeholders with your actual credentials where specified.**

```env
# Google Generative AI (Server-side for Genkit - NO NEXT_PUBLIC_ prefix)
# Get this from your Google Cloud project where Generative Language API is enabled.
GOOGLE_GENAI_API_KEY=your_google_generative_ai_api_key

# Nodemailer for Contact Form (Server-side - NO NEXT_PUBLIC_ prefix)
EMAIL_SERVER_HOST=your_smtp_host.example.com
EMAIL_SERVER_PORT=587 # Or 465, depending on your provider
EMAIL_SERVER_USER=your_smtp_username
EMAIL_SERVER_PASSWORD=your_smtp_password_or_app_password
EMAIL_FROM="AffiliateLink Hub" <no-reply@yourdomain.com> # Email address contact form submissions will appear to be from
EMAIL_TO=samrimucheye@gmail.com # Email address where you want to receive contact form submissions
```

**CRITICAL FOR LOCAL DEVELOPMENT:** After creating or modifying the `.env` file, you **MUST stop and restart your Next.js development server** (e.g., `Ctrl+C` then `npm run dev`). Next.js only loads `.env` files at startup.

**Important for Deployed Environments (Netlify, Vercel, etc.):**
- Your local `.env` file is **NOT** used by deployed sites.
- You **MUST** set these same environment variables (e.g., `GOOGLE_GENAI_API_KEY`, `EMAIL_...`) in your deployment platform's settings UI (usually under "Site settings" > "Environment variables" or similar).
- After setting them on the platform, you usually need to **trigger a new deploy** or **redeploy** your site for the changes to take effect.

### 3. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:9002](http://localhost:9002) (or the port specified in `package.json`) in your browser.

## Troubleshooting

### AI Description Generation Issues
- **`GOOGLE_GENAI_API_KEY`:** Ensure this server-side environment variable is set correctly (both locally in `.env` and in your deployment environment) and that the API key is valid and has the "Generative Language API" enabled in your Google Cloud project. This key should NOT have the `NEXT_PUBLIC_` prefix. The `src/ai/ai-instance.ts` file includes startup logs if this key is missing or if Genkit initialization fails.
- **Genkit Model:** The app uses `googleai/gemini-2.0-flash`. Ensure this model is available and suitable for your key/project.
- **Service Overload:** Sometimes, the AI service might be temporarily overloaded. The error message "503 Service Unavailable" or "The model is overloaded" indicates this. Try again later. The flow in `src/ai/flows/generate-product-description.ts` attempts to catch and rephrase this.

### Email Sending Issues (Contact Form)
- **Nodemailer Environment Variables:** Ensure `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `EMAIL_FROM`, and `EMAIL_TO` are all correctly set in your `.env` file (locally) and in your deployment environment variables. These should NOT have the `NEXT_PUBLIC_` prefix.
- **SMTP Provider:** Verify your SMTP provider's settings (host, port, security - SSL/TLS). Some providers require specific configurations or app passwords (e.g., Gmail requires an "App Password" if 2FA is enabled, not your regular account password).
- **Firewall/Network:** If deploying, ensure your server can make outbound connections on the specified SMTP port. The API route `src/app/api/contact/route.ts` has checks for these variables.

## Deployment
- Set up all necessary environment variables (see [Environment Variables](#2-environment-variables-env-file) section) on your deployment platform (e.g., Netlify, Vercel).
- Ensure your build command is correctly configured (usually `next build`).

## Contributing
Contributions are welcome! Please follow standard Git practices (fork, feature branch, pull request).
