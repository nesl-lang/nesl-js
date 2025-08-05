# Manifest

- 001-empty-file
- 002-single-block-basic
- 003-empty-block
- 004-heredoc-basic
- 005-duplicate-key
- 006-no-comments-allowed
- 007-heredoc-after-valid-end
- 008-malformed-header
- 009-invalid-block-id
- 010-unclosed-quote
- 011-empty-quoted-value
- 012-empty-heredoc
- 013-max-length-key
- 014-key-too-long
- 015-unclosed-block
- 016-mismatched-end
- 017-heredoc-with-nesl-markers
- 018-missing-key-name
- 019-escaped-quotes
- 020-multiple-blocks
- 021-heredoc-empty-lines
- 022-invalid-assignment
- 023-utf8-keys
- 024-invalid-utf8-keys
- 025-whitespace-in-keys
- 026-newline-in-quoted-string
- 027-unclosed-heredoc
- 028-invalid-value-format
- 029-block-id-special-chars
- 030-no-comments-variations
- 031-heredoc-with-end-marker
- 032-emoji-in-keys
- 033-surrogate-pairs-in-values
- 034-utf8-replacement-chars
- 035-malformed-utf8-in-header

# Tests

## general

### 001-empty-file

```sh nesl
```

```json
{
  "blocks": [],
  "errors": []
}
```

### 002-single-block-basic

```sh nesl
#!nesl [@three-char-SHA-256: abc]
path = "/tmp/test.txt"
name = "example"
#!end_abc
```

```json
{
  "blocks": [{
    "id": "abc",
    "properties": {
      "path": "/tmp/test.txt",
      "name": "example"
    },
    "startLine": 1,
    "endLine": 4
  }],
  "errors": []
}
```

### 003-empty-block

```sh nesl
#!nesl [@three-char-SHA-256: xyz]
#!end_xyz
```

```json
{
  "blocks": [{
    "id": "xyz",
    "properties": {},
    "startLine": 1,
    "endLine": 2
  }],
  "errors": []
}
```

### 004-heredoc-basic

```sh nesl
#!nesl [@three-char-SHA-256: h3r]
content = <<'EOT_h3r'

Line one
Line two

EOT_h3r
#!end_h3r
```

```json
{
  "blocks": [{
    "id": "h3r",
    "properties": {
      "content": "\nLine one\nLine two\n"
    },
    "startLine": 1,
    "endLine": 8
  }],
  "errors": []
}
```

### 005-duplicate-key

```sh nesl
#!nesl [@three-char-SHA-256: dup]
key = "first"
key = "second"
#!end_dup
```

```json
{
  "blocks": [{
    "id": "dup",
    "properties": {
      "key": "second"
    },
    "startLine": 1,
    "endLine": 4
  }],
  "errors": [{
    "code": "DUPLICATE_KEY",
    "line": 3,
    "column": 1,
    "length": 3,
    "blockId": "dup",
    "content": "key = \"second\"",
    "context": "#!nesl [@three-char-SHA-256: dup]\nkey = \"first\"\nkey = \"second\"\n#!end_dup",
    "message": "Duplicate key 'key' in block 'dup'"
  }]
}
```

### 006-no-comments-allowed

```sh nesl
#!nesl [@three-char-SHA-256: cmt]
// This is not a comment
key1 = "value1"
  // Not a comment with leading spaces
key2 = "value2"
#!end_cmt
```

```json
{
  "blocks": [{
    "id": "cmt",
    "properties": {
      "key1": "value1",
      "key2": "value2"
    },
    "startLine": 1,
    "endLine": 6
  }],
  "errors": [{
    "code": "MALFORMED_ASSIGNMENT",
    "line": 2,
    "column": 1,
    "length": 24,
    "blockId": "cmt",
    "content": "// This is not a comment",
    "context": "#!nesl [@three-char-SHA-256: cmt]\n// This is not a comment\nkey1 = \"value1\"\n  // Not a comment with leading spaces\nkey2 = \"value2\"",
    "message": "Invalid line format in block 'cmt': not a valid key-value assignment or empty line"
  }, {
    "code": "MALFORMED_ASSIGNMENT",
    "line": 4,
    "column": 1,
    "length": 38,
    "blockId": "cmt",
    "content": "  // Not a comment with leading spaces",
    "context": "// This is not a comment\nkey1 = \"value1\"\n  // Not a comment with leading spaces\nkey2 = \"value2\"\n#!end_cmt",
    "message": "Invalid line format in block 'cmt': not a valid key-value assignment or empty line"
  }]
}
```

