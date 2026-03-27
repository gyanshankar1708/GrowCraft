# 🌱 Contributing to GrowCraft

Thank you for your interest in contributing to **GrowCraft**!  
We’re thrilled to have you join our community of developers, designers, and enthusiasts working together to help businesses grow online while providing students with valuable hands-on experience.

> 🏆 **GrowCraft is part of GirlScript Summer of Code 2025 (GSSoC'25)**  
> We especially encourage contributions from GSSoC participants, but everyone is welcome to contribute and learn along the way!

---

### 💡 Why Contribute?

By contributing to GrowCraft, you can:  

- ✨ Gain real-world experience building a meaningful project  
- 🤝 Collaborate with a supportive and diverse community  
- 📚 Improve your coding, documentation, and collaboration skills  
- 🏅 Get recognition in our contributors’ wall, release notes, and GSSoC certificates  

> 🚀 **Tip:** Even small contributions, like fixing typos or improving documentation, make a big difference!

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Contribution Guidelines](#contribution-guidelines)
- [Issue Guidelines](#issue-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Community](#community)

## 🤝 Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment for all contributors.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, JavaScript
- Git installed on your machine
- (Optional) XAMPP/WAMP for PHP development
- A GitHub account

### First-Time Contributors

If you're new to open source:
1. Star ⭐ this repository
2. Join our [Discord community](https://discord.gg/a2zdpnfZ)
3. Look for issues labeled `good first issue` or `beginner-friendly`
4. Read through this contributing guide completely

## 🛠️ How to Contribute

### For GSSoC'25 Participants

1. **Find an Issue**: Look for issues labeled `GSSoC` or `good first issue`
2. **Comment**: Express your interest by commenting on the issue
3. **Wait for Assignment**: A maintainer will assign the issue to you
4. **Work on It**: Start working only after assignment
5. **Submit PR**: Follow our PR guidelines when submitting

### Types of Contributions Welcome

- 🐛 **Bug Fixes**: Help us squash bugs
- ✨ **New Features**: Add new functionality
- 📚 **Documentation**: Improve our docs
- 🎨 **UI/UX Improvements**: Enhance user experience
- 🧪 **Testing**: Add or improve tests
- ♿ **Accessibility**: Make the platform more accessible
- 🌐 **Internationalization**: Add language support

## 💻 Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/GrowCraft.git
cd GrowCraft
```

### 2. Set Up Upstream Remote

```bash
git remote add upstream https://github.com/gyanshankar1708/GrowCraft.git
```

### 3. Basic Setup

- Open `index.html` in your browser to view the website
- Make changes to HTML, CSS, or JavaScript files as needed

### 4. PHP Development Setup (Optional)

If working on contact form or backend features:

```bash
# Install XAMPP/WAMP
# Place project in htdocs folder
# Import database_schema.sql into MySQL
# Update configuration in contact-handler.php
```

### 5. Keep Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## 📝 Contribution Guidelines

### 🚀 Before You Start

Before making a contribution, please follow these best practices to ensure smooth collaboration:

- 🔍 **Check Existing Issues and PRs**  
  Make sure your idea or fix hasn’t already been addressed to avoid duplication.

- 💡 **Discuss Major Changes**  
  For significant features or architectural changes, open an issue first to discuss your approach with the maintainers.

- 🎯 **Align with Project Goals**  
  Ensure your contribution supports the overall vision and objectives of the project.

- ✅ **Test Your Changes Thoroughly**  
  Verify that your code works as expected and doesn’t break existing functionality. Include tests where applicable.

> ⚡ **Tip:** Well-prepared contributions make the review process faster and increase the chances of your PR being merged.


### ⚙️ Working on Issues

When contributing to issues, please follow these guidelines to ensure smooth collaboration:

1. **Assignment Required**  
   Only start working on issues that are assigned to you. This prevents duplicate work and confusion.

2. **Communication**  
   Keep maintainers and fellow contributors updated on your progress. Use issue comments or Discord for status updates.

3. **Deadlines**  
   Aim to complete assigned tasks within a reasonable timeframe. If delays occur, inform the maintainers promptly.

4. **Ask for Help**  
   Don’t hesitate to ask questions or request guidance in issue comments or the Discord community. We’re here to support you!

> 💡 **Pro Tip:** Regular updates and proactive communication make the contribution process smoother and more enjoyable for everyone.

## 🐛 Issue Guidelines

### Creating Issues

When creating a new issue:

```markdown
**Description:**
Clear description of the bug/feature

**Steps to Reproduce:** (for bugs)
1. Go to...
2. Click on...
3. See error...

**Expected Behavior:**
What should happen

**Screenshots:**
If applicable, add screenshots

**Environment:**
- Browser: [e.g., Chrome 91]
- OS: [e.g., Windows 10]
- Device: [e.g., Desktop]
```

### 🏷️ Issue Labels

To help contributors and maintainers organize work effectively, we use the following labels:

- **`bug`** – Indicates something isn't working as expected.  
- **`enhancement`** – Suggests a new feature or improvement to existing functionality.  
- **`good first issue`** – Ideal for newcomers who want to start contributing.  
- **`GSSoC`** – Issues specific to **GSSoC'25** participants.  
- **`help wanted`** – Needs extra attention or contributions from the community.  
- **`documentation`** – Improvements, fixes, or additions to documentation.

> 💡 **Tip:** When creating an issue, choose the most relevant label to help maintainers triage and assign work efficiently.

## 🔄 Pull Request Guidelines

### Creating a PR

1. **Branch Naming**: Use descriptive names
   ```bash
   git checkout -b feature/add-new-service
   git checkout -b fix/contact-form-validation
   git checkout -b docs/update-readme
   ```

2. **Commit Messages**: Follow conventional commits
   ```bash
   feat: add new blog posting functionality
   fix: resolve contact form validation issue
   docs: update installation instructions
   style: improve responsive design for mobile
   ```

3. **PR Template**: Fill out the PR template completely

### ✅ Pull Request (PR) Checklist

Before submitting your PR, make sure:  

- [ ] Code follows the **project coding standards**  
- [ ] Changes are **tested** and work as expected  
- [ ] No **console errors** in browser developer tools  
- [ ] **Responsive design** works correctly on different screen sizes  
- [ ] **Documentation** is updated if necessary  
- [ ] **Commit messages** are clear and descriptive  
- [ ] PR **description clearly explains** what was done and why  

> 💡 **Tip:** A complete checklist helps speed up the review process and increases the chances of your PR being merged quickly.

---

### 🔍 PR Review Process

1. **Automatic Checks** – CI/CD pipelines and automated tests must pass.  
2. **Code Review** – Maintainers review your code for quality, readability, and adherence to standards.  
3. **Feedback** – Address any requested changes or suggestions from reviewers.  
4. **Approval & Merge** – Once approved, your PR will be merged into the main branch.  

> ⚡ **Pro Tip:** Respond promptly to feedback and keep your PR focused on a single feature or fix to simplify the review.

## 🌐 Community

### Get Help

- 💬 **Discord**: Join our [Discord server](https://discord.gg/a2zdpnfZ)
- 🐛 **Issues**: Create an issue for bugs or questions
- 📧 **Contact**: Reach out to maintainers

### 🤝 Connect with Maintainers

Need guidance or want to reach out? Here’s how you can connect with our core team:  

- **Gyanshankar Singh** – [@gyanshankar1708](https://github.com/gyanshankar1708) (Project Admin)  
- **Khabab Akhtar** – [@Khababakhtar20](https://github.com/Khababakhtar20) (Mentor)  
- **Abdullah Jameel** – [@abdullahxyz85](https://github.com/abdullahxyz85) (Mentor)  
- **Ayush Kashyap** – [@ayushkashyap402](https://github.com/ayushkashyap402) (Mentor)  

> 💡 **Tip:** Reach out to the mentors for guidance on best practices, project setup, or contribution workflow.

## 🎉 Recognition

We value every contributor and want to celebrate your efforts! By contributing to **Eventra**, you will:  

- 🌟 **Be featured on our Contributors Wall** – Show off your contribution publicly.  
- 📝 **Be mentioned in Release Notes** – Gain visibility for your work in every release.  
- 🏆 **Become eligible for GSSoC'25 certificates and rewards** – Recognizing your contributions formally.  
- 🤝 **Join our growing community** – Collaborate with like-minded developers and enthusiasts.  

> 💡 **Tip:** Regular contributors may also get early access to features and exclusive community perks!

---

## ❓ Questions?

If you have questions that aren’t covered in this guide, here’s how to get help:  

1. 🔍 **Check existing issues and discussions** – Someone may have already asked your question.  
2. 💬 **Join our Discord community** – Chat with maintainers and other contributors in real-time.  
3. 🆕 **Create a new issue with the `question` label** – Ask your question directly and get guidance.  

> 📌 **Pro Tip:** When asking a question, include as much context as possible (screenshots, error messages, or steps to reproduce) to get faster and more accurate help.


**Thank you for contributing to GrowCraft! Together, we're building something amazing! 🚀**

---

*Happy Contributing! 🎯*
