NL = chr(10)


def entry_end(c, s):
    a = c.find(NL + '  "', s + 5)
    b = c.find(NL + "};", s)
    return (min(a, b) if a >= 0 else b) + 1


def replace_entries(c, stories, out):
    base = c.index("const authoredStoryContent:")
    for sid, blk in zip(stories, out):
        s = c.index(f'  "{sid}": ' + "{", base)
        c = c[:s] + blk + NL + c[entry_end(c, s):]
    fb = c.index("const fableChoiceBeats")
    for sid in stories:
        s = c.find(f'  "{sid}": [', fb)
        if 0 <= s < c.index(NL + "};", fb):
            c = c[:s] + c[entry_end(c, s):]
    return c
