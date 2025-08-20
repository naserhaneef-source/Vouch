# Vouch Repository - GitHub Copilot Instructions

**ALWAYS follow these instructions first and only fallback to additional search and context gathering if the information in these instructions is incomplete or found to be in error.**

## Current Repository State

The Vouch repository is currently in its initial state with minimal content:
- Contains only a basic README.md file with the title "# Vouch"
- No source code, dependencies, or build systems are present yet
- No package.json, requirements.txt, or other dependency management files exist
- No existing build, test, or deployment infrastructure

## Working Effectively

### Initial Setup
- The repository is ready to use as-is with no dependencies to install
- No build steps are currently required since there is no source code
- Git clone and you're ready to start development

### When Code is Added - General Guidelines
**These sections will need updates as the codebase evolves:**

#### For Node.js/JavaScript Projects:
- Run `npm install` to install dependencies after package.json is added
- Use `npm run build` for building (timing: TBD - NEVER CANCEL builds, set timeout to 60+ minutes)
- Use `npm run test` for testing (timing: TBD - NEVER CANCEL tests, set timeout to 30+ minutes)
- Always run `npm run lint` before committing changes

#### For Python Projects:
- Create virtual environment: `python -m venv venv`
- Activate: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
- Install dependencies: `pip install -r requirements.txt`
- Run tests with pytest or unittest
- Always run linting with flake8, black, or configured linter

#### For Go Projects:
- Run `go mod download` to download dependencies
- Use `go build` to build the application
- Use `go test ./...` to run all tests
- Use `go fmt` and `go vet` for code formatting and checking

#### For Rust Projects:
- Run `cargo build` to build (NEVER CANCEL - can take 30+ minutes on first build)
- Use `cargo test` to run tests
- Use `cargo fmt` and `cargo clippy` for formatting and linting

## Repository Structure

### Current Structure
```
/
├── README.md           # Basic project title
└── .github/
    └── copilot-instructions.md    # This file
```

### Expected Future Structure
*Update this section as the codebase grows*

## Validation Requirements

### Current Validation
- Verify README.md exists and contains project information
- Ensure .github/copilot-instructions.md is up to date

### Future Validation Requirements
*Update as code is added:*
- **MANUAL VALIDATION REQUIREMENT**: After building and running the application, test actual functionality through complete user scenarios
- **NEVER CANCEL** any build or test commands - builds may take 45+ minutes, tests may take 15+ minutes
- Set explicit timeouts of 60+ minutes for build commands and 30+ minutes for test commands
- Always test the primary user workflows after making changes
- Run all linting and formatting tools before committing

## Development Best Practices

- Always commit small, focused changes
- Write descriptive commit messages
- Update documentation when adding new features
- Add tests for new functionality
- Follow the project's coding standards (to be established)

## Common Commands Reference

### Current Commands
```bash
# Basic repository exploration
ls -la                          # List repository contents
cat README.md                   # View README
git status                      # Check git status
```

### Future Commands
*Add specific build, test, and run commands here as they become available*

## Important Notes

- **CRITICAL**: This is a minimal repository - most development tooling and processes are not yet established
- **TIMING**: No build or test timing data available yet - update this section when code is added
- **DEPENDENCIES**: No external dependencies currently required
- **DEPLOYMENT**: No deployment processes established yet

## Next Steps for Repository Setup

When adding code to this repository, consider:
1. Choose and document the primary programming language/framework
2. Add appropriate .gitignore file for the chosen technology
3. Set up dependency management (package.json, requirements.txt, etc.)
4. Establish build and test processes
5. Add linting and formatting configuration
6. Update these Copilot instructions with specific commands and timing
7. Set up CI/CD workflows in .github/workflows/

## Contributing

*Update this section when CONTRIBUTING.md is added or when contribution guidelines are established*

---

**Remember**: These instructions should be updated frequently as the codebase evolves. Always validate that commands work before adding them to these instructions.