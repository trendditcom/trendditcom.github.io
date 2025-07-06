---
layout: '@layouts/BlogPost.astro'
title: "Vibe Coding"
date: "2025-07-05"
author: "Trenddit Team"
excerpt: "Discover the rails required to achieve production quality results when generating apps using Claude Code and AI automation."
featuredImage: "/images/blog/vibe-coding-workflows.png"
tags: ["ai", "automation", "development", "workflows", "productivity", "aws", "knowledge-management", "trenddit", "AI Agents", "Code Generation", "Lean Workflows"]
---


Teams can prompt my way to generate simple apps using Claude Code. However there are rails required to achieve production quality results and deliver reasonably complex apps. These rails are not any different from those required for hand coded apps. The rails themselves can be AI augmented.

Before stepping into the Rails of Vibe Coding, I want to read and internalize the best practices of vibe coding shared by Anthropic, Y Combinator, and other experts. The Rails of Vibe Coding are derived from these best practices and my own experience vibe coding tens of thousands of lines of code using multiple popular tools across several projects.

## Best Practice Workflows

Practitioners are writing these best practice snippets seeking guidance from [Claude code best practices](https://www.anthropic.com/engineering/claude-code-best-practices).  I have also mixed general guidance from YC video titled [How To Get The Most Out Of Vibe Coding](https://www.youtube.com/watch?v=BJjsfNO5JTo), released in April 2025 as I notice many overlaps with Claude best practices as well as some unique ideas.

These are the three workflows that Anthropic recommends for general purpose vibe coding:

![Image](/images/blog/vibe-coding-workflows.png)

*When starting with existing code or pair programming with AI...*
**Explore, Plan, Code, Commit:** This versatile workflow suits many problems. Consider strong use of subagents. Explore without writing code to learn more about existing code, verify details, study an image, or visit a URL. Make a plan using extended thinking (increase thinking budget with prompts "think" < "think hard" < "think harder" < "ultrathink"). Implement plan in code. Commit.

*When you have large codebase or your code has significant backend logic...*
**Write tests, commit; code, iterate, commit:** This is an Anthropic-favorite workflow for changes that are easily verifiable with unit, integration, or end-to-end tests. Ask Claude to write tests based on expected input/output pairs. Tell Claude to run the tests and confirm they fail. Ask Claude to commit the tests. Ask Claude to write code that passes the tests. Ask Claude to commit the code.

*When you are building a user interface centric app or doing rapid prototyping...*
**Write code, screenshot result, iterate:** Give Claude a way to take browser screenshots (e.g., Puppeteer MCP server). Give Claude a visual mock by copying / pasting or drag-dropping an image. Ask Claude to implement the design. Ask Claude to commit.

Other specific workflows include:

1. **Safe YOLO mode:** Instead of supervising Claude, you can use `claude --dangerously-skip-permissions` to bypass all permission checks and let Claude work uninterrupted until completion. This works well for workflows like fixing lint errors or generating boilerplate code.
2. **Codebase Q&A:** When onboarding to a new codebase, use Claude Code for learning and exploration. 
3. **Use Claude to interact with git:** Claude can effectively handle many git operations. Many Anthropic engineers use Claude for 90%+ of our git interactions including searching git history, writing commits, and handling git operations.
4. **Use Claude to interact with GitHub:** Claude Code can manage many GitHub interactions including creating pull requests, implementing one-shot resolutions, fixing failing builds, and categorizing and triaging open issues.
5. **Use Claude to work with Jupyter notebooks:** Researchers and data scientists at Anthropic use Claude Code to read and write Jupyter notebooks.



This approach aligns with Trenddit's mission to provide lean AI automation solutions. The Trenddit Memo browser extension exemplifies these principles by enabling knowledge workers to capture, organize, and interact with information using AI-powered automation.

For organizations looking to implement similar AI-driven workflows, consider how tools like Trenddit Memo can streamline knowledge management and enhance productivity across teams.

## Workflow Activities

The activity sequence is usually the workflow I follow when starting a new project from scratch.

### Configuration

![Image](/images/blog/configuration-workflow.png)

**Git Commit Always:** This is the most important recommendation repeated by not only Claude Code best practices but also Windsurf CEO during his recent YC podcast. This way if Practitioners are not happy with a path that vibe coding takes, Teams can revert to a prior version in git history. Use Git for version control religiously; don't rely on AI tools' revert functionality. Reset to a clean state after failed attempts rather than accumulating layers of problematic code. 

**Create Memory:** The `CLAUDE.md` file in project root is memory for Claude Code. Claude automatically pulls into context when starting a conversation. Use it to document 1/ Common bash commands, 2/ Core files and utility functions, 3/ Code style guidelines, 4/ Testing instructions, 5/ Repository etiquette, 6/ Developer environment setup, 7/ Any unexpected behaviors or warnings particular to the project. 



**Allowed Tools:** I create my allowed tools list using "Always allow" in session. These actions are saved in the `.claude/settings.json` which I periodically review for any tweaks.

**MCP Servers:** Add MCP servers to use with the project using `.mcp.json` file in the project root. Launch Claude with the --mcp-debug flag to help identify configuration issues.

### Plan, Test and Frameworks

![Image](/images/blog/plan-test-frameworks-workflow.png)

**Planning:** Start by creating a comprehensive plan with the AI before writing code. 

**Modularity:** Implement features section by section rather than attempting to build everything at once.

**Frameworks:** Consider established frameworks like Next.js that have consistent conventions and abundant training data. 

**Test Driven Development:** Write high-level integration tests to catch regressions when AI makes unexpected changes.

### Code and Iterate

![Image](/images/blog/code-iterate-workflow.png)

**Custom Slash Commands:** Teams can turn frequently used prompts into prompt templates and save these in `.claude/commands` folder to become available as slash commands in Claude Code CLI.

**Debugging:** Copy-paste error messages directly into the LLM; often sufficient for the AI to identify and fix issues. For complex bugs, have the AI consider multiple possible causes before writing code. Try different AI models when stuck, as they have different strengths. Create comprehensive instruction files for your AI coding assistant.

**Advanced Strategies:** Download and include documentation in your project folder for the AI to reference. For complex functionality, build standalone reference implementations first. Use modular architectures with clear API boundaries rather than monolithic codebases. Use screenshots to demonstrate UI issues or design inspiration. Refactor frequently with tests in place to catch regressions. Keep experimenting with new model releases to find the best tools for specific tasks.

## Defining the Rails

Here are the 10 rails I use for my vibe coding projects.

![Image](/images/blog/rails.png)


**Product Definition:** A good place to start defining these rails is to articulate what product I want to build. This can inform the technology stack requirements as well as the implementation plan.

**Technology Stack:** Having tried several popular stacks with vibe coding I have formed an opinion about which stack works best for organizations. So Teams can generate the tech stack prompting the AI with my general requirements. 

**Context Memory:** Tech stack provides structure and commands as inputs to creating Claude Code memory or context used for every prompt in the project. Memory is where I also add the workflow guidance for executing every step during by vibe coding iterations.

**Evaluation Guide:** I ask Claude Code to generate an evaluation guide for every step (feature-slice) of the plan that is generated. I then use the evaluation guide to manually verify the feature built. Teams can also use this evaluation guide as an input to a Claude Code subagent to use automated testing tools like Puppeteer.

**Plan By Slice:** Creating an implementation plan by feature-slice is super helpful to guide vibe coding workflow in a repeatable and controlled way. Combined with test, commit, code, commit workflow each step in the plan can deliver an end-to-end feature which can be further evaluated as an end user experience to match with product definition.

**Tests:** Unit and integration tests aligned with plan features and product definition use cases help ensure that any new change does not cause regressions on existing features.

**Git History:** Looking up Git history for past changes either to make a feature decision or to reflect on fixing a new bug can be super helpful. Plus test, commit, code, commit workflow is one of the most highly recommended rails for vibe coding.

**Code:** Exploring generated or existing code provides context for new changes and feature development. The code is kept modular, single responsibility, and maintainable so it is easy to search and pull into context as well as modify and test by the AI.

**Runtime Errors:** Copy-pasting server and browser console errors and warnings or providing screen grabs of UI errors to Claude Code provides useful context to solve for specific fixes.

**Code Analysis:** Static code analysis of code growth (lines of code) and test coverage by each module in the code base. This helps in refactoring decisions, accessing code quality over time, and tracking code maintainability.

## Product Definition

Tenddit is a web app with clean, modern user interface that starts with features similar to post feeds like Reddit or Twitter/X. Trenddit enables users to track technology trends as a feed of individual posts. Trenddit is different from Reddit or Twitter as it uses Amazon Bedrock managed Anthropic Claude models to automatically vote trends up or down based on a criteria the user can define. Trenddit can also submit posts automatically based on sources the user can define. One such source it supports is an RSS feed. So user can provide it an RSS feed link and Trenddit will pull posts into the user feed. User can also submit web page urls and Trenddit can automatically parse meta data of these urls incluing social media tags to populate the post content.

## Technology Stack 

Being opinionated about the technology stack early in vibe coding helps ensure another important guardrail.

I use Claude Desktop with extended thinking and web search model to come up with the technology stack recommendation.

Then I save the technology stack guidance (prompt) and framework selection (response) as `stack.md` file in the root of Trenddit project folder.

```markdown
## Guidance
Use a modern, simple, python stack for backend and frontend. Practitioners are going to build using code generation so I want to keep the development environment minimal. I want to use test driven development. I want a modern UI which is fast to iteratively build for responsive, reactive, performant web apps ideally using minimal javascript but component oriented to reduce amount of code over time. Teams can mostly use LLM APIs for building app logic as a wrapper on those API calls. I want to build on a MacBook laptop and the app should run on my laptop so prefer local first stack. I want to distribute my app using pypi. I want to leverage the Chrome browser capabilities for best web app user experience rendering.

## Framework: FastAPI + Reflex

FastAPI would serve as your primary backend framework with Reflex extending it for component-based UI development. This combination offers:

1. **Pure Python development**: Write both frontend and backend in Python without JavaScript
2. **High performance**: FastAPI is one of the fastest Python frameworks available
3. **Modern architecture**: Built on ASGI for asynchronous processing, perfect for LLM API calls
4. **Component-based UI**: Reflex provides 60+ customizable UI components in pure Python
5. **Type safety**: Strong typing throughout the stack for better code quality
6. **Test-driven development support**: Both frameworks work well with pytest
7. **Local-first development**: Everything runs easily on your MacBook
8. **PyPI distribution**: Both are compatible with standard Python packaging

## Testing Framework: pytest

Pytest is the modern standard for Python testing with excellent support for:

1. **Test-driven development**: Simple syntax for writing tests first
2. **Parameterized testing**: Test multiple scenarios with minimal code
3. **Fixtures**: Reusable components for test setup
4. **Plugin ecosystem**: Extensive addons for coverage, mocking, and more
5. **Integration with FastAPI/Reflex**: Straightforward testing of API endpoints and UI components

...
```


## Context Memory

Claude stores its memory in `CLAUDE.md` file within project folder root. I start with Claude Desktop to help me generate the file.











I copy the response into my project. Then I run the `/init` command which results in Claude Code further optimizing the file.


```markdown
# CLAUDE.md - Claude Code Best Practices

## Project Overview

This is a modern Python-based web application with a focus on test-driven development. The stack includes:

- **Backend Framework**: FastAPI
- **Frontend Framework**: Reflex (Python-based UI components)
- **Testing Framework**: pytest
- **Database**: SQLite (development), PostgreSQL (production)
- **ORM**: SQLAlchemy
- **Target Platform**: Local-first development on MacBook, with distribution via PyPI
- **Browser Target**: Chrome

## Development Workflow

Our development follows a "Explore, Plan, Write tests, commit; code, iterate, commit" workflow:

1. **Explore**: Research and understand the problem space
2. **Plan**: Detail solution approach
3. **Write Tests**: Implement test cases with pytest
4. **Commit**: Commit the tests
5. **Code**: Implement the solution
6. **Iterate**: Refine and improve
7. **Commit**: Commit the implementation

...
```


## Planning By Slice

I use maximum reasoning tokens to have Claude Code come up with the initial plan for the product.

 > **Initial Prompt:** Ultrathink to create a step by step implementation plan as plan.md based on the @product.md requirements and @stack.md technology stack. The plan should follow guidance in @CLAUDE.md to implement individual features using Test Driven Development workflow.  

This ends up creating a sequential plan with frontend and backend separation as per the technology stack. Practitioners are interested in taking an end-to-end feature-slice approach so Teams can catch any integration issues early in the vibe coding process. So Best practices involve another round of review of the plan to help refine it further.
 
 > **Refine Plan:** Ultrathink while reviewing the @plan.md to help improve it. Ensure that the @stack.md is followed. Ensure that the plan follows https://www.anthropic.com/engineering/claude-code-best-practices. Ensure that the plan meets the @product.md requirements. Most important: Make sure each step in the plan is releasing an end-to-end working feature (feature-slice approach) with backend and frontend logic and not just a high fidelity mock or just the user interface with dummy backend.
 
This prompt further refines the plan to develop each feature as a vertical slice of the horizontal stack (frontend, API, backend horizontal swim lanes). The first step in the plan is as expected the one off app scaffolding and environment setup.

```markdown
...

## Phase 1: Project Foundation (Week 1)

### Sprint 1.1: Project Scaffold with Minimal Working Application

1. **Test-First Approach**
   - Write tests for project configuration
   - Test basic app initialization
   - Test simple Reflex component rendering
   - Test basic database connectivity

2. **Implementation**
   - Set up project structure following CLAUDE.md guidelines
   - Initialize FastAPI app
   - Create basic Reflex UI scaffold
   - Set up SQLite database with SQLAlchemy
   - Implement minimal "Hello World" page to verify stack integration

3. **Deliverables**
   - Working project structure with integrated FastAPI + Reflex
   - Basic UI page rendering
   - Simple database connectivity
   - End-to-end tests passing
   - Package configuration for later PyPI distribution

### Sprint 1.2: Basic Post Feed Feature Slice

1. **Test-First Approach**
   - Write tests for Post model
   - Write tests for post API endpoints
   - Write tests for post feed UI component

...
```


## Evaluation Guide

Teams can now create an evaluation guide based on feature releases. I ask Claude to document following sections in the evaluation guide:

1. Project Setup
2. Environment Setup
3. Seeding the Database
4. Running Tests
5. Running the Application
6. Direct URLs to navigate (when app UI is still work in progress)
7. Using the API
8. Feature Evaluation Checklist - phase/sprint/step wise - what features to evaluate and the expected results

Here is the resulting evaluation guide which is super helpful to only track what features have been released but also how to use them and what to expect as successful outcome.

After every feature slice release I have a slash command setup to update the evaluation guide.

![Image](/images/blog/evaluation-guide.png)


The first feature slice seeds the database with some content and demonstrates the feed UI connecting to the backend.


![Image](/images/blog/basic-feed-ui.png)


Teams can explore the API using the Swagger documentation generated as part of the feature release. This is a super useful capability delivered as part of my generated plan. Teams can interactively evaluate each API endpoint with JSON input and output based on schema generated by Claude and functionality delivered for the specific feature.

![Image](/images/blog/api-docs.png)

Teams can also evaluate the UI released for account registration and login and compare the API vs UI behavior of the same feature.

![Image](/images/blog/registration.png)

Unlike the prior attempt in Vibe Coding with Claude Code chapter where Next.js stack was chosen by Claude Code, the authentication method is simple (no Google or GitHub authentication) however it works in first slice that released the feature. 

This pattern repeats with Create New Post UI. It works end-to-end on first vibe coding attempt. Comparing with prior attempt with Next.js stack approach this was a breeze with one round of debugging vs multiple rounds of debugging which never succeeded in the end.

![Image](/images/blog/create-post.png)

## Code Analysis

I created a code analysis script much more easily in Python as compared with the Next.js stack attempt in the earlier chapter. Again I went through just a couple of debugging cycles. I achieved test coverage, lines of code analysis, and trending all in one report.

Here is the lines of code and coverage by module report.

![Image](/images/blog/analysis-report.png)

Here is the summary and recent modifications analysis. This was like Claude Code reading my mind. It figured adding this analysis without any mention in the original prompt. Magic!

![Image](/images/blog/analysis-report-2.png)

The report ends with a summary of key functionality implemented and test analysis.

![Image](/images/blog/analysis-report-3.png)

As a result now I have another layer of rails to assess code growth, test coverage, and trends from one release to next.

## Testing and Refactoring

As I continued to next step I realized the Claude Code had slowed down significantly and Practitioners are observing several errors in `components.py` module. As code analysis tells me it is the largest module in the project. So I decided to make it even more modular.


  without any regressions.

After Claude Code is done refactoring I run the server and evaluate the last feature released (create new post) to confirm it works successfully.

I also run the code analysis script to track changes since last release. I notice significant reduction in the lines of code of `components.py` as well as refactored set of new files.

I note the guidance followed by Claude while refactoring and add it to `CLAUDE.md` for future vibe coding context.

```markdown
# Modularity and Maintainability Guidelines

  - **Single Responsibility:** Each module to have a clear, focused responsibility
  - **Small File Size:** Each module is small and easy to maintain
  - **Code Organization:** Code is grouped logically by function
  - **Improve Testability:** Each module can be tested independently
  - **Easier Navigation:** Ensure finding specific functionality is simpler
```

I also notice that there are few more modules which may grow significantly over time. So I generalize the module refactoring prompt like so and add it to a slash command `/project:modularize` so Teams can use it from time to time to keep the code lean.

 > **Prompt:** Review the latest analysis in the @reports folder. Ultrathink about modular and maintainable design and architecture and split any long modules accordingly without any regressions. Follow modularity and maintainability guidelines while doing so.

I run the command on the current code. Here Claude Code is identifying the remaining modules to be refactored. 
 ![Image](/images/blog/modularize.png)

This ends up being a long running task. It results in many changes to the code base. I run all tests in the project as I expect many tests to be redone to match the changes in the code. Claude acknowledges after running all tests that there are many tests failing due to the refactoring.



This not only leads to improving the tests to align with the refactoring but also further refinements to modularization effort done recently.

```bash
⏺ Update Todos
  ⎿  ☐ Fix test failures from crud module refactoring
     ☐ Check API import paths in tests
     ☐ Fix UI component tests for new modular structure
     ☐ Update test fixtures to work with refactored modules
     ☐ Improve test coverage for new modular structure
     ☐ Reorganize api/schemas.py by entity type
```


Once all the tests pass I run code analysis again to note the difference.

![Image](/images/blog/refactor-summary.png)

Overall test coverage has increased to 65%. While number of modules have significantly increased, the lines of code per module have reduced. Overall lines of code have remained remarkably same. Code to comment ratio has significantly improved.

Teams can also check on the cost of that long operation, modularizing and refactoring the entire codebase and then adding comprehensive test coverage. Only $4 and change using Claude Sonnet 3.7 with reasoning and prompt caching on AWS Bedrock for nearly 2 hours with more than 6,000 lines of code added/removed!

![Image](/images/blog/cost.png)

I continue to evaluate the UI throughly since this was a significant refactor. Resetting and seeding the database works as expected. User registration and authentication works. Feed UI works as previously and Teams can add a new post successfully.

I notice new feature to do feed management. Practitioners are able to add the feeds. Noted that refreshing the feed does not pull new posts. I have not seen any server or browser console errors so assuming this feature is in development. The evaluation guide does confirm this with the statement `RSS Post Import (Next Up)` listed in Future Features section. It all works in first go. Love it!

![Image](/images/blog/feed-manage.png)

## Git History

Time to commit all changes and move to next step. I remember to clear conversation and restart Claude before doing that.

![Image](/images/blog/git-commit.png)

Here is the commit summary reported by Claude.

```markdown
⏺ The commit has been successfully created! All changes have been added and committed to the repository.

The commit message summarizes the key improvements we've made:

  1. Refactored the codebase for better modularization:
    - Split the CRUD module into entity-specific modules
    - Organized UI components by feature
  2. Fixed test suite issues:
    - Implemented UUID-based unique identifiers for test data
    - Enhanced database cleanup between test runs
    - Standardized SQLAlchemy query patterns
    - Fixed URL validation tests
    - Skipped incompatible UI component tests
  3. Updated documentation:
    - Marked RSS Feed Management feature as completed
    - Added technical improvements and recommendations

These changes have significantly improved code maintainability and test reliability, with overall test coverage increasing from 54% to 65%.
The modular architecture makes the codebase easier to navigate and maintain going forward, and the enhanced test suite provides better protection against regressions.
```

## Runtime Errors

As Practitioners are writing this section based on the 10 Rails for Vibe Coding strategies, I realized there wasn't a single feature slice where I encountered browser console errors! I only had a couple of server runtime errors! While there were plenty of examples in prior chapter where the rails had gaps. This is a validation of the rails approach considering a significant refactoring stage in the middle of this iteration of the Trenddit project. I also attribute this to using single language stack in Python for the frontend and backend. Python is one of the most popular languages well represented in the LLM world knowledge. Single language across stack keeps the project structure navigable. Python is less verbose than JavaScript. Python frameworks and packages like Reflex and FastAPI are also simpler and well documented.

Here is an example of server side error.
![Image](/images/blog/server-errors.png)
I paste the error into Claude Code usually with the same context or conversation going as the last feature-slice release. This enables Claude to combine the runtime error context to find the right fix.

![Image](/images/blog/claude-debugging.png)

Once Claude completes the fix it summarizes what has been achieved.

![Image](/images/blog/fix-summary.png)



## Industry Insights and Research

According to recent industry analysis, AI-powered development tools are transforming software engineering practices across organizations. [Anthropic's research on AI coding assistants](https://www.anthropic.com/engineering/claude-code-best-practices) demonstrates significant productivity gains when implementing structured AI workflows.

The [Y Combinator Winter 2025 batch report](https://blog.ycombinator.com/) shows that 25% of participating startups leverage AI-generated code for over 95% of their codebase, indicating rapid adoption of these methodologies in the startup ecosystem.

For organizations considering AI automation implementation, [McKinsey's AI adoption research](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2024) provides valuable insights into best practices and ROI expectations.