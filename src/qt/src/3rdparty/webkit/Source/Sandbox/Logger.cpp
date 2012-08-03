#include <stdio.h>
#include <Sandbox/Logger.h>
#include <QtCore/qbytearray.h>

using namespace std;

namespace Sandbox {
    void LogEvent(std::string eventName, std::string logData) {
        // Simplest way I found to get a base64 encoded string
        QByteArray logDataQB = QByteArray(logData.c_str()).toBase64();
        printf("%s|%s\n", eventName.c_str(), logDataQB.data());

        //printf("Event: { event: %s, data: %s }\n", eventName.c_str(), logData.c_str());
    }
}
