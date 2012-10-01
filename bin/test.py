import os, json, time
from subprocess import check_output, CalledProcessError

PHANTOMJS_PATH = "/home/pwestin/phantomjs/bin/"
exec_cmd = [os.path.join(PHANTOMJS_PATH, "phantomjs"), os.path.join(PHANTOMJS_PATH, "test.js")]

        # Run it
try:
    exec_cmd = map(str, exec_cmd)
    print exec_cmd
    myvar = check_output(exec_cmd)
except CalledProcessError as perror:
    # Timeout event
    timeout = True
    # Catch output, even after timeout
    myvar = perror.output

print myvar
