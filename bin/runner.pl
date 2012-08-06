use MIME::Base64;
use Data::Dumper::Simple;

use warnings;
use strict;

my $eventTypeMap = {
    'scriptTagURL' => "url",
    'scriptTagURLData' => "js",
    'scriptTagData' => "js",
    'documentWrite' => "html",
    'appletElementStart' => undef,
    'appletElementEnd' => undef,
    'archiveAttrib' => "url",
    'codeAttrib' => "url",
    'codeBaseAttrib' => "url",
    'frameLoadURL' => "url",
    'objectElementStart' => undef,
    'objectElementEnd' => undef,
    'objectParam' => "url",
    'windowChangeLocation' => "url",
    'frameChangeLocation' => "url"
};

# Run phantomjs
my $url = "http://www.google.com";

if ($ARGV[0]) {
    $url = $ARGV[0];
}
print $ARGV[0], "\n";

my $rawEvents = `./phantomjs test.js $url`;

# Split events on newline
my @splitEvents = split("\n", $rawEvents);

my (@eventList, @children) = ();
my $capture = 0;


# Returns simple hash structure with type/data
sub getEventHash {
    my ($event) = @_;
    my $eventHash = {};

    my ($eventType, $eventB64Data) = split("\\|", $event, 2);
    my $eventData = decode_base64($eventB64Data);

    $eventHash->{type} = $eventType;
    $eventHash->{data} = $eventData;

    return $eventHash;
}

# Create final list of events, merge children into parents
while (my $event = shift(@splitEvents)) {
    my $eventHash = getEventHash($event);

    # Check if event has child events
    if (substr($eventHash->{type}, -5) eq "Start") {
        $eventHash->{type} = substr($eventHash->{type}, 0, -5);
        $eventHash->{data} = substr($eventHash->{data}, 0, -5);

        my (@children, $childEventHash);

        # Iterate until reaching the 'End' marker
        do {
           my $childEvent = shift(@splitEvents);
           $childEventHash = getEventHash($childEvent);
           push @children, $childEventHash;
        }
        while (substr($childEventHash->{type}, -3) ne "End");
        
        # Remove 'End' event from children
        pop @children;

        # Add children to parent
        @{$eventHash->{children}} = @children;
    }
    push @eventList, $eventHash;
}

foreach my $event (@eventList) {
    my $eventType = $event->{type};
    my $mappedType = $eventTypeMap->{$eventType};
    if ($mappedType) {
        print "$eventType - $mappedType\n";
    }
    else {
        print "$eventType\n";
    }
}

#print Dumper(@eventList);

