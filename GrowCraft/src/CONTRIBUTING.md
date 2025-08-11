# ✨ Contributing to GrowCraft

Hey there, awesome human! 💚  
Thank you for showing interest in contributing to **GrowCraft** — a vibrant, beginner-friendly open-source project built for both impact and learning.

Whether you're a seasoned dev or someone making their first-ever pull request (PR), this guide will walk you through **every step** of the contribution process.

Let’s grow together — one line of code at a time. 🌱

---

## 📌 About GrowCraft

GrowCraft is a service-based static website that supports:
- 🌐 Website Development
- 🎨 Graphic Design
- 📝 Content Writing
- 📣 Social Media Management
- 📊 Digital Marketing
- 🎓 Student Training & Internship Programs

It’s part of **GirlScript Summer of Code 2025 (GSSoC)**. New contributors are warmly welcome!

---

## 💻 Tech Stack

- HTML5
- CSS3
- Bootstrap 5.3
- JavaScript (Vanilla)

> ⚠️ This is a **static frontend project**. No backend involved.

---

## 🗂 Folder Structure (Simplified)

```

GrowCraft/
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── index.html
├── services.html
├── contact.html
├── about.html
├── portfolio.html
└── README.md

````

---

## 🧑‍💻 How to Contribute (Step-by-Step)

### 1. 🍴 Fork the Repository

Click the **Fork** button at the top-right of this repo. This creates a copy of GrowCraft under your GitHub account.

---

### 2. 📥 Clone Your Fork

```bash
git clone https://github.com/<your-username>/GrowCraft.git
cd GrowCraft
````

> Replace `<your-username>` with your actual GitHub handle.

---

### 3. 🔗 Set the Upstream Remote

To keep your fork up to date with the original repo:

```bash
git remote add upstream https://github.com/gyanshankar1708/GrowCraft.git
```

Then confirm:

```bash
git remote -v
```

---

### 4. 🔄 Sync Before You Start

Before working on any feature or issue, sync your fork:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

---

### 5. 🌿 Create a New Branch

**Never work directly on `main`.** Instead, create a descriptive feature branch:

```bash
git checkout -b feature/add-footer-animation
```

Example branch names:

* `fix/navbar-mobile`
* `docs/improve-readme`
* `feature/add-contact-form`

---

### 6. 🎨 Make Your Changes

* Use semantic HTML (`<section>`, `<article>`, etc.)
* Follow naming conventions used in existing code
* Keep indentation consistent (2 or 4 spaces — match what's used)
* For styles, prefer Bootstrap classes over custom CSS when possible
* Test responsiveness on desktop and mobile

---

### 7. ✅ Self Review Checklist

Before committing, ask yourself:

* Does it break anything else?
* Did I test this on mobile AND desktop?
* Are my class/ID names clear and consistent?
* Did I remove all debug `console.log()`s?

---

### 8. 💾 Stage & Commit

```bash
git add .
git commit -m "Add: responsive contact form to contact.html (Closes #21)"
```

> ✅ Use prefixes like `Add:`, `Fix:`, `Update:`, `Docs:`
> 🧠 Keep messages short, clear, and meaningful.

---

### 9. 🚀 Push to Your Fork

```bash
git push origin feature/add-footer-animation
```

---

### 10. 📬 Open a Pull Request (PR)

* Go to your forked repo on GitHub
* Click **“Compare & pull request”**
* Write a clear PR title and description

#### 💡 PR Title Examples:

* `Fix: Service cards overlapping on mobile`
* `Add: New testimonials section on homepage`
* `Docs: Add detailed setup instructions to README`

#### 📝 PR Description Template:

```markdown
### What I did:
- Added a responsive contact form to contact.html
- Used Bootstrap classes for layout
- Linked to the existing CSS file

### Issue Reference:
Closes #21

### Screenshots:
<attach screenshots or a GIF if UI is involved>

### Notes:
Let me know if you'd like changes. Happy to iterate!
```

---

## 🤝 Types of Contributions We Welcome

* 🐛 Bug Fixes
* ✨ New Features
* 🎨 UI Improvements
* 📖 Documentation Updates
* 🧹 Code Cleanup & Refactoring
* 🧪 Responsive Testing
* 💬 Ideas & Suggestions

---

## 🧠 Pro Tips

* Open an issue if you’re unsure whether your idea fits — we’d love to discuss.
* Comment on issues you'd like to work on and ask to be assigned.
* Don’t be afraid to ask questions — we’re here to help.

---

## 🙌 For First-Timers

Welcome to open source! 🎉
This project is beginner-friendly and we appreciate every contribution — no matter how small.

---

## 🧠 Final Wisdom

> “Leave the code better than you found it.”

* Be kind in reviews.
* Follow project conventions.
* Ask before major changes.
* Keep learning. Keep shipping.

---

Thank you for contributing to GrowCraft —
Together, we build. Together, we grow. 🌱

— *With love from the GrowCraft Team*