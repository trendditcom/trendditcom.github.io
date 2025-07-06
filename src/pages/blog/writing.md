---
layout: '@layouts/BlogPost.astro'
title: "Writing"
date: "2025-07-05"
author: "Trenddit Team"
excerpt: "Master vibe writing workflows using natural language prompts with LLMs to create, enhance, and organize text content."
featuredImage: "/images/blog/vibe-writing-summaries.png"
tags: ["ai", "automation", "development", "workflows", "productivity", "aws", "knowledge-management", "trenddit", "Trenddit Memo", "Lean Workflows"]
---


I mostly do my work in text and sometimes images. I write articles, posts, documents for work. I manage my to do lists as text outlines. I capture my meeting notes as text. And so on. Vibe Writing workflow is when Teams can use natural language prompts with an LLM to create, enhance, research, review, and organize my text and image content.

Vibe Writing is a good first step to Vibe Coding for many reasons. 

1. The workflow is similar - prompting > generating > reviewing > iterating.
2. Coding involves fair bit of writing, like specifications, use cases, requirements, etc.
3. Many of the tools can be the same. For example, using VS Code for code and content editing. 
4. Writing workflows can suggest new vibe coding workflows. For example, using code blogs to iterate on code while explaining the code for LLM context and human readability.

## The Power of Markdown

Markdown is a convenient format for my text content as it can easily integrate with coding apps which understand markdown, content management systems which support markdown, and Teams can use editing tools which are markdown native, like Obsidian. Markdown is also easy to convert to other formats like HTML and PDF. Another benefit of Markdown is that it is compact with minimal formatting tags, making it ideal for passing as context to an LLM while minimizing tokens and pre/post document processing.

The simplicity of Markdown also makes it an ideal format for LLMs to generate and modify. When working with LLMs for content creation, the key aspects involve natural language input, AI-powered generation, iterative refinement, and collaborative development. Markdown makes this process more efficient as it removes the complexity of formatting while still allowing for structured documents with headings, lists, links, and images. This efficiency is crucial for Vibe Writing, as it allows the flow of ideas to remain uninterrupted by formatting concerns, letting both the human writer and the LLM focus on content rather than presentation.


This approach aligns with Trenddit's mission to provide lean AI automation solutions. The Trenddit Memo browser extension exemplifies these principles by enabling knowledge workers to capture, organize, and interact with information using AI-powered automation.

For organizations looking to implement similar AI-driven workflows, consider how tools like Trenddit Memo can streamline knowledge management and enhance productivity across teams.

## Emulating and Extending Existing Tools

When automating workflows a great place to start is to emulate a tool or app that Organizations benefit from. Then Teams can make it my own by improving in areas which the original tool may not support. Google NotebookLM is a great tool. It does a lot of cool LLM integrations like, Teams can provide it a YouTube link, the tool captures captures the video transcript, and turns it into a neat summary. 

I want to emulate this workflow while using my favorite desktop tools to keep my content on my laptop and control tool access based on my security posture. I also want to use Anthropic models instead of Google Gemini.

![Image](/images/blog/notebooklm.png)

The NotebookLM interface shown above exemplifies how modern AI-powered writing tools can intelligently analyze, organize, and generate content from various sources. Google's NotebookLM provides a clean, user-friendly interface that allows users to interact with documents through natural language, much like a conversation with a knowledgeable research assistant. The interface includes features for organizing sources, extracting key insights, and generating summaries—all capabilities I want to replicate in my own Vibe Writing workflow. By emulating this type of tool with my preferred models and desktop environment, Teams can achieve the same productivity benefits while maintaining control over my data and workflow preferences.

## Content Privacy and Management

Before I setup my writing tools, it is worth noting how Teams can manage my content privacy. I usually create root folders explicitly mentioning open, work, or self suffix. Then depending on my level of trust with tools I use, Teams can choose which folders I expose.

