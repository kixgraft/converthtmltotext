/* eslint-env es6 */
'use strict';

module.exports = html => {
    html = html
        .replace(/[\r\n\s]+/g, ' ') // can't operate over multi line strings and newlines have no meaning in HTML
        // h1-h6
        .replace(/<h(\d)[^>]*>\s*/gi, (m, d) => {
            d = Number(d);
            return '#'.repeat(d) + ' ';
        })
        // strong, b
        .replace(/<(strong|b)\b[^>]*>\s*/gi, '**')
        .replace(/\s*<\/(strong|b)\b[^>]*>/gi, '**')
        // em, i
        .replace(/<(em|i)\b[^>]*>\s*/gi, '*')
        .replace(/\s*<\/(em|i)\b[^>]*>/gi, '*')
        // li
        .replace(/<li\b[^>]*>\s*/gi, ' * ')
        // p, ul, ol
        .replace(/\s*<\/?(p|ul|ol)\b[^>]*>\s*/gi, '\u0000\u0000') // use placeholder byte for newline
        // br
        .replace(/\s*<br\b[^>]*>\s*/gi, '\u0000')
        // a
        .replace(/<a\s+([^>]*)>(.*?)<\/a\b[^>]*>/gi, (m, args, text) => {
            text = text.trim();
            let match = args.match(/href\s*=[\s"']*([^\s"']+)/i);
            if (!match) {
                // did not found a href?
                return '[' + text + ']';
            }
            return '[' + text + '](' + match[1] + ')';
        })
        // remove everything else
        .replace(/<\/?[a-z][^>]*>/g, ' ')
        // normalize whitespace
        .replace(/\s+/g, ' ')
        .replace(/\u0000{2,}/g, '\n\n')
        .replace(/\u0000/g, '\n')
        .trim();

    return html;
};
