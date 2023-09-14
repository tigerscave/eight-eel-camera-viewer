import eel
import subprocess
import time

eel.init("web")

exit_flag = False


@eel.expose
def ping_host(host):
    global exit_flag

    while not exit_flag:
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
            exit_flag = True
            return "Ping failed"

        time.sleep(1)


if __name__ == "__main__":
    eel.start("index.html", size=(1024, 768), port=8083)
