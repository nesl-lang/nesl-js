=== PROCESSED: 2025-07-16 02:25:23 ===
SUCCESS Block 1: Updated /Users/stuart/repos/nesl-lang/nesl-js/sham21/sham-parser-js/sham-shared/sham-test/integration.md
SUCCESS Block 2: Updated /Users/stuart/repos/nesl-lang/nesl-js/sham21/sham-parser-js/sham-shared/sham-test/integration.md
===

Looking at the TODO.md analysis, UTF-8 validation tests would verify that the parser properly rejects files containing invalid UTF-8 byte sequences. This is a spec requirement that's currently unimplemented.

## What UTF-8 validation tests would look like:

UTF-8 has specific byte patterns that are invalid:
- Overlong encodings (e.g., using 2 bytes to encode ASCII)
- Invalid continuation bytes (e.g., 0x80-0xBF appearing outside multibyte sequences)
- Surrogate pair code points (0xD800-0xDFFF) encoded in UTF-8
- Code points beyond U+10FFFF
- Truncated multibyte sequences

However, **there's a fundamental issue**: JavaScript strings are already UTF-16, not raw bytes. By the time `parseSHAM` receives a string, any UTF-8 decoding has already happened. The browser/Node.js runtime would have either:
1. Successfully decoded valid UTF-8 into a JavaScript string
2. Replaced invalid sequences with � (U+FFFD) 
3. Thrown an error before our parser runs

So these tests would need to either:
- Accept Buffer/Uint8Array input instead of strings
- Test for replacement characters (�) in the input
- Be integration tests that read actual files with bad UTF-8

Given the current architecture accepts strings, the most practical approach is to add tests that check for the replacement character (�) which indicates UTF-8 decoding issues occurred upstream.

## Test implementation approach:

```
<<<EXPLANATION>>>
Add UTF-8 validation tests to the integration test suite. These tests will check for the presence of replacement characters (U+FFFD) which indicate invalid UTF-8 was encountered during string decoding.
<<<FILE>>>
sham-shared/sham-test/integration.md
<<<SEARCH>>>
### 033-surrogate-pairs-in-values

```sh sham
#!SHAM [@three-char-SHA-256: spv]
emoji = "👨‍👩‍👧‍👦"
mathematical = "𝐀𝐁𝐂"
content = <<'EOT_SHAM_spv'
Emoji: 👍🏽
Math: 𝕏 = 𝕐
EOT_SHAM_spv
#!END_SHAM_spv
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
<<<REPLACE>>>
### 033-surrogate-pairs-in-values

```sh sham
#!SHAM [@three-char-SHA-256: spv]
emoji = "👨‍👩‍👧‍👦"
mathematical = "𝐀𝐁𝐂"
content = <<'EOT_SHAM_spv'
Emoji: 👍🏽
Math: 𝕏 = 𝕐
EOT_SHAM_spv
#!END_SHAM_spv
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

```sh sham
#!SHAM [@three-char-SHA-256: rep]
key = "contains � replacement"
�_invalid = "key with replacement"
content = <<'EOT_SHAM_rep'
Line with � char
EOT_SHAM_rep
#!END_SHAM_rep
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
    "context": "#!SHAM [@three-char-SHA-256: rep]\nkey = \"contains � replacement\"\n�_invalid = \"key with replacement\"\ncontent = <<'EOT_SHAM_rep'\nLine with � char",
    "message": "Key contains invalid character '�' at position 1"
  }]
}
```

### 035-malformed-utf8-in-header

```sh sham
#!SHAM [@three-char-SHA-256: �bc]
key = "value"
#!END_SHAM_�bc
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
    "content": "#!SHAM [@three-char-SHA-256: �bc]",
    "context": "#!SHAM [@three-char-SHA-256: �bc]\nkey = \"value\"\n#!END_SHAM_�bc",
    "message": "Block ID must contain only alphanumeric characters"
  }]
}
```
<<<END>>>
```

<<<EXPLANATION>>>
Update the manifest to include the new UTF-8 validation tests
<<<FILE>>>
sham-shared/sham-test/integration.md
<<<SEARCH>>>
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
- 017-heredoc-with-sham-markers
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
<<<REPLACE>>>
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
- 017-heredoc-with-sham-markers
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
<<<END>>>
```

Note: These tests assume the UTF-8 decoding has already occurred and invalid sequences have been replaced with � (U+FFFD). To properly test raw UTF-8 validation, the parser would need to accept Buffer/Uint8Array input and perform its own UTF-8 decoding, which would be a significant architectural change.