use MIME::Base64;
$encoded = encode_base64('Aladdin:open sesam');
print $encoded, "\n";
$decoded = decode_base64($encoded);
print $decoded, "\n";
