import numpy as np
import cv2
import sys
from matplotlib import pyplot as plt

def maxDeviationThresh(hist):
    maximum = max(hist)
    index_max = list(hist).index(maximum)
    index_min = 0
    for i in range(index_max, -1, -1):
        if not hist[i]:
            index_min = i
            break
    distances = []
    x1 = index_min
    y1 = hist[index_min]
    x2 = index_max
    y2 = hist[index_max]
    for i in range(index_min + 1, index_max):
        x0 = i
        y0 = hist[i]
        distance = np.abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1) / np.sqrt(
            (y2 - y1) ** 2 + (x2 - x1) ** 2)
        distances.append(distance)

    T_index = distances.index(max(distances))
    return T_index + index_min


i_path = sys.argv[1]
img = cv2.imread(i_path)
img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
dst = cv2.bilateralFilter(img, 10, sigmaColor=15, sigmaSpace=15)
# kernel_size = 5
# dst = cv2.GaussianBlur(img, (kernel_size, kernel_size), 0)
# cv2.imwrite("filter.png", dst)
# cv2.waitKey()
hist, n, _ = plt.hist(dst.ravel(), 256, [0, 256])
thresh_val = maxDeviationThresh(hist)
notwhite = dst[dst < thresh_val]
white = dst[dst >= thresh_val]
average = np.mean(notwhite)
dev = np.std(notwhite)
print(average)
print(dev)

# plt.hist(dst.ravel(), 256, [0, 256]), plt.show()
# plt.hist(notwhite), plt.show()
# plt.hist(white), plt.show()
height, width = dst.shape
threshed = np.zeros((height, width, 1), np.uint8)
for i in range(height):
    for j in range(width):
        if dst[i, j] <= thresh_val:
            threshed[i, j] = dst[i, j]
# dst = cv.fastNlMeansDenoising(img, h=sigma)
# dst = cv.GaussianBlur(img, (5, 5), sigmaX=sigma)
dilatation_type = cv2.MORPH_RECT  # cv.MORPH_CROSS cv.MORPH_ELLIPSE
dilatation_size = 1
element = cv2.getStructuringElement(dilatation_type, (2 * dilatation_size + 1, 2 * dilatation_size + 1),
                                    (dilatation_size, dilatation_size))
# threshed = cv2.dilate(threshed, element)
cv2.imwrite("dilate.png", threshed)
rgb = np.zeros((height, width, 3), np.uint8)
for i in range(height):
    for j in range(width):
        rgb[i, j] = [threshed[i, j], 0, 0]
_, alpha = cv2.threshold(cv2.cvtColor(rgb, cv2.COLOR_BGR2GRAY), 0, 255, cv2.THRESH_BINARY)
b, g, r = cv2.split(rgb)
rgba = [b, g, r, alpha]
rgba = cv2.merge(rgba, 4)
cv2.imwrite('./public/images/rgba.png', rgba)