#!/usr/bin/env python3

import argparse
import re
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


PROJECT_PATTERN = re.compile(
    r"^## (\d+)\. (.+)\n([\s\S]*?)(?=^---\n\n## |\Z)", re.MULTILINE
)
CODE_PATTERN = re.compile(r"`([^`]+)`")
LIST_ITEM_PATTERN = re.compile(r"^(\d+)\.\s+(.+)$")

TEAL = colors.HexColor("#087F78")
INK = colors.HexColor("#182426")
MUTED = colors.HexColor("#526765")
RULE = colors.HexColor("#BED2CE")
CODE_BACKGROUND = colors.HexColor("#EDF5F3")


def register_fonts() -> tuple[str, str, str, str]:
    font_root = Path("/System/Library/Fonts/Supplemental")
    candidates = {
        "ReviewSans": font_root / "Arial.ttf",
        "ReviewSansBold": font_root / "Arial Bold.ttf",
        "ReviewSerif": font_root / "Times New Roman.ttf",
        "ReviewMono": font_root / "Courier New.ttf",
    }

    if all(path.exists() for path in candidates.values()):
        for name, path in candidates.items():
            pdfmetrics.registerFont(TTFont(name, str(path)))
        return "ReviewSans", "ReviewSansBold", "ReviewSerif", "ReviewMono"

    return "Helvetica", "Helvetica-Bold", "Times-Roman", "Courier"


def inline_markup(text: str, mono_font: str) -> str:
    escaped = escape(text)
    return CODE_PATTERN.sub(
        rf'<font name="{mono_font}" backColor="{CODE_BACKGROUND.hexval()}">\1</font>',
        escaped,
    )


def build_styles() -> dict[str, ParagraphStyle]:
    sans, sans_bold, serif, mono = register_fonts()
    base = getSampleStyleSheet()
    return {
        "mono": mono,
        "eyebrow": ParagraphStyle(
            "Eyebrow",
            parent=base["Normal"],
            fontName=sans_bold,
            fontSize=8,
            leading=10,
            textColor=TEAL,
            spaceAfter=2 * mm,
            uppercase=True,
        ),
        "title": ParagraphStyle(
            "ProjectTitle",
            parent=base["Title"],
            fontName=sans_bold,
            fontSize=23,
            leading=25,
            textColor=colors.HexColor("#102F33"),
            alignment=0,
            spaceAfter=3 * mm,
        ),
        "heading": ParagraphStyle(
            "SectionHeading",
            parent=base["Heading2"],
            fontName=sans_bold,
            fontSize=12,
            leading=14,
            textColor=TEAL,
            spaceBefore=5 * mm,
            spaceAfter=2 * mm,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "ReviewBody",
            parent=base["BodyText"],
            fontName=serif,
            fontSize=10.5,
            leading=15.8,
            textColor=INK,
            spaceAfter=3.2 * mm,
            allowWidows=0,
            allowOrphans=0,
        ),
        "list": ParagraphStyle(
            "ReviewList",
            parent=base["BodyText"],
            fontName=serif,
            fontSize=10.5,
            leading=15.8,
            textColor=INK,
            leftIndent=7 * mm,
            firstLineIndent=-5 * mm,
            spaceAfter=2 * mm,
        ),
        "footer": ParagraphStyle(
            "Footer",
            parent=base["Normal"],
            fontName=sans,
            fontSize=8,
            leading=9,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
    }


def review_story(number: str, title: str, body: str, styles):
    mono_font = styles["mono"]
    story = [
        Paragraph(f"iENA 2026 PEER REVIEW · PROJECT {number}", styles["eyebrow"]),
        Paragraph(escape(title), styles["title"]),
        HRFlowable(width="100%", thickness=1.5, color=TEAL, spaceAfter=4 * mm),
    ]

    for block in re.split(r"\n\s*\n", body.strip()):
        heading = re.fullmatch(r"###\s+(.+)", block)
        if heading:
            story.append(
                Paragraph(inline_markup(heading.group(1), mono_font), styles["heading"])
            )
            continue

        lines = block.splitlines()
        if all(LIST_ITEM_PATTERN.match(line) for line in lines):
            for line in lines:
                match = LIST_ITEM_PATTERN.match(line)
                if match:
                    number_text, item = match.groups()
                    story.append(
                        Paragraph(
                            f"{number_text}.&nbsp;&nbsp;{inline_markup(item, mono_font)}",
                            styles["list"],
                        )
                    )
            story.append(Spacer(1, 1 * mm))
            continue

        paragraph = " ".join(line.strip() for line in lines)
        story.append(Paragraph(inline_markup(paragraph, mono_font), styles["body"]))

    return story


def draw_footer(canvas, document, styles, title: str):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(colors.white)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.5)
    canvas.line(document.leftMargin, 13 * mm, width - document.rightMargin, 13 * mm)
    footer = Paragraph(
        f"{escape(title)} · iENA 2026 Peer Review · {canvas.getPageNumber()}",
        styles["footer"],
    )
    footer.wrapOn(canvas, width - document.leftMargin - document.rightMargin, 8 * mm)
    footer.drawOn(canvas, document.leftMargin, 7 * mm)
    canvas.restoreState()


def generate_pdfs(source_path: Path, output_path: Path) -> list[Path]:
    source = source_path.read_text(encoding="utf-8")
    reviews = PROJECT_PATTERN.findall(source)
    if len(reviews) != 6:
        raise ValueError(f"Expected 6 project reviews, found {len(reviews)}.")

    output_path.mkdir(parents=True, exist_ok=True)
    styles = build_styles()
    generated = []

    for number, title, body in reviews:
        slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
        pdf_path = output_path / f"{int(number):02d}-{slug}.pdf"
        document = SimpleDocTemplate(
            str(pdf_path),
            pagesize=A4,
            rightMargin=17 * mm,
            leftMargin=17 * mm,
            topMargin=17 * mm,
            bottomMargin=19 * mm,
            title=f"{title} - iENA 2026 Peer Review",
            author="CareVoice Peer Review",
            subject=f"Independent review of {title}",
        )
        footer = lambda canvas, doc, project_title=title: draw_footer(
            canvas, doc, styles, project_title
        )
        document.build(
            review_story(number, title, body, styles),
            onFirstPage=footer,
            onLaterPages=footer,
        )
        generated.append(pdf_path)

    return generated


def main():
    parser = argparse.ArgumentParser(
        description="Generate one PDF for each project in iENA_peer_reviews.md."
    )
    parser.add_argument("source", nargs="?", default="iENA_peer_reviews.md")
    parser.add_argument("output", nargs="?", default="peer-review-pdfs")
    args = parser.parse_args()

    for path in generate_pdfs(Path(args.source), Path(args.output)):
        print(path)


if __name__ == "__main__":
    main()