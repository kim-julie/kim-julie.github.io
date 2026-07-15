#!/usr/bin/env bash
# Regenerates assets/cv/Julie_Sojin_Kim_CV.pdf from scripts/cv-print-source.html
#
# Requirements: wkhtmltopdf (https://wkhtmltopdf.org/downloads.html)
#   macOS:   brew install --cask wkhtmltopdf
#   Ubuntu:  sudo apt-get install wkhtmltopdf
#
# Usage: ./scripts/build-cv-pdf.sh

set -euo pipefail
cd "$(dirname "$0")/.."

wkhtmltopdf \
  --enable-local-file-access \
  --page-size Letter \
  --margin-top 0 --margin-bottom 0 --margin-left 0 --margin-right 0 \
  scripts/cv-print-source.html \
  assets/cv/Julie_Sojin_Kim_CV.pdf

echo "Wrote assets/cv/Julie_Sojin_Kim_CV.pdf"
