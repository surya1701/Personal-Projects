import pyscreenshot
import keyboard
import mouse
import pytesseract
from PIL import Image
from PIL import ImageOps
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
while True:
    if keyboard.is_pressed('shift'):
        break
for i in range(10):
    im = pyscreenshot.grab()
    im.save('img.jpg')
    w, h = im.size
    crop = im.crop((w/6.25, h/3.2, w/1.1, h/1.1))
    crop.save('crop.jpg')
    text = pytesseract.image_to_string(Image.open('crop.jpg'))
    print(text, end='\n\n')
    text = list(text)
    rem = []
    for i in range(1, len(text)):
        if text[i] == '\n':
            text[i] = ' '
        if text[i] == ' ' and text[i-1] == ' ':
            rem.append(i)
    for i in rem:
        text.pop(i)
    keyboard.write(' ')
    keyboard.write(text)
    for i in text:
        print(i, end='')

# https://www.typing.com/student/typing-test/1-minute
