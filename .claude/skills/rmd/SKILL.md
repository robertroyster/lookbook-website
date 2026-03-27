---
name: rmd
description: Read and display markdown (.md) and document (.doc, .docx, .pdf, .txt) files
user-invocable: true
allowed-tools: Read, Glob, Bash
argument-hint: "[file-path-or-glob-pattern]"
---

Read and display the contents of markdown and document files.

## Instructions

1. If `$ARGUMENTS` is a specific file path, read it directly using the Read tool.
2. If `$ARGUMENTS` is a glob pattern or directory, use Glob to find matching `.md`, `.doc`, `.docx`, `.pdf`, and `.txt` files, then read them.
3. If no argument is provided, search the current working directory for all `.md`, `.doc`, `.docx`, `.pdf`, and `.txt` files and read all of them.

## Supported file types
- `.md` — Read directly
- `.txt` — Read directly
- `.pdf` — Use Read tool with page ranges for large PDFs
- `.doc` / `.docx` — Use Bash to extract text: `python3 -c "import docx; doc=docx.Document('$ARGUMENTS'); print('\n'.join(p.text for p in doc.paragraphs))"`
  - If python-docx is not installed, run `pip install python-docx` first

## Output
- Display the file contents clearly
- For multiple files, show each with its filename as a header
