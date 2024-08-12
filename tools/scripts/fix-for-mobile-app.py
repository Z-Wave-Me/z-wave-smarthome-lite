import glob
import re

filename = glob.glob(r'dist/apps/lite/main.*.js')[0]
with open(filename, 'r+') as f:
  content = f.read()
  f.seek(0)
  f.write(re.sub(
    r"if\(..\.responseType\)\{const ..=..\.responseType\.toLowerCase\(\);..\.responseType=\"json\"!==..\?..:\"text\"}",
    "", content))
  f.truncate()
print('{} fixed'.format(filename))
