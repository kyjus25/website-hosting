from __future__ import annotations

import html
import re
import subprocess
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path


ROOT = Path("/Users/kyjus25/Documents/testing/website-hosting")
APP_ROOT = ROOT / "applications" / "fogm"
PAGES_ROOT = APP_ROOT / "src" / "pages"
DRAFTS_ROOT = APP_ROOT / "src" / "drafts"
PUBLIC_ROOT = APP_ROOT / "public"
SQL_PATH = Path("/Users/kyjus25/Documents/dad backup/wp_posts_fogm.sql")
SITE_HOSTS = (
    "https://fireofgodministries-thefathershouse.com",
    "http://fireofgodministries-thefathershouse.com",
    "https://www.fireofgodministries-thefathershouse.com",
    "http://www.fireofgodministries-thefathershouse.com",
)
ASSET_EXTENSIONS = (
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".svg",
    ".mp3",
    ".mp4",
)


@dataclass
class Record:
    post_id: int
    post_date: str
    content: str
    title: str
    excerpt: str
    status: str
    slug: str
    parent: int
    guid: str
    post_type: str
    mime_type: str


@dataclass
class Target:
    path: Path
    layout: str
    nav: bool = True
    title: str | None = None
    notes: str | None = None


PAGE_TARGETS = {
    "fire-god-ministriesthe-fathers-house": Target(PAGES_ROOT / "index.md", "../layouts/Home.astro", True, "Home"),
    "mission-statement": Target(PAGES_ROOT / "mission-statement.md", "../layouts/Page.astro"),
    "order-a-dvd": Target(PAGES_ROOT / "contact-us.md", "../layouts/Page.astro", True, "Contact Us"),
    "the-fathers-house": Target(PAGES_ROOT / "the-fathers-house" / "index.md", "../../layouts/Page.astro", True, "The Father's House"),
    "brazil-ministry": Target(PAGES_ROOT / "the-fathers-house" / "brazil-ministry" / "index.md", "../../../layouts/Page.astro"),
    "usa-ministry": Target(PAGES_ROOT / "the-fathers-house" / "usa-ministry.md", "../../layouts/Page.astro"),
    "jerusalem-ministry": Target(PAGES_ROOT / "the-fathers-house" / "jerusalem-ministry.md", "../../layouts/Page.astro"),
    "kenya-africa": Target(PAGES_ROOT / "the-fathers-house" / "kenya-africa.md", "../../layouts/Page.astro"),
    "jump-start-english": Target(PAGES_ROOT / "the-fathers-house" / "brazil-ministry" / "jump-start-english.md", "../../../layouts/Page.astro"),
    "jump-start-spanish": Target(PAGES_ROOT / "the-fathers-house" / "brazil-ministry" / "jump-start-spanish.md", "../../../layouts/Page.astro"),
    "future-tech-e-future-fashion": Target(PAGES_ROOT / "the-fathers-house" / "brazil-ministry" / "future-tech-e-future-fashion.md", "../../../layouts/Page.astro", False),
    "pr-david-white-u-s-a-brazil": Target(PAGES_ROOT / "the-fathers-house" / "brazil-ministry" / "pr-david-white-u-s-a-brazil.md", "../../../layouts/Page.astro", False),
    "the-valley-of-transformation": Target(PAGES_ROOT / "the-fathers-house" / "brazil-ministry" / "the-valley-of-transformation.md", "../../../layouts/Page.astro", False),
    "the-usa-project": Target(PAGES_ROOT / "the-fathers-house" / "the-usa-project.md", "../../layouts/Page.astro", False, "The USA Project"),
    "the-unknown-god": Target(PAGES_ROOT / "the-unknown-god" / "index.md", "../../layouts/Page.astro"),
    "prison-ministry": Target(PAGES_ROOT / "the-unknown-god" / "prison-ministry.md", "../../layouts/Page.astro"),
    "teen-challenge": Target(PAGES_ROOT / "the-unknown-god" / "teen-challenge.md", "../../layouts/Page.astro"),
    "bible-based-sermon-videos": Target(PAGES_ROOT / "sermons" / "index.md", "../../layouts/Page.astro", True, "Sermons"),
    "live-feed": Target(PAGES_ROOT / "sermons" / "live-feed.md", "../../layouts/Page.astro"),
    "bible-study-stories": Target(PAGES_ROOT / "sermons" / "study-words" / "index.md", "../../../layouts/Page.astro", True, "Study Words"),
    "fog-tv-studio-backdrops": Target(PAGES_ROOT / "sermons" / "fog-tv-studio-backdrops.md", "../../layouts/Page.astro", False),
}

