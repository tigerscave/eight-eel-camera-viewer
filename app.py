import eel
import subprocess

# 追加したライブラリ
import time
from ping3 import ping
import threading

eel.init("web")


@eel.expose
def ping_host(host):
    res = subprocess.run(
        ["ping", host, "-c", "1", "-W", "3000"], stdout=subprocess.PIPE, text=True
    )

    if res.returncode == 0:
        result = "success!!"
    else:
        result = "failed..."

    return result


@eel.expose
def ping_check():
    """
    JSから与えられたIPで疎通確認をして、結果に応じてJSの関数を起動する関数
    """

    while True:
        try:
            hostname = eel.ipAddressStatus()()  # JSからIPアドレスを取ってくる
            response_time = ping(hostname)  # pingを計る
            if response_time is not None:
                print(f"{hostname} は応答があります。応答時間: {response_time} ms")
                eel.changeOnlineStatus("オンライン")  # pingが通ったので、オンラインを引数に取りJSの関数を動かす
            else:
                print(f"{hostname} は応答がありません")
                eel.changeOnlineStatus("オフライン")  # pingが通らなかったので、オフラインを引数に取りJSの関数を動かす
        except OSError:
            eel.changeOnlineStatus("オフライン")  # OSErroが出たので、オフラインを引数に取りJSの関数を動かす

        time.sleep(1)  # 任意の秒数に。ないと重くなる。


# Threadは使わなくてもいいが、今後のために。。。
ping_thread = threading.Thread(target=ping_check)
ping_thread.start()

eel.start("index.html", size=(1024, 768), port=8083)
