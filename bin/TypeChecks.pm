package TypeChecks;

use warnings;
use strict;

sub url {
    my ($url) = @_;
    if ($url =~ m~
        (?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))
    ~xg)
    {
       print "Yes url: $1\n";
       return 1;
    }
    else {
        print "No url: $url\n";
        return 0;
    }
}

1;