This approach to content privacy is particularly important in the age of LLM-assisted writing, as it allows me to maintain control over what information is shared with the AI models. As Vibe coding involves providing information to AI systems to generate outputs, maintaining privacy and security is a significant consideration, particularly for professional settings. According to Simon Willison, a prominent AI researcher, when using LLMs for coding (and by extension, writing), there are "plenty of hidden sharp edges and traps along the way" particularly when considering what information we share with these models [source: https://simonwillison.net/2025/Mar/19/vibe-coding/].

I use Obsidian for managing my Markdown content. Teams can setup a new Obsidian vault in my Documents folder.

![Image](/images/blog/create-obsidian-vault.png)

The screenshot above shows the process of creating a new Obsidian vault, which will serve as the foundation for my Vibe Writing environment. Obsidian is particularly well-suited for this workflow because it treats notes as interconnected nodes in a knowledge graph rather than isolated documents. This approach to knowledge management aligns perfectly with how LLMs process and connect information. By creating a dedicated vault for my open content, I'm establishing a clear boundary between what can be shared with AI tools and what should remain private. This structured approach to content organization is essential when implementing a Vibe Writing workflow that respects privacy concerns while maximizing the benefits of AI assistance.

## Configuring Tools for Vibe Writing

Next I configure the filesystem MCP server to use the `obsidian-vault-open` folder.

![Image](/images/blog/configure-mcp-filesystem.png)

The configuration screen pictured above shows how I set up the filesystem MCP server to access my Obsidian vault. This critical step creates the bridge between Claude and my local files, enabling a seamless integration where the AI can read from and write to my content repository. Model Context Protocol (MCP) is revolutionizing how we interact with AI tools by providing "a standardized way to handle context interaction between AI models and development environments" [source: https://www.claudemcp.com/]. The protocol design is based on JSON-RPC 2.0, supporting bidirectional communication and rich context interaction, which is exactly what we need for a responsive Vibe Writing environment.

The Model Context Protocol (MCP) is a key component that enables seamless interaction between LLMs and other tools. Claude MCP is an open protocol standard for unified context interaction between AI models and development environments, which allows me to extend Claude's capabilities to interact with my file system and other tools.

Now Claude Desktop can call the `filesystem` tool automatically as needed for running several file operations in a single conversation response completion which performing actions I have requested.

![Image](/images/blog/summarize-transcript.png)

The image above demonstrates how I'm using Claude with MCP to summarize a transcript. This is a perfect example of Vibe Writing in action - I'm providing Claude with a complex document and using natural language to request a specific transformation of that content. The integration allows Claude to directly access the file, process its contents, and generate a concise summary without requiring me to copy and paste large amounts of text or manage multiple applications. This streamlined workflow dramatically reduces the friction in content processing tasks that would traditionally require multiple steps and tools. 

The result is a clean, crisp summary of a long transcript.

![Image](/images/blog/vibe-writing-summaries.png)

As shown in the image above, the summarization process transforms lengthy, verbose transcripts into structured, concise summaries that capture the essential information. This is particularly valuable when processing meeting notes, interviews, or research materials where extracting the key points quickly is essential. The summarized content maintains the core ideas while eliminating unnecessary details, making it easier to review and incorporate into other documents. This capability transforms hours of content review into minutes of focused reading, demonstrating one of the most immediate productivity benefits of the Vibe Writing approach. The clean formatting and clear organization of the summary also showcases how LLMs can not only condense information but also improve its presentation and accessibility.

The integration is straight forward and looks like this.

![Image](/images/blog/claude-mcp-obsidian.png)

The diagram above illustrates the integration between Claude, MCP, and Obsidian that powers my Vibe Writing workflow. This architecture creates a bidirectional flow of information where Claude can access my notes and writing in Obsidian through the MCP server, process or transform that content based on my requests, and then save the results back to my vault. This seamless connection between the AI assistant and my knowledge repository eliminates the context-switching and manual file handling that would otherwise interrupt my creative flow. The integration follows the principles of "tool-aware" AI described by platforms like Pica, which aim to give AI assistants direct access to various APIs through a unified interface [source: https://www.walturn.com/insights/claude-mcp-a-new-standard-for-ai-integration].

## Enhancing the Workflow with Web Research

Now Teams can further enhance my writing workflow by adding web research to expand on current content. Teams can add the [Brave Search](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search) MCP Server to perform the web search.

![Image](/images/blog/brave-search-mcp-tools.png)

The configuration screen shown above demonstrates how I integrate Brave Search capabilities into my Vibe Writing workflow through MCP. This integration allows Claude to perform web searches directly based on my research needs, pulling in relevant information from across the internet without requiring me to switch contexts or manually search and paste content. The Brave Search MCP Server is part of a growing ecosystem of specialized MCP servers that extend Claude's capabilities beyond its built-in knowledge. According to the Model Context Protocol community, there are over 100 specialized MCP servers available, covering everything from database connections to API integrations [source: https://mcpservers.org/]. This extensibility is what makes Vibe Writing with Claude so powerful - Teams can continuously add new capabilities as my needs evolve.

This combination of local file access and web search capabilities transforms Claude into a powerful writing assistant that can help me create, edit, and research content all within a single conversation. The integration of AI with voice and text tools enables a workflow where AI models generate content from natural language prompts, allowing me to describe what I want while the AI handles the implementation details. As noted by Wispr Flow, a voice-enabled Vibe Coding tool, this approach lets developers "concentrate on design and problems, leaving syntax to the AI" - a principle that applies equally well to writing, where Teams can focus on ideas and strategy while the LLM handles research and composition [source: https://wisprflow.ai/vibe-coding].

Practitioners are using the following prompt to help write this chapter using the Vibe Writing workflow I have described so far.

I first start by providing some context to the LLM.



The following prompt asks for specific actions to be taken which result in LLM making the required calls to tools for `filesystem` and `brave search` tools configured earlier in the chapter.


 
I review the resulting content and ask for one more revision before editing the final refinement.



Here is the revised integration diagram with web search included.

![Image](/images/blog/claude-mcp-obsidian-search.png)
## The Evolution of Vibe Writing

Vibe Writing represents a fundamental shift in how we approach content creation. Just as Vibe Coding allows developers to "give in to the vibes" and let LLMs handle code generation, Vibe Writing enables a similar approach to content creation. However, unlike Vibe Coding, which might sometimes sacrifice comprehension for speed, Vibe Writing typically requires more human oversight to ensure the quality and accuracy of the content.

The term "vibe coding" was introduced by Andrej Karpathy in February 2025 to describe a programming approach where developers "fully give in to the vibes, embrace exponentials, and forget that the code even exists," relying on LLMs to generate working code based on natural language descriptions [source: https://en.wikipedia.org/wiki/Vibe_coding]. While this approach has gained significant traction in software development, with Y Combinator reporting that 25% of startups in its Winter 2025 batch had codebases that were 95% AI-generated, the application of these principles to writing represents a natural evolution of the concept.

The key aspects that make Vibe Writing powerful include:

1. **Rapid Ideation**: Quickly generating multiple versions or approaches to content.
2. **Research Augmentation**: Seamlessly incorporating web research and existing knowledge.
3. **Structural Guidance**: Using the LLM to help organize and structure complex documents.
4. **Iterative Refinement**: Having a conversation with the LLM to gradually improve the content.
5. **Format Transformation**: Converting content between different formats and styles.


## AWS Integration for Enhanced Vibe Writing

Integrating AWS services into the Vibe Writing workflow can significantly enhance its capabilities and create a more powerful content creation environment. 

While using Claude Desktop my content including prompts, completions, and context (files passed on as part of context) are going to Anthropic hosted models. While this is ok for content which is intended for open use or public domain, many enterprise have strict policies for using third party hosted models.

Anthropic has a solution similar and more powerful than Claude Desktop which can be integrated with my AWS account managed Claude models. The solution is [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) which can be easily installed on my laptop. With a simple configuration it can be connected to Amazon Bedrock hosted Claude model. More details available in the Vibe Coding chapter.

According to [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html), Amazon Bedrock doesn't store or log my prompts and completions. It doesn't use my prompts and completions to train any AWS models and doesn't distribute them to third parties.

Once installed Teams can run Claude Code within my Obsidian Vault folder and it will restrict the file operations to that folder.
![Image](/images/blog/claude-code.png)
While the user interface is the Terminal based Command Line Interface instead of a desktop app, Claude Code is more powerful than Claude Desktop as it can operate on both text content as well as code.

To connect Claude Code to the MCP servers, Teams can simply import the servers configured for Claude Desktop with a single Terminal command like so.

```bash
claude mcp add-from-claude-desktop
```

This command gives me options to import only the MCP servers I need or all of them.

Teams can also run `/init` command once in the CLI shell (after running `claude` command) to create folder level rules or instructions for Claude. The LLM parses the content of the folder and automatically suggests really comprehensive rules. Teams can have such rules available within each unique folder of my project. So different rules for Vibe Writing and another set for Vibe Coding.

![Image](/images/blog/claude-rules.png)

The revised tools integration looks like this.

![Image](/images/blog/bedrock-vibe-writing.png)

As you will notice this integration is incremental to the one earlier with Claude Desktop. So Teams can use Claude Desktop to configure new MCP servers, prototype the usage with open content, before importing these servers to Claude Code and running these on my work content.

Teams can be covering more detailed and advanced use cases for Claude Code in the Vibe Coding chapter.

## Conclusion

Vibe Writing represents a transformative approach to content creation that leverages the power of LLMs to enhance human creativity and productivity. By combining the natural language capabilities of models like Claude with the robust infrastructure of AWS, we can create writing workflows that are more efficient, creative, and powerful than ever before.

The integration of MCP servers, knowledge bases, and specialized AI assistants creates a comprehensive environment where writing becomes a collaborative process between human authors and AI systems. As these technologies continue to evolve, the boundaries between different types of content creation—writing, coding, design—will become increasingly fluid, enabling new forms of expression and communication.

The key to successful Vibe Writing lies in finding the right balance between AI assistance and human oversight, leveraging the strengths of each to create content that is both efficient to produce and effective in communicating ideas. By adopting the approaches outlined in this chapter, you can begin to build your own Vibe Writing workflow that aligns with your specific needs and preferences, while taking advantage of the powerful capabilities offered by AWS services and the broader AI ecosystem.