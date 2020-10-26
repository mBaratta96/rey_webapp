import cv2
import sys
import numpy as np
import json
import math
from matplotlib import pyplot as plt

i_path = sys.argv[1]
i = cv2.imread(i_path)
i = cv2.cvtColor(i, cv2.COLOR_BGR2GRAY)
p = []
with open(sys.argv[2]) as json_file:
    data = json.load(json_file)
    for d in data:
        point = [d['x'], d['y']]
        p.append(point)
del p[2]
p_dst = [(382, 219),(852, 219), (852, 537), (382, 537)]
img = cv2.imread('./public/images/original_rey22.png')
hm, status = cv2.findHomography(np.array(p), np.array(p_dst))
nH, nW, _ = img.shape
hist, n, _ = plt.hist(i.ravel(), 256, [0, 256])
maximum = max(hist)
index_max = list(hist).index(maximum)
print(index_max)
im_dst =  cv2.warpPerspective(i, hm, (nW, nH), borderMode=cv2.BORDER_CONSTANT, borderValue=index_max)

# im_dst = [[255, 255, 255] if (p == [0, 0, 0]).all() else p for p in im_dst]
"""height, width, _ = im_dst.shape
for i in range(height):
    for j in range(width):
        if (im_dst[i, j] == [0, 0, 0]).all():
            im_dst[i, j] = [255, 255, 255]"""
result = im_dst.copy()

#for i in range(len(p_dst)):
 #   cv2.line(im_dst, p_dst[i], p_dst[i - 1], 0, 2)

#for point in p_dst:
#    cv2.circle(im_dst, point, 2, 0, 2)
#cv2.imshow('homo', im_dst)
#cv2.waitKey()
cv2.imwrite('./public/images/img_homography.png', result)



