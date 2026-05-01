# Superpowers Workflow

Superpowers is treated here as a disciplined development method and installed skill set, not as magic and not as Claude extended thinking.

In this repository, Superpowers means the local Superpowers plugin workflow skills such as brainstorming, writing plans, test-driven development, verification before completion, and code review. It is an external workflow harness for agent-assisted development.

## Loop

1. Brainstorming: clarify intent, constraints, and success criteria.
2. Writing plans: turn the design into small implementation tasks.
3. Test-driven development: create a failing test or eval before changing behavior.
4. Implementation: make the smallest change that passes.
5. Verification: run the relevant command and inspect output.
6. Review: look for bugs, regressions, missing tests, and unclear contracts.

## When To Use

- New feature in the assistant project.
- New MCP tool.
- New harness control.
- New eval category.
- Any change where the failure mode is not obvious.

## Output Artifacts

- A short plan.
- A test or eval case.
- Code or documentation change.
- Verification result.
- Retrospective note if something failed.
