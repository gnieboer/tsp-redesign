% # Return (not print) the value of an apache parameter to the caller.
% #
% # The user passes in a string indicating the type of the parameter.
% # The parameter value is stripped to that type and length and then cleaned by encoding.
%
% # Usage:
%
% # my $value = $m->comp('.../component/getParamTyped', param=>year, type=>'string', maxlength=10);
% #
% # valid types:   integer  positiveInteger string float positivefloat word words
% #
% # returns undef if the user didn't define the value
%
% #############################################################################################
%
<%args>
$param =>  'QUERY_STRING'
$type =>  'integer'
$maxlength =>  10
$array =>  [0, 1]
</%args>
<%init>
my $req = Apache2::Request->new($r);
# print "  $param == $req->param($param)<BR>\n";
# return $req->param($param);

$type = lc($type);
my $value = $req->param($param);
$value =~ s/^\s+//;                             # trim the beginning of string
$value =~ s/\s+$//;                             # trim the end of string
$value =~ tr/\?//d;                             # remove ? from parameter.  It should never be there.
# $value =~ tr/<//d;                            # remove < from parameter.  Avoid script insertion.
$value = substr($value, 0, $maxlength);         # enforce max length of string

if ($type eq 'integer') {
  ($value) =  $value =~ /(-?\d+)/;
  if (!defined($value)) { return undef; }
  return $value;
  # return HTML::Entities::encode($value);
}
if ($type eq 'positiveinteger') {
  ($value) =  $value =~ /(\d+)/;
  if (!defined($value)) { return undef; }
  return $value;
  # return HTML::Entities::encode($value);
}

if ($type eq 'float') {
  ($value) =  $value =~ /(-?\d+\.?\d*)/;
  if (!defined($value)) { return undef; }
  return $value;
  # return HTML::Entities::encode($value);
}
if ($type eq 'positivefloat') {
  ($value) =  $value =~ /(\d+\.?\d*)/;
  if (!defined($value)) { return undef; }
  return $value;
  # return HTML::Entities::encode($value);
}

if ($type eq 'date') {
  ($value) =  $value =~ /([\d\-\\\/]+)/;
  if (!defined($value)) { return undef; }
  return $value;
  # return HTML::Entities::encode($value);
}

if ($type eq 'msstring') {
# $value = Encode::decode_utf8($value);
#  $value =~ s/\N{U+201C}/"/;
#  $value =~ s/\N{U+201D}/"/;
#  $value =~ s/\N{U+201E}/"/;
#  $value =~ s/\N{U+2018}/'/;
#  $value =~ s/\N{U+2019}/'/;
#  $value =~ s/\N{U+201A}/'/;
#  $value =~ s/\N{U+2026}/.../;
#  $value =~ s/\N{U+2013}/-/;
#  $value =~ s/\N{U+2014}/-/;
#  $value =~ s/\N{U+02C6}/^/;
#  $value =~ s/\N{U+2039}/</;
#  $value =~ s/\N{U+203A}/>/;
#  $value =~ s/\N{U+02DC}/ /;
#  $value =~ s/\N{U+00A0}/ /;
#  $value =~ s/&/%26/;
#  ($value) =  $value =~ /([^?&]+)/;
$value =~ s/\u2018/'/g;
$value =~ s/\u2019/'/g;
$value =~ s/\u201A/'/g;
$value =~ s/\uFFFD/'/g;
# $value =~ s/\x{2018}/'/g;
# $value =~ s/\x{2019}/'/g;
# $value =~ s/\x{201A}/'/g;
# $value =~ s/[\x93\x94]/"/g;
# $value =~ s/[\x91\x92]/'/g;
# $value =~ s/\x{201C}/"/g;
# $value =~ s/\x{201D}/"/g;
# $value =~ s/\x{201E}/"/g;
# my $char = chr(226);
# $value =~ s/\Q$char\E/'/ig;
# return ord($value);
  if (!defined($value)) { return undef; }
  return HTML::Entities::encode($value);
}

if ($type eq 'string') {
  ($value) =  $value =~ /([^?&]+)/;
  if (!defined($value)) { return undef; }
  return HTML::Entities::encode($value);
}

if ($type eq 'word') {
  ($value) =  $value =~ /(\w+)/;
  if (!defined($value)) { return undef; }
  return $value;
  # return HTML::Entities::encode($value);
}
if ($type eq 'words') {
  ($value) =  $value =~ /([\w ]+)/;
  if (!defined($value)) { return undef; }
  return $value;
  # return HTML::Entities::encode($value);
}
if ($type eq 'sentences') {
  if (!defined($value)) { return undef; }
  return HTML::Entities::encode($value);
}

if ($type eq 'enumerated') {
  my $tmpvalue = undef;
  for (@$array) { if (lc($_) eq lc($value)) { $tmpvalue = $_; } };
  return $tmpvalue;
}

return undef;
</%init>