### 007-heredoc-after-valid-end

```sh nesl
#!nesl [@three-char-SHA-256: col]
content = <<'EOT_col'
This line is fine
EOT_col
This breaks parsing
EOT_col
#!end_col
```

```json
{
  "blocks": [{
    "id": "col",
    "properties": {
      "content": "This line is fine"
    },
    "startLine": 1,
    "endLine": 7
  }],
  "errors": [{
    "code": "MALFORMED_ASSIGNMENT",
    "line": 5,
    "column": 1,
    "length": 19,
    "blockId": "col",
    "content": "This breaks parsing",
    "context": "This line is fine\nEOT_col\nThis breaks parsing\nEOT_col\n#!end_col",
    "message": "Invalid line format in block 'col': not a valid key-value assignment or empty line"
  }, {
    "code": "MALFORMED_ASSIGNMENT",
    "line": 6,
    "column": 1,
    "length": 7,
    "blockId": "col",
    "content": "EOT_col",
    "context": "This line is fine\nEOT_col\nThis breaks parsing\nEOT_col\n#!end_col",
    "message": "Invalid line format in block 'col': not a valid key-value assignment or empty line"
  }]
}
```

### 008-malformed-header

```sh nesl
#!nesl [missing-at-sign: bad]
key = "value"
#!end_bad
```

```json
{
  "blocks": [],
  "errors": [{
    "code": "MALFORMED_HEADER",
    "line": 1,
    "column": 1,
    "length": 29,
    "blockId": null,
    "content": "#!nesl [missing-at-sign: bad]",
    "context": "#!nesl [missing-at-sign: bad]\nkey = \"value\"\n#!end_bad",
    "message": "Invalid NESL header format"
  }]
}
```

### 009-invalid-block-id

```sh nesl
#!nesl [@three-char-SHA-256: a]
key = "value"
#!end_a
```

```json
{
  "blocks": [],
  "errors": [{
    "code": "INVALID_BLOCK_ID",
    "line": 1,
    "column": 30,
    "length": 1,
    "blockId": null,
    "content": "#!nesl [@three-char-SHA-256: a]",
    "context": "#!nesl [@three-char-SHA-256: a]\nkey = \"value\"\n#!end_a",
    "message": "Block ID must be exactly 3 characters"
  }]
}
```

### 010-unclosed-quote

```sh nesl
#!nesl [@three-char-SHA-256: quo]
key = "unclosed
#!end_quo
```

```json
{
  "blocks": [{
    "id": "quo",
    "properties": {},
    "startLine": 1,
    "endLine": 3
  }],
  "errors": [{
    "code": "UNCLOSED_QUOTE",
    "line": 2,
    "column": 7,
    "length": 9,
    "blockId": "quo",
    "content": "key = \"unclosed",
    "context": "#!nesl [@three-char-SHA-256: quo]\nkey = \"unclosed\n#!end_quo",
    "message": "Unclosed quoted string"
  }]
}
```

### 011-empty-quoted-value

```sh nesl
#!nesl [@three-char-SHA-256: emp]
empty = ""
#!end_emp
```

```json
{
  "blocks": [{
    "id": "emp",
    "properties": {
      "empty": ""
    },
    "startLine": 1,
    "endLine": 3
  }],
  "errors": []
}
```

### 012-empty-heredoc

```sh nesl
#!nesl [@three-char-SHA-256: ehd]
content = <<'EOT_ehd'
EOT_ehd
#!end_ehd
```

