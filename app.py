import eel
import time
from ping3 import ping
import threading

eel.init("web")

@eel.expose
def ping_host(host):
    while True:
        try:
            host = eel.ipAddressStatus()()

            response_time = ping(host)
            if response_time is not None and response_time is not False:
                result = f"time={response_time} ms"
                print(f"{host}は応答があります。応答時間{result}")
                eel.update_ping_result(result)
            else:
                result = "オフライン(通信データなし)"
                print(f"{host}は応答がありません")
                eel.update_ping_result(result)
        except OSError as e:
            result = "オフライン（通信データなし）"
            print(f"{host}は応答がありません: {str(e)}")
            eel.update_ping_result(result)

        time.sleep(1)

ping_thread = threading.Thread(target = ping_host)
ping_thread.start()

if __name__ == "__main__":
    eel.start("index.html", size=(1024,768), port=8083)
