var SINGLELINE_START_COMMENT_CHARS_RX = /^(\s*)\/\/\s*/,
    MULTILINE_COMMENT_START_CHARS_RX = /\*\//,
    MULTILINE_COMMENT_END_CHARS_RX = /\/\*/;

function makeMultiLineComment(singleLineCommentsSequence) {
    var firstSpace = singleLineCommentsSequence[0].match(/^\s*/);

    firstSpace = firstSpace ? firstSpace[0] : '';

    return firstSpace + '/**' + '\n' +
        singleLineCommentsSequence.map(function(singleLineComment) {
            return singleLineComment
                // ensure lacking of `start/end of multiline comment` chars
                .replace(MULTILINE_COMMENT_START_CHARS_RX, '')
                .replace(MULTILINE_COMMENT_END_CHARS_RX, '')
                // replace `single line comment` chars with multiline ones
                .replace(SINGLELINE_START_COMMENT_CHARS_RX, firstSpace + ' * ');
        }).join('\n') +
        '\n' + firstSpace + ' */';
}

module.exports = function(codeString) {
    var commentLinesLength = 0,
        commentLinesStack = [],
        isStrOpened = false;

    return codeString
        .split('\n')
        .reduce(function(parsed, line, i) {
            // extract comment
            if (line.match(/^\s*\/\//)) {
                commentLinesStack[commentLinesLength++] = line;

                return parsed;
            }

            // ignore alone single line comments
            if (commentLinesLength === 1) {
                parsed.push(commentLinesStack.pop());
                commentLinesLength--;

                // process end of single line comments sequence
            } else if (commentLinesLength !== 0) {
                parsed.push(makeMultiLineComment(commentLinesStack));
                commentLinesStack = [];
                commentLinesLength = 0;
            }

            // ignore regular line
            parsed.push(line);

            return parsed;
        }, [])
        .join('\n');
};