```json
{
  "blocks": [{
    "id": "ehd",
    "properties": {
      "content": ""
    },
    "startLine": 1,
    "endLine": 4
  }],
  "errors": []
}
```

### 013-max-length-key

```sh nesl
#!nesl [@three-char-SHA-256: max]
k_56789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345123 = "256 chars"
#!end_max
```

```json
{
  "blocks": [{
    "id": "max",
    "properties": {
      "k_56789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345123": "256 chars"
    },
    "startLine": 1,
    "endLine": 3
  }],
  "errors": []
}
```

### 014-key-too-long

```sh nesl
#!nesl [@three-char-SHA-256: lng]
k_567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123451234 = "257 chars"
#!end_lng
```

```json
{
  "blocks": [{
    "id": "lng",
    "properties": {},
    "startLine": 1,
    "endLine": 3
  }],
  "errors": [{
    "code": "INVALID_KEY",
    "line": 2,
    "column": 1,
    "length": 257,
    "blockId": "lng",
    "content": "k_567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123451234 = \"257 chars\"",
    "context": "#!nesl [@three-char-SHA-256: lng]\nk_567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123451234 = \"257 chars\"\n#!end_lng",
    "message": "Key exceeds 256 character limit"
  }]
}
```

### 015-unclosed-block

```sh nesl
#!nesl [@three-char-SHA-256: unc]
key = "value"
```

```json
{
  "blocks": [{
    "id": "unc",
    "properties": {
      "key": "value"
    },
    "startLine": 1,
    "endLine": null
  }],
  "errors": [{
    "code": "UNCLOSED_BLOCK",
    "line": 3,
    "column": 1,
    "length": 0,
    "blockId": "unc",
    "content": "",
    "context": "#!nesl [@three-char-SHA-256: unc]\nkey = \"value\"",
    "message": "Block 'unc' not closed before EOF"
  }]
}
```

### 016-mismatched-end

```sh nesl
#!nesl [@three-char-SHA-256: mis]
key = "value"
#!end_xyz
```

```json
{
  "blocks": [{
    "id": "mis",
    "properties": {
      "key": "value"
    },
    "startLine": 1,
    "endLine": 3
  }],
  "errors": [{
    "code": "MISMATCHED_END",
    "line": 3,
    "column": 1,
    "length": 9,
    "blockId": "mis",
    "content": "#!end_xyz",
    "context": "#!nesl [@three-char-SHA-256: mis]\nkey = \"value\"\n#!end_xyz",
    "message": "End marker 'xyz' doesn't match block ID 'mis'"
  }]
}
```

### 017-heredoc-with-nesl-markers

```sh nesl
#!nesl [@three-char-SHA-256: shm]
content = <<'EOT_shm'
This contains #!nesl [@three-char-SHA-256: xyz]
And also #!end_xyz
But they're just content
EOT_shm
#!end_shm
```

```json
{
  "blocks": [{
    "id": "shm",
    "properties": {
      "content": "This contains #!nesl [@three-char-SHA-256: xyz]\nAnd also #!end_xyz\nBut they're just content"
    },
    "startLine": 1,
    "endLine": 7
  }],
  "errors": []
}
```

### 018-missing-key-name

```sh nesl
#!nesl [@three-char-SHA-256: edg]
= "missing key"
#!end_edg
```

```json
{
  "blocks": [{
    "id": "edg",
    "properties": {},
    "startLine": 1,
    "endLine": 3
  }],
  "errors": [{
    "code": "EMPTY_KEY",
    "line": 2,
    "column": 1,
    "length": 1,
    "blockId": "edg",
    "content": "= \"missing key\"",
    "context": "#!nesl [@three-char-SHA-256: edg]\n= \"missing key\"\n#!end_edg",
    "message": "Assignment without key name"
  }]
}
```

### 019-escaped-quotes

```sh nesl
#!nesl [@three-char-SHA-256: esc]
path = "C:\\Users\\test\\file.txt"
msg = "He said \"hello\""
#!end_esc
```

