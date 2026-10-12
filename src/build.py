# Сборка инструкции: шаблон + 3D-блоки + SVG-схемы -> ../index.html
import os, re, svgs

os.chdir(os.path.dirname(os.path.abspath(__file__)))


def read(name):
    return open(name, encoding='utf-8').read()


h = read('template.html')
h = h.replace('{{ASMJS}}', read('asm.js')).replace('{{ASM}}', read('asm.html'))
h = h.replace('{{DRILLJS}}', read('drill.js')).replace('{{DRILL}}', read('drill.html'))
h = h.replace('{{V3DJS}}', read('v3d.js')).replace('{{V3D}}', read('v3d.html'))
h = (h.replace('{{FRONT}}', svgs.front_view())
      .replace('{{CUT}}', svgs.cut_maps())
      .replace('{{SIDE}}', svgs.side_map())
      .replace('{{WALL}}', svgs.wall_detail())
      .replace('{{PLAN}}', svgs.corridor_plan()))

# галочки в чек-листах: <li class="c">текст</li> -> чекбокс со стабильным id
n = [0]


def rep(m):
    n[0] += 1
    i = f'c{n[0]}'
    return f'<li class="c"><input type="checkbox" id="{i}"><label for="{i}">{m.group(1)}</label></li>'


h = re.sub(r'<li class="c">(.*?)</li>', rep, h, flags=re.S)

head = ('<!doctype html>\n<html lang="ru">\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n')
open('../index.html', 'w', encoding='utf-8').write(head + h + '\n</html>\n')
print(f'index.html: {len(h)} символов, чек-пунктов {n[0]}')