NON_ROUTE_DRAFTS = {
    "products": Target(DRAFTS_ROOT / "products.md", "../layouts/Page.astro", False, "Products", "Draft page from WordPress."),
    "shop": Target(DRAFTS_ROOT / "shop.md", "../layouts/Page.astro", False, "Shop", "WooCommerce-powered page migrated as a draft placeholder."),
    "cart": Target(DRAFTS_ROOT / "cart.md", "../layouts/Page.astro", False, "Cart", "WooCommerce-powered page migrated as a draft placeholder."),
    "checkout": Target(DRAFTS_ROOT / "checkout.md", "../layouts/Page.astro", False, "Checkout", "WooCommerce-powered page migrated as a draft placeholder."),
    "my-account": Target(DRAFTS_ROOT / "my-account.md", "../layouts/Page.astro", False, "My account", "WooCommerce-powered page migrated as a draft placeholder."),
    "404-error-page": Target(DRAFTS_ROOT / "404-error-page.md", "../layouts/Page.astro", False, "404 error page", "System page migrated as a draft placeholder."),
    "wpms-html-sitemap": Target(DRAFTS_ROOT / "wpms-html-sitemap.md", "../layouts/Page.astro", False, "WPMS HTML Sitemap", "Plugin-generated sitemap page migrated as a draft placeholder."),
}


def parse_sql() -> list[Record]:
    sql = SQL_PATH.read_text(errors="ignore")
    pattern = re.compile(
        r"\((\d+),\s*\d+,\s*'([^']*)',\s*'[^']*',\s*'(.*?)',\s*'(.*?)',\s*'(.*?)',\s*'([^']*)',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'(.*?)',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*'[^']*',\s*(\d+),\s*'(.*?)',\s*\d+,\s*'([^']*)',\s*'([^']*)',\s*\d+\)",
        re.S,
    )
    rows: list[Record] = []
    for match in pattern.finditer(sql):
        post_id, post_date, content, title, excerpt, status, slug, parent, guid, post_type, mime_type = match.groups()
        rows.append(
            Record(
                post_id=int(post_id),
                post_date=post_date,
                content=unescape_sql_string(content),
                title=unescape_sql_string(title),
                excerpt=unescape_sql_string(excerpt),
                status=status,
                slug=slug,
                parent=int(parent),
                guid=guid,
                post_type=post_type,
                mime_type=mime_type,
            )
        )
    return rows


def unescape_sql_string(value: str) -> str:
    return (
        value.replace("\\r\\n", "\n")
        .replace("\\n", "\n")
        .replace("\\'", "'")
        .replace('\\"', '"')
        .replace("\\\\", "\\")
    )


def asset_urls(text: str) -> list[str]:
    urls = set()
    for host in SITE_HOSTS:
        pattern = re.compile(re.escape(host) + r"(/[^\"'\s)>\]]+)")
        for match in pattern.finditer(text):
            full = host + match.group(1)
            if full.lower().endswith(ASSET_EXTENSIONS):
                urls.add(full)
    return sorted(urls)


def download_asset(url: str) -> None:
    parsed = urllib.parse.urlparse(url)
    local_path = PUBLIC_ROOT / parsed.path.lstrip("/")
    local_path.parent.mkdir(parents=True, exist_ok=True)
    if local_path.exists():
        return
    request = urllib.request.Request(url, headers={"User-Agent": "Codex migration"})
    with urllib.request.urlopen(request, timeout=20) as response:
        local_path.write_bytes(response.read())


def replace_shortcodes(raw: str) -> str:
    content = raw
    content = re.sub(r"<!--\s*/?wp:[^>]*-->", "", content)
    content = re.sub(
        r"\[caption[^\]]*\](<img\b.*?/>)\s*(.*?)\[/caption\]",
        lambda m: f"<figure>{m.group(1)}<figcaption>{m.group(2).strip()}</figcaption></figure>",
        content,
        flags=re.S,
    )
    content = re.sub(r"\[embed\](.*?)\[/embed\]", lambda m: f"\n{m.group(1).strip()}\n", content, flags=re.S)
    return content


