# BookWize – Full-Stack Application

BookWize is a scalable, feature-rich full-stack application for managing book rentals and user tracking. The project utilizes modern technologies to deliver a seamless and efficient user experience.

---

# BookWize – Full-Stack Application

BookWize is a scalable, feature-rich full-stack application for managing book rentals and user tracking. The project utilizes modern technologies to deliver a seamless and efficient user experience.

---

## 🛠️ Technologies Used

- **Frontend:**

  - [Next.js](https://nextjs.org/) – Framework for server-rendered React applications.
  - [Shadcn](https://shadcn.dev/) – Built-in UI components.
  - [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS framework.

- **Backend:**

  - [Drizzle ORM](https://orm.drizzle.team/) with [Neon](https://neon.tech/) (PostgreSQL) – For database management and querying.
  - [Upstash Redis](https://upstash.com/) – For data caching, rate-limiting, and workflow management.
  - [Qstash](https://qstash.io/) – For automated email notifications and workflows.
  - **Cron-Ingest** – To schedule periodic tasks like cleanup jobs and user notifications.

- **Media:**

  - [ImageKit.io](https://imagekit.io/) – For image and video uploads with optimization.

- **Authentication:**

  - [NextAuth.js](https://next-auth.js.org/) – For secure user authentication.

- **Email Service:**
  - **SMTP Email Service** – For sending automated email alerts (e.g., overdue reminders).

---

## ⚙️ VS Code Extensions

- **[Prettier + ESLint](https://prettier.io/):** For clean, organized code.
- **Rainbow Bracket:** Highlights scoping in the code for readability (set `true` in VS Code settings).
- **Modern React TypeScript Snippets:** Simplifies component and hook creation with boilerplate snippets.

---

## 🚀 Implementation Details

### 1. **Project Setup**

- Create the Next.js app:
  ```bash
  npx create-next-app book-wiz
  ```
- Initialize Shadcn for built-in UI components:

  ```bash
  npx shadcn@latest init
  ```

  > **Configuration:** Choose "New York" style, "Slate" theme, and accept defaults.

- Add custom fonts (`IBM Plex` via class names, `Bebas Neue` as variables) in the `app` folder.

---

### 2. **Authentication**

Implemented using **[NextAuth.js](https://next-auth.js.org/)**:

- Added a Credentials Provider with custom user authorization logic.
- JWT callback for re-validation of user sessions.
- Stored user details in session tokens for application-wide access.

---

### 3. **Image Uploads**

Powered by **[ImageKit.io](https://imagekit.io/)** for seamless media handling:

- Created an API endpoint for authentication.
- Used `IkUpload` for uploading files, with success/error handling.
  > Refer to the [ImageKit Docs](https://imagekit.io/docs) for Next.js integration.

---

### 4. **Database Setup**

Utilized **Drizzle ORM** with **Neon PostgreSQL**:

- Created schemas and managed migrations with `drizzle.config.ts`.
- Setup dotenv for environment variables:
  ```bash
  npm install dotenv
  ```

---

### 5. **Caching & Rate Limiting**

Integrated **Upstash Redis**:

- Cached data for faster access and smoother user experience.
- Implemented IP-based rate limiting to prevent DDoS attacks:
  ```typescript
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  ```

---

### 6. **Automated Alerts**

Automated email notifications using **Upstash Qstash**:

- Sent reminders for overdue books or inactive users.
- Leveraged Qstash workflows for effortless scheduling.
  > Refer to [Upstash Workflow Docs](https://upstash.com/docs) for setup details.

---

## 🎯 Key Learnings

- Hands-on experience with modern full-stack tools and techniques.
- Efficient caching and workflow automation with Upstash Redis and Qstash.
- Built a performant UI using Shadcn and TailwindCSS.

---

## 📚 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/bookwize.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   DATABASE_URL=your-neon-url
   IMAGEKIT_PUBLIC_KEY=your-public-key
   REDIS_URL=your-redis-url
   ```
4. Run the app:
   ```bash
   npm run dev
   ```

---

## Feel free to reach out for contributions or queries! 😊

## ⚙️ VS Code Extensions

- **[Prettier + ESLint](https://prettier.io/):** For clean, organized code.
- **Rainbow Bracket:** Highlights scoping in the code for readability (set `true` in VS Code settings).
- **Modern React TypeScript Snippets:** Simplifies component and hook creation with boilerplate snippets.

---

## 🚀 Implementation Details

### 1. **Project Setup**

- Create the Next.js app:
  ```bash
  npx create-next-app book-wiz
  ```
- Initialize Shadcn for built-in UI components:

  ```bash
  npx shadcn@latest init
  ```

  > **Configuration:** Choose "New York" style, "Slate" theme, and accept defaults.

- Add custom fonts (`IBM Plex` via class names, `Bebas Neue` as variables) in the `app` folder.

---

### 2. **Authentication**

Implemented using **[NextAuth.js](https://next-auth.js.org/)**:

- Added a Credentials Provider with custom user authorization logic.
- JWT callback for re-validation of user sessions.
- Stored user details in session tokens for application-wide access.

---

### 3. **Image Uploads**

Powered by **[ImageKit.io](https://imagekit.io/)** for seamless media handling:

- Created an API endpoint for authentication.
- Used `IkUpload` for uploading files, with success/error handling.
  > Refer to the [ImageKit Docs](https://imagekit.io/docs) for Next.js integration.

---

### 4. **Database Setup**

Utilized **Drizzle ORM** with **Neon PostgreSQL**:

- Created schemas and managed migrations with `drizzle.config.ts`.
- Setup dotenv for environment variables:
  ```bash
  npm install dotenv
  ```

---

### 5. **Caching & Rate Limiting**

Integrated **Upstash Redis**:

- Cached data for faster access and smoother user experience.
- Implemented IP-based rate limiting to prevent DDoS attacks:
  ```typescript
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  ```

---

### 6. **Automated Alerts**

Automated email notifications using **Upstash Qstash**:

- Sent reminders for overdue books or inactive users.
- Leveraged Qstash workflows for effortless scheduling.
  > Refer to [Upstash Workflow Docs](https://upstash.com/docs) for setup details.

---

## 🎯 Key Learnings

- Hands-on experience with modern full-stack tools and techniques.
- Efficient caching and workflow automation with Upstash Redis and Qstash.
- Built a performant UI using Shadcn and TailwindCSS.

---

## 📚 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/bookwize.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   DATABASE_URL=your-neon-url
   IMAGEKIT_PUBLIC_KEY=your-public-key
   REDIS_URL=your-redis-url
   ```
4. Run the app:
   ```bash
   npm run dev
   ```

---

Feel free to reach out for contributions or queries! 😊
