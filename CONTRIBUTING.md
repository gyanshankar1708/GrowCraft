# Contributing to GrowCraft 🌱

Thank you for your interest in contributing to **GrowCraft**! We're excited to have you join our community of developers working to help businesses grow online while providing students with hands-on experience.

> 🏆 **GrowCraft is part of GirlScript Summer of Code 2025 (GSSoC'25)**  
> We especially welcome contributions from GSSoC participants!

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

### Before You Start

- Check existing issues and PRs to avoid duplication
- For major changes, create an issue first to discuss
- Ensure your contribution aligns with project goals
- Test your changes thoroughly

### Working on Issues

1. **Assignment Required**: Only work on assigned issues
2. **Communication**: Keep maintainers updated on progress
3. **Deadline**: Complete assigned work within reasonable time
4. **Help**: Don't hesitate to ask for help in comments or Discord

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

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `good first issue` - Good for newcomers
- `GSSoC` - GSSoC'25 specific issues
- `help wanted` - Extra attention needed
- `documentation` - Documentation improvements

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

### PR Checklist

Before submitting, ensure:

- [ ] Code follows project coding standards
- [ ] Changes are tested and work as expected
- [ ] No console errors in browser developer tools
- [ ] Responsive design works on different screen sizes
- [ ] Documentation updated if necessary
- [ ] Commit messages are clear and descriptive
- [ ] PR description explains what and why

### PR Review Process

1. **Automatic Checks**: Ensure all checks pass
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: PR will be merged once approved

## 🌐 Community

### Get Help

- 💬 **Discord**: Join our [Discord server](https://discord.gg/a2zdpnfZ)
- 🐛 **Issues**: Create an issue for bugs or questions
- 📧 **Contact**: Reach out to maintainers

### Connect with Maintainers

- **Gyanshankar Singh** - [@gyanshankar1708](https://github.com/gyanshankar1708) (Project Admin)
- **Khabab Akhtar** - [@Khababakhtar20](https://github.com/Khababakhtar20) (Mentor)
- **Abdullah Jameel** - [@abdullahxyz85](https://github.com/abdullahxyz85) (Mentor)
- **Ayush Kashyap** - [@ayushkashyap402](https://github.com/ayushkashyap402) (Mentor)

## 🎉 Recognition

Contributors will be:
- Added to our contributors wall
- Mentioned in release notes
- Eligible for GSSoC'25 certificates and rewards
- Part of our growing community

## ❓ Questions?

If you have any questions not covered in this guide:

1. Check existing issues and discussions
2. Join our Discord community
3. Create a new issue with the `question` label

---

**Thank you for contributing to GrowCraft! Together, we're building something amazing! 🚀**

---

*Happy Contributing! 🎯*
