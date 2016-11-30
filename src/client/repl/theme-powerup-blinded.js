define("ace/theme/powerup-blinded",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-powerup-blinded";
exports.cssText = ".ace-powerup-blinded .ace_gutter {\
background: #000000;\
color: #000000\
}\
.ace-powerup-blinded .ace_print-margin {\
width: 1px;\
background: #25282c\
}\
.ace-powerup-blinded {\
background-color: #000000;\
color: #000000\
}\
.ace-powerup-blinded .ace_cursor {\
color: #000000\
}\
.ace-powerup-blinded .ace_marker-layer .ace_selection {\
background: #373B41\
}\
.ace-powerup-blinded.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #1D1F21;\
}\
.ace-powerup-blinded .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-powerup-blinded .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #4B4E55\
}\
.ace-powerup-blinded .ace_marker-layer .ace_active-line {\
background: #282A2E\
}\
.ace-powerup-blinded .ace_gutter-active-line {\
background-color: #000000\
}\
.ace-powerup-blinded .ace_marker-layer .ace_selected-word {\
border: 1px solid #373B41\
}\
.ace-powerup-blinded .ace_invisible {\
color: #000000\
}\
.ace-powerup-blinded .ace_keyword,\
.ace-powerup-blinded .ace_meta,\
.ace-powerup-blinded .ace_storage,\
.ace-powerup-blinded .ace_storage.ace_type,\
.ace-powerup-blinded .ace_support.ace_type {\
color: #000000\
}\
.ace-powerup-blinded .ace_keyword.ace_operator {\
color: #000000\
}\
.ace-powerup-blinded .ace_constant.ace_character,\
.ace-powerup-blinded .ace_constant.ace_language,\
.ace-powerup-blinded .ace_constant.ace_numeric,\
.ace-powerup-blinded .ace_keyword.ace_other.ace_unit,\
.ace-powerup-blinded .ace_support.ace_constant,\
.ace-powerup-blinded .ace_variable.ace_parameter {\
color: #000000\
}\
.ace-powerup-blinded .ace_constant.ace_other {\
color: #000000\
}\
.ace-powerup-blinded .ace_invalid {\
color: #000000;\
background-color: #000000\
}\
.ace-powerup-blinded .ace_invalid.ace_deprecated {\
color: #000000;\
background-color: #000000\
}\
.ace-powerup-blinded .ace_fold {\
background-color: #000000;\
border-color: #000000\
}\
.ace-powerup-blinded .ace_entity.ace_name.ace_function,\
.ace-powerup-blinded .ace_support.ace_function,\
.ace-powerup-blinded .ace_variable {\
color: #000000\
}\
.ace-powerup-blinded .ace_support.ace_class,\
.ace-powerup-blinded .ace_support.ace_type {\
color: #000000\
}\
.ace-powerup-blinded .ace_heading,\
.ace-powerup-blinded .ace_markup.ace_heading,\
.ace-powerup-blinded .ace_string {\
color: #000000\
}\
.ace-powerup-blinded .ace_entity.ace_name.ace_tag,\
.ace-powerup-blinded .ace_entity.ace_other.ace_attribute-name,\
.ace-powerup-blinded .ace_meta.ace_tag,\
.ace-powerup-blinded .ace_string.ace_regexp,\
.ace-powerup-blinded .ace_variable {\
color: #000000\
}\
.ace-powerup-blinded .ace_comment {\
color: #000000\
}\
.ace-powerup-blinded .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHB3d/8PAAOIAdULw8qMAAAAAElFTkSuQmCC) right repeat-y\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
