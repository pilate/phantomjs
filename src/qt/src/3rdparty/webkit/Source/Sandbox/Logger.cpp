#include <stdio.h>
#include <Sandbox/Logger.h>
#include <QtCore/qbytearray.h>

using namespace std;

namespace Sandbox {
    void LogEvent(std::string eventName, std::string logData) {
        QByteArray logDataQB = QByteArray(logData.c_str()).toBase64();
        printf("%s|%s\n", eventName.c_str(), logDataQB.data());
        //printf("Event: { event: %s, data: %s }\n", eventName.c_str(), logData.c_str());
    }
    void LogEvent(std::string eventName, std::string logData, std::string logData2) {
        QByteArray logDataQB = QByteArray(logData.c_str()).toBase64();
        QByteArray logData2QB = QByteArray(logData2.c_str()).toBase64();
        printf("%s|%s|%s\n", eventName.c_str(), logDataQB.data());
    }

}