```json
{
  "blocks": [{
    "id": "esc",
    "properties": {
      "path": "C:\\Users\\test\\file.txt",
      "msg": "He said \"hello\""
    },
    "startLine": 1,
    "endLine": 4
  }],
  "errors": []
}
```

### 020-multiple-blocks

```sh nesl
#!nesl [@three-char-SHA-256: bl1]
key1 = "value1"
#!end_bl1

#!nesl [@three-char-SHA-256: bl2]
key2 = "value2"
#!end_bl2
```

```json
{
  "blocks": [{
    "id": "bl1",
    "properties": {
      "key1": "value1"
    },
    "startLine": 1,
    "endLine": 3
  }, {
    "id": "bl2",
    "properties": {
      "key2": "value2"
    },
    "startLine": 5,
    "endLine": 7
  }],
  "errors": []
}
```

### 021-heredoc-empty-lines

```sh nesl
#!nesl [@three-char-SHA-256: hel]
content = <<'EOT_hel'
Line 1

Line 3
EOT_hel
#!end_hel
```

```json
{
  "blocks": [{
    "id": "hel",
    "properties": {
      "content": "Line 1\n\nLine 3"
    },
    "startLine": 1,
    "endLine": 7
  }],
  "errors": []
}
```

### 022-invalid-assignment

```sh nesl
#!nesl [@three-char-SHA-256: inv]
key := "wrong operator"
#!end_inv
```

```json
{
  "blocks": [{
    "id": "inv",
    "properties": {},
    "startLine": 1,
    "endLine": 3
  }],
  "errors": [{
    "code": "INVALID_ASSIGNMENT_OPERATOR",
    "line": 2,
    "column": 5,
    "length": 2,
    "blockId": "inv",
    "content": "key := \"wrong operator\"",
    "context": "#!nesl [@three-char-SHA-256: inv]\nkey := \"wrong operator\"\n#!end_inv",
    "message": "Invalid assignment operator ':=' - only '=' is allowed"
  }]
}
```

### 023-utf8-keys

```sh nesl
#!nesl [@three-char-SHA-256: utf]
用户名 = "张三"
données_count = "42"
αβγ = "greek"
#!end_utf
```

```json
{
  "blocks": [{
    "id": "utf",
    "properties": {
      "用户名": "张三",
      "données_count": "42",
      "αβγ": "greek"
    },
    "startLine": 1,
    "endLine": 5
  }],
  "errors": []
}
```

### 024-invalid-utf8-keys

```sh nesl
#!nesl [@three-char-SHA-256: bad]
key name = "spaces not allowed"
key​value = "zero-width space"
#!end_bad
```

```json
{
  "blocks": [{
    "id": "bad",
    "properties": {},
    "startLine": 1,
    "endLine": 4
  }],
  "errors": [{
    "code": "INVALID_KEY",
    "line": 2,
    "column": 1,
    "length": 8,
    "blockId": "bad",
    "content": "key name = \"spaces not allowed\"",
    "context": "#!nesl [@three-char-SHA-256: bad]\nkey name = \"spaces not allowed\"\nkey​value = \"zero-width space\"\n#!end_bad",
    "message": "Key contains invalid character ' ' at position 4"
  }, {
    "code": "INVALID_KEY",
    "line": 3,
    "column": 1,
    "length": 9,
    "blockId": "bad",
    "content": "key​value = \"zero-width space\"",
    "context": "#!nesl [@three-char-SHA-256: bad]\nkey name = \"spaces not allowed\"\nkey​value = \"zero-width space\"\n#!end_bad",
    "message": "Key contains invalid character '​' at position 4"
  }]
}
```

### 025-whitespace-in-keys

```sh nesl
#!nesl [@three-char-SHA-256: wsp]
	key = "tab at start"
key	name = "tab in middle"
#!end_wsp
```

