#!/usr/bin/python
#
# This file is part of Z-Way project
#
# Created by Alexei Itskovich
#
# Copyright (C) 2022 Z-Wave.Me
# All rights reserved
# info@z-wave.me
#
# This source file is subject to the terms and conditions of the
# Z-Wave.Me Software License Agreement which restricts the manner
# in which it may be used.

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
