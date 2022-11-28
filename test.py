import urllib.request
import time

def fun():
    fp = urllib.request.urlopen("http://acer.mkmukul.com:3000/")
    mybytes = fp.read()

    mystr = mybytes.decode("utf8")
    fp.close()
    return mystr

for i in range(10):
    if(i%3==0):
        for i in range(20):
            print(fun())
            time.sleep(0.1)
    elif(i%3==1):
        for i in range(50):
            print(fun())
            time.sleep(0.01)
    else:
        for i in range(10):
            print(fun())
            time.sleep(0.2)
    # time.sleep(1)
    
