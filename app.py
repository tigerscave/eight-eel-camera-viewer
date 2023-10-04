# --------subprocessを使ったコード--------------##
import eel
import subprocess
import time
import threading

eel.init("web")

ping_runnning = True

# ページが読み込まれた際に、JSのlocalStorageに保存されているIPアドレス(host)に対し、pingを開始する。
@eel.expose
def ping_host(host):
    global ping_runnning
    while ping_runnning:
        try:
            res = subprocess.run(
                ["ping", host, "-c", "1", "-W", "3000"],  # 1秒おきに、pingを実行する。
                stdout=subprocess.PIPE,
                text=True,
            )
            response = res.stdout
            print("test: **** ", response)

            if "ping: cannot resolve" in response:
                # "Unknown host" エラーを明示的に示す
                response = "Unknown host error"

            # pingを実行して、得られた応答をもとに、UI上の表示を更新する
            eel.display_update_ping(response)

        except subprocess.CalledProcessError as e:
            return "Ping failed"

        time.sleep(1)


# 古いIPアドレス(host)とのping疎通を終了する。
@eel.expose
def kill_ping_process():
    global ping_runnning
    ping_runnning = False

def delete_old_ip_address(host):
    try:
        # ファイルからIPアドレス一覧を読み込む。rは読み取りモード、読み込み専用で開く。
        with open("ip_addresses.txt", "r") as file:
            ip_addresses = file.readlines()

        # 指定されたIPアドレスを削除
        ip_addresses = [ip.strip() for ip in ip_addresses if ip.strip() != host]

        # 削除後のIPアドレス一覧をファイルに書き込む。wは書き込みモード、ファイルが存在しない場合は新規作成、存在する場合は、中身を上書き
        with open("ip_addresses.txt", "w") as file:
            file.writelines("\n".join(ip_addresses))

        return "IP address deleted successfully."

    except Exception as e:
        return f"An error occurred: {str(e)}"


# 新しいIPアドレス（newHost)に対して、pingを開始するために、ping_host関数に新しい引数を渡す。
@eel.expose
def restart_ping_host(new_host):
    global ping_runnning
    ping_runnning = True
    threading.Thread(target=ping_host, args=(new_host,)).start()  # スレッドでping_host()を実行


if __name__ == "__main__":
    eel.start("index.html", size=(1024, 768), port=8083)
