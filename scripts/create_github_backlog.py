from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

REPO = "zarakikenpashi/sadai-red-flag"
BACKLOG = Path("docs/05-backlog-github-issues.md")

LABELS = {
    "type:feature": ("0E8A16", "Fonctionnalité"),
    "type:bug": ("D73A4A", "Bug"),
    "type:task": ("C5DEF5", "Tâche technique"),
    "type:docs": ("0075CA", "Documentation"),
    "type:test": ("FBCA04", "Tests"),
    "type:security": ("B60205", "Sécurité"),
    "priority:high": ("B60205", "Priorité haute"),
    "priority:medium": ("D93F0B", "Priorité moyenne"),
    "priority:low": ("0E8A16", "Priorité basse"),
    "area:frontend": ("1D76DB", "Frontend"),
    "area:backend": ("5319E7", "Backend"),
    "area:database": ("006B75", "Base de données"),
    "area:auth": ("7057FF", "Authentification"),
    "area:admin": ("D4C5F9", "Administration"),
    "area:moderation": ("F9D0C4", "Modération"),
    "area:design": ("C2E0C6", "Design UI"),
    "area:devops": ("BFDADC", "DevOps"),
    "area:legal-safety": ("E99695", "Juridique et sécurité produit"),
    "area:security": ("B60205", "Sécurité"),
    "status:blocked": ("000000", "Bloqué"),
    "status:needs-validation": ("FBCA04", "Validation requise"),
    "status:ready": ("0E8A16", "Prêt"),
    "mvp": ("EF233C", "Périmètre MVP"),
    "post-mvp": ("94A3B8", "Hors MVP"),
}

MILESTONES = [
    "M0 — Setup & fondations",
    "M1 — Pages publiques & recherche",
    "M2 — Auth & témoignages",
    "M3 — Modération & admin",
    "M4 — Scoring & confiance",
    "M5 — QA, sécurité & livraison MVP",
]


def run(args: list[str], input_text: str | None = None, check: bool = True) -> subprocess.CompletedProcess[str]:
    return subprocess.run(args, input=input_text, text=True, capture_output=True, check=check)


def ensure_labels() -> None:
    for name, (color, desc) in LABELS.items():
        existing = run(["gh", "label", "list", "--repo", REPO, "--search", name, "--json", "name"], check=True)
        names = {item["name"] for item in json.loads(existing.stdout or "[]")}
        if name in names:
            run(["gh", "label", "edit", name, "--repo", REPO, "--color", color, "--description", desc], check=False)
        else:
            run(["gh", "label", "create", name, "--repo", REPO, "--color", color, "--description", desc], check=True)


def ensure_milestones() -> None:
    existing = run(["gh", "api", f"repos/{REPO}/milestones", "--paginate"], check=True)
    titles = {item["title"] for item in json.loads(existing.stdout or "[]")}
    for title in MILESTONES:
        if title not in titles:
            run(["gh", "api", "-X", "POST", f"repos/{REPO}/milestones", "-f", f"title={title}"], check=True)


def parse_issues() -> list[dict[str, str | list[str]]]:
    text = BACKLOG.read_text(encoding="utf-8")
    matches = list(re.finditer(r"^## Issue (\d+) — (.+)$", text, flags=re.MULTILINE))
    issues = []
    for idx, match in enumerate(matches):
        number = match.group(1)
        title = f"Issue {number} — {match.group(2).strip()}"
        start = match.end()
        end = matches[idx + 1].start() if idx + 1 < len(matches) else text.find("# Ordre de développement recommandé", start)
        if end == -1:
            end = len(text)
        body = text[start:end].strip()
        labels_match = re.search(r"\*\*Labels\*\*\s*:\s*(.+)", body)
        labels = []
        if labels_match:
            labels = re.findall(r"`([^`]+)`", labels_match.group(1))
        milestone_match = re.search(r"\*\*Milestone\*\*\s*:\s*(.+)", body)
        milestone = milestone_match.group(1).strip() if milestone_match else ""
        issues.append({"title": title, "body": body, "labels": labels, "milestone": milestone})
    return issues


def existing_issue_titles() -> set[str]:
    cp = run(["gh", "issue", "list", "--repo", REPO, "--state", "all", "--limit", "200", "--json", "title"], check=True)
    return {item["title"] for item in json.loads(cp.stdout or "[]")}


def create_issues() -> int:
    existing = existing_issue_titles()
    created = 0
    for issue in parse_issues():
        title = str(issue["title"])
        if title in existing:
            continue
        args = ["gh", "issue", "create", "--repo", REPO, "--title", title, "--body", str(issue["body"])]
        labels = [label for label in issue["labels"] if label in LABELS]
        if labels:
            args += ["--label", ",".join(labels)]
        milestone = str(issue["milestone"])
        if milestone:
            args += ["--milestone", milestone]
        run(args, check=True)
        created += 1
    return created


if __name__ == "__main__":
    ensure_labels()
    ensure_milestones()
    created = create_issues()
    total = len(parse_issues())
    open_count = json.loads(run(["gh", "issue", "list", "--repo", REPO, "--state", "open", "--limit", "200", "--json", "number"], check=True).stdout or "[]")
    print(json.dumps({"created": created, "defined": total, "open": len(open_count)}, ensure_ascii=False))
