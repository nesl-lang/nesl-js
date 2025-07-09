______________________________ nesl-test/tests/cases/blocks/001_multiple_blocks.json
```json
[
  {
    "first": "block one"
  },
  {
    "second": "block two"
  },
  [
    "block three"
  ]
]
```
______________________________ nesl-test/tests/cases/blocks/001_multiple_blocks.nesl
```nesl
<<<<<<<<<nesl
{
  first = R"""pv(block one)pv"""
}
=========nesl

<<<<<<<<<nesl
{
  second = R"""pv(block two)pv"""
}
=========nesl

<<<<<<<<<nesl
[
  - R"""pv(block three)pv"""
]
=========nesl
```
______________________________ nesl-test/tests/cases/blocks/002_text_between_blocks.json
```json
[
  {
    "key": "value"
  },
  [
    "array item"
  ]
]
```
______________________________ nesl-test/tests/cases/blocks/002_text_between_blocks.nesl
```nesl
This text before blocks is ignored

<<<<<<<<<nesl
{
  key = R"""pv(value)pv"""
}
=========nesl

Random text between blocks
Multiple lines
Should all be ignored

<<<<<<<<<nesl
[
  - R"""pv(array item)pv"""
]
=========nesl

Even text after last block
```
______________________________ nesl-test/tests/cases/blocks/003_empty_block.json
```json
[
  {},
  []
]
```
______________________________ nesl-test/tests/cases/blocks/003_empty_block.nesl
```nesl
<<<<<<<<<nesl
{}
=========nesl

<<<<<<<<<nesl
[]
=========nesl
```
______________________________ nesl-test/tests/cases/core/001_basic_strings.json
```json
[
  {
    "message": "hello world",
    "empty": "",
    "spaces": "  leading and trailing  ",
    "unicode": "Hello 世界 🌍",
    "punctuation": "!@#$%^&*()-_=+[]{};:'\"<>,.?/~`"
  }
]
```
______________________________ nesl-test/tests/cases/core/001_basic_strings.nesl
```nesl
<<<<<<<<<nesl
{
  message = R"""pv(hello world)pv"""
  empty = R"""pv()pv"""
  spaces = R"""pv(  leading and trailing  )pv"""
  unicode = R"""pv(Hello 世界 🌍)pv"""
  punctuation = R"""pv(!@#$%^&*()-_=+[]{};:'"<>,.?/~`)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/core/002_empty_structures.json
```json
[
  {
    "empty_object": {},
    "empty_array": [],
    "empty_multiline": "",
    "nested_empties": {
      "obj": {},
      "arr": [],
      "ml": ""
    }
  }
]
```
______________________________ nesl-test/tests/cases/core/002_empty_structures.nesl
```nesl
<<<<<<<<<nesl
{
  empty_object = {}
  empty_array = []
  empty_multiline = ()
  nested_empties = {
    obj = {}
    arr = []
    ml = ()
  }
}
=========nesl
```
______________________________ nesl-test/tests/cases/core/003_simple_objects.json
```json
[
  {
    "name": "Alice",
    "age": "30",
    "is_admin": "true",
    "unicode_key_世界": "unicode value",
    "key_with_numbers123": "value123",
    "CAPS_KEY": "CAPS VALUE",
    "under_score_key": "underscore value",
    "dash-key": "dash value"
  }
]
```
______________________________ nesl-test/tests/cases/core/003_simple_objects.nesl
```nesl
<<<<<<<<<nesl
{
  name = R"""pv(Alice)pv"""
  age = R"""pv(30)pv"""
  is_admin = R"""pv(true)pv"""
  unicode_key_世界 = R"""pv(unicode value)pv"""
  key_with_numbers123 = R"""pv(value123)pv"""
  CAPS_KEY = R"""pv(CAPS VALUE)pv"""
  under_score_key = R"""pv(underscore value)pv"""
  dash-key = R"""pv(dash value)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/core/004_simple_arrays.json
```json
[
  {
    "strings": ["first", "second", "third"],
    "mixed": [
      "string value",
      {
        "type": "object",
        "nested": "yes"
      },
      ["nested", "array"]
    ],
    "single": ["only one"]
  }
]
```
______________________________ nesl-test/tests/cases/core/004_simple_arrays.nesl
```nesl
<<<<<<<<<nesl
{
  strings = [
    - R"""pv(first)pv"""
    - R"""pv(second)pv"""
    - R"""pv(third)pv"""
  ]
  mixed = [
    - R"""pv(string value)pv"""
    - {
      type = R"""pv(object)pv"""
      nested = R"""pv(yes)pv"""
    }
    - [
      - R"""pv(nested)pv"""
      - R"""pv(array)pv"""
    ]
  ]
  single = [
    - R"""pv(only one)pv"""
  ]
}
=========nesl
```
______________________________ nesl-test/tests/cases/core/005_multiline_strings.json
```json
[
  {
    "poem": "Roses are red\nViolets are blue\nNESL is great\nAnd so are you",
    "single_line_multi": "just one line in multiline block",
    "with_empty_strings": "first line\n\nthird line",
    "indented": "    four spaces\n  two spaces\n      six spaces"
  }
]
```
______________________________ nesl-test/tests/cases/core/005_multiline_strings.nesl
```nesl
<<<<<<<<<nesl
{
  poem = (
    R"""pv(Roses are red)pv"""
    R"""pv(Violets are blue)pv"""
    R"""pv(NESL is great)pv"""
    R"""pv(And so are you)pv"""
  )
  single_line_multi = (
    R"""pv(just one line in multiline block)pv"""
  )
  with_empty_strings = (
    R"""pv(first line)pv"""
    R"""pv()pv"""
    R"""pv(third line)pv"""
  )
  indented = (
    R"""pv(    four spaces)pv"""
    R"""pv(  two spaces)pv"""
    R"""pv(      six spaces)pv"""
  )
}
=========nesl
```
______________________________ nesl-test/tests/cases/core/006_nested_objects.json
```json
[
  {
    "user": {
      "name": "Alice",
      "profile": {
        "age": "30",
        "location": {
          "city": "Wonderland",
          "country": "Fiction"
        }
      }
    },
    "config": {
      "database": {
        "host": "localhost",
        "port": "5432",
        "credentials": {
          "user": "admin",
          "pass": "secret"
        }
      }
    }
  }
]
```
______________________________ nesl-test/tests/cases/core/006_nested_objects.nesl
```nesl
<<<<<<<<<nesl
{
  user = {
    name = R"""pv(Alice)pv"""
    profile = {
      age = R"""pv(30)pv"""
      location = {
        city = R"""pv(Wonderland)pv"""
        country = R"""pv(Fiction)pv"""
      }
    }
  }
  config = {
    database = {
      host = R"""pv(localhost)pv"""
      port = R"""pv(5432)pv"""
      credentials = {
        user = R"""pv(admin)pv"""
        pass = R"""pv(secret)pv"""
      }
    }
  }
}
=========nesl
```
______________________________ nesl-test/tests/cases/core/007_nested_arrays.json
```json
[
  {
    "matrix": [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"]
    ],
    "deeply_nested": [
      [
        [
          ["deep value"]
        ]
      ]
    ]
  }
]
```
______________________________ nesl-test/tests/cases/core/007_nested_arrays.nesl
```nesl
<<<<<<<<<nesl
{
  matrix = [
    - [
      - R"""pv(1)pv"""
      - R"""pv(2)pv"""
      - R"""pv(3)pv"""
    ]
    - [
      - R"""pv(4)pv"""
      - R"""pv(5)pv"""
      - R"""pv(6)pv"""
    ]
    - [
      - R"""pv(7)pv"""
      - R"""pv(8)pv"""
      - R"""pv(9)pv"""
    ]
  ]
  deeply_nested = [
    - [
      - [
        - [
          - R"""pv(deep value)pv"""
        ]
      ]
    ]
  ]
}
=========nesl
```
______________________________ nesl-test/tests/cases/core/008_mixed_nesting.json
```json
[
  {
    "data": [
      {
        "id": "1",
        "items": ["item1", "item2"],
        "description": "First object\nwith multiline"
      },
      {
        "id": "2",
        "nested": {
          "array_in_object": [
            {
              "deep": "value"
            }
          ]
        }
      }
    ],
    "complex": {
      "users": [
        {
          "name": "Alice",
          "roles": ["admin", "user"]
        },
        {
          "name": "Bob",
          "bio": "Software engineer\nCoffee enthusiast"
        }
      ]
    }
  }
]
```
______________________________ nesl-test/tests/cases/core/008_mixed_nesting.nesl
```nesl
<<<<<<<<<nesl
{
  data = [
    - {
      id = R"""pv(1)pv"""
      items = [
        - R"""pv(item1)pv"""
        - R"""pv(item2)pv"""
      ]
      description = (
        R"""pv(First object)pv"""
        R"""pv(with multiline)pv"""
      )
    }
    - {
      id = R"""pv(2)pv"""
      nested = {
        array_in_object = [
          - {
            deep = R"""pv(value)pv"""
          }
        ]
      }
    }
  ]
  complex = {
    users = [
      - {
        name = R"""pv(Alice)pv"""
        roles = [
          - R"""pv(admin)pv"""
          - R"""pv(user)pv"""
        ]
      }
      - {
        name = R"""pv(Bob)pv"""
        bio = (
          R"""pv(Software engineer)pv"""
          R"""pv(Coffee enthusiast)pv"""
        )
      }
    ]
  }
}
=========nesl
```
______________________________ nesl-test/tests/cases/custom-syntax/001_custom_delimiters.json
```json
[
  {
    "key": "value",
    "nested": {
      "inner": "custom markers work"
    }
  }
]
```
______________________________ nesl-test/tests/cases/custom-syntax/001_custom_delimiters.nesl
```nesl
<<<START>>>
{
  key = %%%[value]%%%
  nested = {
    inner = %%%[custom markers work]%%%
  }
}
===END===
```
______________________________ nesl-test/tests/cases/custom-syntax/002_delimiter_collision.json
```json
[
  {
    "normal": "simple text",
    "contains_delimiter": "has ]%%% in middle",
    "multiple": "text ]%%% more ]%%% end"
  }
]
```
______________________________ nesl-test/tests/cases/custom-syntax/002_delimiter_collision.nesl
```nesl
<<<START>>>
{
  normal = %%%[simple text]%%%
  contains_delimiter = %%%[has ]%%% in middle]%%%
  multiple = %%%[text ]%%% more ]%%% end]%%%
}
===END===
```
______________________________ nesl-test/tests/cases/edge-cases/001_string_with_delimiter.json
```json
[
  {
    "simple": "contains )pv\"\"\" in the middle",
    "multiple": "has )pv\"\"\" and also R\"\"\"pv( patterns",
    "at_start": ")pv\"\"\" at the beginning",
    "at_end": "ends with )pv\"\"\"",
    "nested_looking": "R\"\"\"pv(not actually nested)pv\"\"\"",
    "tricky": "multiple )pv\"\"\" and )pv\"\"\" and even )pv\"\"\" patterns"
  }
]
```
______________________________ nesl-test/tests/cases/edge-cases/001_string_with_delimiter.nesl
```nesl
<<<<<<<<<nesl
{
  simple = R"""pv(contains )pv""" in the middle)pv"""
  multiple = R"""pv(has )pv""" and also R"""pv( patterns)pv"""
  at_start = R"""pv()pv""" at the beginning)pv"""
  at_end = R"""pv(ends with )pv""")pv"""
  nested_looking = R"""pv(R"""pv(not actually nested)pv""")pv"""
  tricky = R"""pv(multiple )pv""" and )pv""" and even )pv""" patterns)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/edge-cases/002_unicode_keys.json
```json
[
  {
    "简体中文": "Simplified Chinese",
    "日本語": "Japanese",
    "한국어": "Korean",
    "العربية": "Arabic",
    "עברית": "Hebrew",
    "Ελληνικά": "Greek",
    "Русский": "Russian",
    "emoji_🚀": "rocket",
    "mixed_abc_123_世界": "mixed scripts",
    "café": "accented"
  }
]
```
______________________________ nesl-test/tests/cases/edge-cases/002_unicode_keys.nesl
```nesl
<<<<<<<<<nesl
{
  简体中文 = R"""pv(Simplified Chinese)pv"""
  日本語 = R"""pv(Japanese)pv"""
  한국어 = R"""pv(Korean)pv"""
  العربية = R"""pv(Arabic)pv"""
  עברית = R"""pv(Hebrew)pv"""
  Ελληνικά = R"""pv(Greek)pv"""
  Русский = R"""pv(Russian)pv"""
  emoji_🚀 = R"""pv(rocket)pv"""
  mixed_abc_123_世界 = R"""pv(mixed scripts)pv"""
  café = R"""pv(accented)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/edge-cases/003_unicode_values.json
```json
[
  {
    "chinese": "你好世界",
    "japanese": "こんにちは世界",
    "arabic": "مرحبا بالعالم",
    "emoji": "🌍🌎🌏",
    "emoji_text": "Hello 👋 World 🌍!",
    "math": "∀x∈ℝ: x²≥0",
    "arrows": "←↑→↓↔↕",
    "box_drawing": "┌─┬─┐│ ││ │├─┼─┤└─┴─┘",
    "zero_width": "a​b",
    "combining": "é = e + ́"
  }
]
```
______________________________ nesl-test/tests/cases/edge-cases/003_unicode_values.nesl
```nesl
<<<<<<<<<nesl
{
  chinese = R"""pv(你好世界)pv"""
  japanese = R"""pv(こんにちは世界)pv"""
  arabic = R"""pv(مرحبا بالعالم)pv"""
  emoji = R"""pv(🌍🌎🌏)pv"""
  emoji_text = R"""pv(Hello 👋 World 🌍!)pv"""
  math = R"""pv(∀x∈ℝ: x²≥0)pv"""
  arrows = R"""pv(←↑→↓↔↕)pv"""
  box_drawing = R"""pv(┌─┬─┐│ ││ │├─┼─┤└─┴─┘)pv"""
  zero_width = R"""pv(a​b)pv"""
  combining = R"""pv(é = e + ́)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/edge-cases/004_whitespace_preservation.json
```json
[
  {
    "tabs": "\tstart\tmiddle\tend\t",
    "spaces": "    four spaces",
    "mixed": " \tmix of  spaces\t\tand tabs\t ",
    "newline_escape": "has\\nnewline",
    "carriage_return": "has\\rcarriage",
    "vertical_tab": "has\\vvertical",
    "multiline_indent": "    line 1\n  line 2\n      line 3\n\ttab line",
    "trailing": "trailing spaces    ",
    "only_spaces": "     "
  }
]
```
______________________________ nesl-test/tests/cases/edge-cases/004_whitespace_preservation.nesl
```nesl
<<<<<<<<<nesl
{
  tabs = R"""pv(	start	middle	end	)pv"""
  spaces = R"""pv(    four spaces)pv"""
  mixed = R"""pv( 	mix of  spaces		and tabs	 )pv"""
  newline_escape = R"""pv(has\nnewline)pv"""
  carriage_return = R"""pv(has\rcarriage)pv"""
  vertical_tab = R"""pv(has\vvertical)pv"""
  multiline_indent = (
    R"""pv(    line 1)pv"""
    R"""pv(  line 2)pv"""
    R"""pv(      line 3)pv"""
    R"""pv(	tab line)pv"""
  )
  trailing = R"""pv(trailing spaces    )pv"""
  only_spaces = R"""pv(     )pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/edge-cases/005_duplicate_keys.json
```json
[
  {
    "key": "fourth value",
    "nested": {
      "dup": "inner second"
    },
    "array": [
      {
        "same": "array second"
      }
    ]
  }
]
```
______________________________ nesl-test/tests/cases/edge-cases/005_duplicate_keys.nesl
```nesl
<<<<<<<<<nesl
{
  key = R"""pv(first value)pv"""
  key = R"""pv(second value)pv"""
  key = R"""pv(third value)pv"""
  nested = {
    dup = R"""pv(inner first)pv"""
    dup = R"""pv(inner second)pv"""
  }
  array = [
    - {
      same = R"""pv(array first)pv"""
      same = R"""pv(array second)pv"""
    }
  ]
  key = R"""pv(fourth value)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/edge-cases/006_deeply_nested_structures.json
```json
[
  {
    "level1": {
      "level2": {
        "level3": {
          "level4": {
            "level5": {
              "level6": "deep value",
              "array5": [
                [
                  [
                    "deep array"
                  ]
                ]
              ]
            }
          }
        }
      }
    },
    "mixed_deep": [
      {
        "a": [
          {
            "b": [
              {
                "c": "line 1\nline 2"
              }
            ]
          }
        ]
      }
    ]
  }
]
```
______________________________ nesl-test/tests/cases/edge-cases/006_deeply_nested_structures.nesl
```nesl
<<<<<<<<<nesl
{
  level1 = {
    level2 = {
      level3 = {
        level4 = {
          level5 = {
            level6 = R"""pv(deep value)pv"""
            array5 = [
              - [
                - [
                  - R"""pv(deep array)pv"""
                ]
              ]
            ]
          }
        }
      }
    }
  }
  mixed_deep = [
    - {
      a = [
        - {
          b = [
            - {
              c = (
                R"""pv(line 1)pv"""
                R"""pv(line 2)pv"""
              )
            }
          ]
        }
      ]
    }
  ]
}
=========nesl
```
______________________________ nesl-test/tests/cases/edge-cases/007_whitespace_only_multiline.json
```json
[
  {
    "poem": "First line\nAfter blank line\n\nAfter empty string",
    "mixed_empty": "Start\n\n\nEnd",
    "tabs_spaces": "Line 1\nAfter tab line\nAfter space line"
  }
]
```
______________________________ nesl-test/tests/cases/edge-cases/007_whitespace_only_multiline.nesl
```nesl
<<<<<<<<<nesl
{
  poem = (
    R"""pv(First line)pv"""
    
    R"""pv(After blank line)pv"""
    R"""pv()pv"""
    R"""pv(After empty string)pv"""
  )
  mixed_empty = (
    R"""pv(Start)pv"""
    R"""pv()pv"""
    
    R"""pv()pv"""
    R"""pv(End)pv"""
  )
  tabs_spaces = (
    R"""pv(Line 1)pv"""
    	
    R"""pv(After tab line)pv"""
        
    R"""pv(After space line)pv"""
  )
}
=========nesl
```
______________________________ nesl-test/tests/cases/edge-cases/008_multiple_delimiters_one_line.json
```json
[
  {
    "multiple_markers": "first)pv\"\"\" R\"\"\"pv(second",
    "triple": "one)pv\"\"\" R\"\"\"pv(two)pv\"\"\" R\"\"\"pv(three",
    "nested_appearance": "has R\"\"\"pv(fake)pv\"\"\" inside",
    "many_endings": "text)pv\"\"\")pv\"\"\")pv\"\"\""
  }
]
```
______________________________ nesl-test/tests/cases/edge-cases/008_multiple_delimiters_one_line.nesl
```nesl
<<<<<<<<<nesl
{
  multiple_markers = R"""pv(first)pv""" R"""pv(second)pv"""
  triple = R"""pv(one)pv""" R"""pv(two)pv""" R"""pv(three)pv"""
  nested_appearance = R"""pv(has R"""pv(fake)pv""" inside)pv"""
  many_endings = R"""pv(text)pv""")pv""")pv""")pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/edge-cases/009_block_markers_in_content.json
```json
[
  {
    "start_marker": "contains <<<<<<<<<nesl in text",
    "end_marker": "has =========nesl inside",
    "both": "<<<<<<<<<nesl and =========nesl together",
    "multiline": "<<<<<<<<<nesl\nsome content\n=========nesl"
  }
]
```
______________________________ nesl-test/tests/cases/edge-cases/009_block_markers_in_content.nesl
```nesl
<<<<<<<<<nesl
{
  start_marker = R"""pv(contains <<<<<<<<<nesl in text)pv"""
  end_marker = R"""pv(has =========nesl inside)pv"""
  both = R"""pv(<<<<<<<<<nesl and =========nesl together)pv"""
  multiline = (
    R"""pv(<<<<<<<<<nesl)pv"""
    R"""pv(some content)pv"""
    R"""pv(=========nesl)pv"""
  )
}
=========nesl
```
______________________________ nesl-test/tests/cases/edge-cases/010_empty_multiline_whitespace.json
```json
[
  {
    "empty": "",
    "only_blank_lines": "",
    "only_whitespace": "",
    "mixed_empty_whitespace": "\n\n"
  }
]
```
______________________________ nesl-test/tests/cases/edge-cases/010_empty_multiline_whitespace.nesl
```nesl
<<<<<<<<<nesl
{
  empty = ()
  only_blank_lines = (
    
    
  )
  only_whitespace = (
        
    	
      
  )
  mixed_empty_whitespace = (
    
    R"""pv()pv"""
        
    R"""pv()pv"""
    	
  )
}
=========nesl
```
______________________________ nesl-test/tests/cases/errors/001_unterminated_string.json
```json
{
  "errors": [
    {
      "line": 4,
      "code": "string_unterminated",
      "message": "String literal starting with R\"\"\"pv( was not closed with )pv\"\"\" on the same line",
      "content": "  bad = R\"\"\"pv(this string never ends",
      "context": "  good = R\"\"\"pv(this is fine)pv\"\"\"\n  bad = R\"\"\"pv(this string never ends\n  another = R\"\"\"pv(unreachable)pv\"\"\""
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/001_unterminated_string.nesl
```nesl
<<<<<<<<<nesl
{
  good = R"""pv(this is fine)pv"""
  bad = R"""pv(this string never ends
  another = R"""pv(unreachable)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/errors/002_delimiter_mismatch.json
```json
{
  "errors": [
    {
      "line": 5,
      "code": "delimiter_mismatch",
      "message": "Expected } but found ]",
      "content": "  ]",
      "context": "    key = R\"\"\"pv(value)pv\"\"\"\n  ]\n}"
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/002_delimiter_mismatch.nesl
```nesl
<<<<<<<<<nesl
{
  obj = {
    key = R"""pv(value)pv"""
  ]
}
=========nesl
```
______________________________ nesl-test/tests/cases/errors/003_invalid_context.json
```json
{
  "errors": [
    {
      "line": 5,
      "code": "invalid_context",
      "message": "Assignment syntax not allowed in array context",
      "content": "    invalid = R\"\"\"pv(assignment in array)pv\"\"\"",
      "context": "    - R\"\"\"pv(valid item)pv\"\"\"\n    invalid = R\"\"\"pv(assignment in array)pv\"\"\"\n    - R\"\"\"pv(another item)pv\"\"\""
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/003_invalid_context.nesl
```nesl
<<<<<<<<<nesl
{
  arr = [
    - R"""pv(valid item)pv"""
    invalid = R"""pv(assignment in array)pv"""
    - R"""pv(another item)pv"""
  ]
}
=========nesl
```
______________________________ nesl-test/tests/cases/errors/004_invalid_key.json
```json
{
  "errors": [
    {
      "line": 4,
      "code": "invalid_key",
      "message": "Key contains invalid characters (whitespace)",
      "content": "  bad key = R\"\"\"pv(space in key)pv\"\"\"",
      "context": "  good_key = R\"\"\"pv(valid)pv\"\"\"\n  bad key = R\"\"\"pv(space in key)pv\"\"\"\n  another = R\"\"\"pv(ok)pv\"\"\""
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/004_invalid_key.nesl
```nesl
<<<<<<<<<nesl
{
  good_key = R"""pv(valid)pv"""
  bad key = R"""pv(space in key)pv"""
  another = R"""pv(ok)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/errors/005_content_after_string.json
```json
{
  "errors": [
    {
      "line": 4,
      "code": "content_after_string",
      "message": "Non-whitespace content found after string literal closing delimiter",
      "content": "  bad = R\"\"\"pv(string)pv\"\"\" extra content here",
      "context": "  good = R\"\"\"pv(normal string)pv\"\"\"\n  bad = R\"\"\"pv(string)pv\"\"\" extra content here\n  another = R\"\"\"pv(ok)pv\"\"\""
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/005_content_after_string.nesl
```nesl
<<<<<<<<<nesl
{
  good = R"""pv(normal string)pv"""
  bad = R"""pv(string)pv""" extra content here
  another = R"""pv(ok)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/errors/006_missing_block_wrapper.json
```json
{
  "errors": [
    {
      "line": 1,
      "code": "missing_block_wrapper",
      "message": "NESL content must be wrapped in <<<<<<<<<nesl ... =========nesl blocks",
      "content": "{",
      "context": "{\n  key = R\"\"\"pv(no block wrapper)pv\"\"\"\n}"
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/006_missing_block_wrapper.nesl
```nesl
{
  key = R"""pv(no block wrapper)pv"""
}
```
______________________________ nesl-test/tests/cases/errors/007_content_between_closing_and_block_end.json
```json
{
  "errors": [
    {
      "line": 5,
      "code": "content_between_closing_and_block_end",
      "message": "No content allowed between closing delimiter } and =========nesl",
      "content": "some content here",
      "context": "}\nsome content here\n=========nesl"
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/007_content_between_closing_and_block_end.nesl
```nesl
<<<<<<<<<nesl
{
  key = R"""pv(value)pv"""
}
some content here
=========nesl
```
______________________________ nesl-test/tests/cases/errors/008_unclosed_structure.json
```json
{
  "errors": [
    {
      "line": 7,
      "code": "unclosed_structure",
      "message": "Expected } but found =========nesl (unclosed object)",
      "content": "=========nesl",
      "context": "      item = R\"\"\"pv(never closed)pv\"\"\"\n}\n=========nesl"
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/008_unclosed_structure.nesl
```nesl
<<<<<<<<<nesl
{
  nested = {
    key = R"""pv(value)pv"""
    deep = {
      item = R"""pv(never closed)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/errors/009_bare_string_in_object.json
```json
{
  "errors": [
    {
      "line": 4,
      "code": "invalid_context",
      "message": "String literal not allowed without assignment in object context",
      "content": "  R\"\"\"pv(orphan string without assignment)pv\"\"\"",
      "context": "  key = R\"\"\"pv(valid)pv\"\"\"\n  R\"\"\"pv(orphan string without assignment)pv\"\"\"\n  another = R\"\"\"pv(ok)pv\"\"\""
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/009_bare_string_in_object.nesl
```nesl
<<<<<<<<<nesl
{
  key = R"""pv(valid)pv"""
  R"""pv(orphan string without assignment)pv"""
  another = R"""pv(ok)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/errors/010_dash_in_object.json
```json
{
  "errors": [
    {
      "line": 4,
      "code": "invalid_context",
      "message": "Array element syntax not allowed in object context",
      "content": "  - R\"\"\"pv(not allowed)pv\"\"\"",
      "context": "  key = R\"\"\"pv(valid)pv\"\"\"\n  - R\"\"\"pv(not allowed)pv\"\"\"\n  another = R\"\"\"pv(ok)pv\"\"\""
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/010_dash_in_object.nesl
```nesl
<<<<<<<<<nesl
{
  key = R"""pv(valid)pv"""
  - R"""pv(not allowed)pv"""
  another = R"""pv(ok)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/errors/011_eof_mid_structure.json
```json
{
  "errors": [
    {
      "line": 6,
      "code": "eof_unexpected",
      "message": "Unexpected end of file (expected closing delimiter for object)",
      "content": "",
      "context": "  nested = {\n    item = R\"\"\"pv(incomplete)pv\"\"\"\n"
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/011_eof_mid_structure.nesl
```nesl
<<<<<<<<<nesl
{
  key = R"""pv(value)pv"""
  nested = {
    item = R"""pv(incomplete)pv"""
```
______________________________ nesl-test/tests/cases/errors/012_delimiter_in_multiline.json
```json
{
  "errors": [
    {
      "line": 5,
      "code": "invalid_context",
      "message": "Only string literals allowed in multiline context",
      "content": "    {",
      "context": "  multiline = (\n    R\"\"\"pv(first line)pv\"\"\"\n    {"
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/012_delimiter_in_multiline.nesl
```nesl
<<<<<<<<<nesl
{
  multiline = (
    R"""pv(first line)pv"""
    {
    R"""pv(second line)pv"""
  )
}
=========nesl
```
______________________________ nesl-test/tests/cases/errors/013_equals_in_key.json
```json
{
  "errors": [
    {
      "line": 4,
      "code": "invalid_key",
      "message": "Key contains invalid characters (equals sign)",
      "content": "  bad=key = R\"\"\"pv(equals in key name)pv\"\"\"",
      "context": "  valid_key = R\"\"\"pv(this is fine)pv\"\"\"\n  bad=key = R\"\"\"pv(equals in key name)pv\"\"\"\n  another = R\"\"\"pv(also valid)pv\"\"\""
    }
  ]
}
```
______________________________ nesl-test/tests/cases/errors/013_equals_in_key.nesl
```nesl
<<<<<<<<<nesl
{
  valid_key = R"""pv(this is fine)pv"""
  bad=key = R"""pv(equals in key name)pv"""
  another = R"""pv(also valid)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/recovery/001_multiple_syntax_errors.json
```json
{
  "errors": [
    {
      "line": 4,
      "code": "invalid_key",
      "message": "Key contains invalid characters (whitespace)",
      "content": "  bad key = R\"\"\"pv(space in key)pv\"\"\"",
      "context": "  valid1 = R\"\"\"pv(before errors)pv\"\"\"\n  bad key = R\"\"\"pv(space in key)pv\"\"\"\n  R\"\"\"pv(orphan string)pv\"\"\""
    },
    {
      "line": 5,
      "code": "invalid_context",
      "message": "String literal not allowed without assignment in object context",
      "content": "  R\"\"\"pv(orphan string)pv\"\"\"",
      "context": "  bad key = R\"\"\"pv(space in key)pv\"\"\"\n  R\"\"\"pv(orphan string)pv\"\"\"\n  unterminated = R\"\"\"pv(missing end"
    },
    {
      "line": 6,
      "code": "string_unterminated",
      "message": "String literal starting with R\"\"\"pv( was not closed with )pv\"\"\" on the same line",
      "content": "  unterminated = R\"\"\"pv(missing end",
      "context": "  R\"\"\"pv(orphan string)pv\"\"\"\n  unterminated = R\"\"\"pv(missing end\n  content_after = R\"\"\"pv(ok)pv\"\"\" extra stuff"
    },
    {
      "line": 7,
      "code": "content_after_string",
      "message": "Non-whitespace content found after string literal closing delimiter",
      "content": "  content_after = R\"\"\"pv(ok)pv\"\"\" extra stuff",
      "context": "  unterminated = R\"\"\"pv(missing end\n  content_after = R\"\"\"pv(ok)pv\"\"\" extra stuff\n  valid2 = R\"\"\"pv(after errors)pv\"\"\""
    }
  ]
}
```
______________________________ nesl-test/tests/cases/recovery/001_multiple_syntax_errors.nesl
```nesl
<<<<<<<<<nesl
{
  valid1 = R"""pv(before errors)pv"""
  bad key = R"""pv(space in key)pv"""
  R"""pv(orphan string)pv"""
  unterminated = R"""pv(missing end
  content_after = R"""pv(ok)pv""" extra stuff
  valid2 = R"""pv(after errors)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/recovery/002_fatal_vs_recoverable.json
```json
{
  "errors": [
    {
      "line": 7,
      "code": "delimiter_mismatch",
      "message": "Expected } but found ]",
      "content": "  ]",
      "context": "    bad = R\"\"\"pv(unclosed\n  ]\n  after = R\"\"\"pv(unreachable due to mismatch)pv\"\"\""
    }
  ]
}
```
______________________________ nesl-test/tests/cases/recovery/002_fatal_vs_recoverable.nesl
```nesl
<<<<<<<<<nesl
{
  before = R"""pv(parsed)pv"""
  nested = {
    inner = R"""pv(ok)pv"""
    bad = R"""pv(unclosed
  ]
  after = R"""pv(unreachable due to mismatch)pv"""
}
=========nesl
```
______________________________ nesl-test/tests/cases/recovery/003_context_errors.json
```json
{
  "errors": [
    {
      "line": 5,
      "code": "invalid_context",
      "message": "Assignment syntax not allowed in array context",
      "content": "    key = R\"\"\"pv(assignment in array)pv\"\"\"",
      "context": "    - R\"\"\"pv(valid)pv\"\"\"\n    key = R\"\"\"pv(assignment in array)pv\"\"\"\n    - R\"\"\"pv(valid after error)pv\"\"\""
    },
    {
      "line": 10,
      "code": "invalid_context",
      "message": "Only string literals allowed in multiline context",
      "content": "    {",
      "context": "    R\"\"\"pv(line 1)pv\"\"\"\n    {\n    R\"\"\"pv(line 2)pv\"\"\""
    },
    {
      "line": 12,
      "code": "invalid_context",
      "message": "Only string literals allowed in multiline context",
      "content": "    - R\"\"\"pv(dash in multiline)pv\"\"\"",
      "context": "    R\"\"\"pv(line 2)pv\"\"\"\n    - R\"\"\"pv(dash in multiline)pv\"\"\"\n  )"
    }
  ]
}
```
______________________________ nesl-test/tests/cases/recovery/003_context_errors.nesl
```nesl
<<<<<<<<<nesl
{
  array = [
    - R"""pv(valid)pv"""
    key = R"""pv(assignment in array)pv"""
    - R"""pv(valid after error)pv"""
  ]
  multiline = (
    R"""pv(line 1)pv"""
    {
    R"""pv(line 2)pv"""
    - R"""pv(dash in multiline)pv"""
  )
}
=========nesl
```