```json
{
  "blocks": [{
    "id": "wsp",
    "properties": {},
    "startLine": 1,
    "endLine": 4
  }],
  "errors": [{
    "code": "INVALID_KEY",
    "line": 2,
    "column": 1,
    "length": 4,
    "blockId": "wsp",
    "content": "\tkey = \"tab at start\"",
    "context": "#!nesl [@three-char-SHA-256: wsp]\n\tkey = \"tab at start\"\nkey\tname = \"tab in middle\"\n#!end_wsp",
    "message": "Key contains invalid character '\t' at position 1"
  }, {
    "code": "INVALID_KEY",
    "line": 3,
    "column": 1,
    "length": 8,
    "blockId": "wsp",
    "content": "key\tname = \"tab in middle\"",
    "context": "#!nesl [@three-char-SHA-256: wsp]\n\tkey = \"tab at start\"\nkey\tname = \"tab in middle\"\n#!end_wsp",
    "message": "Key contains invalid character '\t' at position 4"
  }]
}
```

### 026-newline-in-quoted-string

```sh nesl
#!nesl [@three-char-SHA-256: nwl]
key = "line1
line2"
#!end_nwl
```

```json
{
  "blocks": [{
    "id": "nwl",
    "properties": {},
    "startLine": 1,
    "endLine": 4
  }],
  "errors": [{
    "code": "UNCLOSED_QUOTE",
    "line": 2,
    "column": 7,
    "length": 6,
    "blockId": "nwl",
    "content": "key = \"line1",
    "context": "#!nesl [@three-char-SHA-256: nwl]\nkey = \"line1\nline2\"\n#!end_nwl",
    "message": "Unclosed quoted string"
  }, {
    "code": "MALFORMED_ASSIGNMENT",
    "line": 3,
    "column": 1,
    "length": 6,
    "blockId": "nwl",
    "content": "line2\"",
    "context": "#!nesl [@three-char-SHA-256: nwl]\nkey = \"line1\nline2\"\n#!end_nwl",
    "message": "Invalid line format in block 'nwl': not a valid key-value assignment or empty line"
  }]
}
```

### 027-unclosed-heredoc

```sh nesl
#!nesl [@three-char-SHA-256: uhd]
content = <<'EOT_uhd'
Some content
#!end_uhd
```

```json
{
  "blocks": [{
    "id": "uhd",
    "properties": {},
    "startLine": 1,
    "endLine": null
  }],
  "errors": [{
    "code": "UNCLOSED_HEREDOC",
    "line": 5,
    "column": 1,
    "length": 0,
    "blockId": "uhd",
    "content": "",
    "context": "#!nesl [@three-char-SHA-256: uhd]\ncontent = <<'EOT_uhd'\nSome content\n#!end_uhd",
    "message": "Heredoc 'EOT_uhd' not closed before EOF"
  }]
}
```

### 028-invalid-value-format

```sh nesl
#!nesl [@three-char-SHA-256: ivf]
key = unquoted
#!end_ivf
```

```json
{
  "blocks": [{
    "id": "ivf",
    "properties": {},
    "startLine": 1,
    "endLine": 3
  }],
  "errors": [{
    "code": "INVALID_VALUE",
    "line": 2,
    "column": 7,
    "length": 8,
    "blockId": "ivf",
    "content": "key = unquoted",
    "context": "#!nesl [@three-char-SHA-256: ivf]\nkey = unquoted\n#!end_ivf",
    "message": "Value must be a quoted string or heredoc"
  }]
}
```

### 029-block-id-special-chars

```sh nesl
#!nesl [@three-char-SHA-256: a-b]
key = "value"
#!end_a-b
```

```json
{
  "blocks": [],
  "errors": [{
    "code": "INVALID_BLOCK_ID",
    "line": 1,
    "column": 30,
    "length": 3,
    "blockId": null,
    "content": "#!nesl [@three-char-SHA-256: a-b]",
    "context": "#!nesl [@three-char-SHA-256: a-b]\nkey = \"value\"\n#!end_a-b",
    "message": "Block ID must contain only alphanumeric characters"
  }]
}
```

### 030-no-comments-variations

```sh nesl
#!nesl [@three-char-SHA-256: ncm]
//not a comment without space
// not a comment with space
key = "value" // inline not allowed
#!end_ncm
```

