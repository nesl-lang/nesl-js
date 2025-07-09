#  



# udpate and keep writing tests for block-parser


Block Parser Unit Test Structure
nesl-test/tests/unit/block-parser/

basics/
  001_empty_object.nesl/json
  002_empty_array.nesl/json  
  003_empty_multiline.nesl/json
  004_single_key.nesl/json
  005_multiple_keys.nesl/json
  006_single_element_array.nesl/json
  007_multiple_elements_array.nesl/json
  008_single_line_multiline.nesl/json
  009_multiple_lines_multiline.nesl/json

nesting/
  001_object_in_object.nesl/json
  002_array_in_object.nesl/json
  003_multiline_in_object.nesl/json
  004_object_in_array.nesl/json
  005_array_in_array.nesl/json
  006_mixed_deep_nesting.nesl/json
  007_max_nesting_depth.nesl/json
  008_max_nesting_exceeded.nesl/json

state-errors/
  001_bare_string_in_object.nesl/json
  002_assignment_in_array.nesl/json
  003_dash_in_object.nesl/json
  004_delimiter_in_multiline.nesl/json
  005_wrong_closing_delimiter.nesl/json
  006_empty_assignment.nesl/json

recovery/
  001_invalid_key_recovery.nesl/json
  002_multiple_errors_recovery.nesl/json
  003_nested_error_recovery.nesl/json
  004_delimiter_mismatch_recovery.nesl/json

edge-cases/
  001_duplicate_keys.nesl/json
  002_whitespace_only_multiline.nesl/json
  003_unicode_keys.nesl/json
  004_long_key_at_limit.nesl/json
  005_key_over_limit.nesl/json
  006_custom_delimiters.nesl/json
  007_unclosed_at_eof.nesl/json
Issues:

32 test files across 5 directories
Some overlap (custom delimiters could be in basics)
Recovery vs state-errors distinction unclear for delimiter mismatches