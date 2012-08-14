#include <stdio.h>
#include <sys/time.h>

#include <Sandbox/Logger.h>
#include <QtCore/qbytearray.h>

using namespace std;

namespace Sandbox {
    void LogEvent(std::string eventName, std::string logData) {
        struct timeval mytime;
        gettimeofday(&mytime, NULL);
        printf("%ld%06ld|", mytime.tv_sec, mytime.tv_usec);

        QByteArray logDataQB = QByteArray(logData.c_str()).toBase64();
        printf("%s|%s\n", eventName.c_str(), logDataQB.data());
    }

    void LogEvent(std::string eventName, std::string logData, std::string logData2) {
        struct timeval mytime;
        gettimeofday(&mytime, NULL);
        printf("%ld%06ld|", mytime.tv_sec, mytime.tv_usec);

        QByteArray logDataQB = QByteArray(logData.c_str()).toBase64();
        QByteArray logData2QB = QByteArray(logData2.c_str()).toBase64();
        printf("%s|%s|%s\n", eventName.c_str(), logDataQB.data(), logData2QB.data());
    }
}
