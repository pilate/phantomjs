import os, json, time
from subprocess import check_output, CalledProcessError
from base64 import b64decode
from pprint import pprint
from urllib import unquote

PHANTOMJS_PATH = "/home/pwestin/phantomjs/bin/"

class WebEvent(object):
    def __init__(self, event_text):
        self.split_event = event_text.split("|")
        
        self.setTime()
        self.setType()
        self.setSource()
        
        if (len(self.split_event) == 1):
            print self.type
            self.setData()

    def pop(self):
        return self.split_event.pop(0)

    def b64pop(self):
        return b64decode(self.pop())

    def setTime(self):
        self.time = self.pop()
    
    def setType(self):
        self.type = self.pop()
    
    def setSource(self):
        self.source = unquote(self.b64pop())
    
    def setData(self):
        self.data = unquote(self.b64pop())

def sortEventsBySource(events):
    sorted_events = {}

    def sourceSort(event):
        if event.source not in sorted_events:
            sorted_events[event.source] = []
        sorted_events[event.source].append(event)
    
    map(sourceSort, events)

    return sorted_events

def checkUrl(url):
    exec_cmd = [os.path.join(PHANTOMJS_PATH, "phantomjs"), os.path.join(PHANTOMJS_PATH, "test.js"), url]

    try:
        exec_cmd = map(str, exec_cmd)
        output = check_output(exec_cmd)
    except CalledProcessError as perror:
        print "Process Error"
        output = perror.output
    
    return output

def work(url = ""):
    url_output = checkUrl(url)
    output_split = url_output.split("\n")

    # Remove blank line(s)
    split_filter = filter(lambda a: len(a), output_split)

    # Get Event objects
    web_events = map(WebEvent, split_filter)

    # Split into source keys
    sorted_events = sortEventsBySource(web_events)
    pprint(sorted_events)
    print(json.dumps(sorted_events[''][0].__dict__))

work()