def protect_raw_html(raw: str) -> tuple[str, dict[str, str]]:
    placeholders: dict[str, str] = {}

    def stash(match: re.Match[str]) -> str:
        key = f"WPRAWBLOCK{len(placeholders)}"
        placeholders[key] = match.group(0)
        return f"\n\n{key}\n\n"

    patterns = [
        r"<iframe\b.*?</iframe>",
        r"<audio\b.*?</audio>",
        r"<video\b.*?</video>",
        r"<source\b[^>]*>",
    ]
    content = raw
    for pattern in patterns:
        content = re.sub(pattern, stash, content, flags=re.S | re.I)
    return content, placeholders


def pandoc_markdown(raw: str) -> str:
    result = subprocess.run(
        ["pandoc", "-f", "html", "-t", "gfm", "--wrap=none"],
        input=raw.encode(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=True,
    )
    return result.stdout.decode()


def restore_raw_html(markdown: str, placeholders: dict[str, str]) -> str:
    output = markdown
    for key, value in placeholders.items():
        output = output.replace(key, value)
    return output


def route_for_target(target: Target) -> str:
    rel = target.path.relative_to(PAGES_ROOT).as_posix()
    if rel == "index.md":
        return "/"
    if rel.endswith("/index.md"):
        return "/" + rel[: -len("index.md")]
    return "/" + rel[: -len(".md")] + "/"


def build_internal_link_map(records: list[Record]) -> dict[str, str]:
    mapping: dict[str, str] = {
        "/?page=Mission%20Statement": "/mission-statement/",
        "/?page=Bible%20Based%20Sermon%20Videos": "/sermons/",
        "/?page=Bible%20Study%20And%20Stories": "/sermons/study-words/",
        "/?page=The%20Unknown%20God": "/the-unknown-god/",
        "/?page=The%20Valley%20of%20Transformation": "/the-fathers-house/brazil-ministry/the-valley-of-transformation/",
        "/?page=Flame%20On": "/sermons/study-words/flame-on/",
        "/?page=Jesus:%20The%20Manna%20From%20Heaven": "/sermons/study-words/jesus-the-manna-from-heaven/",
        "/?page=The%20Sand%20Box": "/sermons/study-words/the-sandbox/",
        "/?page=Order": "/contact-us/",
        "/bible-based-sermon-videos/": "/sermons/",
        "/bible-based-sermon-videos/bible-study-stories/": "/sermons/study-words/",
        "/bible-study-stories/": "/sermons/study-words/",
        "/sermons/bible-study-stories/": "/sermons/study-words/",
    }
    for record in records:
        if record.post_type == "page" and record.slug in PAGE_TARGETS:
            target = PAGE_TARGETS[record.slug]
            route = route_for_target(target)
            if record.guid:
                parsed = urllib.parse.urlparse(record.guid)
                key = parsed.path or "/"
                if parsed.query:
                    key += "?" + parsed.query
                mapping[key] = route
            mapping[f"/{record.slug}/"] = route
        if record.post_type == "post" and record.status == "publish":
            route = f"/sermons/study-words/{record.slug}/"
            if record.guid:
                parsed = urllib.parse.urlparse(record.guid)
                key = parsed.path or "/"
                if parsed.query:
                    key += "?" + parsed.query
                mapping[key] = route
            mapping[f"/{record.post_date[:4]}/{record.post_date[5:7]}/{record.post_date[8:10]}/{record.slug}/"] = route
    return mapping


def rewrite_urls(text: str, internal_map: dict[str, str]) -> str:
    updated = text
    for host in SITE_HOSTS:
        for old_path, new_path in internal_map.items():
            updated = updated.replace(host + old_path, new_path)

    for host in SITE_HOSTS:
        updated = re.sub(
            re.escape(host) + r"((?:/wp-content|/admin)/[^\"'\s)>\]]+)",
            lambda m: m.group(1),
            updated,
        )

    updated = updated.replace("http://www.twitch.tv/fireofgodministries/embed", "https://www.twitch.tv/fireofgodministries/embed")
    updated = updated.replace("http://www.ustream.tv/embed/21497886?html5ui", "https://www.ustream.tv/embed/21497886?html5ui")
    updated = updated.replace("/wp-content/uploads/2017/06/unknown-God.jpg.jpg", "/wp-content/uploads/2017/06/unknown-God.jpg")
    return updated


def clean_markdown(text: str) -> str:
    content = html.unescape(text)
    content = content.replace("\xa0", " ")
    content = re.sub(r"\n{3,}", "\n\n", content)
    content = re.sub(r"[ \t]+\n", "\n", content)
    return content.strip() + "\n"


def convert_body(record: Record, internal_map: dict[str, str]) -> str:
    stripped = record.content.strip()
    if stripped.startswith("[contact-form-7") or stripped.startswith("[woocommerce_"):
        return ""
    source = replace_shortcodes(stripped)
    source, placeholders = protect_raw_html(source)
    if source:
        markdown = pandoc_markdown(source)
        markdown = restore_raw_html(markdown, placeholders)
    else:
        markdown = ""
    markdown = rewrite_urls(markdown, internal_map)
    markdown = clean_markdown(markdown)
    return markdown


def frontmatter(title: str, layout: str, *, date: str | None = None, draft: bool = False, nav: bool = True) -> str:
    lines = ["---", f'title: "{title.replace(chr(34), r"\"")}"', f"layout: {layout}"]
    if date:
        lines.append(f'date: "{date}"')
    if draft:
        lines.append("draft: true")
    if not nav:
        lines.append("nav: false")
    lines.append("---")
    return "\n".join(lines) + "\n\n"


def write_markdown(path: Path, fm: str, body: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(fm + body, encoding="utf-8")


def page_body(record: Record, converted: str) -> str:
    if converted.strip():
        return converted
    if record.slug == "bible-study-stories":
        return "Come learn from a study of the bible how to be like Jesus and also how to live in the fullness of Christ in your everyday walk.\n"
    if record.slug == "order-a-dvd":
        return "The original WordPress site used a Contact Form 7 form on this page. A static replacement form has not been wired up yet.\n"
    return ""


def draft_body(record: Record, target: Target, converted: str) -> str:
    if converted.strip():
        return converted
    notes = target.notes or "Migrated as a draft."
    return notes + "\n"


def build_blog_index(posts: list[Record]) -> str:
    lines = [
        "Come learn from a study of the bible how to be like Jesus and also how to live in the fullness of Christ in your everyday walk.\n",
    ]
    for post in sorted(posts, key=lambda item: item.post_date, reverse=True):
        lines.append(f'- [{post.title}](/sermons/study-words/{post.slug}/) ({post.post_date[:10]})')
    return "\n".join(lines).strip() + "\n"


def main() -> None:
    records = parse_sql()
    internal_map = build_internal_link_map(records)

    selected_records = [r for r in records if (r.post_type in {"page", "post"} and r.status in {"publish", "draft"})]

    blog_dir = PAGES_ROOT / "blog"
    if blog_dir.exists():
        for path in blog_dir.glob("*.md"):
            path.unlink()
        blog_dir.rmdir()

    published_posts = [r for r in selected_records if r.post_type == "post" and r.status == "publish"]

    for record in selected_records:
        converted = convert_body(record, internal_map)
        if record.post_type == "page" and record.slug in PAGE_TARGETS:
            target = PAGE_TARGETS[record.slug]
            body = page_body(record, converted)
            fm = frontmatter(target.title or record.title, target.layout, date=record.post_date, nav=target.nav)
            write_markdown(target.path, fm, body)
        elif record.post_type == "page" and (record.slug in NON_ROUTE_DRAFTS or (record.status == "draft" and not record.slug)):
            target = NON_ROUTE_DRAFTS.get(record.slug or "products")
            if target:
                body = draft_body(record, target, converted)
                fm = frontmatter(target.title or record.title or "Untitled", target.layout, date=record.post_date, draft=True, nav=False)
                write_markdown(target.path, fm, body)
        elif record.post_type == "post" and record.status == "publish":
            target_path = PAGES_ROOT / "sermons" / "study-words" / f"{record.slug}.md"
            fm = frontmatter(record.title, "../../../layouts/Page.astro", date=record.post_date, nav=False)
            write_markdown(target_path, fm, converted)

    write_markdown(
        PAGES_ROOT / "sermons" / "study-words" / "index.md",
        frontmatter("Study Words", "../../../layouts/Page.astro"),
        build_blog_index(published_posts),
    )


if __name__ == "__main__":
    main()
