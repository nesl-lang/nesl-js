
https://claude.ai/chat/b4f356de-73e2-48c1-bdf8-b9ab4d3189a2

## NESL Syntax Format (Single Action Per Block)

- i think there should be an error if user tries to encode escaped newline in inline string
- no comments

### File Creation Example:

```sh [nesl]
# creating the file needed for such and such

#!nesl [@three-char-SHA-256: k7m]
action = "create_file"
path = "/tmp/\"hello\".txt"
content = <<'EOT_k7m'
 Hello world!
 how are you?
EOT_k7m
#!end_k7m

# createe the hello2 file for other reasons

#!nesl [@three-char-SHA-256: h7d]
action = "create_file"
path = "/tmp/hello2.txt"
content = <<'EOT_h7d'
 Hello other world!
 how are you?
EOT_h7d
#!end_h7d
```

### Search/Replace Example:

```sh [nesl]
# replace some text for blah blah blha reasons

#!nesl [@three-char-SHA-256: vc8]
action = "replace_in_file"
search = <<'EOT_vc8'
 Hello world!
 how are you?
EOT_vc8
replace = <<'EOT_vc8'

   
 asdf "awef" 'lkj'
lalalala 

EOT_vc8
#!end_vc8
```

note: each heredoc delimiter is `EOT_` followed by the `three-char-SHA-256` value. also appended to the end_


### Equivalent Perl Syntax:

```perl
#!/usr/bin/perl
use strict;
use warnings;

# First NESL block - create_file action
my $nesl_block_k7m = {
    # creating the file needed for such and such
    action => "create_file",
    path => "/tmp/\"hello\".txt",
    content => <<'EOT_k7m'
 Hello world!
 how are you?
EOT_k7m
};

# Second NESL block - create_file action
my $nesl_block_h7d = {
    # createe the hello2 file for other reasons
    action => "create_file",
    path => "/tmp/hello2.txt",
    content => <<'EOT_h7d'
 Hello other world!
 how are you?
EOT_h7d
};

# Third NESL block - replace_in_file action
my $nesl_block_vc8 = {
    # replace some text for blah blah blha reasons
    action => "replace_in_file",
    search => <<'EOT_vc8'
 Hello world!
 how are you?
EOT_vc8
    replace => <<'EOT_vc8'

   
 asdf "awef" 'lkj'
lalalala 

EOT_vc8
};
```
