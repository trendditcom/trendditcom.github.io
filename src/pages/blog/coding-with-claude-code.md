---
layout: '@layouts/BlogPost.astro'
title: "Coding with Claude Code"
date: "2025-07-05"
author: "Trenddit Team"
excerpt: "Explore the killer app of GenAI 2025 - vibe coding - and how Claude Code is revolutionizing software development."
featuredImage: "/images/blog/vscode-claude-code-puppeteer.png"
tags: ["ai", "automation", "development", "workflows", "productivity", "aws", "knowledge-management", "trenddit", "AI Agents", "Code Generation"]
---


Andrej Karpathy (previously Director of AI at Tesla, founding team at OpenAI, CS231n/PhD at Stanford) coined the phrase vibe coding in [his Feb 2025 tweet](https://x.com/karpathy/status/1886192184808149383?lang=en).



**Vibe coding is the killer app of GenAI 2025.** Among frontier models from Anthropic, OpenAI, Google, and Amazon the code generation and agent based tools use capabilities are reaching wide-spread adoption. Market segment leaders in code generation include Cursor, Windsurf, and Copilot. Cursor is the fastest-growing SaaS company of all time from $1M to $100M in ARR, hitting the $100M milestone in roughly 12 months at the end of 2024. OpenAI acquired Windsurf for $3 billion. Microsoft reported in their 2024 Q2 earnings call that, they now have over 1.3 million paid GitHub Copilot subscribers, up 30% quarter-over-quarter. More than 50,000 organizations use GitHub Copilot Business and Accenture alone will roll out GitHub Copilot to 50,000 of its developers this year.

## Why Claude Code

I found this as the most important statement from the Claude Code best practices article from Anthropic.

*"Claude Code is intentionally low-level and unopinionated, providing close to raw model access without forcing specific workflows. This design philosophy creates a flexible, customizable, scriptable, and safe power tool. While powerful, this flexibility presents a learning curve for engineers new to agentic coding tools—at least until they develop their own best practices."*

So if you are coming to Claude Code from Cursor, Windsurf, or Copilot, some aspects may require getting used to. Most importantly, the IDE vs CLI experience.

My most important reasons for using Claude Code are:

1. **State of the art:** Closest tool to the frontier model from the model developer which will ensure it optimally uses and stays updated on state of the art frontier model capabilities faster than third party tools.
2. **Customizable workflow:** Teams can build my own toolchain with MCP tools, editors for writing or coding, while Claude Code operates on same files as the toolchain.
3. **AWS Integration:** Teams can integrated with ease to use Amazon Bedrock managed Claude models.
4. **Agents and tools:** Claude Code is agent based from ground up. You can spawn subagents by simply saying "Use a subagent to verify if this implementation works with all edge cases". This subagent could use testing tools specified by you in the Claude memory. Multiple subagents could collaborate over shared context or files they may update together.


This approach aligns with Trenddit's mission to provide lean AI automation solutions. The Trenddit Memo browser extension exemplifies these principles by enabling knowledge workers to capture, organize, and interact with information using AI-powered automation.

For organizations looking to implement similar AI-driven workflows, consider how tools like Trenddit Memo can streamline knowledge management and enhance productivity across teams.

## Setup Claude Code

Here is my launch workflow with Claude Code. I first go to [Claude Code](https://www.anthropic.com/claude-code) landing page to seek inspiration. Then I read [Claude code best practices](https://www.anthropic.com/engineering/claude-code-best-practices) for refining my vibe coding workflow and understanding how to optimally use Claude Code. This guides me into reading their [official docs](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) including the setup instructions to get started.

During setup I struggled with npm permissions and found [this guide](https://docs.anthropic.com/en/docs/claude-code/troubleshooting) helpful.

I also installed the required software and checked versions to match or exceed the minimum required.

```bash
node --version 
git --version # for versioning
gh --version # CLI for GitHub (optional if you want to push to GitHub)
rg --version # for enhanced file search
```

## Amazon Bedrock Model Access Platform

Integrating AWS services into the Vibe Coding workflow can significantly enhance its capabilities and create a more powerful builder workflow.

Teams can configure Claude Code to connect to Claude Sonnet 3.7 model managed by Amazon Bedrock on my AWS account using a single configuration command. Note that Practitioners are also using [Cross-Region Inference](https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html) which doubles the model throughput by spreading the inference load to multiple regions.

```bash
claude config set --global env '{"CLAUDE_CODE_USE_BEDROCK": "true", "ANTHROPIC_MODEL": "us.anthropic.claude-3-7-sonnet-20250219-v1:0"}'
```

Doing this has several advantages as Teams can highlight in the Models and Platforms chapter. One of the benefits include ​[Amazon Bedrock Data Protection](https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html) which means my code, prompts, and generations are not shared with the model developer.

## Configuring Puppeteer MCP Server

My toolchain includes Claude Desktop running to test MCP servers before I add to Claude Code. I also use Claude Desktop as my chatbot for general queries outside my codebase.

I want to follow the rapid prototyping workflow which uses [Puppeteer](https://pptr.dev/) headless browser to perform UI testing.



Teams can install Puppeteer MCP server based on [instructions here](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer#npx). I select the NPX option which spawns a browser to visualize the agent actions. This spawns [Google Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing) which is a new Chrome flavor that specifically targets web app testing and automation use cases.

I save the following MCP server configuration in the `claude_desktop_config.json` file. Teams can access this file by clicking Claude Desktop > Settings > Developer > Edit Config.

```json
{
	"mcpServers": {
	  "puppeteer": {
		"command": "npx",
		"args": ["-y", "@modelcontextprotocol/server-puppeteer"]
	  }
	}
}
```

Then I start Claude Desktop and note the new MCP server tools.

![Image](/images/blog/claude-desktop-puppeteer-mcp-tools.png)
Now Teams can test the Puppeteer MCP tools by entering a prompt like this.



It is very cool to see the MCP server take agent actions and spawn a browser, then take web browsing actions including form inputs, clicks, screen capture, to finally respond with the results the agent has seen.

![Image](/images/blog/puppeteer-claude-desktop.png)


I also have Docker Desktop as part of my toolchain in case I want to run my Puppeteer tests more securely. Here it is showing a container spawned by Puppeteer MCP server to run the headless browser safely within a container.

![Image](/images/blog/docker-desktop.png)
That's it. Practitioners are ready to add the Puppeteer MCP server to my Claude Code configuration.

## VS Code and Claude Code

The first app Practitioners are vibe coding will be called Trenddit. Teams can describe few sections down.

My toolchain includes VC Code as the IDE. I use the VS Code Terminal for running Claude Code. I add a new folder `trenddit` to VS Code Explorer view. Then I initialize a git repository using the `git init` command in the VS Code Terminal. Finally I `touch .mcp.json` file in the project root. I copy the same JSON contents as used for Claude Desktop and save the file. Then I run `claude` in the VS Code Terminal and it asks me if I want to use the MCP server.


![Image](/images/blog/vscode-mcp-json-config.png)

Teams can now run a prompt within Claude Code to use Puppeteer for visual testing.


![Image](/images/blog/vscode-claude-code-puppeteer.png)


## Allowed Tools Setup

Claude Code can use tools depending on task it is doing. MCP servers like Puppeteer expose tools for Claude to use. As the tools are called Claude Code asks for permission to use the tools. If I say `Yes` to using the tools then these preferences are saved within the project folder in the `.claude/settings.local.json` file. Note that a `.gitignore` is also created to ignore these settings when committing to git. I want to save these settings to git so Teams can rename the file to `settings.json` instead.

```json
{
  "permissions": {
    "allow": [
      "mcp__puppeteer__puppeteer_navigate",
      "mcp__puppeteer__puppeteer_fill",
      "mcp__puppeteer__puppeteer_click",
      "mcp__puppeteer__puppeteer_screenshot"
    ],
    "deny": []
  }
}
```

By default Claude Code has many tools available. To check this Teams can simply ask `"What tools can you use?"` and the response looks something like this.

```bash
⏺ I have access to these tools:
  1. Task - For creating new agents with various tools
  2. Bash - For executing shell commands
  3. Batch - For running multiple tool invocations in parallel
  4. Glob - For file pattern matching
  5. Grep - For searching file contents
  6. LS - For listing files and directories
  7. Read - For reading files
  8. Edit - For editing files
  9. Write - For creating/overwriting files
  10. NotebookRead/Edit - For working with Jupyter notebooks
  11. WebFetch - For retrieving web content
  12. TodoRead/Write - For managing task lists
  13. Various Puppeteer tools - For browser automation
```

As I use these tools Teams can be asked for permissions where if I respond with `Yes` the tools will be added to the allowed tools settings.

Teams can now add another command to allow list by committing our change so far to git. I enter `Commit` to the Claude Code prompt. It asks me to allow certain git commands. When I confirm these commands are also added as allowed tools in the local settings file. Usually this adds the tools along with the argument values used. I used Claude Desktop to generate a clean version of settings file with wildcards indicating any use of these commands is allowed. Practitioners are not allowing Claude Code to install software with `curl` and `wget` in deny list. I update `settings.json` with this clean version.

```json
{
  "permissions": {
    "allow": [
      "mcp__puppeteer__puppeteer_navigate",
      "mcp__puppeteer__puppeteer_fill",
      "mcp__puppeteer__puppeteer_click",
      "mcp__puppeteer__puppeteer_screenshot",
      "Bash(git status)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git pull:*)",
      "Bash(git checkout:*)",
      "Bash(git branch:*)",
      "Bash(git merge:*)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git stash:*)",
      "Bash(git fetch:*)",
      "Bash(git clone:*)",
      "Bash(git rebase:*)",
      "Bash(git reset:*)",
      "Bash(git tag:*)",
      "Bash(git config:*)",
      "Bash(git remote:*)",
      "Read(*)",
      "Edit(*)",
      "Create(*)",
      "Write(*)"
    ],
    "deny": [
      "Bash(curl:*)",
      "Bash(wget:*)"
    ]
  }
}
```


Now that Practitioners are ready to move to next step, Teams can ask Claude to `commit all changes` which will run the required git tools.

## Custom Slash Commands

Teams can further optimize recommended workflows by saving repeating prompts as custom slash commands. 

I create `.claude/commands/step.md` with following contents.

```markdown
Execute the next step in the @plan.md
```

Here is the `.claude/commands/commit.md` slash command.

```markdown
Commit all changes in this project
```

And the `.claude/commands/build.md` slash command.

```markdown
Build the project. Fix any build errors.
```

This is the `.claude/commands/test.md` slash command.

```markdown
Run all tests in this project.
```

This is the `.claude/commands/debug.md` slash command.

```markdown
Run all tests in this project. Fix any errors in the project.
```

This is the `.claude/commands/analyze.md` slash command.

```markdown
Run the code analysis script on this project.
```

This is the `.claude/commands/update.md` slash command.

```markdown
Update the plan (@plan.md) and evaluation guide (@guide.md) based on any new features added since last update.
```

Here is the end result. This speeds up recommended workflows a fair bit.

![Image](/images/blog/slash-commands.png)


---

***Important:** Note that the following sections are my first attempt at evolving a strategy to vibe code with a set of rails. At the end of each section Practitioners are noting as **hindsight** what worked and what could improve in my first attempt. If you want to follow the evolved strategy then **Vibe Coding on Rails** is the chapter to read. However following this first attempt is a useful guidance on costly mistakes which may not be so obvious to catch early. This may help my readers avoid these mistakes in their own workflow.*

## Creating Memory

Claude stores its memory in `CLAUDE.md` file within project folder root.

I start with Claude Desktop to help me generate the file.



I copy the response into my project. Then I run the `/init` command which results in Claude Code further optimizing the file.


```markdown
...

## Build/Test/Lint Commands
As the project evolves, these commands will be added:
- Run all tests: `npm test`
- Run single test: `npm test -- -t "test name"` or `npx jest path/to/test.js`
- Lint code: `npm run lint`
- Type check: `npm run typecheck`
- Build: `npm run build`
- Dev server: `npm run dev`

## Workflow: Test-Driven Development

This project follows a test-driven development (TDD) approach:

1. **Write Tests First**: Create tests based on requirements with clear input/output pairs.
2. **Verify Tests Fail**: Run tests to confirm they fail before implementation.
3. **Commit Tests**: Commit test files separately.
4. **Implement Code**: Write code that passes tests without modifying them.
5. **Iterate Until Tests Pass**: Adjust code until all tests pass.
6. **Commit Working Code**: Commit implementation when satisfied.

## Project Structure
- `/src` - Source code
- `/tests` - Test files
- `/docs` - Documentation
...
```




## Planning

Planning stage is the most important step in vibe coding cycle. I start with an initial prompt to have Claude Code generate an implementation plan.





I review the plan and note some aspects may need improving. I ask Claude to review own work and make improvements.




This results in several updates to the plan.


```markdown

# Trenddit Implementation Plan

This document outlines the step-by-step implementation plan for Trenddit, a web application for tracking technology trends using AI-powered voting.

## Tech Stack

### Frontend
- **React.js** - UI library
- **TypeScript** - Type safety
- **Next.js** - Framework with SSR, API routes, and app router
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library for rapid UI development
- **TanStack Query** - Data fetching and state management
- **Zustand** - Lightweight state management

### Backend
- **Next.js API Routes** - Serverless backend functions
- **AWS SDK for JavaScript v3** - For Amazon Bedrock integration
- **Prisma** - ORM with migrations and type safety
- **PostgreSQL** - Primary database
- **Redis** - Caching and rate limiting
- **NextAuth.js** - Authentication

### DevOps & Infrastructure
- **AWS Amplify** - Hosting and CI/CD pipeline
- **AWS Lambda** - Scheduled tasks for RSS fetching
- **AWS S3** - Asset storage
- **OpenTelemetry** - Monitoring and observability
- **GitHub Actions** - CI/CD automation

### Testing
- **Vitest** - Fast testing framework
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing
- **MSW** - API mocking

### Utilities
- **rss-parser** - RSS feed parsing
- **zod** - Runtime schema validation
- **date-fns** - Date manipulation
- **lodash-es** - Utility functions

## MVP Definition

**MVP 1: Core Feed Experience**
- User authentication
- Basic feed UI with manual posts
- Simple post model and rendering

**MVP 2: RSS Integration**
- RSS source management
- Automated post ingestion
- Post deduplication

**MVP 3: AI-Powered Features**
- Amazon Bedrock integration
- User-defined voting criteria
- Basic trend detection

## Phase 1: Project Setup and Core Infrastructure

### 1.1 Project Initialization (TDD Approach)
1. Write tests for project configuration
2. Set up Next.js 14 with App Router and TypeScript
3. Configure Tailwind CSS and shadcn/ui
4. Set up Vitest and testing environment
5. Initialize Prisma with PostgreSQL
6. Configure ESLint, Prettier, and Husky for pre-commit hooks
7. Set up GitHub Actions for CI/CD
...

```





## Vibe Coding

Now Practitioners are ready to really start vibe coding. All I need to do is run this prompt, wait, and watch over Claude's shoulders as it does its magic!



The VS Code IDE and Claude Code integration within Terminal is working well. Teams can review generated project structure and code while Claude runs through its checklist from the plan.

![Image](/images/blog/vibe-coding-trenddit.png)




This adds a progress tracker to the `plan.md` file.

![Image](/images/blog/plan-progress-tracker.png)




![Image](/images/blog/first-release-ui.png)




This time I noticed that Claude not only follows the plan but also updates it as it learns from prior prompt in context. Nice! 






## Debugging

I open my Mac Terminal and run `npm run dev` command to try out the features by browsing the web app on localhost within my browser. I notice some issues so it is time to try out that cool Puppeteer MCP server integration Best practices involve earlier in this chapter. I run `npm run build` command in the Mac Terminal. Once again start the server. Then switch to my Claude Code CLI to add the following prompt.



Claude runs the Puppeteer tool and spawns Chrome for Testing with the Trenddit app.


![Image](/images/blog/puppeteer-visual-test.png)

Claude identifies a set of issues and recommends to fix these as next step. I prompt to record this in the plan.



I then `commit all changes` before moving forward.

I also run `/init` command again to ensure `CLAUDE.md` is updated based on the latest project code. Time to also `/clear` the context and restart Claude Code. My project context is captured in memory, plan, and existing code. Clearing current session context helps run Claude Code more efficiently both in terms of cost and performance.

Next I ask Claude to fix the issues as per plan. Here is what a debugging session looks like.

![Image](/images/blog/debug.png)

Finally I ask Claude to document a feature evaluation guide in the `README.md` file. I use this to manually evaluate the features built so far.



Now I follow the evaluation guide and get to the feed page. Wow! This feeds page was built based on the few sentences of requirements I had shared earlier.
![Image](/images/blog/trenddit-feed.png)


I continue to browse the generated app. Here is the details page for the post when clicked.

![Image](/images/blog/details.png)

Here is the sign in screen. It works with test crendentials.
![Image](/images/blog/signin.png)
Here is the sign out screen.

![Image](/images/blog/signout.png)
And here is the invalid credentials screen.

![Image](/images/blog/credentials.png)

After a long debugging cycle the app features may have changed so I prompt Claude like so.



In fact, I also update `CLAUDE.md` to update plan and evaluation guide as part of the workflow.

Teams can continue to vibe code the entire application now with a single prompt!



This prompt will read the next step from the plan and execute the refined workflow with following steps:

1. **Write Tests First**: Create tests based on requirements with clear input/output pairs.
2. **Verify Tests Fail**: Run tests to confirm they fail before implementation.
3. **Commit Tests**: Commit test files separately.
4. **Implement Code**: Write code that passes tests without modifying them.
5. **Iterate Until Tests Pass**: Adjust code until all tests pass.
6. **Commit Working Code**: Commit implementation when satisfied.

If the plan is not updated, Teams can do so along with the evaluation guide in one prompt.



After a step is complete, all bugs are fixed, and Practitioners are satisfied with the user evaluation. I also `/clear` the conversation context to make next session more efficient.

When manually evaluating the app in Chrome browser, I turn on Chrome Developer Tools > Console to catch errors (see partially hidden error messages on bottom right corner). I copy paste these errors to Claude Code and at times it uses Puppeteer to browse minified React error codes for their proper definition. Very cool as Best practices involve not "teach" Claude Code this technique within memory file or otherwise in context. It figured out how to do this based on tools available.

Then it continues to build update its Todos list of errors to fix and attempts to fix these one by one.

![Image](/images/blog/minified-react-error.png)

During debugging sessions the TDD workflow mentioned in memory file may not be followed so I always check if I need to commit changes, update evaluation guide, or plan.




## Analyzing Code

Now that I have a significant body of work in terms of code generated, I want to brag about it! How many lines of code I vibe coded using recommended workflows? What is the quality of the code generated? How is it trending over releases?



This prompt generated a set of scripts which were using ES Lint. There were many issues in the setup which Claude fixed. As I ran the analysis and checked the reports Practitioners are not happy with the outcome. Considering the issues I decided to redo this step. I wanted to revert the project state so I ran the following prompt.



Claude uses appropriate Git and Bash commands to do the needful.

Now I created a new section in plan called Development Environment and listed the todos by breaking them down into simpler tasks using similar format as rest of the plan generated by Claude. This plan can be extended with more analysis types as needed.

```markdown
## Development Environment

### Code Analysis and Trends

All code analysis and trends reports should be generated in markdown format. 
They should be saved in .code-analysis folder.
Code analysis reports should be saved as [category]-timestamp.
[category] name depends on type of analysis reported.
Trends report should be saved as trends.md
Trends report should compare trends by category over time.

1. Create a script to report lines of code and comments by module and total for project.
2. Create a script to report test coverage by module and average for project.

```

Now I prompted Claude to think harder about solving for this plan.



This resulted in following lines of code analysis.

![Image](/images/blog/code-analysis.png)

The analysis also revealed that certain tests are failing. This way code analysis is helping provide another layer of review on my codebase.

5,700 lines of code! This is fantastic and a new vibe coding record for organizations. I must evaluate the new features if the functionality developed warrants this code volume.

I follow the evaluation guide and note that the settings screen is working. Teams can set a dark or light theme and the UI changes accordingly.

![Image](/images/blog/settings.png)

The feed page has also gone through changes. There is a cool new grid layout.

![Image](/images/blog/grid.png)

I also note the compact layout.

![Image](/images/blog/conpact.png)
I also notice a nicely laid out top menu. Love the clean simple UI. There are four drop downs. First one is user menu with accounts and preferences in context.

![Image](/images/blog/user-menu.png)

Second one is accessibility menu. How thoughtful!

![Image](/images/blog/accessibility-menu.png)

Third one is Layout menu.

![Image](/images/blog/layout-menu.png)

Fourth one is theme menu.

![Image](/images/blog/theme-menu.png)

Practitioners are excited to continue vibe coding Trenddit so that the features evolve from high fidelity prototypes to actual integrations with Amazon Bedrock and feeds. My next prompt is the same.






## Refactoring and Rearchitecting 

As the project has progressed I have observed a persistent challenge. The feed sources feature is problematic. Practitioners are not being able to add a new feed source. My workaround to seed with feed sources did not help either. I have tried several ways to fix these issues including sending Claude screen grabs, making it `ultrathink` for more reasoning tokens, using subagents, and so on. Nothing seems to work.

![Image](/images/blog/feed-issues.png)

The lessons learnt in this chapter resulted in creating the Vibe Coding on Rails chapter. This is where the hindsights from each section were applied and resolved to refine the strategies used to vibe code effectively and efficiently.

## Conclusion

Vibe coding is synonymous with rapid prototyping and experimentation. If one stack does not work through few iterations, throw it away and try a new one. If Best practices involve not like a complex project structure generated by a framework, I change the framework. As long as I have preserved the prompts to define my product, automated my vibe coding workflows, and documented the strategies which work well, Teams can always throw away code and fresh start. There is a sense of freedom in doing so. It is also continuous learning and adapting. Discovering new vibe coding techniques while rapidly trying out capabilities of new tools and frameworks feels like a super power I never had before LLMs. High agency trumps framework and programming language loyalty! There is also the satisfaction of higher order learning about solving a problem in creative ways verses struggling with syntax and setup.



## Industry Insights and Research

According to recent industry analysis, AI-powered development tools are transforming software engineering practices across organizations. [Anthropic's research on AI coding assistants](https://www.anthropic.com/engineering/claude-code-best-practices) demonstrates significant productivity gains when implementing structured AI workflows.

The [Y Combinator Winter 2025 batch report](https://blog.ycombinator.com/) shows that 25% of participating startups leverage AI-generated code for over 95% of their codebase, indicating rapid adoption of these methodologies in the startup ecosystem.

For organizations considering AI automation implementation, [McKinsey's AI adoption research](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2024) provides valuable insights into best practices and ROI expectations.