```json
{
  "blocks": [{
    "id": "ncm",
    "properties": {
      "key": "value"
    },
    "startLine": 1,
    "endLine": 5
  }],
  "errors": [{
    "code": "MALFORMED_ASSIGNMENT",
    "line": 2,
    "column": 1,
    "length": 29,
    "blockId": "ncm",
    "content": "//not a comment without space",
    "context": "#!nesl [@three-char-SHA-256: ncm]\n//not a comment without space\n// not a comment with space\nkey = \"value\" // inline not allowed\n#!end_ncm",
    "message": "Invalid line format in block 'ncm': not a valid key-value assignment or empty line"
  }, {
    "code": "MALFORMED_ASSIGNMENT",
    "line": 3,
    "column": 1,
    "length": 27,
    "blockId": "ncm",
    "content": "// not a comment with space",
    "context": "#!nesl [@three-char-SHA-256: ncm]\n//not a comment without space\n// not a comment with space\nkey = \"value\" // inline not allowed\n#!end_ncm",
    "message": "Invalid line format in block 'ncm': not a valid key-value assignment or empty line"
  }, {
    "code": "TRAILING_CONTENT",
    "line": 4,
    "column": 15,
    "length": 21,
    "blockId": "ncm",
    "content": "key = \"value\" // inline not allowed",
    "context": "#!nesl [@three-char-SHA-256: ncm]\n//not a comment without space\n// not a comment with space\nkey = \"value\" // inline not allowed\n#!end_ncm",
    "message": "Unexpected content after quoted value"
  }]
}
```

### 031-heredoc-with-end-marker

```sh nesl
#!nesl [@three-char-SHA-256: abc]
content = <<'EOT_abc'
Some content here
#!end_abc
More content
EOT_abc
#!end_abc
```

```json
{
  "blocks": [{
    "id": "abc",
    "properties": {
      "content": "Some content here\n#!end_abc\nMore content"
    },
    "startLine": 1,
    "endLine": 7
  }],
  "errors": []
}
```

### 032-emoji-in-keys

```sh nesl
#!nesl [@three-char-SHA-256: emj]
😀_key = "emoji at start"
key_😀 = "emoji at end"
normal = "control case"
#!end_emj
```

```json
{
  "blocks": [{
    "id": "emj",
    "properties": {
      "normal": "control case"
    },
    "startLine": 1,
    "endLine": 5
  }],
  "errors": [{
    "code": "INVALID_KEY",
    "line": 2,
    "column": 1,
    "length": 6,
    "blockId": "emj",
    "content": "😀_key = \"emoji at start\"",
    "context": "#!nesl [@three-char-SHA-256: emj]\n😀_key = \"emoji at start\"\nkey_😀 = \"emoji at end\"\nnormal = \"control case\"\n#!end_emj",
    "message": "Key contains invalid character '😀' at position 1"
  }, {
    "code": "INVALID_KEY",
    "line": 3,
    "column": 1,
    "length": 6,
    "blockId": "emj",
    "content": "key_😀 = \"emoji at end\"",
    "context": "#!nesl [@three-char-SHA-256: emj]\n😀_key = \"emoji at start\"\nkey_😀 = \"emoji at end\"\nnormal = \"control case\"\n#!end_emj",
    "message": "Key contains invalid character '😀' at position 5"
  }]
}
```

### 033-surrogate-pairs-in-values

```sh nesl
#!nesl [@three-char-SHA-256: spv]
emoji = "👨‍👩‍👧‍👦"
mathematical = "𝐀𝐁𝐂"
content = <<'EOT_spv'
Emoji: 👍🏽
Math: 𝕏 = 𝕐
EOT_spv
#!end_spv
```

```json
{
  "blocks": [{
    "id": "spv",
    "properties": {
      "emoji": "👨‍👩‍👧‍👦",
      "mathematical": "𝐀𝐁𝐂",
      "content": "Emoji: 👍🏽\nMath: 𝕏 = 𝕐"
    },
    "startLine": 1,
    "endLine": 8
  }],
  "errors": []
}
```

