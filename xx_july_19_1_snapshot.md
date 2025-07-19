=== START FILE: ./LICENSE ===
MIT License

Copyright (c) 2025 nesl-lang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

=== END FILE: ./LICENSE ===

=== START FILE: ./tests/file.txt ===

=== START FILE: ./unit/parseHeader.test.ts ===
import { describe, it, expect } from 'vitest';
import { parseHeader } from '../../src/parsers/parseHeader';
import testCases from '../../sham-shared/sham-test/unit/parseHeader.test.json';

describe('parseHeader', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = parseHeader(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./unit/parseHeader.test.ts ===

=== START FILE: ./unit/validateBlockId.test.ts ===
import { describe, it, expect } from 'vitest';
import { validateBlockId } from '../../src/validators/validateBlockId';
import testCases from '../../sham-shared/sham-test/unit/validateBlockId.test.json';

describe('validateBlockId', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = validateBlockId(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./unit/validateBlockId.test.ts ===

=== START FILE: ./unit/findInvalidCharPosition.test.ts ===
import { describe, it, expect } from 'vitest';
import { findInvalidCharPosition } from '../../src/validators/findInvalidCharPosition';
import testCases from '../../sham-shared/sham-test/unit/findInvalidCharPosition.test.json';

describe('findInvalidCharPosition', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = findInvalidCharPosition(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./unit/findInvalidCharPosition.test.ts ===

=== START FILE: ./unit/parseAssignment.test.ts ===
import { describe, it, expect } from 'vitest';
import { parseAssignment } from '../../src/parsers/parseAssignment';
import testCases from '../../sham-shared/sham-test/unit/parseAssignment.test.json';

describe('parseAssignment', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = parseAssignment(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./unit/parseAssignment.test.ts ===

=== START FILE: ./unit/parseEndMarker.test.ts ===
import { describe, it, expect } from 'vitest';
import { parseEndMarker } from '../../src/parsers/parseEndMarker';
import testCases from '../../sham-shared/sham-test/unit/parseEndMarker.test.json';

describe('parseEndMarker', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = parseEndMarker(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./unit/parseEndMarker.test.ts ===

=== START FILE: ./unit/validateHeredocDelimiter.test.ts ===
import { describe, it, expect } from 'vitest';
import { validateHeredocDelimiter } from '../../src/validators/validateHeredocDelimiter';
import testCases from '../../sham-shared/sham-test/unit/validateHeredocDelimiter.test.json';

describe('validateHeredocDelimiter', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = validateHeredocDelimiter(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./unit/validateHeredocDelimiter.test.ts ===

=== START FILE: ./unit/classifyLine.test.ts ===
import { describe, it, expect } from 'vitest';
import { classifyLine } from '../../src/utils/classifyLine';
import testCases from '../../sham-shared/sham-test/unit/classifyLine.test.json';

describe('classifyLine', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = classifyLine(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./unit/classifyLine.test.ts ===

=== START FILE: ./unit/getContextWindow.test.ts ===
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import { getContextWindow } from '../../src/utils/getContextWindow';

const testPath = join(__dirname, '../../sham-shared/sham-test/unit/getContextWindow.test.md');
const mdContent = readFileSync(testPath, 'utf8');

const tokens = marked.lexer(mdContent);
const codeBlocks = tokens.filter(t => t.type === 'code' && t.lang === 'text');
const testNames = tokens.filter(t => t.type === 'heading' && t.depth === 3).map(t => t.text);

describe('getContextWindow', () => {
  testNames.forEach((name, i) => {
    const baseIndex = i * 3;
    it(name, () => {
      const input = codeBlocks[baseIndex].text;
      const targetLine = parseInt(codeBlocks[baseIndex + 1].text.trim());
      const expected = codeBlocks[baseIndex + 2].text;
      const result = getContextWindow(input, targetLine);
      expect(result).toEqual(expected);
    });
  });
});
=== END FILE: ./unit/getContextWindow.test.ts ===

=== START FILE: ./unit/validateKey.test.ts ===
import { describe, it, expect } from 'vitest';
import { validateKey } from '../../src/validators/validateKey';
import testCases from '../../sham-shared/sham-test/unit/validateKey.test.json';

describe('validateKey', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = validateKey(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./unit/validateKey.test.ts ===

=== START FILE: ./integration.test.ts ===
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import { parseSHAM } from '../src/parser';

const testPath = join(__dirname, '../sham-shared/sham-test/integration.md');
const mdContent = readFileSync(testPath, 'utf8');

const tokens = marked.lexer(mdContent);
const codeBlocks = tokens.filter(t => t.type === 'code');
const testNames = tokens.filter(t => t.type === 'heading' && t.depth === 3).map(t => t.text);

describe('SHAM Parser Integration Tests', () => {
  testNames.forEach((name, i) => {
    const baseIndex = i * 2;
    it(name, () => {
      const input = codeBlocks[baseIndex].text;
      const expected = JSON.parse(codeBlocks[baseIndex + 1].text);
      const result = parseSHAM(input);
      expect(result).toEqual(expected);
    });
  });
});
=== END FILE: ./integration.test.ts ===

=== END FILE: ./tests/file.txt ===

=== START FILE: ./tests/unit/parseHeader.test.ts ===
import { describe, it, expect } from 'vitest';
import { parseHeader } from '../../src/parsers/parseHeader';
import testCases from '../../sham-shared/sham-test/unit/parseHeader.test.json';

describe('parseHeader', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = parseHeader(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./tests/unit/parseHeader.test.ts ===

=== START FILE: ./tests/unit/validateBlockId.test.ts ===
import { describe, it, expect } from 'vitest';
import { validateBlockId } from '../../src/validators/validateBlockId';
import testCases from '../../sham-shared/sham-test/unit/validateBlockId.test.json';

describe('validateBlockId', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = validateBlockId(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./tests/unit/validateBlockId.test.ts ===

=== START FILE: ./tests/unit/findInvalidCharPosition.test.ts ===
import { describe, it, expect } from 'vitest';
import { findInvalidCharPosition } from '../../src/validators/findInvalidCharPosition';
import testCases from '../../sham-shared/sham-test/unit/findInvalidCharPosition.test.json';

describe('findInvalidCharPosition', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = findInvalidCharPosition(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./tests/unit/findInvalidCharPosition.test.ts ===

=== START FILE: ./tests/unit/parser.test.ts ===
import { describe, it, expect } from 'vitest';
import { parseSHAM } from '../../src/parser';
import type { ParseResult } from '../../src/types';

describe('parseSHAM unit tests', () => {
  it('should correctly parse test case 007 (heredoc-after-valid-end)', () => {
    const input = `#!SHAM [@three-char-SHA-256: col]
content = <<'EOT_SHAM_col'
This line is fine
EOT_SHAM_col
This breaks parsing
EOT_SHAM_col
#!END_SHAM_col`;

    const expected: ParseResult = {
      blocks: [{
        id: 'col',
        properties: {
          content: 'This line is fine'
        },
        startLine: 1,
        endLine: 7
      }],
      errors: [{
        code: 'MALFORMED_ASSIGNMENT',
        line: 5,
        column: 1,
        length: 19,
        blockId: 'col',
        content: 'This breaks parsing',
        context: "This line is fine\nEOT_SHAM_col\nThis breaks parsing\nEOT_SHAM_col\n#!END_SHAM_col",
        message: "Invalid line format in block 'col': not a valid key-value assignment or empty line"
      }, {
        code: 'MALFORMED_ASSIGNMENT',
        line: 6,
        column: 1,
        length: 12,
        blockId: 'col',
        content: 'EOT_SHAM_col',
        context: "This line is fine\nEOT_SHAM_col\nThis breaks parsing\nEOT_SHAM_col\n#!END_SHAM_col",
        message: "Invalid line format in block 'col': not a valid key-value assignment or empty line"
      }]
    };

    const result = parseSHAM(input);
    expect(result).toEqual(expected);
  });
});
=== END FILE: ./tests/unit/parser.test.ts ===

=== START FILE: ./tests/unit/parseAssignment.test.ts ===
import { describe, it, expect } from 'vitest';
import { parseAssignment } from '../../src/parsers/parseAssignment';
import testCases from '../../sham-shared/sham-test/unit/parseAssignment.test.json';

describe('parseAssignment', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = parseAssignment(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./tests/unit/parseAssignment.test.ts ===

=== START FILE: ./tests/unit/parseEndMarker.test.ts ===
import { describe, it, expect } from 'vitest';
import { parseEndMarker } from '../../src/parsers/parseEndMarker';
import testCases from '../../sham-shared/sham-test/unit/parseEndMarker.test.json';

describe('parseEndMarker', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = parseEndMarker(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./tests/unit/parseEndMarker.test.ts ===

=== START FILE: ./tests/unit/validateHeredocDelimiter.test.ts ===
import { describe, it, expect } from 'vitest';
import { validateHeredocDelimiter } from '../../src/validators/validateHeredocDelimiter';
import testCases from '../../sham-shared/sham-test/unit/validateHeredocDelimiter.test.json';

describe('validateHeredocDelimiter', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = validateHeredocDelimiter(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./tests/unit/validateHeredocDelimiter.test.ts ===

=== START FILE: ./tests/unit/classifyLine.test.ts ===
import { describe, it, expect } from 'vitest';
import { classifyLine } from '../../src/utils/classifyLine';
import testCases from '../../sham-shared/sham-test/unit/classifyLine.test.json';

describe('classifyLine', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = classifyLine(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./tests/unit/classifyLine.test.ts ===

=== START FILE: ./tests/unit/getContextWindow.test.ts ===
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import { getContextWindow } from '../../src/utils/getContextWindow';

const testPath = join(__dirname, '../../sham-shared/sham-test/unit/getContextWindow.test.md');
const mdContent = readFileSync(testPath, 'utf8');

const tokens = marked.lexer(mdContent);
const codeBlocks = tokens.filter(t => t.type === 'code' && t.lang === 'text');
const testNames = tokens.filter(t => t.type === 'heading' && t.depth === 3).map(t => t.text);

describe('getContextWindow', () => {
  testNames.forEach((name, i) => {
    const baseIndex = i * 3;
    it(name, () => {
      const input = codeBlocks[baseIndex].text;
      const targetLine = parseInt(codeBlocks[baseIndex + 1].text.trim());
      const expected = codeBlocks[baseIndex + 2].text;
      const result = getContextWindow(input, targetLine);
      expect(result).toEqual(expected);
    });
  });
});
=== END FILE: ./tests/unit/getContextWindow.test.ts ===

=== START FILE: ./tests/unit/validateKey.test.ts ===
import { describe, it, expect } from 'vitest';
import { validateKey } from '../../src/validators/validateKey';
import testCases from '../../sham-shared/sham-test/unit/validateKey.test.json';

describe('validateKey', () => {
  testCases.groups.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = validateKey(...test.input);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
=== END FILE: ./tests/unit/validateKey.test.ts ===

=== START FILE: ./tests/integration.test.ts ===
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import { parseSHAM } from '../src/parser';

const testPath = join(__dirname, '../sham-shared/sham-test/integration.md');



// // --- NEW DIAGNOSTIC LINE ---
// console.log('<<<<<<<<<< ATTEMPTING TO READ TEST FILE FROM THIS ABSOLUTE PATH: >>>>>>>>>>');
// console.log(testPath);
// console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');



const mdContent = readFileSync(testPath, 'utf8');

const tokens = marked.lexer(mdContent);
const codeBlocks = tokens.filter(t => t.type === 'code');
const testNames = tokens.filter(t => t.type === 'heading' && t.depth === 3).map(t => t.text);

// ... imports

describe('SHAM Parser Integration Tests', () => {
  testNames.forEach((name, i) => {
    const baseIndex = i * 2;
    it(name, () => {
      const input = codeBlocks[baseIndex].text;
      const expected = JSON.parse(codeBlocks[baseIndex + 1].text);
      const result = parseSHAM(input);

      // // --- DIAGNOSTIC LOG ---
      // // Log the content of the expected object for our specific failing test
      // if (name === '007-heredoc-after-valid-end') {
      //   console.log('--- DIAGNOSTIC: The "expected" object being used by the test:');
      //   console.log(JSON.stringify(expected, null, 2));
      //   console.log('-----------------------------------------------------------');
      // }
      // // --- END DIAGNOSTIC ---

      expect(result).toEqual(expected);
    });
  });
});

// describe('SHAM Parser Integration Tests', () => {
//   testNames.forEach((name, i) => {
//     const baseIndex = i * 2;
//     it(name, () => {
//       const input = codeBlocks[baseIndex].text;
//       const expected = JSON.parse(codeBlocks[baseIndex + 1].text);
//       const result = parseSHAM(input);
//       expect(result).toEqual(expected);
//     });
//   });
// });
=== END FILE: ./tests/integration.test.ts ===

=== START FILE: ./g ===
#!/bin/bash

# https://claude.ai/chat/523180d6-4ae8-4148-bc80-abb5149dbfa6

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide a commit message"
    echo "Usage: ./g your commit message here"
    exit 1
fi

# Combine all arguments into a single commit message
commit_message="$*"

# Execute git commands
git add .
git commit -m "$commit_message"
git push
=== END FILE: ./g ===

=== START FILE: ./docs/TODO.md ===

TODO 

- replace EOT_SHAM_... with EOT_... and replace END_SHAM_... with just END_...

that extra _SHAM_ is annoying and unnecessary

- rename sham to nesl

---> do this later.  this stuff should be in the config
=== END FILE: ./docs/TODO.md ===

=== START FILE: ./docs/cmdoutput.txt ===
stuart@Stuarts-MacBook-Pro ~/r/n/nesl-js (main)> ./fs
=== 'pwd' ===
/Users/stuart/repos/nesl-lang/nesl-js
-e 
=== sham21/ contents ('find sham21 ...') ===
sham21
sham-parser-js
- README.md
- docs
- - cmdoutput.txt
- - requirements.md
- - spec_3.md
- node_modules
- package-lock.json
- package.json
- scripts
- - generate-patterns.js
- - generate-tests.js
- sham-shared
- - config.json
- - sham-test
- - - .DS_Store
- - - integration.md
- - - unit
- - - - classifyLine.test.json
- - - - findInvalidCharPosition.test.json
- - - - getContextWindow.test.md
- - - - parseAssignment.test.json
- - - - parseEndMarker.test.json
- - - - parseHeader.test.json
- - - - validateBlockId.test.json
- - - - validateHeredocDelimiter.test.json
- - - - validateKey.test.json
- src
- - index.ts
- - parser.ts
- - parsers
- - - parseAssignment.ts
- - - parseEndMarker.ts
- - - parseHeader.ts
- - patterns.ts
- - types.ts
- - utils
- - - classifyLine.ts
- - - getContextWindow.ts
- - - getErrorPosition.ts
- - validators
- - - findInvalidCharPosition.ts
- - - validateBlockId.ts
- - - validateHeredocDelimiter.ts
- - - validateKey.ts
- tests
- - integration.test.ts
- - unit
- - - classifyLine.test.ts
- - - findInvalidCharPosition.test.ts
- - - getContextWindow.test.ts
- - - parseAssignment.test.ts
- - - parseEndMarker.test.ts
- - - parseHeader.test.ts
- - - validateBlockId.test.ts
- - - validateHeredocDelimiter.test.ts
- - - validateKey.test.ts
- tsconfig.json
sham21_3 example.md
-e 
=== 'ls -1' ===
11-hldd-2.md
LICENSE
deleteme.yaml
fs
g
old_july_11
replacer
sham21
sham21_old
studies
telts
trash
-e 
=== 'cat replacer/replacer_llm_instructions.md' ===
coding style guide:  TDD.  self documenting code.  every api  function name should make it super obvious who is doing what and why

WOL = "words or less, please"

keep the docs as lean

refactor code to make it smaller whenever possible.  DRY.

IMPORTANT:  do not generate edit instructions unless specifically asked to.  not necessary when just discussing and brainstorming

- all code functions and classes or large (10 lines of code or more?) need code comments to cocnisely and lcearly describe what they're doing and why and how

IMPORTANT: 

whenever you generate new code, use the following format.  dont just generate a standalone artifact.  when generating one or multiple new files, use the OVERWRITE pattern shown below 

For each specific edit that needs to happen, list a brief explanation for the change, list file name, and then explicitly make it clear what the target text is that need to be changed, and then the replacement text is that will replace it. Each of those blocks of text or code need to be explicit verbatim character by character Perfect matches for the intended text.  be sure to put the filenames and expalanations on their own lines for easy human reading even in output format.  like paragraph breaks before and after so thye're on their own lines even when not in code blocks.  use this format below exactly. note that the OVERWRITE style block can be used to create new files and its parent dirs.

make the search find text or code blocks as small as possible to still be unique identifiers for what needs to be changed in the underlying files 

for the file path, use as much of the path that you know of.  should be as specific as you can accurately be.  

make sure that file paths include the current main project dir

```
<<<EXPLANATION>>>
this is why the change should happen
<<<FILE>>>
package/replacer_demo_src/main.py
<<<SEARCH>>>
def old_function():
   x = 1
   y = 2
   return x + y
<<<REPLACE>>>
def new_function():
   result = 3
   return result
<<<END>>>
```

```
<<<EXPLANATION>>>
this is why this change should happen
<<<FILE>>>
july/coding/bobstuff/react/config/settings.json
<<<OVERWRITE>>>
{
   "debug": true,
   "port": 8080
}
<<<END>>>

NOTE: if you want to remove a section of code, your replace block must contain a blank line and a space:


<<<EXPLANATION>>>
remove the search code
<<<FILE>>>
package/replacer_demo_src/main.py
<<<SEARCH>>>
def old_function():
   x = 1
   y = 2
   return x + y
<<<REPLACE>>>
 
<<<END>>>
```

see how the REPLACE block can never be totally empty. must contain blank line and whitespace (space(s)) too

IMPORTANT:  each edit item must list its associated FILE.  each SEARCH/REPLACE or OVERWRITE etc block must be immediately preceeded by the respective file 

$$$$$$$$$$$$$

Prioritize substance, clarity, and depth. Challenge all my proposals, designs, and conclusions as hypotheses to be tested. Sharpen follow-up questions for precision, surfacing hidden assumptions, trade offs, and failure modes early. Default to terse, logically structured, information-dense responses unless detailed exploration is required. Skip unnecessary praise unless grounded in evidence. Explicitly acknowledge uncertainty when applicable. Always propose at least one alternative framing. Accept critical debate as normal and preferred. Treat all factual claims as provisional unless cited or clearly justified. Cite when appropriate. Acknowledge when claims rely on inference or incomplete information. Favor accuracy over sounding certain.

check anything online when it feels relevant.  good to compare our thoughts/assumptions with what other people are actually doing and thinking

when asked to share your thoughts (like if user says "wdyt"), then walk it out and talk it out gradually, incrementally, slowly, and thoughtfully.  challenge me so we can succeed overall

dont fall into the trap of equating "implementation" with "low-level".  implementation decisions can be high-level when they affect the system's fundamental behavior

REMEMBER:  never submit an empty replace block.  always include a newline and a space:

```

<<<REPLACE>>>
 
<<<END>>>
```
=== 'pwd' ===
/Users/stuart/repos/nesl-lang/nesl-js
stuart@Stuarts-MacBook-Pro ~/r/n/nesl-js (main)> 
=== END FILE: ./docs/cmdoutput.txt ===

=== START FILE: ./docs/sham21_3 example.md ===

https://claude.ai/chat/b4f356de-73e2-48c1-bdf8-b9ab4d3189a2

## SHAM Syntax Format (Single Action Per Block)

- i think there should be an error if user tries to encode escaped newline in inline string
- no comments

### File Creation Example:

```sh [sham]
# creating the file needed for such and such

#!SHAM [@three-char-SHA-256: k7m]
action = "create_file"
path = "/tmp/\"hello\".txt"
content = <<'EOT_SHAM_k7m'
 Hello world!
 how are you?
EOT_SHAM_k7m
#!END_SHAM_k7m

# createe the hello2 file for other reasons

#!SHAM [@three-char-SHA-256: h7d]
action = "create_file"
path = "/tmp/hello2.txt"
content = <<'EOT_SHAM_h7d'
 Hello other world!
 how are you?
EOT_SHAM_h7d
#!END_SHAM_h7d
```

### Search/Replace Example:

```sh [sham]
# replace some text for blah blah blha reasons

#!SHAM [@three-char-SHA-256: vc8]
action = "replace_in_file"
search = <<'EOT_SHAM_vc8'
 Hello world!
 how are you?
EOT_SHAM_vc8
replace = <<'EOT_SHAM_vc8'

   
 asdf "awef" 'lkj'
lalalala 

EOT_SHAM_vc8
#!END_SHAM_vc8
```

note: each heredoc delimiter is `EOT_SHAM_` followed by the `three-char-SHA-256` value. also appended to the END_SHAM_


### Equivalent Perl Syntax:

```perl
#!/usr/bin/perl
use strict;
use warnings;

# First SHAM block - create_file action
my $sham_block_k7m = {
    # creating the file needed for such and such
    action => "create_file",
    path => "/tmp/\"hello\".txt",
    content => <<'EOT_SHAM_k7m'
 Hello world!
 how are you?
EOT_SHAM_k7m
};

# Second SHAM block - create_file action
my $sham_block_h7d = {
    # createe the hello2 file for other reasons
    action => "create_file",
    path => "/tmp/hello2.txt",
    content => <<'EOT_SHAM_h7d'
 Hello other world!
 how are you?
EOT_SHAM_h7d
};

# Third SHAM block - replace_in_file action
my $sham_block_vc8 = {
    # replace some text for blah blah blha reasons
    action => "replace_in_file",
    search => <<'EOT_SHAM_vc8'
 Hello world!
 how are you?
EOT_SHAM_vc8
    replace => <<'EOT_SHAM_vc8'

   
 asdf "awef" 'lkj'
lalalala 

EOT_SHAM_vc8
};
```

=== END FILE: ./docs/sham21_3 example.md ===

=== START FILE: ./README.md ===


stuart@Stuarts-MacBook-Pro /t/test-nesl> # Test actual parsing
                                         node -e "
                                         const { parseSHAM } = require('nesl-js');
                                         const result = parseSHAM('key=value');
                                         console.log(JSON.stringify(result, null, 2));
                                         "

thsi file is probably oudated.  need to start putting dates on this stuff


# SHAM Parser for JavaScript

JavaScript parser implementation for the SHAM (Structured Hashed-marker) format.

## Installation

```bash
npm install sham-parser-js
```

## Usage

```javascript
import { parseSHAM } from 'sham-parser-js';

const result = parseSHAM(shamContent);
console.log(result.blocks);
console.log(result.errors);
```

## Position Encoding

This parser uses **UTF-16 code unit** positions for all column offsets, matching JavaScript's native string handling and the Language Server Protocol (LSP) specification.

### What this means:
- Characters in the Basic Multilingual Plane (BMP) count as 1 position
- Characters outside BMP (e.g., emoji 😀) count as 2 positions
- Column positions in error messages are 1-based for display
- Internal calculations use 0-based indices

### Example:
```
"key = "👨‍👩‍👧‍👦""
```
The family emoji has `.length` of 11 in JavaScript, so the closing quote is at column 12 (1-based).

## Development

```bash
npm run build       # Compile TypeScript
npm run test        # Run tests
npm run test:watch  # Run tests in watch mode
```

## Error Reporting

Errors include:
- `line`: 1-based line number
- `column`: 1-based UTF-16 column position
- `length`: Error span length in UTF-16 code units
- `message`: Human-readable error description
- `context`: 5-line window around the error

## Character Encoding

This parser uses UTF-16 code unit positions for all offsets, matching:
- JavaScript's internal string representation
- Language Server Protocol (LSP) default encoding
- Standard JavaScript string methods (.length, .charAt, etc.)

### Implications:
- Characters in Basic Multilingual Plane = 1 position
- Characters outside BMP (e.g., 😀) = 2 positions  
- All error positions report UTF-16 code units, not Unicode code points
=== END FILE: ./README.md ===

=== START FILE: ./sham-shared/config.json ===
{
  "limits": {
    "keyMaxLength": 256,
    "blockIdLength": 3,
    "maxFileSize": 104857600
  },
  "patterns": {
    "blockId": "^[A-Za-z0-9]{3}$",
    "keyStart": "^[\\p{L}_]",
    "keyChars": "^[\\p{L}\\p{N}_]*$",
    "excludeChars": "[\\u200B-\\u200D\\u2060\\uFEFF\\u0000-\\u001F\\u007F-\\u009F]",
    "heredocPrefix": "EOT_SHAM_"
  },
  "parser": {
    "errorContextWindow": 5,
    "lineEnding": "\n",
    "lineTypePriority": [
      "end_marker",
      "header",
      "assignment",
      "empty"
    ]
  }
}
=== END FILE: ./sham-shared/config.json ===

=== START FILE: ./sham-shared/sham-test/unit/validateKey.test.json ===
{
  "function": "validateKey",
  "groups": [
    {
      "name": "valid-keys",
      "tests": [
        {
          "name": "basic-underscore",
          "input": ["_key"],
          "expected": { "valid": true }
        }
      ]
    },
    {
      "name": "invalid-start-char",
      "tests": [
        {
          "name": "starts-with-digit",
          "input": ["9bad"],
          "expected": {
            "valid": false,
            "error": "Key must start with letter or underscore"
          }
        },
        {
          "name": "starts-with-space",
          "input": [" key"],
          "expected": {
            "valid": false,
            "error": "Key must start with letter or underscore"
          }
        },
        {
          "name": "starts-with-hyphen",
          "input": ["-key"],
          "expected": {
            "valid": false,
            "error": "Key must start with letter or underscore"
          }
        }
      ]
    },
    {
      "name": "unicode-keys",
      "tests": [
        {
          "name": "greek-letters",
          "input": ["αβγ"],
          "expected": { "valid": true }
        },
        {
          "name": "chinese-chars",
          "input": ["中文变量"],
          "expected": { "valid": true }
        },
        {
          "name": "emoji-invalid",
          "input": ["😀key"],
          "expected": {
            "valid": false,
            "error": "Key must start with letter or underscore"
          }
        },
        {
          "name": "emoji-in-middle",
          "input": ["key😀name"],
          "expected": {
            "valid": false,
            "error": "Key contains invalid characters"
          }
        },
        {
          "name": "mathematical-alphanumeric",
          "input": ["𝐀𝐁𝐂"],
          "expected": { "valid": true }
        },
        {
          "name": "arabic-valid",
          "input": ["متغير"],
          "expected": { "valid": true }
        }
      ]
    },
    {
      "name": "length-boundaries",
      "tests": [
        {
          "name": "exactly-256-chars",
          "input": ["k_56789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345123"],
          "expected": { "valid": true }
        },
        {
          "name": "257-chars-too-long",
          "input": ["k_567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123451234"],
          "expected": {
            "valid": false,
            "error": "Key exceeds 256 character limit"
          }
        },
        {
          "name": "empty-key",
          "input": [""],
          "expected": {
            "valid": false,
            "error": "Key cannot be empty"
          }
        }
      ]
    },
    {
      "name": "forbidden-characters",
      "tests": [
        {
          "name": "contains-space",
          "input": ["key name"],
          "expected": {
            "valid": false,
            "error": "Key contains invalid characters"
          }
        },
        {
          "name": "contains-tab",
          "input": ["key\tname"],
          "expected": {
            "valid": false,
            "error": "Key contains invalid characters"
          }
        },
        {
          "name": "zero-width-space",
          "input": ["key​name"],
          "expected": {
            "valid": false,
            "error": "Key contains invalid characters"
          }
        },
        {
          "name": "control-char",
          "input": ["key\u0001name"],
          "expected": {
            "valid": false,
            "error": "Key contains invalid characters"
          }
        }
      ]
    }
  ]
}
=== END FILE: ./sham-shared/sham-test/unit/validateKey.test.json ===

=== START FILE: ./sham-shared/sham-test/unit/classifyLine.test.json ===
{
  "function": "classifyLine",
  "groups": [
    {
      "name": "header-lines",
      "tests": [
        {
          "name": "basic-header",
          "input": ["#!SHAM [@three-char-SHA-256: abc]"],
          "expected": "header"
        }
      ]
    },
    {
      "name": "end-markers",
      "tests": [
        {
          "name": "basic-end",
          "input": ["#!END_SHAM_abc"],
          "expected": "end_marker"
        },
        {
          "name": "end-with-trailing-space",
          "input": ["#!END_SHAM_xyz "],
          "expected": "end_marker"
        }
      ]
    },
    {
      "name": "assignment-lines",
      "tests": [
        {
          "name": "simple-assignment",
          "input": ["key = \"value\""],
          "expected": "assignment"
        },
        {
          "name": "assignment-no-spaces",
          "input": ["key=\"value\""],
          "expected": "assignment"
        },
        {
          "name": "multiple-equals",
          "input": ["key = \"val=ue\""],
          "expected": "assignment"
        },
        {
          "name": "heredoc-assignment",
          "input": ["content = <<'EOT_SHAM_abc'"],
          "expected": "assignment"
        }
      ]
    },
    {
      "name": "empty-lines",
      "tests": [
        {
          "name": "truly-empty",
          "input": [""],
          "expected": "empty"
        },
        {
          "name": "only-spaces",
          "input": ["    "],
          "expected": "empty"
        },
        {
          "name": "only-tabs",
          "input": ["\t\t"],
          "expected": "empty"
        }
      ]
    },
    {
      "name": "unknown-lines",
      "tests": [
        {
          "name": "no-equals-sign",
          "input": ["just some text"],
          "expected": "unknown"
        },
        {
          "name": "malformed-header",
          "input": ["#!SHAM without brackets"],
          "expected": "header"
        },
        {
          "name": "comment-like",
          "input": ["// this looks like a comment"],
          "expected": "unknown"
        }
      ]
    }
  ]
}
=== END FILE: ./sham-shared/sham-test/unit/classifyLine.test.json ===

=== START FILE: ./sham-shared/sham-test/unit/parseEndMarker.test.json ===
{
  "function": "parseEndMarker",
  "groups": [
    {
      "name": "valid",
      "tests": [
        {
          "name": "normal-case",
          "input": ["#!END_SHAM_xyz"],
          "expected": {
            "isEnd": true,
            "blockId": "xyz"
          }
        }
      ]
    },
    {
      "name": "non-matching",
      "tests": [
        {
          "name": "missing-sharp",
          "input": ["END_SHAM_abc"],
          "expected": {
            "isEnd": false
          }
        },
        {
          "name": "lowercase-end",
          "input": ["#!end_sham_abc"],
          "expected": {
            "isEnd": false
          }
        },
        {
          "name": "extra-text-after",
          "input": ["#!END_SHAM_abc extra"],
          "expected": {
            "isEnd": false
          }
        },
        {
          "name": "wrong-id-length",
          "input": ["#!END_SHAM_ab"],
          "expected": {
            "isEnd": false
          }
        },
        {
          "name": "special-chars-in-id",
          "input": ["#!END_SHAM_a-b"],
          "expected": {
            "isEnd": false
          }
        }
      ]
    }
  ]
}
=== END FILE: ./sham-shared/sham-test/unit/parseEndMarker.test.json ===

=== START FILE: ./sham-shared/sham-test/unit/parseAssignment.test.json ===
{
  "function": "parseAssignment",
  "groups": [
    {
      "name": "valid-quoted",
      "tests": [
        {
          "name": "standard-quoted",
          "input": ["key = \"value\""],
          "expected": {
            "success": true,
            "type": "key-value",
            "key": "key",
            "value": "value"
          }
        }
      ]
    },
    {
      "name": "invalid-operator",
      "tests": [
        {
          "name": "colon-equals",
          "input": ["key := \"value\""],
          "expected": {
            "success": false,
            "error": {
              "code": "INVALID_OPERATOR",
              "position": 4,
              "length": 2
            }
          }
        },
        {
          "name": "arrow-operator",
          "input": ["key => \"value\""],
          "expected": {
            "success": false,
            "error": {
              "code": "INVALID_VALUE",
              "position": 4,
              "length": 2
            }
          }
        }
      ]
    },
    {
      "name": "heredoc-assignments",
      "tests": [
        {
          "name": "valid-heredoc",
          "input": ["content = <<'EOT_SHAM_abc'"],
          "expected": {
            "success": true,
            "type": "heredoc",
            "key": "content",
            "delimiter": "EOT_SHAM_abc"
          }
        },
        {
          "name": "heredoc-no-quotes",
          "input": ["content = <<EOT_SHAM_abc"],
          "expected": {
            "success": false,
            "error": {
              "code": "INVALID_VALUE",
              "position": 10,
              "length": 14
            }
          }
        }
      ]
    },
    {
      "name": "empty-values",
      "tests": [
        {
          "name": "empty-quoted",
          "input": ["key = \"\""],
          "expected": {
            "success": true,
            "type": "key-value",
            "key": "key",
            "value": ""
          }
        },
        {
          "name": "no-value",
          "input": ["key = "],
          "expected": {
            "success": false,
            "error": {
              "code": "INVALID_VALUE",
              "position": 6,
              "length": 1
            }
          }
        }
      ]
    },
    {
      "name": "quote-handling",
      "tests": [
        {
          "name": "escaped-quotes",
          "input": ["msg = \"He said \\\"hello\\\"\""],
          "expected": {
            "success": true,
            "type": "key-value",
            "key": "msg",
            "value": "He said \"hello\""
          }
        },
        {
          "name": "unclosed-quote",
          "input": ["key = \"unclosed"],
          "expected": {
            "success": false,
            "error": {
              "code": "UNCLOSED_QUOTE",
              "position": 6,
              "length": 9
            }
          }
        },
        {
          "name": "trailing-content",
          "input": ["key = \"value\" extra"],
          "expected": {
            "success": false,
            "error": {
              "code": "TRAILING_CONTENT",
              "position": 14,
              "length": 5
            }
          }
        }
      ]
    },
    {
      "name": "malformed-lines",
      "tests": [
        {
          "name": "no-equals",
          "input": ["just a key"],
          "expected": {
            "success": false,
            "error": {
              "code": "MALFORMED_ASSIGNMENT",
              "position": 0,
              "length": 10
            }
          }
        },
        {
          "name": "empty-key",
          "input": [" = \"value\""],
          "expected": {
            "success": false,
            "error": {
              "code": "EMPTY_KEY",
              "position": 1,
              "length": 1
            }
          }
        }
      ]
    },
    {
      "name": "newline-handling",
      "tests": [
        {
          "name": "newline-in-string",
          "input": ["key = \"line1\nline2\""],
          "expected": {
            "success": false,
            "error": {
              "code": "UNCLOSED_QUOTE",
              "position": 6,
              "length": 13
            }
          }
        }
      ]
    }
  ]
}
=== END FILE: ./sham-shared/sham-test/unit/parseAssignment.test.json ===

=== START FILE: ./sham-shared/sham-test/unit/validateBlockId.test.json ===
{
  "function": "validateBlockId",
  "groups": [
    {
      "name": "valid-ids",
      "tests": [
        {
          "name": "alphanumeric",
          "input": ["abc"],
          "expected": { "valid": true }
        },
        {
          "name": "uppercase-ok",
          "input": ["XYZ"],
          "expected": { "valid": true }
        }
      ]
    },
    {
      "name": "invalid-length",
      "tests": [
        {
          "name": "too-short",
          "input": ["ab"],
          "expected": {
            "valid": false,
            "error": "Block ID must be exactly 3 characters"
          }
        },
        {
          "name": "too-long",
          "input": ["abcd"],
          "expected": {
            "valid": false,
            "error": "Block ID must be exactly 3 characters"
          }
        },
        {
          "name": "single-char",
          "input": ["a"],
          "expected": {
            "valid": false,
            "error": "Block ID must be exactly 3 characters"
          }
        },
        {
          "name": "empty-id",
          "input": [""],
          "expected": {
            "valid": false,
            "error": "Block ID must be exactly 3 characters"
          }
        }
      ]
    },
    {
      "name": "invalid-characters",
      "tests": [
        {
          "name": "with-hyphen",
          "input": ["a-b"],
          "expected": {
            "valid": false,
            "error": "Block ID must contain only alphanumeric characters"
          }
        },
        {
          "name": "with-underscore",
          "input": ["a_b"],
          "expected": {
            "valid": false,
            "error": "Block ID must contain only alphanumeric characters"
          }
        },
        {
          "name": "with-space",
          "input": ["a b"],
          "expected": {
            "valid": false,
            "error": "Block ID must contain only alphanumeric characters"
          }
        },
        {
          "name": "unicode-chars",
          "input": ["αβγ"],
          "expected": {
            "valid": false,
            "error": "Block ID must contain only alphanumeric characters"
          }
        }
      ]
    },
    {
      "name": "mixed-case",
      "tests": [
        {
          "name": "mixed-case-valid",
          "input": ["aB9"],
          "expected": { "valid": true }
        },
        {
          "name": "all-digits",
          "input": ["123"],
          "expected": { "valid": true }
        }
      ]
    }
  ]
}
=== END FILE: ./sham-shared/sham-test/unit/validateBlockId.test.json ===

=== START FILE: ./sham-shared/sham-test/unit/parseHeader.test.json ===
{
  "function": "parseHeader",
  "groups": [
    {
      "name": "valid",
      "tests": [
        {
          "name": "simple-header",
          "input": ["#!SHAM [@three-char-SHA-256: abc]"],
          "expected": {
            "isValid": true,
            "blockId": "abc"
          }
        }
      ]
    },
    {
      "name": "invalid",
      "tests": [
        {
          "name": "no-brackets",
          "input": ["#!SHAM abc"],
          "expected": {
            "isValid": false
          }
        },
        {
          "name": "missing-at-sign",
          "input": ["#!SHAM [three-char-SHA-256: abc]"],
          "expected": {
            "isValid": false
          }
        },
        {
          "name": "wrong-keyword",
          "input": ["#!SHAM [@different-format: abc]"],
          "expected": {
            "isValid": false
          }
        },
        {
          "name": "lowercase-sham",
          "input": ["#!sham [@three-char-SHA-256: abc]"],
          "expected": {
            "isValid": false
          }
        },
        {
          "name": "extra-spaces",
          "input": ["#!SHAM  [@three-char-SHA-256: abc]"],
          "expected": {
            "isValid": false
          }
        },
        {
          "name": "trailing-text",
          "input": ["#!SHAM [@three-char-SHA-256: abc] extra"],
          "expected": {
            "isValid": false
          }
        },
        {
          "name": "no-space-after-colon",
          "input": ["#!SHAM [@three-char-SHA-256:abc]"],
          "expected": {
            "isValid": false
          }
        }
      ]
    }
  ]
}
=== END FILE: ./sham-shared/sham-test/unit/parseHeader.test.json ===

=== START FILE: ./sham-shared/sham-test/unit/findInvalidCharPosition.test.json ===
{
  "function": "findInvalidCharPosition",
  "groups": [
    {
      "name": "valid-cases",
      "tests": [
        {
          "name": "simple-key",
          "input": ["hello_world"],
          "expected": null
        }
      ]
    },
    {
      "name": "forbidden-unicode",
      "tests": [
        {
          "name": "zero-width-space",
          "input": ["foo\u200Bbar"],
          "expected": {
            "position": 3,
            "char": "\u200B"
          }
        }
      ]
    },
    {
      "name": "invalid-regular-chars",
      "tests": [
        {
          "name": "space-in-middle",
          "input": ["key name"],
          "expected": {
            "position": 3,
            "char": " "
          }
        },
        {
          "name": "hyphen-in-middle",
          "input": ["key-name"],
          "expected": {
            "position": 3,
            "char": "-"
          }
        },
        {
          "name": "digit-at-start",
          "input": ["9key"],
          "expected": {
            "position": 0,
            "char": "9"
          }
        },
        {
          "name": "special-at-start",
          "input": ["$key"],
          "expected": {
            "position": 0,
            "char": "$"
          }
        },
        {
          "name": "emoji-at-start",
          "input": ["😀key"],
          "expected": {
            "position": 0,
            "char": "😀"
          }
        },
        {
          "name": "emoji-in-middle",
          "input": ["key😀name"],
          "expected": {
            "position": 3,
            "char": "😀"
          }
        }
      ]
    },
    {
      "name": "multiple-invalid",
      "tests": [
        {
          "name": "first-of-many",
          "input": ["key name-value"],
          "expected": {
            "position": 3,
            "char": " "
          }
        }
      ]
    }
  ]
}
=== END FILE: ./sham-shared/sham-test/unit/findInvalidCharPosition.test.json ===

=== START FILE: ./sham-shared/sham-test/unit/validateHeredocDelimiter.test.json ===
{
  "function": "validateHeredocDelimiter",
  "groups": [
    {
      "name": "valid-delimiters",
      "tests": [
        {
          "name": "correct-id",
          "input": ["EOT_SHAM_abc", "abc"],
          "expected": { "valid": true }
        }
      ]
    },
    {
      "name": "mismatch-id",
      "tests": [
        {
          "name": "wrong-id",
          "input": ["EOT_SHAM_xyz", "abc"],
          "expected": {
            "valid": false,
            "error": "Heredoc delimiter must be 'EOT_SHAM_abc'"
          }
        },
        {
          "name": "wrong-prefix",
          "input": ["END_SHAM_abc", "abc"],
          "expected": {
            "valid": false,
            "error": "Heredoc delimiter must be 'EOT_SHAM_abc'"
          }
        },
        {
          "name": "lowercase-prefix",
          "input": ["eot_sham_abc", "abc"],
          "expected": {
            "valid": false,
            "error": "Heredoc delimiter must be 'EOT_SHAM_abc'"
          }
        },
        {
          "name": "extra-suffix",
          "input": ["EOT_SHAM_abc_extra", "abc"],
          "expected": {
            "valid": false,
            "error": "Heredoc delimiter must be 'EOT_SHAM_abc'"
          }
        },
        {
          "name": "partial-match",
          "input": ["EOT_SHAM_ab", "abc"],
          "expected": {
            "valid": false,
            "error": "Heredoc delimiter must be 'EOT_SHAM_abc'"
          }
        }
      ]
    }
  ]
}
=== END FILE: ./sham-shared/sham-test/unit/validateHeredocDelimiter.test.json ===

=== START FILE: ./sham-shared/sham-test/unit/getContextWindow.test.md ===
# Tests

## general

### 001-middle-of-large-file

```text
line 1
line 2
line 3
line 4
line 5
line 6
````

```text
3
```

```text
line 1
line 2
line 3
line 4
line 5
```

### 002-small-file-entire-window

```text
a
b
c
```

```text
2
```

```text
a
b
c
```

### 003-single-line-file

```text
only line
```

```text
1
```

```text
only line
```

### 004-exactly-five-lines

```text
line 1
line 2
line 3
line 4
line 5
```

```text
3
```

```text
line 1
line 2
line 3
line 4
line 5
```

### 005-near-end-of-file

```text
line 1
line 2
line 3
line 4
line 5
line 6
line 7
```

```text
6
```

```text
line 3
line 4
line 5
line 6
line 7
```

### 006-at-start-of-file

```text
line 1
line 2
line 3
line 4
line 5
line 6
line 7
```

```text
2
```

```text
line 1
line 2
line 3
line 4
line 5
```

### 007-four-line-file

```text
line 1
line 2
line 3
line 4
```

```text
3
```

```text
line 1
line 2
line 3
line 4
```

### 008-end-of-file-line-minus-0

```text
line 1
line 2
line 3
line 4
line 5
line 6
line 7
```

```text
7
```

```text
line 3
line 4
line 5
line 6
line 7
```

### 009-end-of-file-line-minus-1

```text
line 1
line 2
line 3
line 4
line 5
line 6
line 7
```

```text
6
```

```text
line 3
line 4
line 5
line 6
line 7
```

### 010-end-of-file-line-minus-2

```text
line 1
line 2
line 3
line 4
line 5
line 6
line 7
```

```text
5
```

```text
line 3
line 4
line 5
line 6
line 7
```

### 011-start-of-file-line-plus-2

```text
line 1
line 2
line 3
line 4
line 5
line 6
line 7
```

```text
3
```

```text
line 1
line 2
line 3
line 4
line 5
```

### 012-five-line-file-error-on-line-4

```text
line 1
line 2
line 3
line 4
line 5
```

```text
4
```

```text
line 1
line 2
line 3
line 4
line 5
```

=== END FILE: ./sham-shared/sham-test/unit/getContextWindow.test.md ===

=== START FILE: ./sham-shared/sham-test/integration.md ===
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

# Tests

## general

### 001-empty-file

```sh sham
```

```json
{
  "blocks": [],
  "errors": []
}
```

### 002-single-block-basic

```sh sham
#!SHAM [@three-char-SHA-256: abc]
path = "/tmp/test.txt"
name = "example"
#!END_SHAM_abc
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

```sh sham
#!SHAM [@three-char-SHA-256: xyz]
#!END_SHAM_xyz
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

```sh sham
#!SHAM [@three-char-SHA-256: h3r]
content = <<'EOT_SHAM_h3r'
Line one
Line two
EOT_SHAM_h3r
#!END_SHAM_h3r
```

```json
{
  "blocks": [{
    "id": "h3r",
    "properties": {
      "content": "Line one\nLine two"
    },
    "startLine": 1,
    "endLine": 6
  }],
  "errors": []
}
```

### 005-duplicate-key

```sh sham
#!SHAM [@three-char-SHA-256: dup]
key = "first"
key = "second"
#!END_SHAM_dup
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
    "context": "#!SHAM [@three-char-SHA-256: dup]\nkey = \"first\"\nkey = \"second\"\n#!END_SHAM_dup",
    "message": "Duplicate key 'key' in block 'dup'"
  }]
}
```

### 006-no-comments-allowed

```sh sham
#!SHAM [@three-char-SHA-256: cmt]
// This is not a comment
key1 = "value1"
  // Not a comment with leading spaces
key2 = "value2"
#!END_SHAM_cmt
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
    "context": "#!SHAM [@three-char-SHA-256: cmt]\n// This is not a comment\nkey1 = \"value1\"\n  // Not a comment with leading spaces\nkey2 = \"value2\"",
    "message": "Invalid line format in block 'cmt': not a valid key-value assignment or empty line"
  }, {
    "code": "MALFORMED_ASSIGNMENT",
    "line": 4,
    "column": 1,
    "length": 38,
    "blockId": "cmt",
    "content": "  // Not a comment with leading spaces",
    "context": "// This is not a comment\nkey1 = \"value1\"\n  // Not a comment with leading spaces\nkey2 = \"value2\"\n#!END_SHAM_cmt",
    "message": "Invalid line format in block 'cmt': not a valid key-value assignment or empty line"
  }]
}
```

### 007-heredoc-after-valid-end

```sh sham
#!SHAM [@three-char-SHA-256: col]
content = <<'EOT_SHAM_col'
This line is fine
EOT_SHAM_col
This breaks parsing
EOT_SHAM_col
#!END_SHAM_col
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
    "context": "This line is fine\nEOT_SHAM_col\nThis breaks parsing\nEOT_SHAM_col\n#!END_SHAM_col",
    "message": "Invalid line format in block 'col': not a valid key-value assignment or empty line"
  }, {
    "code": "MALFORMED_ASSIGNMENT",
    "line": 6,
    "column": 1,
    "length": 12,
    "blockId": "col",
    "content": "EOT_SHAM_col",
    "context": "This line is fine\nEOT_SHAM_col\nThis breaks parsing\nEOT_SHAM_col\n#!END_SHAM_col",
    "message": "Invalid line format in block 'col': not a valid key-value assignment or empty line"
  }]
}
```

### 008-malformed-header

```sh sham
#!SHAM [missing-at-sign: bad]
key = "value"
#!END_SHAM_bad
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
    "content": "#!SHAM [missing-at-sign: bad]",
    "context": "#!SHAM [missing-at-sign: bad]\nkey = \"value\"\n#!END_SHAM_bad",
    "message": "Invalid SHAM header format"
  }]
}
```

### 009-invalid-block-id

```sh sham
#!SHAM [@three-char-SHA-256: ab]
key = "value"
#!END_SHAM_ab
```

```json
{
  "blocks": [],
  "errors": [{
    "code": "INVALID_BLOCK_ID",
    "line": 1,
    "column": 30,
    "length": 2,
    "blockId": null,
    "content": "#!SHAM [@three-char-SHA-256: ab]",
    "context": "#!SHAM [@three-char-SHA-256: ab]\nkey = \"value\"\n#!END_SHAM_ab",
    "message": "Block ID must be exactly 3 characters"
  }]
}
```

### 010-unclosed-quote

```sh sham
#!SHAM [@three-char-SHA-256: quo]
key = "unclosed
#!END_SHAM_quo
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
    "context": "#!SHAM [@three-char-SHA-256: quo]\nkey = \"unclosed\n#!END_SHAM_quo",
    "message": "Unclosed quoted string"
  }]
}
```

### 011-empty-quoted-value

```sh sham
#!SHAM [@three-char-SHA-256: emp]
empty = ""
#!END_SHAM_emp
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

```sh sham
#!SHAM [@three-char-SHA-256: ehd]
content = <<'EOT_SHAM_ehd'
EOT_SHAM_ehd
#!END_SHAM_ehd
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

```sh sham
#!SHAM [@three-char-SHA-256: max]
k_56789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345123 = "256 chars"
#!END_SHAM_max
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

```sh sham
#!SHAM [@three-char-SHA-256: lng]
k_567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123451234 = "257 chars"
#!END_SHAM_lng
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
    "context": "#!SHAM [@three-char-SHA-256: lng]\nk_567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123451234 = \"257 chars\"\n#!END_SHAM_lng",
    "message": "Key exceeds 256 character limit"
  }]
}
```

### 015-unclosed-block

```sh sham
#!SHAM [@three-char-SHA-256: unc]
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
    "context": "#!SHAM [@three-char-SHA-256: unc]\nkey = \"value\"",
    "message": "Block 'unc' not closed before EOF"
  }]
}
```

### 016-mismatched-end

```sh sham
#!SHAM [@three-char-SHA-256: mis]
key = "value"
#!END_SHAM_xyz
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
    "length": 14,
    "blockId": "mis",
    "content": "#!END_SHAM_xyz",
    "context": "#!SHAM [@three-char-SHA-256: mis]\nkey = \"value\"\n#!END_SHAM_xyz",
    "message": "End marker 'xyz' doesn't match block ID 'mis'"
  }]
}
```

### 017-heredoc-with-sham-markers

```sh sham
#!SHAM [@three-char-SHA-256: shm]
content = <<'EOT_SHAM_shm'
This contains #!SHAM [@three-char-SHA-256: xyz]
And also #!END_SHAM_xyz
But they're just content
EOT_SHAM_shm
#!END_SHAM_shm
```

```json
{
  "blocks": [{
    "id": "shm",
    "properties": {
      "content": "This contains #!SHAM [@three-char-SHA-256: xyz]\nAnd also #!END_SHAM_xyz\nBut they're just content"
    },
    "startLine": 1,
    "endLine": 7
  }],
  "errors": []
}
```

### 018-missing-key-name

```sh sham
#!SHAM [@three-char-SHA-256: edg]
= "missing key"
#!END_SHAM_edg
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
    "context": "#!SHAM [@three-char-SHA-256: edg]\n= \"missing key\"\n#!END_SHAM_edg",
    "message": "Assignment without key name"
  }]
}
```

### 019-escaped-quotes

```sh sham
#!SHAM [@three-char-SHA-256: esc]
path = "C:\\Users\\test\\file.txt"
msg = "He said \"hello\""
#!END_SHAM_esc
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

```sh sham
#!SHAM [@three-char-SHA-256: bl1]
key1 = "value1"
#!END_SHAM_bl1

#!SHAM [@three-char-SHA-256: bl2]
key2 = "value2"
#!END_SHAM_bl2
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

```sh sham
#!SHAM [@three-char-SHA-256: hel]
content = <<'EOT_SHAM_hel'
Line 1

Line 3
EOT_SHAM_hel
#!END_SHAM_hel
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

```sh sham
#!SHAM [@three-char-SHA-256: inv]
key := "wrong operator"
#!END_SHAM_inv
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
    "context": "#!SHAM [@three-char-SHA-256: inv]\nkey := \"wrong operator\"\n#!END_SHAM_inv",
    "message": "Invalid assignment operator ':=' - only '=' is allowed"
  }]
}
```

### 023-utf8-keys

```sh sham
#!SHAM [@three-char-SHA-256: utf]
用户名 = "张三"
données_count = "42"
αβγ = "greek"
#!END_SHAM_utf
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

```sh sham
#!SHAM [@three-char-SHA-256: bad]
key name = "spaces not allowed"
key​value = "zero-width space"
#!END_SHAM_bad
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
    "context": "#!SHAM [@three-char-SHA-256: bad]\nkey name = \"spaces not allowed\"\nkey​value = \"zero-width space\"\n#!END_SHAM_bad",
    "message": "Key contains invalid character ' ' at position 4"
  }, {
    "code": "INVALID_KEY",
    "line": 3,
    "column": 1,
    "length": 9,
    "blockId": "bad",
    "content": "key​value = \"zero-width space\"",
    "context": "#!SHAM [@three-char-SHA-256: bad]\nkey name = \"spaces not allowed\"\nkey​value = \"zero-width space\"\n#!END_SHAM_bad",
    "message": "Key contains invalid character '​' at position 4"
  }]
}
```

### 025-whitespace-in-keys

```sh sham
#!SHAM [@three-char-SHA-256: wsp]
	key = "tab at start"
key	name = "tab in middle"
#!END_SHAM_wsp
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
    "context": "#!SHAM [@three-char-SHA-256: wsp]\n\tkey = \"tab at start\"\nkey\tname = \"tab in middle\"\n#!END_SHAM_wsp",
    "message": "Key contains invalid character '\t' at position 1"
  }, {
    "code": "INVALID_KEY",
    "line": 3,
    "column": 1,
    "length": 8,
    "blockId": "wsp",
    "content": "key\tname = \"tab in middle\"",
    "context": "#!SHAM [@three-char-SHA-256: wsp]\n\tkey = \"tab at start\"\nkey\tname = \"tab in middle\"\n#!END_SHAM_wsp",
    "message": "Key contains invalid character '\t' at position 4"
  }]
}
```

### 026-newline-in-quoted-string

```sh sham
#!SHAM [@three-char-SHA-256: nwl]
key = "line1
line2"
#!END_SHAM_nwl
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
    "context": "#!SHAM [@three-char-SHA-256: nwl]\nkey = \"line1\nline2\"\n#!END_SHAM_nwl",
    "message": "Unclosed quoted string"
  }, {
    "code": "MALFORMED_ASSIGNMENT",
    "line": 3,
    "column": 1,
    "length": 6,
    "blockId": "nwl",
    "content": "line2\"",
    "context": "#!SHAM [@three-char-SHA-256: nwl]\nkey = \"line1\nline2\"\n#!END_SHAM_nwl",
    "message": "Invalid line format in block 'nwl': not a valid key-value assignment or empty line"
  }]
}
```

### 027-unclosed-heredoc

```sh sham
#!SHAM [@three-char-SHA-256: uhd]
content = <<'EOT_SHAM_uhd'
Some content
#!END_SHAM_uhd
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
    "context": "#!SHAM [@three-char-SHA-256: uhd]\ncontent = <<'EOT_SHAM_uhd'\nSome content\n#!END_SHAM_uhd",
    "message": "Heredoc 'EOT_SHAM_uhd' not closed before EOF"
  }]
}
```

### 028-invalid-value-format

```sh sham
#!SHAM [@three-char-SHA-256: ivf]
key = unquoted
#!END_SHAM_ivf
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
    "context": "#!SHAM [@three-char-SHA-256: ivf]\nkey = unquoted\n#!END_SHAM_ivf",
    "message": "Value must be a quoted string or heredoc"
  }]
}
```

### 029-block-id-special-chars

```sh sham
#!SHAM [@three-char-SHA-256: a-b]
key = "value"
#!END_SHAM_a-b
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
    "content": "#!SHAM [@three-char-SHA-256: a-b]",
    "context": "#!SHAM [@three-char-SHA-256: a-b]\nkey = \"value\"\n#!END_SHAM_a-b",
    "message": "Block ID must contain only alphanumeric characters"
  }]
}
```

### 030-no-comments-variations

```sh sham
#!SHAM [@three-char-SHA-256: ncm]
//not a comment without space
// not a comment with space
key = "value" // inline not allowed
#!END_SHAM_ncm
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
    "context": "#!SHAM [@three-char-SHA-256: ncm]\n//not a comment without space\n// not a comment with space\nkey = \"value\" // inline not allowed\n#!END_SHAM_ncm",
    "message": "Invalid line format in block 'ncm': not a valid key-value assignment or empty line"
  }, {
    "code": "MALFORMED_ASSIGNMENT",
    "line": 3,
    "column": 1,
    "length": 27,
    "blockId": "ncm",
    "content": "// not a comment with space",
    "context": "#!SHAM [@three-char-SHA-256: ncm]\n//not a comment without space\n// not a comment with space\nkey = \"value\" // inline not allowed\n#!END_SHAM_ncm",
    "message": "Invalid line format in block 'ncm': not a valid key-value assignment or empty line"
  }, {
    "code": "TRAILING_CONTENT",
    "line": 4,
    "column": 15,
    "length": 21,
    "blockId": "ncm",
    "content": "key = \"value\" // inline not allowed",
    "context": "#!SHAM [@three-char-SHA-256: ncm]\n//not a comment without space\n// not a comment with space\nkey = \"value\" // inline not allowed\n#!END_SHAM_ncm",
    "message": "Unexpected content after quoted value"
  }]
}
```

### 031-heredoc-with-end-marker

```sh sham
#!SHAM [@three-char-SHA-256: abc]
content = <<'EOT_SHAM_abc'
Some content here
#!END_SHAM_abc
More content
EOT_SHAM_abc
#!END_SHAM_abc
```

```json
{
  "blocks": [{
    "id": "abc",
    "properties": {
      "content": "Some content here\n#!END_SHAM_abc\nMore content"
    },
    "startLine": 1,
    "endLine": 7
  }],
  "errors": []
}
```

### 032-emoji-in-keys

```sh sham
#!SHAM [@three-char-SHA-256: emj]
😀_key = "emoji at start"
key_😀 = "emoji at end"
normal = "control case"
#!END_SHAM_emj
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
    "context": "#!SHAM [@three-char-SHA-256: emj]\n😀_key = \"emoji at start\"\nkey_😀 = \"emoji at end\"\nnormal = \"control case\"\n#!END_SHAM_emj",
    "message": "Key contains invalid character '😀' at position 1"
  }, {
    "code": "INVALID_KEY",
    "line": 3,
    "column": 1,
    "length": 6,
    "blockId": "emj",
    "content": "key_😀 = \"emoji at end\"",
    "context": "#!SHAM [@three-char-SHA-256: emj]\n😀_key = \"emoji at start\"\nkey_😀 = \"emoji at end\"\nnormal = \"control case\"\n#!END_SHAM_emj",
    "message": "Key contains invalid character '😀' at position 5"
  }]
}
```

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

### 036-multiple-blocks-with-text

```sh sham
random text before sham blocks is fine

#!SHAM [@three-char-SHA-256: k7m]
action = "create_file"
path = "/tmp/hello.txt"
content = <<'EOT_SHAM_k7m'
Hello world!
how are you?
EOT_SHAM_k7m
#!END_SHAM_k7m

random text between sham blocks is fine

# create the hello2 file for other reasons

#!SHAM [@three-char-SHA-256: h7d]
action = "create_file"
path = "/tmp/hello2.txt"
content = <<'EOT_SHAM_h7d'
Hello other world!
 how are you?
EOT_SHAM_h7d
#!END_SHAM_h7d

random text after sham blocks is fine
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

```sh sham
#!SHAM [@three-char-SHA-256: a1b]
key1 = "value1"
#!END_SHAM_a1b
#!SHAM [@three-char-SHA-256: c2d]
key2 = "value2"
#!END_SHAM_c2d
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

### 038-text-looks-like-sham

```sh sham
This line mentions #!SHAM but isn't a header

#!SHAM [@three-char-SHA-256: tst]
doc = <<'EOT_SHAM_tst'
Example of #!SHAM [@three-char-SHA-256: fake]
And #!END_SHAM_fake
EOT_SHAM_tst
#!END_SHAM_tst

More text with #!END_SHAM_xyz that isn't real
```

```json
{
  "blocks": [{
    "id": "tst",
    "properties": {
      "doc": "Example of #!SHAM [@three-char-SHA-256: fake]\nAnd #!END_SHAM_fake"
    },
    "startLine": 3,
    "endLine": 8
  }],
  "errors": []
}
```
=== END FILE: ./sham-shared/sham-test/integration.md ===

=== START FILE: ./package.json ===
{
  "name": "nesl-js",
  "version": "0.1.0",
  "description": "JavaScript parser for SHAM format",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "prebuild": "npm run generate:patterns",
    "build": "tsc",
    "generate:patterns": "node scripts/generate-patterns.js",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "clean": "rm -rf dist"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/nesl-lang/nesl-js.git"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "marked": "^16.0.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
=== END FILE: ./package.json ===

=== START FILE: ./scripts/debug-026.js ===
import { parseSHAM } from '../src/parser.js';
import fs from 'fs';

const input = `#!SHAM [@three-char-SHA-256: nwl]
key = "line1
line2"
#!END_SHAM_nwl`;

console.log('=== INPUT ===');
console.log(JSON.stringify(input));
console.log('\n=== LINES ===');
const lines = input.split(/\r?\n/);
lines.forEach((line, i) => {
  console.log(`Line ${i+1}: ${JSON.stringify(line)}`);
});

const result = parseSHAM(input);

console.log('\n=== ACTUAL RESULT ===');
console.log(JSON.stringify(result, null, 2));

// Load expected result from integration.md
const integrationMd = fs.readFileSync('./sham-shared/sham-test/integration.md', 'utf8');
const test026Match = integrationMd.match(/### 026-newline-in-quoted-string[\s\S]*?```json\n([\s\S]*?)\n```/);
if (test026Match) {
  const expected = JSON.parse(test026Match[1]);
  console.log('\n=== EXPECTED RESULT ===');
  console.log(JSON.stringify(expected, null, 2));
  
  console.log('\n=== DIFFERENCES ===');
  if (result.errors.length > 0 && expected.errors.length > 0) {
    const actualError = result.errors[0];
    const expectedError = expected.errors[0];
    
    for (const key in expectedError) {
      if (actualError[key] !== expectedError[key]) {
        console.log(`${key}: ${JSON.stringify(actualError[key])} !== ${JSON.stringify(expectedError[key])}`);
      }
    }
  }
}
=== END FILE: ./scripts/debug-026.js ===

=== START FILE: ./scripts/generate-tests.js ===
// This file is no longer needed - tests are loaded dynamically in vitest
=== END FILE: ./scripts/generate-tests.js ===

=== START FILE: ./scripts/generate-patterns.js ===
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../sham-shared/config.json');

if (!fs.existsSync(configPath)) {
  console.error(`Config file not found: ${configPath}`);
  process.exit(1);
}

let config;
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (err) {
  console.error(`Failed to parse config: ${err.message}`);
  process.exit(1);
}

const outputPath = path.join(__dirname, '../src/patterns.ts');

const content = `// Generated from sham-shared/config.json - DO NOT EDIT
export const BLOCK_ID_PATTERN = /${config.patterns.blockId}/;
export const KEY_START_PATTERN = /${config.patterns.keyStart}/u;
export const KEY_CHARS_PATTERN = /${config.patterns.keyChars}/u;
export const EXCLUDE_CHARS_PATTERN = /${config.patterns.excludeChars}/;
export const HEREDOC_PREFIX = '${config.patterns.heredocPrefix}';

export const KEY_MAX_LENGTH = ${config.limits.keyMaxLength};
export const BLOCK_ID_LENGTH = ${config.limits.blockIdLength};
export const MAX_FILE_SIZE = ${config.limits.maxFileSize};

export const ERROR_CONTEXT_WINDOW = ${config.parser.errorContextWindow};
export const LINE_ENDING = '${config.parser.lineEnding.replace(/\n/g, '\\n').replace(/\r/g, '\\r')}';
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, content);
console.log('Generated patterns.ts from config.json');
=== END FILE: ./scripts/generate-patterns.js ===

=== START FILE: ./tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "scripts"]
}
=== END FILE: ./tsconfig.json ===

=== START FILE: ./fs ===
# https://claude.ai/chat/7beca23f-49af-4345-b5ef-10fa98b9dded
# run:
# ./fs

# find sham21 -type f -not -name "package-lock.json"  -not -path "*/node_modules/*"  -exec sh -c 'echo; echo "=== START FILE: $1 ==="; cat "$1"; echo; echo "\n=== END FILE: $1 ==="' _ {} \; | pbcopy
# find . -type f -not -name "package-lock.json"  -not -path "*/node_modules/*"  -exec sh -c 'echo; echo "=== START FILE: $1 ==="; cat "$1"; echo; echo "\n=== END FILE: $1 ==="' _ {} \; | pbcopy

# find . -type f -not -name "package-lock.json"  -not -name "snapshot.txt"  -not -path "*/node_modules/*" -exec sh -c '
#   echo;
#   echo "=== START FILE: $1 ===";
#   cat "$1";
#   echo;
#   echo "=== END FILE: $1 ==="
# ' sh {} \; | tee snapshot.txt > /dev/null



echo "=== 'pwd' ==="
pwd
echo -e "\n=== sham21/ contents ('find sham21 ...') ==="
find sham21 -not -path "*/node_modules/*" -not -path "*/.*/*" -not -path "*/trash/*" | sort | sed 's|[^/]*/|- |g' | sed 's|- |  |' | sed 's|^ *||'
echo -e "\n=== 'ls -1' ==="
ls -1
echo -e "\n=== 'cat replacer/replacer_llm_instructions.md' ==="
cat replacer/replacer_llm_instructions.md
echo ''
echo "=== 'pwd' ==="
pwd
=== END FILE: ./fs ===

=== START FILE: ./src/parsers/parseHeader.ts ===
import type { HeaderResult } from '../types';

/**
 * Parse SHAM header line
 * Expected format: #!SHAM [@three-char-SHA-256: XXX]
 */
export function parseHeader(line: string): HeaderResult {
  const match = line.match(/^#!SHAM \[@three-char-SHA-256: ([^\]]+)\]$/);
  
  if (!match) {
    return { isValid: false };
  }
  
  return {
    isValid: true,
    blockId: match[1]
  };
}
=== END FILE: ./src/parsers/parseHeader.ts ===

=== START FILE: ./src/parsers/parseAssignment.ts ===
import type { AssignmentResult } from '../types';

/**
 * Parse a line that might be a key-value assignment
 * Returns 0-based UTF-16 code unit positions for errors
 * 
 * Position semantics by error type:
 * - EMPTY_KEY: Points to the '=' character
 * - INVALID_OPERATOR: Points to start of invalid operator (e.g., ':=' starts at ':')
 * - UNCLOSED_QUOTE: Points to the opening quote
 * - INVALID_VALUE: Points to start of the invalid value content
 * - TRAILING_CONTENT: Points to first character after valid value
 * - MALFORMED_ASSIGNMENT: Full line (position 0, length = line.length)
 */
export function parseAssignment(line: string): AssignmentResult {
  // Check for => operator specifically first
  const arrowOp = line.indexOf('=>');
  if (arrowOp !== -1) {
    // Check if there's a standalone = before the =>
    const equalIndex = line.indexOf('=');
    if (equalIndex === -1 || equalIndex === arrowOp) {
      // No standalone = found, so => is invalid
      return {
        success: false,
        error: {
          code: 'INVALID_VALUE',
          position: arrowOp,
          length: 2
        }
      };
    }
  }
  
  // Check for := operator
  const colonEquals = line.indexOf(':=');
  if (colonEquals !== -1) {
    return {
      success: false,
      error: {
        code: 'INVALID_OPERATOR',
        position: colonEquals,
        length: 2
      }
    };
  }

  // Now, find the standard equals sign. If it's missing, it's a general malformed line.
  const equalIndex = line.indexOf('=');
  if (equalIndex === -1) {
    return {
      success: false,
      error: {
        code: 'MALFORMED_ASSIGNMENT',
        position: 0,
        length: line.length
      }
    };
  }
  
  // Check for empty key
  const beforeEqual = line.substring(0, equalIndex);
  const key = beforeEqual.trim();
  
  if (!key) {
    return {
      success: false,
      error: {
        code: 'EMPTY_KEY',
        position: equalIndex,
        length: 1
      }
    };
  }
  
  const afterEqual = line.substring(equalIndex + 1);
  const trimmedAfterEqual = afterEqual.trim();
  
  // Check if value is empty
  if (!trimmedAfterEqual) {
    // Point to position after the equals and any spaces
    const afterEqualLength = afterEqual.length;
    return {
      success: false,
      error: {
        code: 'INVALID_VALUE',
        position: equalIndex + 1 + afterEqualLength,
        length: 1
      }
    };
  }
  
  // Check for quoted value
  if (trimmedAfterEqual.startsWith('"')) {
    const valueStartIndex = equalIndex + 1 + afterEqual.indexOf('"');
    let i = 1; // Start after opening quote
    let escaped = false;
    let closingQuoteIndex = -1;
    
    while (i < trimmedAfterEqual.length) {
      if (trimmedAfterEqual[i] === '\n') {
        // Newline found before closing quote
        closingQuoteIndex = -1;
        break;
      } else if (trimmedAfterEqual[i] === '\\' && !escaped) {
        escaped = true;
      } else if (trimmedAfterEqual[i] === '"' && !escaped) {
        closingQuoteIndex = i;
        break;
      } else {
        escaped = false;
      }
      i++;
    }
    
    if (closingQuoteIndex === -1) {
      return {
        success: false,
        error: {
          code: 'UNCLOSED_QUOTE',
          position: valueStartIndex,
          length: line.length - valueStartIndex
        }
      };
    }
    
    try {
      const quotedPart = trimmedAfterEqual.substring(0, closingQuoteIndex + 1);
      const value = JSON.parse(quotedPart);
      
      // Check for trailing content after closing quote AFTER successful parse
      const afterClosingQuote = trimmedAfterEqual.substring(closingQuoteIndex + 1);
      if (afterClosingQuote.trim()) {
        // Find the position of first non-whitespace character after closing quote
        const afterQuoteWhitespace = afterClosingQuote.match(/^\s*/)?.[0].length ?? 0;
        const trailingStartInTrimmed = closingQuoteIndex + 1 + afterQuoteWhitespace;
        const trailingStartInLine = equalIndex + 1 + afterEqual.indexOf(trimmedAfterEqual) + trailingStartInTrimmed;
        return {
          success: false,
          error: {
            code: 'TRAILING_CONTENT',
            position: trailingStartInLine,
            length: line.length - trailingStartInLine
          }
        };
      }
      
      return { success: true, type: 'key-value', key, value };
    } catch {
      return {
        success: false,
        error: {
          code: 'INVALID_VALUE',
          position: valueStartIndex,
          length: closingQuoteIndex + 1
        }
      };
    }
  }
  
  // Check for heredoc
  const heredocMatch = trimmedAfterEqual.match(/^<<'([^']+)'$/);
  if (heredocMatch) {
    return { success: true, type: 'heredoc', key, delimiter: heredocMatch[1] };
  }
  
  // Invalid value format
  const valueStart = equalIndex + 1 + afterEqual.indexOf(trimmedAfterEqual);
  return {
    success: false,
    error: {
      code: 'INVALID_VALUE',
      position: valueStart,
      length: trimmedAfterEqual.length
    }
  };
}
=== END FILE: ./src/parsers/parseAssignment.ts ===

=== START FILE: ./src/parsers/parseEndMarker.ts ===
import type { EndMarkerResult } from '../types';

/**
 * Parse SHAM end marker line
 * Expected format: #!END_SHAM_XXX
 */
export function parseEndMarker(line: string): EndMarkerResult {
  const match = line.match(/^#!END_SHAM_([A-Za-z0-9]{3})$/);
  
  if (!match) {
    return { isEnd: false };
  }
  
  return {
    isEnd: true,
    blockId: match[1]
  };
}
=== END FILE: ./src/parsers/parseEndMarker.ts ===

=== START FILE: ./src/utils/classifyLine.ts ===
import type { LineType } from '../types';

/**
 * Classify a line by its content
 * Priority order: end_marker > header > assignment > empty
 */
export function classifyLine(line: string): LineType {
  const trimmed = line.trim();
  
  if (!trimmed) {
    return 'empty';
  }
  
  // Check in priority order from config
  if (trimmed.startsWith('#!END_SHAM_')) {
    return 'end_marker';
  }
  
  if (trimmed.startsWith('#!SHAM ')) {
    return 'header';
  }
  
  if (trimmed.includes('=')) {
    return 'assignment';
  }
  
  return 'unknown';
}
=== END FILE: ./src/utils/classifyLine.ts ===

=== START FILE: ./src/utils/getContextWindow.ts ===
/**
 * Get context window around target line for error reporting
 * Returns context as a single string with newlines preserved
 */
export function getContextWindow(
  content: string, 
  targetLine: number, 
  windowSize: number = 5
): string {
  const lines = content.split('\n');
  // Convert to 0-based index
  const targetIndex = targetLine - 1;
  const totalLines = lines.length;
  
  // If file has fewer lines than window size, return entire file
  if (totalLines <= windowSize) {
    return lines.join('\n');
  }
  
  // Calculate ideal centered window
  const halfWindow = Math.floor(windowSize / 2);
  let start = targetIndex - halfWindow;
  let end = targetIndex + halfWindow;
  
  // Adjust bounds if they exceed file limits
  if (start < 0) {
    // Shift window right
    end = end - start;  // Add the negative start to end
    start = 0;
  } else if (end >= totalLines) {
    // Shift window left
    start = start - (end - totalLines + 1);
    end = totalLines - 1;
  }
  
  // Final bounds check
  start = Math.max(0, start);
  end = Math.min(totalLines - 1, end);
  
  return lines.slice(start, end + 1).join('\n');
}
=== END FILE: ./src/utils/getContextWindow.ts ===

=== START FILE: ./src/utils/getErrorPosition.ts ===
 
=== END FILE: ./src/utils/getErrorPosition.ts ===

=== START FILE: ./src/parser.ts ===
import { validateBlockId } from './validators/validateBlockId';
import { validateKey } from './validators/validateKey';
import { findInvalidCharPosition } from './validators/findInvalidCharPosition';
import { validateHeredocDelimiter } from './validators/validateHeredocDelimiter';
import { parseHeader } from './parsers/parseHeader';
import { parseEndMarker } from './parsers/parseEndMarker';
import { parseAssignment } from './parsers/parseAssignment';
import { classifyLine } from './utils/classifyLine';
import { getContextWindow } from './utils/getContextWindow';
import type { Block, ParseError, ParseResult, CharIndex, Column, LineNumber } from './types';

type ParserState = 'SEEKING_HEADER' | 'IN_BLOCK' | 'IN_HEREDOC';

interface HeredocInfo {
  key: string;
  delimiter: string;
  content: string[];
  startLine: number;
}

/**
 * Parse SHAM format content into blocks and errors
 * All parsing uses 0-based indices internally, converted to 1-based for output
 */
export function parseSHAM(content: string): ParseResult {
  const lines = content.split(/\r?\n/);
  let state: ParserState = 'SEEKING_HEADER';
  const blocks: Block[] = [];
  const errors: ParseError[] = [];
  let currentBlock: Block | null = null;
  let heredocInfo: HeredocInfo | null = null;

  // Helper to add error with context
  const addError = (
    code: string,
    lineNum: LineNumber,
    message: string,
    column: CharIndex = 0,
    length?: number
  ) => {
    const line = lines[lineNum - 1] || '';
    errors.push({
      code,
      line: lineNum,
      column: column + 1, // Convert to 1-based
      length: length !== undefined ? length : line.length,
      blockId: currentBlock?.id || null,
      content: line,
      context: getContextWindow(content, lineNum),
      message
    });
  };

  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];
    const lineType = classifyLine(line);

    switch (state) {
      case 'SEEKING_HEADER': {
        if (lineType === 'header') {
          const headerResult = parseHeader(line);
          if (headerResult.isValid && headerResult.blockId) {
            const validation = validateBlockId(headerResult.blockId);
            if (validation.valid) {
              currentBlock = {
                id: headerResult.blockId,
                properties: {},
                startLine: lineNum,
                endLine: null
              };
              state = 'IN_BLOCK';
            } else {
              const blockIdIndex = line.indexOf(headerResult.blockId);
              addError(
                'INVALID_BLOCK_ID',
                lineNum,
                validation.error || 'Invalid block ID',
                blockIdIndex >= 0 ? blockIdIndex : 0,
                headerResult.blockId.length
              );
            }
          } else {
            addError('MALFORMED_HEADER', lineNum, 'Invalid SHAM header format');
          }
        } else if (lineType !== 'empty') {
          // Non-empty line outside of block - skip silently
        }
        break;
      }

      case 'IN_BLOCK': {
        if (!currentBlock) break;

        if (lineType === 'end_marker') {
          const endResult = parseEndMarker(line);
          if (endResult.isEnd && endResult.blockId) {
            if (endResult.blockId === currentBlock.id) {
              currentBlock.endLine = lineNum;
              blocks.push(currentBlock);
              currentBlock = null;
              state = 'SEEKING_HEADER';
            } else {
              addError(
                'MISMATCHED_END',
                lineNum,
                `End marker '${endResult.blockId}' doesn't match block ID '${currentBlock.id}'`
              );
              // Recover by closing block anyway
              currentBlock.endLine = lineNum;
              blocks.push(currentBlock);
              currentBlock = null;
              state = 'SEEKING_HEADER';
            }
          }
        } else if (lineType === 'header') {
          // New header without closing previous block
          addError(
            'UNCLOSED_BLOCK',
            lineNum - 1,
            `Block '${currentBlock.id}' not closed before new block`,
            0,
            0
          );
          // Process the new header
          const headerResult = parseHeader(line);
          if (headerResult.isValid && headerResult.blockId) {
            const validation = validateBlockId(headerResult.blockId);
            if (validation.valid) {
              // Save previous block without endLine
              blocks.push(currentBlock);
              currentBlock = {
                id: headerResult.blockId,
                properties: {},
                startLine: lineNum,
                endLine: null
              };
            } else {
              // Save previous block and go to seeking state
              blocks.push(currentBlock);
              currentBlock = null;
              state = 'SEEKING_HEADER';
              const blockIdIndex = line.indexOf(headerResult.blockId);
              addError(
                'INVALID_BLOCK_ID',
                lineNum,
                validation.error || 'Invalid block ID',
                blockIdIndex >= 0 ? blockIdIndex : 0,
                headerResult.blockId.length
              );
            }
          }
        } else if (lineType === 'assignment') {
          const assignment = parseAssignment(line);
          
          if (assignment.success) {
            if (assignment.type === 'key-value') {
              // Check for leading whitespace in the original line
              const equalIndex = line.indexOf('=');
              const rawKey = line.substring(0, equalIndex);
              const hasLeadingWhitespace = rawKey.length > 0 && rawKey[0] !== rawKey.trimStart()[0];
              
              const keyValidation = validateKey(assignment.key);
              if (!keyValidation.valid || hasLeadingWhitespace) {
                const invalidChar = findInvalidCharPosition(assignment.key);
                if (hasLeadingWhitespace) {
                  // Report error for leading whitespace
                  const leadingChar = rawKey[0];
                  addError(
                    'INVALID_KEY',
                    lineNum,
                    `Key contains invalid character '${leadingChar}' at position 1`,
                    0,
                    rawKey.trimEnd().length
                  );
                } else if (invalidChar) {
                  addError(
                    'INVALID_KEY',
                    lineNum,
                    `Key contains invalid character '${invalidChar.char}' at position ${invalidChar.position + 1}`,
                    0,
                    assignment.key.length
                  );
                } else {
                  addError(
                    'INVALID_KEY',
                    lineNum,
                    keyValidation.error || 'Invalid key',
                    0,
                    assignment.key.length
                  );
                }
              } else if (assignment.key in currentBlock.properties) {
                addError(
                  'DUPLICATE_KEY',
                  lineNum,
                  `Duplicate key '${assignment.key}' in block '${currentBlock.id}'`,
                  0,
                  assignment.key.length
                );
                // Still update the value - last one wins
                currentBlock.properties[assignment.key] = assignment.value;
              } else {
                currentBlock.properties[assignment.key] = assignment.value;
              }
            } else if (assignment.type === 'heredoc') {
              // Check for leading whitespace in the original line
              const equalIndex = line.indexOf('=');
              const rawKey = line.substring(0, equalIndex);
              const hasLeadingWhitespace = rawKey.length > 0 && rawKey[0] !== rawKey.trimStart()[0];
              
              const keyValidation = validateKey(assignment.key);
              if (!keyValidation.valid || hasLeadingWhitespace) {
                const invalidChar = findInvalidCharPosition(assignment.key);
                if (hasLeadingWhitespace) {
                  // Report error for leading whitespace
                  const leadingChar = rawKey[0];
                  addError(
                    'INVALID_KEY',
                    lineNum,
                    `Key contains invalid character '${leadingChar}' at position 1`,
                    0,
                    rawKey.trimEnd().length
                  );
                } else if (invalidChar) {
                  addError(
                    'INVALID_KEY',
                    lineNum,
                    `Key contains invalid character '${invalidChar.char}' at position ${invalidChar.position + 1}`,
                    0,
                    assignment.key.length
                  );
                } else {
                  addError(
                    'INVALID_KEY',
                    lineNum,
                    keyValidation.error || 'Invalid key',
                    0,
                    assignment.key.length
                  );
                }
              }
              
              if (keyValidation.valid && !hasLeadingWhitespace && assignment.key in currentBlock.properties) {
                addError(
                  'DUPLICATE_KEY',
                  lineNum,
                  `Duplicate key '${assignment.key}' in block '${currentBlock.id}'`,
                  0,
                  assignment.key.length
                );
              }
              
              // Process heredoc if key is valid (duplicate or not)
              if (keyValidation.valid) {
                const delimiterValidation = validateHeredocDelimiter(assignment.delimiter, currentBlock.id);
                if (delimiterValidation.valid) {
                  heredocInfo = {
                    key: assignment.key,
                    delimiter: assignment.delimiter,
                    content: [],
                    startLine: lineNum
                  };
                  state = 'IN_HEREDOC';
                } else {
                  const delimiterIndex = line.indexOf(assignment.delimiter);
                  addError(
                    'INVALID_HEREDOC_DELIMITER',
                    lineNum,
                    delimiterValidation.error || 'Invalid heredoc delimiter',
                    delimiterIndex >= 0 ? delimiterIndex : 0,
                    assignment.delimiter.length
                  );
                }
              }
            }
          } else {
            // Handle assignment parse errors
            const error = assignment.error;
            if (error.code === 'INVALID_OPERATOR') {
              // Extract the operator from the line
              const operator = line.substring(error.position, error.position + error.length);
              addError(
                'INVALID_ASSIGNMENT_OPERATOR',
                lineNum,
                `Invalid assignment operator '${operator}' - only '=' is allowed`,
                error.position,
                error.length
              );
            } else if (error.code === 'TRAILING_CONTENT') {
              // For trailing content, we can still parse the key-value part
              // Try to extract just the valid part
              const equalIndex = line.indexOf('=');
              const afterEqual = line.substring(equalIndex + 1).trim();
              if (afterEqual.startsWith('"')) {
                let i = 1;
                let escaped = false;
                while (i < afterEqual.length && (afterEqual[i] !== '"' || escaped)) {
                  escaped = afterEqual[i] === '\\' && !escaped;
                  i++;
                }
                if (i < afterEqual.length && afterEqual[i] === '"') {
                  try {
                    const quotedPart = afterEqual.substring(0, i + 1);
                    const value = JSON.parse(quotedPart);
                    const keyPart = line.substring(0, equalIndex).trim();
                    const keyValidation = validateKey(keyPart);
                    if (keyValidation.valid && !(keyPart in currentBlock.properties)) {
                      currentBlock.properties[keyPart] = value;
                    }
                  } catch {
                    // Ignore parse errors, we already have TRAILING_CONTENT error
                  }
                }
              }
              addError(
                error.code,
                lineNum,
                getErrorMessage(error.code, line, currentBlock?.id),
                error.position,
                error.length
              );
            } else {
              addError(
                error.code,
                lineNum,
                getErrorMessage(error.code, line, currentBlock?.id),
                error.position,
                error.length
              );
            }
          }
        } else if (lineType === 'empty') {
          // Empty lines are allowed in blocks
        } else {
          // Unknown line type in block
          addError(
            'MALFORMED_ASSIGNMENT',
            lineNum,
            `Invalid line format in block '${currentBlock.id}': not a valid key-value assignment or empty line`
          );
        }
        break;
      }

      case 'IN_HEREDOC': {
        if (!heredocInfo || !currentBlock) break;

        if (line === heredocInfo.delimiter) {
          // End of heredoc
          const content = heredocInfo.content.join('\n');
          currentBlock.properties[heredocInfo.key] = content;
          heredocInfo = null;
          state = 'IN_BLOCK';
        } else {
          // All lines in heredoc are content
          heredocInfo.content.push(line);
        }
        break;
      }
    }
  }

  // Handle EOF conditions
  if (state === 'IN_HEREDOC' && heredocInfo && currentBlock) {
    addError(
      'UNCLOSED_HEREDOC',
      lines.length + 1,
      `Heredoc '${heredocInfo.delimiter}' not closed before EOF`,
      0,
      0
    );
    // Save partial block
    currentBlock.endLine = null;
    blocks.push(currentBlock);
  } else if (state === 'IN_BLOCK' && currentBlock) {
    addError(
      'UNCLOSED_BLOCK',
      lines.length + 1,
      `Block '${currentBlock.id}' not closed before EOF`,
      0,
      0
    );
    currentBlock.endLine = null;
    blocks.push(currentBlock);
  }

  return { blocks, errors };
}

/**
 * Get appropriate error message for error code
 */
function getErrorMessage(code: string, line: string, blockId?: string | null): string {
  switch (code) {
    case 'EMPTY_KEY':
      return 'Assignment without key name';
    case 'UNCLOSED_QUOTE':
      return 'Unclosed quoted string';
    case 'INVALID_VALUE':
      return 'Value must be a quoted string or heredoc';
    case 'TRAILING_CONTENT':
      return 'Unexpected content after quoted value';
    case 'MALFORMED_ASSIGNMENT':
      return blockId 
        ? `Invalid line format in block '${blockId}': not a valid key-value assignment or empty line`
        : 'Invalid assignment format';
    default:
      return 'Invalid syntax';
  }
}
=== END FILE: ./src/parser.ts ===

=== START FILE: ./src/types.ts ===
/** 0-based UTF-16 code unit index within a line */
export type CharIndex = number;

/** 1-based column number for display (UTF-16 code units) */
export type Column = number;

/** 1-based line number */
export type LineNumber = number;

export interface Block {
  id: string;
  properties: Record<string, string>;
  startLine: LineNumber;
  endLine: LineNumber | null;
}

export interface ParseError {
  code: string;
  line: LineNumber;
  column: Column;
  length: number;
  blockId: string | null;
  content: string;
  context: string;
  message: string;
}

export interface ParseResult {
  blocks: Block[];
  errors: ParseError[];
}

export type AssignmentResult = 
  | { success: true; type: 'key-value'; key: string; value: string }
  | { success: true; type: 'heredoc'; key: string; delimiter: string }
  | { success: false; error: {
      code: 'EMPTY_KEY' | 'INVALID_OPERATOR' | 'UNCLOSED_QUOTE' | 
            'INVALID_VALUE' | 'TRAILING_CONTENT' | 'MALFORMED_ASSIGNMENT';
      position: CharIndex;
      length: number;
    }};

export type LineType = 'header' | 'end_marker' | 'assignment' | 'empty' | 'unknown';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface HeaderResult {
  isValid: boolean;
  blockId?: string;
}

export interface EndMarkerResult {
  isEnd: boolean;
  blockId?: string;
}
=== END FILE: ./src/types.ts ===

=== START FILE: ./src/index.ts ===
export { parseSHAM } from './parser';
export type { Block, ParseError, ParseResult } from './types';
=== END FILE: ./src/index.ts ===

=== START FILE: ./src/validators/validateBlockId.ts ===
import type { ValidationResult } from '../types';
import { BLOCK_ID_PATTERN, BLOCK_ID_LENGTH } from '../patterns';

/**
 * Validate block ID meets requirements:
 * - Exactly 3 characters
 * - Only alphanumeric characters
 */
export function validateBlockId(id: string): ValidationResult {
  if (id.length !== BLOCK_ID_LENGTH) {
    return {
      valid: false,
      error: `Block ID must be exactly ${BLOCK_ID_LENGTH} characters`
    };
  }
  
  if (!BLOCK_ID_PATTERN.test(id)) {
    return {
      valid: false,
      error: 'Block ID must contain only alphanumeric characters'
    };
  }
  
  return { valid: true };
}
=== END FILE: ./src/validators/validateBlockId.ts ===

=== START FILE: ./src/validators/validateKey.ts ===
import type { ValidationResult } from '../types';
import { KEY_START_PATTERN, KEY_CHARS_PATTERN, EXCLUDE_CHARS_PATTERN, KEY_MAX_LENGTH } from '../patterns';

/**
 * Validate key name meets requirements:
 * - Starts with Unicode letter or underscore
 * - Contains only Unicode letters, digits, underscores
 * - No whitespace or control characters
 * - Max 256 characters
 */
export function validateKey(key: string): ValidationResult {
  if (!key) {
    return { valid: false, error: 'Key cannot be empty' };
  }
  
  if (key.length > KEY_MAX_LENGTH) {
    return { valid: false, error: `Key exceeds ${KEY_MAX_LENGTH} character limit` };
  }
  
  // Check first character using iterator to handle surrogate pairs
  const firstChar = [...key][0];
  if (!firstChar.match(/[\p{L}_]/u)) {
    return { valid: false, error: 'Key must start with letter or underscore' };
  }
  
  // Check for excluded characters (zero-width spaces, control chars) FIRST
  if (EXCLUDE_CHARS_PATTERN.test(key)) {
    return { valid: false, error: 'Key contains invalid characters' };
  }
  
  // Then check all characters are valid
  if (!KEY_CHARS_PATTERN.test(key)) {
    return { valid: false, error: 'Key contains invalid characters' };
  }
  
  return { valid: true };
}
=== END FILE: ./src/validators/validateKey.ts ===

=== START FILE: ./src/validators/findInvalidCharPosition.ts ===
import { KEY_START_PATTERN, KEY_CHARS_PATTERN, EXCLUDE_CHARS_PATTERN } from '../patterns';

interface InvalidChar {
  position: number;
  char: string;
}

/**
 * Find first invalid character in a key
 * Returns 0-based UTF-16 code unit position and the character
 * Note: For characters outside BMP, position may point to a surrogate pair
 */
export function findInvalidCharPosition(key: string): InvalidChar | null {
  let position = 0;
  
  // Use string iterator to handle surrogate pairs correctly
  for (const char of key) {
    // First position must be letter or underscore
    if (position === 0 && !char.match(/[\p{L}_]/u)) {
      return { position, char };
    }
    
    // Other positions must be letter, number, or underscore
    if (position > 0 && !char.match(/[\p{L}\p{N}_]/u)) {
      return { position, char };
    }
    
    // Check for excluded characters (control, zero-width)
    if (EXCLUDE_CHARS_PATTERN.test(char)) {
      return { position, char };
    }
    
    // Advance position by the number of code units this character uses
    position += char.length;
  }
  
  return null;
}
=== END FILE: ./src/validators/findInvalidCharPosition.ts ===

=== START FILE: ./src/validators/validateHeredocDelimiter.ts ===
import type { ValidationResult } from '../types';
import { HEREDOC_PREFIX } from '../patterns';

/**
 * Validate heredoc delimiter matches expected format
 * Must be exactly 'EOT_SHAM_' + blockId
 */
export function validateHeredocDelimiter(delimiter: string, blockId: string): ValidationResult {
  const expected = `${HEREDOC_PREFIX}${blockId}`;
  
  if (delimiter !== expected) {
    return {
      valid: false,
      error: `Heredoc delimiter must be '${expected}'`
    };
  }
  
  return { valid: true };
}
=== END FILE: ./src/validators/validateHeredocDelimiter.ts ===

=== START FILE: ./src/patterns.ts ===
// Generated from sham-shared/config.json - DO NOT EDIT
export const BLOCK_ID_PATTERN = /^[A-Za-z0-9]{3}$/;
export const KEY_START_PATTERN = /^[\p{L}_]/u;
export const KEY_CHARS_PATTERN = /^[\p{L}\p{N}_]*$/u;
export const EXCLUDE_CHARS_PATTERN = /[\u200B-\u200D\u2060\uFEFF\u0000-\u001F\u007F-\u009F]/;
export const HEREDOC_PREFIX = 'EOT_SHAM_';

export const KEY_MAX_LENGTH = 256;
export const BLOCK_ID_LENGTH = 3;
export const MAX_FILE_SIZE = 104857600;

export const ERROR_CONTEXT_WINDOW = 5;
export const LINE_ENDING = '\n';

=== END FILE: ./src/patterns.ts ===