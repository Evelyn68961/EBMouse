# Tokenize the two 關鍵字轉換 (Keyword Conversion) example boxes in the built
# template.pptx — slide 15 Cochrane query box, slide 16 Embase query box — into
# {{conv.cochrane}} / {{conv.embase}}. These boxes can't be done by the exact-
# string SLIDES map in tokenizeTemplate.mjs because the example query spans many
# runs/paragraphs; here we collapse each box's txBody to a single token-bearing
# paragraph (first paragraph's formatting is kept). Idempotent & re-runnable.
#   Usage: python tools/tokenize_conv.py [path/to/template.pptx]
# Token names MUST stay in sync with src/pptx/tokenMap.js.
import zipfile, re, shutil, sys

SRC = sys.argv[1] if len(sys.argv) > 1 else r"public/template.pptx"
# shape name -> token, per slide file
TARGETS = {
    "ppt/slides/slide15.xml": ("矩形 17", "{{conv.cochrane}}"),
    "ppt/slides/slide16.xml": ("矩形 5",  "{{conv.embase}}"),
}

def transform_shape(sp_xml, token):
    # operate on the <p:txBody> of this shape
    tb = re.search(r"<p:txBody>.*?</p:txBody>", sp_xml, re.S)
    if not tb:
        raise RuntimeError("no txBody")
    body = tb.group(0)
    paras = re.findall(r"<a:p\b.*?</a:p>", body, re.S)
    if not paras:
        raise RuntimeError("no paragraphs")
    first = paras[0]
    # find runs in first paragraph
    runs = re.findall(r"<a:r\b.*?</a:r>", first, re.S)
    if runs:
        r0 = runs[0]
        # replace the <a:t>...</a:t> of the first run with the token
        new_r0 = re.sub(r"(<a:t(?:\s[^>]*)?>).*?(</a:t>)", r"\1" + token + r"\2", r0, count=1, flags=re.S)
        new_first = first.replace(r0, new_r0)
        # blank out any further runs' text in the first paragraph
        for rr in runs[1:]:
            blanked = re.sub(r"(<a:t(?:\s[^>]*)?>).*?(</a:t>)", r"\1\2", rr, flags=re.S)
            new_first = new_first.replace(rr, blanked)
    else:
        raise RuntimeError("first paragraph has no run")
    # new body = bodyPr/lstStyle (everything before first <a:p>) + new_first + closing
    head = body[:body.index(first)]
    new_body = head + new_first + "</p:txBody>"
    return sp_xml.replace(body, new_body)

def process_slide(xml, shape_name, token):
    # split into sp blocks, find the target by name
    def repl(m):
        sp = m.group(0)
        if ('name="%s"' % shape_name) in sp:
            return transform_shape(sp, token)
        return sp
    new_xml = re.sub(r"<p:sp>.*?</p:sp>", repl, xml, flags=re.S)
    if token not in new_xml:
        raise RuntimeError("token %s not inserted in %s" % (token, shape_name))
    return new_xml

zin = zipfile.ZipFile(SRC, "r")
items = zin.infolist()
data = {i.filename: zin.read(i.filename) for i in items}
zin.close()

for fn, (shape, token) in TARGETS.items():
    xml = data[fn].decode("utf-8")
    data[fn] = process_slide(xml, shape, token).encode("utf-8")
    print("OK", fn, "->", token)

# write back preserving order & compression
shutil.copy(SRC, SRC + ".bak")
zout = zipfile.ZipFile(SRC, "w", zipfile.ZIP_DEFLATED)
for i in items:
    zout.writestr(i, data[i.filename])
zout.close()
print("written", SRC, "(backup at .bak)")
