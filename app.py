import eel
import subprocess

eel.init("web")

@eel.expose
def ping_host(host):
    res = subprocess.run(["ping", host, "-c", "1", "-W", "3000"],
    stdout=subprocess.PIPE,text=True)

if __name__ == "__main__":
    eel.start("index.html", size=(1024, 768), port=8083)