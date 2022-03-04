#!./tools/scripts/venv/Scripts/python.exe
import glob
import re

filename = glob.glob(r'D:\projects\z-wave\z-wave\dist\apps\lite\main.*.js')[0]
with open(filename, 'r+') as f:
  content = f.read()
  f.seek(0)
  f.write(re.sub(
    r"if\(..\.responseType\)\{const ..=..\.responseType\.toLowerCase\(\);..\.responseType=\"json\"!==..\?..:\"text\"}",
    "", content))
  f.truncate()
print('removed')
