import eel
import time
from ping3 import ping
import threading

eel.init("web")

##１つ目のネットワークカメラとのping
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

##２つ目のネットワークカメラとのping
@eel.expose
def ping_host2(host2):
    while True:
        try:
            host2 = eel.ipAddressStatus2()()

            response_time2 = ping(host2)
            if response_time2 is not None and response_time2 is not False:
                result2 = f"time={response_time2} ms"
                print(f"{host2}は応答があります。応答時間{result2}")
                eel.update_ping_result2(result2)
            else:
                result2 = "オフライン(通信データなし)"
                print(f"{host2}は応答がありません")
                eel.update_ping_result2(result2)
        except OSError as e:
            result2 = "オフライン（通信データなし）"
            print(f"{host2}は応答がありません: {str(e)}")
            eel.update_ping_result2(result2)

        time.sleep(1)

ping_thread2 = threading.Thread(target = ping_host2)
ping_thread2.start()

##３つ目のネットワークカメラとのping
@eel.expose
def ping_host3(host3):
    while True:
        try:
            host3 = eel.ipAddressStatus3()()

            response_time3 = ping(host3)
            if response_time3 is not None and response_time3 is not False:
                result3 = f"time={response_time3} ms"
                print(f"{host3}は応答があります。応答時間{result3}")
                eel.update_ping_result3(result3)
            else:
                result3 = "オフライン(通信データなし)"
                print(f"{host3}は応答がありません")
                eel.update_ping_result3(result3)
        except OSError as e:
            result3 = "オフライン（通信データなし）"
            print(f"{host3}は応答がありません: {str(e)}")
            eel.update_ping_result3(result3)

        time.sleep(1)

ping_thread3 = threading.Thread(target = ping_host3)
ping_thread3.start()

if __name__ == "__main__":
    eel.start("index.html", size=(1024,768), port=8083)