### 034-utf8-replacement-chars

```sh nesl
#!nesl [@three-char-SHA-256: rep]
key = "contains � replacement"
�_invalid = "key with replacement"
content = <<'EOT_rep'
Line with � char
EOT_rep
#!end_rep
```

```json
{
  "blocks": [{
    "id": "rep",
    "properties": {
      "key": "contains � replacement",
      "content": "Line with � char"
    },
    "startLine": 1,
    "endLine": 7
  }],
  "errors": [{
    "code": "INVALID_KEY",
    "line": 3,
    "column": 1,
    "length": 9,
    "blockId": "rep",
    "content": "�_invalid = \"key with replacement\"",
    "context": "#!nesl [@three-char-SHA-256: rep]\nkey = \"contains � replacement\"\n�_invalid = \"key with replacement\"\ncontent = <<'EOT_rep'\nLine with � char",
    "message": "Key contains invalid character '�' at position 1"
  }]
}
```

### 035-malformed-utf8-in-header

```sh nesl
#!nesl [@three-char-SHA-256: �bc]
key = "value"
#!end_�bc
```

```json
{
  "blocks": [],
  "errors": [{
    "code": "INVALID_BLOCK_ID",
    "line": 1,
    "column": 30,
    "length": 3,
    "blockId": null,
    "content": "#!nesl [@three-char-SHA-256: �bc]",
    "context": "#!nesl [@three-char-SHA-256: �bc]\nkey = \"value\"\n#!end_�bc",
    "message": "Block ID must contain only alphanumeric characters"
  }]
}
```

### 036-multiple-blocks-with-text

```sh nesl
random text before nesl blocks is fine

#!nesl [@three-char-SHA-256: k7m]
action = "create_file"
path = "/tmp/hello.txt"
content = <<'EOT_k7m'
Hello world!
how are you?
EOT_k7m
#!end_k7m

random text between nesl blocks is fine

# create the hello2 file for other reasons

#!nesl [@three-char-SHA-256: h7d]
action = "create_file"
path = "/tmp/hello2.txt"
content = <<'EOT_h7d'
Hello other world!
 how are you?
EOT_h7d
#!end_h7d

random text after nesl blocks is fine
```

```json
{
  "blocks": [{
    "id": "k7m",
    "properties": {
      "action": "create_file",
      "path": "/tmp/hello.txt",
      "content": "Hello world!\nhow are you?"
    },
    "startLine": 3,
    "endLine": 10
  }, {
    "id": "h7d",
    "properties": {
      "action": "create_file",
      "path": "/tmp/hello2.txt",
      "content": "Hello other world!\n how are you?"
    },
    "startLine": 16,
    "endLine": 23
  }],
  "errors": []
}
```

### 037-multiple-blocks-no-spacing

```sh nesl
#!nesl [@three-char-SHA-256: a1b]
key1 = "value1"
#!end_a1b
#!nesl [@three-char-SHA-256: c2d]
key2 = "value2"
#!end_c2d
```

```json
{
  "blocks": [{
    "id": "a1b",
    "properties": {
      "key1": "value1"
    },
    "startLine": 1,
    "endLine": 3
  }, {
    "id": "c2d",
    "properties": {
      "key2": "value2"
    },
    "startLine": 4,
    "endLine": 6
  }],
  "errors": []
}
```

### 038-text-looks-like-nesl

```sh nesl
This line mentions #!nesl but isn't a header

#!nesl [@three-char-SHA-256: tst]
doc = <<'EOT_tst'
Example of #!nesl [@three-char-SHA-256: fake]
And #!end_fake
EOT_tst
#!end_tst

More text with #!end_xyz that isn't real
```

```json
{
  "blocks": [{
    "id": "tst",
    "properties": {
      "doc": "Example of #!nesl [@three-char-SHA-256: fake]\nAnd #!end_fake"
    },
    "startLine": 3,
    "endLine": 8
  }],
  "errors": []
}
```