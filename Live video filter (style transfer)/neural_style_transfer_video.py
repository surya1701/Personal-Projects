# USAGE
# python neural_style_transfer_video.py --models models

# import the necessary packages
from imutils.video import VideoStream
from imutils import paths
import itertools
import argparse
import imutils
import time
import cv2

# # construct the argument parser and parse the arguments
# ap = argparse.ArgumentParser()
# ap.add_argument("-m", "--models", required=True,
# 	help="path to directory containing neural style transfer models")
# args = vars(ap.parse_args())

# grab the paths to all neural style transfer models in our 'models'
# directory, provided all models end with the '.t7' file extension
modelPaths = paths.list_files("models/eccv16", validExts=(".t7",))
modelPaths = sorted(list(modelPaths))

# generate unique IDs for each of the model paths, then combine the
# two lists together
models = list(zip(range(0, len(modelPaths)), (modelPaths)))
(modelID, modelPath) = models[0]
modelno = 0
for i,j in models:
    print(j)
# use the cycle function of itertools that can loop over all model
# paths, and then when the end is reached, restart again
# modelIter = itertools.cycle(models)
# (modelID, modelPath) = next(modelIter)

# load the neural style transfer model from disk
print("[INFO] loading style transfer model...")
net = cv2.dnn.readNetFromTorch(modelPath)

# initialize the video stream, then allow the camera sensor to warm up
print("[INFO] starting video stream...")
cascade = cv2.CascadeClassifier('./haarcascade_frontalface_default.xml')
vs = VideoStream(src=0).start()
time.sleep(4.0)
print("[INFO] {}. {}".format(modelID + 1, modelPath))

# loop over frames from the video file stream
while True:
    # grab the frame from the threaded video stream
    frame = vs.read()

    # resize the frame to have a width of 600 pixels (while
    # maintaining the aspect ratio), and then grab the image
    # dimensions
    frame = imutils.resize(frame, width=600)
    orig = frame.copy()
    (height, width) = frame.shape[:2]
    # construct a blob from the frame, set the input, and then perform a
    # forward pass of the network
    blob = cv2.dnn.blobFromImage(frame, 1.0, (width, height),
        (103.939, 116.779, 123.680), swapRB=False, crop=False)
    net.setInput(blob)
    output = net.forward()

    # reshape the output tensor, add back in the mean subtraction, and
    # then swap the channel ordering
    output = output.reshape((3, output.shape[2], output.shape[3]))
    output[0] += 103.939
    output[1] += 116.779
    output[2] += 123.680
    output /= 255.0
    output = output.transpose(1, 2, 0)
    # show the original frame along with the output neural style
    # transfer
    # cv2.imshow("Input", frame)
    # cv2.imshow("Output", output)
    # key = cv2.waitKey(1) & 0xFF
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    rect = cascade.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in rect:
        a = x+w//2
        b = y+h//2
        frame = cv2.circle(frame, (a, b), 5, (0, 0, 255), 1)
        if a > width//2 and b > height//2:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 3)
            modelno = 0
        elif a < width//2 and b > height//2:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 3)
            modelno=1
        elif a > width//2 and b < height//2:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 3)
            modelno=2
        elif a < width//2 and b < height//2:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (128, 0, 0), 3)
            modelno=3
        break
    (modelID, modelPath) = models[modelno]
    frame = cv2.line(frame, (0, height//2), (width, height//2), (255,255,255), 1)
    frame = cv2.line(frame, (width//2,0), (width//2, height), (0,0,0), 1)
    cv2.imshow("Input", cv2.flip(frame,1))
    cv2.imshow("Output", cv2.flip(output,1))
    key = cv2.waitKey(1) & 0xFF
    
    print("[INFO] {}. {}".format(modelID + 1, modelPath))
    net = cv2.dnn.readNetFromTorch(modelPath)

    # otheriwse, if the `q` key was pressed, break from the loop
    if key == ord("q"):
        break

# do a bit of cleanup
cv2.destroyAllWindows()
vs.stop()
