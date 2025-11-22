# Contributing to ComSim

Thank you for considering contributing to ComSim! We welcome contributions from everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Testing](#testing)

---

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Device/Platform information**
- **App version**

### Suggesting Enhancements

Enhancement suggestions are welcome! Include:

- **Clear use case**
- **Why this enhancement would be useful**
- **Possible implementation approach**
- **Alternative solutions considered**

### Code Contributions

1. **Bug Fixes** - Find an issue labeled `bug` or `good first issue`
2. **Features** - Check the roadmap or propose new features
3. **Documentation** - Improve or add documentation
4. **Tests** - Add or improve test coverage

---

## Development Setup

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Git
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup Steps

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/[your-username]/ComSim.git
   cd ComSim
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Run on device/emulator**

   ```bash
   # Android
   npm run android

   # iOS (macOS only)
   npm run ios

   # Web
   npm run web
   ```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows the style guide
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] Branch is up to date with main

### Steps

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**

   - Write clean, readable code
   - Follow existing patterns
   - Add comments where necessary

3. **Test your changes**

   ```bash
   npm test
   npm run lint
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add awesome feature"
   ```

5. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template
   - Link related issues

### PR Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged
- Your contribution will be credited

---

## Coding Standards

### General Guidelines

- **Write clean, readable code**
- **Follow DRY principle** (Don't Repeat Yourself)
- **KISS principle** (Keep It Simple, Stupid)
- **Comment complex logic**
- **Use meaningful variable names**

### JavaScript/TypeScript

```javascript
// Good
const handleButtonPress = (buttonType) => {
  if (!buttonType) return;

  setSelectedButton(buttonType);
  togglePanel();
};

// Avoid
const h = (b) => {
  if (!b) return;
  s(b);
  t();
};
```

### React Components

```jsx
// Good
const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  return <View style={styles.container}>{/* JSX content */}</View>;
};

export default ComponentName;
```

### Styling

- Use StyleSheet.create()
- Group related styles
- Use descriptive style names
- Follow mobile-first approach

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
```

### File Naming

- Components: `PascalCase.jsx` or `PascalCase.tsx`
- Utilities: `camelCase.js` or `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE.js`
- Styles: `ComponentName.styles.js`

---

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
feat(auth): add user login functionality

fix(quiz): correct answer validation logic

docs(readme): update installation instructions

refactor(components): simplify Button component

test(utils): add tests for helper functions

chore(deps): update dependencies
```

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- ComponentName.test.js

# Check test coverage
npm test -- --coverage
```

### Writing Tests

```javascript
import { render, fireEvent } from "@testing-library/react-native";
import ComponentName from "./ComponentName";

describe("ComponentName", () => {
  it("should render correctly", () => {
    const { getByText } = render(<ComponentName />);
    expect(getByText("Expected Text")).toBeTruthy();
  });

  it("should handle button press", () => {
    const onPress = jest.fn();
    const { getByText } = render(<ComponentName onPress={onPress} />);

    fireEvent.press(getByText("Button"));
    expect(onPress).toHaveBeenCalled();
  });
});
```

---

## Project Structure

```
ComSim/
├── app/                  # Main screens and routes
├── components/           # Reusable components
│   ├── ui/              # UI components
│   └── __tests__/       # Component tests
├── constants/           # App constants
├── hooks/               # Custom hooks
├── assets/              # Images, fonts, etc.
├── scripts/             # Build and utility scripts
└── docs/                # Documentation
```

---

## Documentation

### Code Documentation

- Document complex functions
- Explain non-obvious logic
- Use JSDoc for public APIs

```javascript
/**
 * Calculates the compatibility score between PC components
 * @param {Object} components - The selected components
 * @param {string} components.cpu - CPU model
 * @param {string} components.motherboard - Motherboard model
 * @returns {number} Compatibility score (0-100)
 */
const calculateCompatibility = (components) => {
  // Implementation
};
```

### README Updates

When adding new features, update:

- Feature list
- Usage examples
- Screenshots (if UI changed)

---

## Getting Help

- **Documentation:** Read the [README](./README.md) and [BUILD_GUIDE](./BUILD_GUIDE.md)
- **Issues:** Check existing [GitHub Issues](https://github.com/jerwinagustin/ComSim/issues)
- **Discussions:** Start a [GitHub Discussion](https://github.com/jerwinagustin/ComSim/discussions)
- **Questions:** Ask in issue comments or discussions

---

## Recognition

Contributors will be:

- Listed in the README
- Credited in release notes
- Mentioned in documentation

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

## Thank You!

Your contributions make ComSim better for everyone. We appreciate your time and effort! 🎉

---

**Questions?** Feel free to reach out by opening an issue or starting a discussion.
