from pathlib import Path
from PIL import Image

ROOT = Path(r"C:\Users\Beo-syestems\Desktop\Beo- projects\beo.system.site\public")


def convert(src: Path, dest: Path, max_w: int, quality: int) -> None:
    im = Image.open(src)
    if im.mode not in ("RGB", "L"):
        im = im.convert("RGB")
    w, h = im.size
    if w > max_w:
        nh = max(1, round(h * max_w / w))
        im = im.resize((max_w, nh), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "WEBP", quality=quality, method=6)
    before = src.stat().st_size / 1e6
    after = dest.stat().st_size / 1e6
    print(f"{src.name}: {w}x{h} {before:.2f}MB -> {im.size[0]}x{im.size[1]} {after:.2f}MB")


def main() -> None:
    for png in sorted((ROOT / "film").glob("*.png")):
        convert(png, png.with_suffix(".webp"), max_w=1920, quality=88)
    for png in sorted((ROOT / "film" / "m").glob("*.png")):
        convert(png, png.with_suffix(".webp"), max_w=1080, quality=84)
    for png in sorted((ROOT / "blog").glob("*.png")):
        convert(png, png.with_suffix(".webp"), max_w=1600, quality=86)


if __name__ == "__main__":
    main()
