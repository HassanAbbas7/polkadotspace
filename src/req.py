import requests


def getToken():
    site = ""
    data = {"email": "test@gmail.com", "password": "321"}
    r = request.post(site, data=data)
    token = r.data["access"]
    return token

def testSite():
    site = ""
    data = {"data":"this is data"}
    r = request.post(site, data=data)
    print(r.text)


testSite()
