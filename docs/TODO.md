#  enforce explicit root object only


the whole point of nesl is to make it clear and easy as possible for an LLM to communicate precise instructions to be executed by a computer....  it "might be nice" to have flexibility in root, but ultimately that would just confuse LLMs if there's variations in training data in nesl floating around the internet.... 



# update and keep writing tests for block-parser
Block Parser Unit Test Structure
nesl-test/tests/unit/block-parser/

basics/
 001_empty_object.nesl/json
 002_single_key.nesl/json
 003_multiple_keys.nesl/json
 004_array_value.nesl/json
 005_multiline_value.nesl/json
 006_mixed_values.nesl/json

structure-errors/
 001_root_array.nesl/json
 002_root_multiline.nesl/json
 003_root_string.nesl/json
 004_multiple_roots.nesl/json
 005_root_dash.nesl/json

nesting/
 001_object_in_object.nesl/json
 002_array_in_object.nesl/json
 003_multiline_in_object.nesl/json
 004_object_in_array.nesl/json
 005_array_in_array.nesl/json
 006_multiline_in_array.nesl/json
 007_mixed_deep_nesting.nesl/json
 008_max_nesting_depth.nesl/json
 009_max_nesting_exceeded.nesl/json

state-errors/
 001_bare_string_in_object.nesl/json
 002_assignment_in_array.nesl/json
 003_dash_in_object.nesl/json
 004_non_string_in_multiline.nesl/json
 005_assignment_in_multiline.nesl/json
 006_wrong_closing_delimiter.nesl/json
 007_empty_assignment.nesl/json

recovery/
 001_invalid_key_recovery.nesl/json
 002_string_error_recovery.nesl/json
 003_nested_error_recovery.nesl/json
 004_delimiter_mismatch_recovery.nesl/json
 005_multiple_errors_same_object.nesl/json

edge-cases/
 001_duplicate_keys.nesl/json
 002_whitespace_only_multiline.nesl/json
 003_unicode_keys.nesl/json
 004_long_key_at_limit.nesl/json
 005_key_over_limit.nesl/json
 006_custom_delimiters.nesl/json
 007_unclosed_at_eof.nesl/json

Notes:
- Root object requirement enforced - error code: `root_must_be_object`
- New structure-errors/ directory for root-level constraint violations

remember: 5 lines of "context" per json error object!

from arch doc:

Universal 5-line context window for all errors.

Context generation follows a 5-line window approach. The error line appears at line 3 (center) when possible, with 2 lines before and 2 lines after. Near input boundaries, the window shifts to maintain 5 lines total - errors on line 1-2 show lines 1-5, errors near EOF show the last 5 lines. For inputs shorter than 5 lines, the entire input serves as context. EOF errors, having no specific line, display the final 5 lines of input. Windows clamp to file/block boundaries.

also:

line numbers are FILE-based.  (not block-based)