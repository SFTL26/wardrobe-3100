# SVG-схемы для инструкции: шкаф 3100x3100x500, 2 модуля по 1550, без задника

def r(x, y, w, h, cls):
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" class="{cls}"/>'

def t(x, y, s, cls="lbl", anchor="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" class="{cls}" text-anchor="{anchor}">{s}</text>'

def ln(x1, y1, x2, y2, cls):
    return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" class="{cls}"/>'

def circ(x, y, rr, cls):
    return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{rr}" class="{cls}"/>'

S = 0.2


def front_view():
    s = S; X0 = 70; Y0 = 24; H = 3100
    Y = lambda h: Y0 + (H - h) * s
    MW = 1550 * s; T = 16 * s; OW = 751 * s
    o = []
    for m in range(2):
        xl = X0 + m * MW
        # царги сзади (видны сквозь проёмы)
        o.append(r(xl, Y(320), MW, 100 * s, "rail"))
        o.append(r(xl, Y(2700), MW, 100 * s, "rail"))
        o.append(r(xl, Y(2700), T, 540, "part"))
        o.append(r(xl + MW - T, Y(2700), T, 540, "part"))
        for top in (320, 2112, 2700):
            o.append(r(xl + T, Y(top), MW - 2 * T, T, "part"))
        px = xl + 767 * s
        for a, b in ((0, 304), (320, 2096), (2112, 2684)):
            o.append(r(px, Y(b), T, (b - a) * s, "part"))
        # антресоль
        o.append(r(xl, Y(3100), T, 80, "part"))
        o.append(r(xl + MW - T, Y(3100), T, 80, "part"))
        o.append(r(xl + T, Y(2716), MW - 2 * T, T, "part"))
        o.append(r(xl + T, Y(3100), MW - 2 * T, T, "part"))
        o.append(r(px, Y(3084), T, 368 * s, "part"))
        o.append(t(xl + MW / 2, Y(2900) + 4, f"антресоль {m+1}", "mod"))
        o.append(t(xl + MW / 2, Y(0) + 16, f"М{m+1}", "mod"))
        for k in range(2):
            j = m * 2 + k
            ox = xl + T + k * (OW + T)
            o.append(r(ox + 1, Y(2405 + 19), OW - 2, T, "adj"))
            if j >= 2:
                for hole in (677, 1029, 1381, 1733):
                    o.append(r(ox + 1, Y(hole + 19), OW - 2, T, "adj"))
            rods = {0: [2000], 1: [1950, 1100]}.get(j, [])
            for h in rods:
                o.append(ln(ox + 6, Y(h), ox + OW - 6, Y(h), "rod"))
                o.append(t(ox + OW / 2, Y(h) - 6, f"штанга {h}", "dim-s"))
            lab = ["длинная одежда", "две штанги", "полки", "полки"][j]
            o.append(t(ox + OW / 2, Y(470), f"{j+1} · {lab}", "note"))
    yb = Y(0) + 34
    for j in range(4):
        m, k = divmod(j, 2)
        ox = X0 + m * MW + T + k * (OW + T)
        o.append(ln(ox, yb - 4, ox, yb + 4, "dim")); o.append(ln(ox + OW, yb - 4, ox + OW, yb + 4, "dim"))
        o.append(ln(ox, yb, ox + OW, yb, "dim"))
        o.append(t(ox + OW / 2, yb - 4, "751", "dim-t"))
    yb2 = yb + 24
    for m in range(2):
        xl = X0 + m * MW
        o.append(ln(xl, yb2 - 4, xl, yb2 + 4, "dim")); o.append(ln(xl + MW, yb2 - 4, xl + MW, yb2 + 4, "dim"))
        o.append(ln(xl, yb2, xl + MW, yb2, "dim"))
        o.append(t(xl + MW / 2, yb2 - 4, "1550", "dim-t"))
    yb3 = yb2 + 24
    o.append(ln(X0, yb3, X0 + 2 * MW, yb3, "dim"))
    o.append(ln(X0, yb3 - 4, X0, yb3 + 4, "dim")); o.append(ln(X0 + 2 * MW, yb3 - 4, X0 + 2 * MW, yb3 + 4, "dim"))
    o.append(t(X0 + MW, yb3 - 4, "3100 общая ширина", "dim-t"))
    xr = X0 + 2 * MW + 18
    o.append(ln(xr, Y(0), xr, Y(3100), "dim"))
    for h in (0, 320, 2112, 2700, 3100):
        o.append(ln(xr - 5, Y(h), xr + 5, Y(h), "dim"))
        o.append(t(xr + 9, Y(h) + 4, str(h), "dim-t", "start"))
    o.append(ln(X0 - 30, Y(0), X0 + 2 * MW + 8, Y(0), "floor"))
    o.append(t(X0 - 8, Y(0) - 5, "пол", "dim-s", "end"))
    o.append(t(X0 - 8, Y(270), "царга", "dim-s", "end"))
    o.append(t(X0 - 8, Y(2650), "царга", "dim-s", "end"))
    return f'<svg viewBox="0 0 {X0 + 2*MW + 70:.0f} {yb3 + 14:.0f}" role="img" aria-label="Вид спереди: 2 модуля по 1550 мм, 4 секции по 751 мм, антресоли 400 мм">' + "".join(o) + "</svg>"


def cut_maps():
    s = 0.24; X0 = 24
    patterns = [
        ("Карта 1", "4 панели", [("Г", 1518), ("Р", 749), ("А", 400)]),
        ("Карта 2", "2 панели", [("Г", 1518), ("Р", 749), ("П", 368)]),
        ("Карта 3", "4 панели", [("Г", 1518), ("Р", 749)]),
        ("Карта 4", "1 панель", [("Р", 749), ("Р", 749), ("Р", 749)]),
        ("Карта 5", "2 панели", [("П", 1776), ("П", 572), ("П", 304)]),
    ]
    o = []
    y = 20
    for name, qty, pieces in patterns:
        o.append(t(X0, y, name, "mod", "start"))
        o.append(t(X0 + 80, y, f"× {qty}", "dim-t", "start"))
        y += 10
        h = 500 * s
        o.append(r(X0, y, 2700 * s, h, "sheet"))
        o.append(r(X0, y, 10 * s, h, "waste"))
        x = X0 + 10 * s
        for code, L in pieces:
            x += 4 * s
            o.append(r(x, y, L * s, h, f"pc pc-{code}"))
            o.append(t(x + L * s / 2, y + h / 2 - 2, code, "pc-code"))
            o.append(t(x + L * s / 2, y + h / 2 + 14, f"{L}×500", "dim-t"))
            x += L * s
        rest = 2700 - 10 - sum(L for _, L in pieces) - 4 * len(pieces)
        if rest > 150:
            o.append(t(x + (X0 + 2700 * s - x) / 2, y + h / 2 + 4, f"остаток ~{rest}", "dim-s"))
        o.append(ln(X0, y + 1, X0 + 2700 * s, y + 1, "edge"))
        o.append(ln(X0, y + h - 1, X0 + 2700 * s, y + h - 1, "edge"))
        y += h + 34
    # царги
    o.append(t(X0, y, "Царги", "mod", "start"))
    o.append(t(X0 + 80, y, "× 4 детали 2700×100", "dim-t", "start"))
    y += 10
    h = 100 * s
    o.append(r(X0, y, 2700 * s, h, "sheet"))
    o.append(r(X0, y, 10 * s, h, "waste"))
    o.append(r(X0 + 14 * s, y, 1550 * s, h, "pc pc-Ц"))
    o.append(t(X0 + 14 * s + 1550 * s / 2, y + h / 2 + 4, "Ц 1550×100", "dim-t"))
    o.append(t(X0 + 1570 * s + 1130 * s / 2, y + h / 2 + 4, "остаток ~1130", "dim-s"))
    o.append(ln(X0, y + 1, X0 + 2700 * s, y + 1, "edge"))
    o.append(ln(X0, y + h - 1, X0 + 2700 * s, y + h - 1, "edge"))
    y += h + 30
    o.append(ln(X0, y - 10, X0 + 30, y - 10, "edge"))
    o.append(t(X0 + 38, y - 6, "заводская кромка (передняя и задняя стороны деталей)", "dim-s", "start"))
    o.append(r(X0 + 390, y - 16, 10, 10, "waste"))
    o.append(t(X0 + 406, y - 6, "торцовка 10 мм", "dim-s", "start"))
    return f'<svg viewBox="0 0 {X0*2 + 2700*s:.0f} {y:.0f}" role="img" aria-label="Карты распила панелей 2700×500 и царг 2700×100">' + "".join(o) + "</svg>"


def side_map():
    s = 0.2; y0 = 34; H = 2700
    Y = lambda h: y0 + (H - h) * s
    o = []
    def panel(xl, a, b):
        o.append(r(xl, Y(b), 100, (b - a) * s, "sheet"))
    def conf(xl, h):
        for d in (50, 250, 450):
            o.append(circ(xl + d * s, Y(h), 2.4, "conf"))
    def pins(xl, a, b, rows=(37, 463), cls="pin"):
        h = a
        while h <= b:
            for d in rows:
                o.append(circ(xl + d * s, Y(h), 0.9 if cls == "pin" else 1.1, cls))
            h += 32
    def rod(xl, h, cls="rodmark"):
        o.append(r(xl + 250 * s - 5, Y(h) - 5, 10, 10, cls))
    def shelves(xl):
        for top in (320, 2112, 2700):
            o.append(r(xl, Y(top), 100, 16 * s, "shelfline"))
            conf(xl, top - 8)
    cols = []
    x = 70
    # 1. М1 левая боковина
    o.append(t(x + 50, y0 - 20, "Б · М1 левая", "mod")); panel(x, 0, 2700); shelves(x); pins(x, 2309, 2501); rod(x, 2000)
    o.append(t(x + 2, Y(2700) - 4, "перед", "dim-s", "start")); o.append(t(x + 98, Y(2700) - 4, "зад", "dim-s", "end"))
    x += 160
    o.append(t(x + 50, y0 - 20, "Б · М1 правая", "mod")); panel(x, 0, 2700); shelves(x); pins(x, 2309, 2501); rod(x, 1950); rod(x, 1100)
    x += 160
    o.append(t(x + 50, y0 - 20, "Б · М2 обе", "mod")); panel(x, 0, 2700); shelves(x); pins(x, 2309, 2501); pins(x, 357, 1957)
    x += 160
    # перегородка М2
    o.append(t(x + 50, y0 - 20, "П · М2", "mod"))
    for a, b in ((0, 304), (320, 2096), (2112, 2684)):
        panel(x, a, b)
    pins(x, 357, 1957); pins(x, 2309, 2501)
    pins(x, 357, 1957, (60, 440), "pin2"); pins(x, 2309, 2501, (60, 440), "pin2")
    for h in (2096, 320, 2684):
        for d in (50, 250, 450):
            o.append(circ(x + d * s, Y(h) + (3 if h == 2096 or h == 2684 else -3), 2.4, "conf"))
    x += 160
    o.append(t(x + 50, y0 - 20, "П · М1", "mod"))
    for a, b in ((0, 304), (320, 2096), (2112, 2684)):
        panel(x, a, b)
    pins(x, 2309, 2501); pins(x, 2309, 2501, (60, 440), "pin2")
    rod(x, 2000); rod(x, 1950, "rodmark2"); rod(x, 1100, "rodmark2")
    for h in (2096, 320, 2684):
        for d in (50, 250, 450):
            o.append(circ(x + d * s, Y(h) + (3 if h == 2096 or h == 2684 else -3), 2.4, "conf"))
    # шкала
    xs = 56
    o.append(ln(xs, Y(0), xs, Y(2700), "dim"))
    for h, lab in ((0, "0 низ"), (320, "320"), (357, "357"), (1957, "1957"), (2112, "2112"), (2309, "2309"), (2501, "2501"), (2700, "2700")):
        o.append(ln(xs - 4, Y(h), xs + 4, Y(h), "dim"))
        o.append(t(xs - 7, Y(h) + 4, lab, "dim-s", "end"))
    # легенда
    lx = x + 130; ly = Y(2300)
    items = [("conf", "конфирмат (50·250·450)"), ("pin", "Ø5×9, 37 от кромок"), ("pin2", "Ø5×9, 60 от кромок —"), (None, "обратная сторона"), ("rodmark", "штанга, одна сторона"), ("rodmark2", "штанга, другая сторона"), ("shelfline", "линия полки 16 мм")]
    for i, (cls, txt) in enumerate(items):
        yy = ly + i * 18
        if cls in ("conf",): o.append(circ(lx + 5, yy, 3, cls))
        elif cls in ("pin", "pin2"): o.append(circ(lx + 5, yy, 2, cls))
        elif cls in ("rodmark", "rodmark2"): o.append(r(lx, yy - 5, 10, 10, cls))
        elif cls == "shelfline": o.append(r(lx - 1, yy - 3, 12, 5, cls))
        o.append(t(lx + 18, yy + 4, txt, "dim-s", "start"))
    # антресоль
    ay = Y(900)
    o.append(t(lx + 50, ay - 12, "А и П4 антресоли", "mod"))
    o.append(r(lx, ay, 100, 80, "sheet"))
    for yy in (ay + 1.6, ay + 78.4):
        for d in (50, 250, 450):
            o.append(circ(lx + d * s, yy, 2.4, "conf"))
    o.append(t(lx + 50, ay + 96, "А 400×500", "dim-t"))
    o.append(r(lx, ay + 116, 100, 73.6, "sheet"))
    for yy in (ay + 118, ay + 187):
        for d in (50, 250, 450):
            o.append(circ(lx + d * s, yy, 2.4, "conf"))
    o.append(t(lx + 50, ay + 204, "П4 368×500", "dim-t"))
    return f'<svg viewBox="0 0 {lx + 180:.0f} {Y(0) + 26:.0f}" role="img" aria-label="Разметка боковин и перегородок">' + "".join(o) + "</svg>"


def wall_detail():
    o = []
    # вид сверху: стойка каркаса, ОСП, отделка, проставка, боковина
    o.append(r(20, 40, 90, 60, "stud"))
    o.append(t(65, 120, "стойка каркаса", "dim-s"))
    o.append(t(65, 132, "обычно шаг 600", "dim-s"))
    o.append(r(110, 20, 12, 100, "osb")); o.append(t(116, 14, "ОСП", "dim-s"))
    o.append(r(122, 20, 12, 100, "finish")); o.append(t(140, 158, "отделка / ГКЛ", "dim-s"))
    o.append(r(134, 55, 6, 30, "shim")); o.append(t(150, 50, "проставка", "dim-s", "start"))
    o.append(r(140, 20, 16, 100, "part")); o.append(t(160, 174, "боковина шкафа", "dim-s"))
    o.append(ln(46, 70, 162, 70, "screw")); o.append(r(156, 64, 5, 12, "screwhead"))
    o.append(t(175, 74, "саморез 6×90", "dim-s", "start"))
    o.append(t(175, 88, "≥ 40 мм в стойку", "dim-s", "start"))
    o.append(t(250, 30, "внутри шкафа →", "dim-s", "start"))
    return '<svg viewBox="0 0 340 185" role="img" aria-label="Крепление боковины к каркасной стене через проставку в стойку">' + "".join(o) + "</svg>"


def corridor_plan():
    s = 0.17; X0 = 90; Y0 = 50
    X = lambda v: X0 + v * s
    Y = lambda v: Y0 + v * s
    W, D = 3149, 2748
    o = []
    o.append(r(X(0), Y(0), W * s, D * s, "room"))
    # стены: верх (Вид 1) и низ — перегородки, слева наружная
    o.append(r(X(0) - 12, Y(0) - 12, W * s + 24, 12, "wallfill"))
    o.append(r(X(0) - 12, Y(D), W * s + 24, 12, "wallfill"))
    for a, b in ((0, 611), (1301, 1447), (2352, 2748)):
        o.append(r(X(0) - 24, Y(a), 24, (b - a) * s, "wallfill"))
    o.append(r(X(0) - 24, Y(641), 24, 660 * s, "glass"))
    o.append(r(X(0) - 24, Y(611), 24, 30 * s, "trim")); o.append(r(X(0) - 24, Y(1301) - 30 * s, 24, 30 * s, "trim"))
    # дверь наружу
    o.append(f'<path d="M {X(0)-24:.1f} {Y(1447):.1f} A {875*s:.1f} {875*s:.1f} 0 0 0 {X(0)-24-875*s:.1f} {Y(1447)+875*s:.1f}" class="swing"/>')
    o.append(ln(X(0) - 24, Y(1447), X(0) - 24 - 875 * s, Y(1447), "swingleaf"))
    o.append(t(X(0) - 70, Y(1447) + 100, "вход", "dim-s"))
    o.append(t(X(0) - 36, Y(971), "окно", "dim-s", "end"))
    # правая стена с проёмом в холл
    for a, b in ((0, 618), (2130, 2748)):
        o.append(r(X(W), Y(a), 12, (b - a) * s, "wallfill"))
    o.append(t(X(W) + 18, Y(1374), "проём в холл 1472", "dim-s", "start"))
    # шкаф и зона купе
    o.append(r(X(20), Y(0), 3100 * s, 516 * s, "wardrobe"))
    o.append(t(X(20 + 1550), Y(258) + 4, "шкаф 3100 × 516", "mod"))
    o.append(r(X(0), Y(516), W * s, 100 * s, "doorzone"))
    o.append(t(X(1574), Y(566) + 4, "зона дверей-купе ~95–100", "dim-s"))
    o.append(t(X(1574), Y(1500), "коридор", "note"))
    # размеры
    o.append(ln(X(0), Y(0) - 30, X(W), Y(0) - 30, "dim"))
    o.append(ln(X(0), Y(0) - 35, X(0), Y(0) - 25, "dim")); o.append(ln(X(W), Y(0) - 35, X(W), Y(0) - 25, "dim"))
    o.append(t(X(W / 2), Y(0) - 34, "3149 — стена «Вид 1», вдоль неё шкаф", "dim-t"))
    xl = X(0) - 50
    o.append(ln(xl, Y(0), xl, Y(611), "dimw")); o.append(t(xl - 5, Y(305), "611", "dim-w", "end"))
    xr = X(W) + 30
    o.append(ln(xr, Y(0), xr, Y(618), "dimw")); o.append(t(xr + 5, Y(309), "618", "dim-w", "start"))
    o.append(ln(X(W) - 20, Y(0), X(W) - 20, Y(D), "dim"))
    o.append(t(X(W) - 26, Y(D) - 40, "2748", "dim-t", "end"))
    return f'<svg viewBox="0 0 {X(W) + 150:.0f} {Y(D) + 30:.0f}" role="img" aria-label="План коридора: шкаф вдоль стены 3149, наружная стена с окном и дверью, проём в холл">' + "".join(o) + "</svg>"
