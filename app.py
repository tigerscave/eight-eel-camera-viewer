import eel
import time
from ping3 import ping, EXCEPTIONS

eel.init("web")

@eel.expose
def ping_host(host):
    while True:
        try:
            result = ping(host)
            if result is not None:
                response = f"time={result} ms"
                print(response)
                eel.update_ping_result(response)
            else:
                eel.update_ping_result("Request timed out.")
        except EXCEPTIONS.TimeoutException:
            pass

        time.sleep(1)

if __name__ == "__main__":
    eel.start("index.html", size=(1024,768), port=8083)
