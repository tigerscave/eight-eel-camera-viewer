import eel
import subprocess
import time

eel.init("web")

@eel.expose
def ping_host(host):
  while True:
    try:
        res = subprocess.run(["ping", host, "-c", "1", "-W", "3000"],
                         stdout=subprocess.PIPE,text=True)
        response = res.stdout
        print(response)
    except subprocess.CalledProcessError as e:
        print("エラー:", str(e))
    
    time.sleep(1)
    
if __name__ == "__main__":
    eel.start("index.html", size=(1024, 768), port=8083)