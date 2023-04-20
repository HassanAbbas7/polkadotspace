import os

for filename in os.listdir('.'):
    if filename.endswith('.js'):
        os.rename(filename, filename[:-2] + 'jsx')
