import pyscreenshot
import keyboard
import mouse
import pytesseract
from PIL import Image
from PIL import ImageOps
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
for i in range(1):
    while True:
        im = pyscreenshot.grab()
        im.save('img.jpg')
        w, h = im.size
        crop = im.crop((w/6.25, h/3.5, w/1.35, h/1.6))
        crop.save('crop.jpg')
        if keyboard.is_pressed('shift'):
            break
    text = pytesseract.image_to_string(Image.open('crop.jpg'))
    print(text, end='\n\n')
    text = list(text)
    for i in range(len(text)):
        if text[i] == '\n':
            text[i] = ' '
    keyboard.write(' ')
    keyboard.write(text)
    for i in text:
        print(i, end='')
    break

# https://www.ratatype.com/typing-test/
