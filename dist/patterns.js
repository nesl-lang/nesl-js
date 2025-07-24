"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LINE_ENDING = exports.ERROR_CONTEXT_WINDOW = exports.MAX_FILE_SIZE = exports.BLOCK_ID_MAX_LENGTH = exports.BLOCK_ID_MIN_LENGTH = exports.KEY_MAX_LENGTH = exports.HEREDOC_PREFIX = exports.EXCLUDE_CHARS_PATTERN = exports.KEY_CHARS_PATTERN = exports.KEY_START_PATTERN = exports.BLOCK_ID_PATTERN = void 0;
// Generated from nesl-shared/config.json - DO NOT EDIT
// Generated from nesl-shared/config.json - DO NOT EDIT
// Generated from nesl-shared/config.json - DO NOT EDIT
// Generated from nesl-shared/config.json - DO NOT EDIT
// Generated from nesl-shared/config.json - DO NOT EDIT
// Generated from nesl-shared/config.json - DO NOT EDIT
// Generated from nesl-shared/config.json - DO NOT EDIT!!!!!!!! 
// Generated from nesl-shared/config.json - DO NOT EDIT!!!!!!!! 
// Generated from nesl-shared/config.json - DO NOT EDIT!!!!!!!! 
// Generated from nesl-shared/config.json - DO NOT EDIT!!!!!!!! 
// Generated from nesl-shared/config.json - DO NOT EDIT!!!!!!!! 
// Generated from nesl-shared/config.json - DO NOT EDIT!!!!!!!! 
exports.BLOCK_ID_PATTERN = /^[A-Za-z0-9]{2,8}$/;
exports.KEY_START_PATTERN = /^[\p{L}_]/u;
exports.KEY_CHARS_PATTERN = /^[\p{L}\p{N}_]*$/u;
exports.EXCLUDE_CHARS_PATTERN = /[\u200B-\u200D\u2060\uFEFF\u0000-\u001F\u007F-\u009F]/;
exports.HEREDOC_PREFIX = 'EOT_';
exports.KEY_MAX_LENGTH = 256;
exports.BLOCK_ID_MIN_LENGTH = 2;
exports.BLOCK_ID_MAX_LENGTH = 8;
exports.MAX_FILE_SIZE = 104857600;
exports.ERROR_CONTEXT_WINDOW = 5;
exports.LINE_ENDING = '\n';
//# sourceMappingURL=patterns.js.map