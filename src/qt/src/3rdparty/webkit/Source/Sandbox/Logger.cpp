#include <stdio.h>
#include <Sandbox/Logger.h>

namespace Sandbox {
    void LogEvent(std::string eventname, std::string logdata) {
        printf("Event: { event: %s, data: %s }\n", eventname.c_str(), logdata.c_str());
    }
}
