import eel
import time
from ping3 import ping

eel.init("web")

@eel.expose
def ping_host(host):
    while True:
        response_time = ping(host)
        try:
            if response_time is not None and response_time is not False:
                result = f"time={response_time} ms"
                print(f"IPアドレス:{host}は応答があります。応答時間{result}")
                eel.update_ping_result(result)
            else:
                result = "Request timed out."
                print(f"{host}は応答がありません")
                eel.update_ping_result(result)
        except OSError as e:
            result = "Request timed out."
            print(f"{host}は応答がありません: {str(e)}")
            eel.update_ping_result(result)

        time.sleep(1)

if __name__ == "__main__":
    eel.start("index.html", size=(1024,768), port=8083)
