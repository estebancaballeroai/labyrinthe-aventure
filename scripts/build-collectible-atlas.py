#!/usr/bin/env python3
"""Build 28 painted-art variations from the three V4.7 source atlases.

The last 28 are adaptations/recompositions of earlier painted illustrations,
not new independent ImageGen creations. This keeps the game fully offline.
"""
from pathlib import Path
from PIL import Image, ImageEnhance, ImageStat

ROOT = Path(__file__).resolve().parent.parent
SOURCES = [Image.open(ROOT / 'assets/collectibles' / ('atlas-%d.webp' % i)).convert('RGB') for i in range(3)]
SELECTION = [
    [(1, 6, 0), (0, 1, 1), (1, 6, 2), (1, 6, 3)],  # knights
    [(0, 4, 0), (0, 4, 1), (0, 4, 2), (2, 2, 3)],  # mountains
    [(1, 4, 0), (1, 4, 1), (1, 4, 2), (1, 4, 3)],  # clocks
    [(0, 1, 0), (0, 2, 1), (0, 0, 2), (0, 5, 3)],  # library
    [(0, 5, 0), (1, 5, 1), (1, 5, 2), (0, 6, 3)],  # music
    [(0, 0, 0), (2, 6, 1), (2, 5, 2), (0, 0, 3)],  # autumn
    [(1, 2, 0), (0, 6, 1), (0, 1, 2), (0, 1, 3)],  # palace
]
assert len(SELECTION) == 7 and all(len(row) == 4 for row in SELECTION)
used = [v for row in SELECTION for v in row]
assert len(set(used)) == 28, 'Source paintings in final atlas must differ'
for source in SOURCES:
    assert source.width >= 280 and source.height >= 420, 'Missing painted atlas'

SIDE = 112
atlas = Image.new('RGB', (4 * SIDE, 7 * SIDE), '#fdf7ed')
for row, variants in enumerate(SELECTION):
    for column, (sheet, source_row, source_col) in enumerate(variants):
        source = SOURCES[sheet]
        left = round(source_col * source.width / 4)
        top = round(source_row * source.height / 7)
        right = round((source_col + 1) * source.width / 4)
        bottom = round((source_row + 1) * source.height / 7)
        art = source.crop((left, top, right, bottom)).resize((SIDE, SIDE), Image.Resampling.LANCZOS)
        art = ImageEnhance.Color(art).enhance((1.03, .84, .94, 1.08, 1.18, 1.05, 1.13)[row])
        assert ImageStat.Stat(art).stddev[0] > 10, 'Empty or corrupted icon'
        atlas.paste(art, (column * SIDE, row * SIDE))

output = ROOT / 'assets/collectibles/atlas-3.webp'
output.parent.mkdir(parents=True, exist_ok=True)
atlas.save(output, 'WEBP', quality=55, method=6)
with Image.open(output) as check:
    assert check.size == (448, 784)
print('PASS: 28 adapted painted icons, 7 rows, offline WebP atlas,', output.stat().st_size, 'bytes')
