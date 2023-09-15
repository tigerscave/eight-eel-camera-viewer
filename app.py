import eel
import subprocess
import time
import os
import signal

eel.init("web")

@eel.expose
def ping_host(host):
    start_time = time.time()
    while True:
        try:
            res = subprocess.run(
                ["ping", host, "-c", "1", "-W", "3000"],
                stdout=subprocess.PIPE,
                text=True,
            )
            response = res.stdout
            print("test: **** ", response)
            eel.update_ping_result(response)
        except subprocess.CalledProcessError as e:
            pass

        elapsed_time = time.time() - start_time

        if elapsed_time >= 10:
            return "Ping failed"

        time.sleep(1)

# 現在のpingを終了する
def kill_ping_process():
    try:
        with open("ping_process_id.txt", "r") as pid_file:
            pid = int(pid_file.read())
            os.kill(pid, signal.SIGTERM)
    except FileNotFoundError:
        pass

@eel.expose
def restart_ping_host(new_host):
    kill_ping_process()
    with open("ping_process_id.txt","w") as pid_file:
        pid_file.write(str(os.getpid()))
    ping_host(new_host)


if __name__ == "__main__":
    eel.start("index.html", size=(1024, 768), port=8083)
