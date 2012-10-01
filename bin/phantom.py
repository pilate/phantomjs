# Setup Django environment
from django.core.management import setup_environ
import settings
setup_environ(settings)

# Constants
# ----
# Path containing the JDOE executable
PHANTOM_PATH = "/home/pwestin/phantomjs/bin"
PHANTOM_URL_SCRIPT = "/home/pwestin/phantomjs/bin/test.js"
PHANTOM_FILE_SCRIPT = "/home/pwestin/phantomjs/bin/file.js"

import os, json, time
from subprocess import check_output, CalledProcessError
from base64 import b64decode, b64encode
from django.db import transaction
from JDI.ui.models import phantom_event, phantom_queue, phantom_scan

# Iterate all queue objects and process with JDOE
def evaluateQueue():
    queue_elements = phantom_queue.objects.all()
    output = ""
    
    # Iterate all queue objects
    for element in queue_elements:
        # Construct command to run
        if element.scan.isurl == True:
            exec_cmd = [os.path.join(PHANTOM_PATH, "phantomjs"), PHANTOM_URL_SCRIPT, element.scan.source]
        else:
            exec_cmd = [os.path.join(PHANTOM_PATH, "phantomjs"), PHANTOM_FILE_SCRIPT, b64encode(element.scan.source)]

        # Run it
        try:
            exec_cmd = map(str, exec_cmd)
            print exec_cmd
            output = check_output(exec_cmd)
        except CalledProcessError as perror:
            # Catch output, even after timeout
            output = perror.output
    
        ouput_lines = filter(None, output.split("\n"))
        for line in ouput_lines:
            if line == "\n":
                pass
            # End when all JS is run
            try:
                timestamp, event, b64_source, b64_data = line.split("|")
                js_event = phantom_event(scan=element.scan, context=b64decode(b64_source), name=event, data=b64decode(b64_data)) # .encode('string_escape')
                js_event.save()
            except:
                print "Broke"
                print line
                
        element.delete()

while (1):
    time.sleep(1)
    evaluateQueue()

    #Required or DB snapshot gets cached
    transaction.enter_transaction_management()
    transaction.commit()

