#include <stdio.h>
#include <Sandbox/Logger.h>
#include <QtCore/qbytearray.h>

using namespace std;

namespace Sandbox {
    void LogEvent(std::string eventName, std::string logData) {
        //QByteArray logDataQB = QByteArray(logData.c_str()).toBase64();
        //printf("Event: { event: %s, data: %s }\n", eventName.c_str(), logDataQB.data());





        printf("Event: { event: %s, data: %s }\n", eventName.c_str(), logData.c_str());
    }
}
