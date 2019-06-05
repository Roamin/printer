## English

Markdown is intended to be as easy-to-read and easy-to-write as is feasible.

Readability, however, is emphasized above all else. A Markdown-formatted document should be publishable as-is, as plain text, without looking like it’s been marked up with tags or formatting instructions. While Markdown’s syntax has been influenced by several existing text-to-HTML filters — including `Setext`, `atx`, `Textile`, `reStructuredText`, `Grutatext`, and `EtText` — the single biggest source of inspiration for Markdown’s syntax is the format of plain text email.

To this end, Markdown’s syntax is comprised entirely of punctuation characters, which punctuation characters have been carefully chosen so as to look like what they mean. E.g., asterisks around a word actually look like *emphasis*. Markdown lists look like, well, lists. Even blockquotes look like quoted passages of text, assuming you’ve ever used email.

## 中文

天空瓦蓝瓦蓝，阳光透过树叶的缝隙打在地面上。

我于绿荫的光影里，走过一条街，穿过黑白相间的斑马线，穿过大街小巷，穿过熙熙攘攘的人群。

我于阳光里，微笑着，路过你的路

> 今天，周四，多云

# h1
## h2
### h3
#### h4
##### h5
###### h6

## Highlight

``#js``

```javascript {1,2,4-5}
// Dependencies
var json2md = require("json2md");

console.log(json2md([
    { h1: "JSON To Markdown" }
  , { blockquote: "A JSON to Markdown converter." }
  , { img: [
        { title: "Some image", source: "https://example.com/some-image.png" }
      , { title: "Another image", source: "https://example.com/some-image1.png" }
      , { title: "Yet another image", source: "https://example.com/some-image2.png" }
      ]
    }
  , { h2: "Features" }
  , { ul: [
        "Easy to use"
      , "You can programatically generate Markdown content"
      , "..."
      ]
    }
  , { h2: "How to contribute" }
  , { ol: [
        "Fork the project"
      , "Create your branch"
      , "Raise a pull request"
      ]
    }
]));
```

``#css``

```css
@font-face {
  font-family: Chunkfive; src: url('Chunkfive.otf');
}

body, .usertext {
  color: #F0F0F0; background: #600;
  font-family: Chunkfive, sans;
}

@import url(print.css);
@media print {
  a[href^=http]::after {
    content: attr(href)
  }
}
```

``#Bash``

```bash
#!/bin/bash

###### CONFIG
ACCEPTED_HOSTS="/root/.hag_accepted.conf"
BE_VERBOSE=false

if [ "$UID" -ne 0 ]
then
 echo "Superuser rights required"
 exit 2
fi

genApacheConf(){
 echo -e "# Host ${HOME_DIR}$1/$2 :"
}

```

``Diff``

```diff
Index: languages/ini.js
===================================================================
--- languages/ini.js    (revision 199)
+++ languages/ini.js    (revision 200)
@@ -1,8 +1,7 @@
 hljs.LANGUAGES.ini =
 {
   case_insensitive: true,
-  defaultMode:
-  {
+  defaultMode: {
     contains: ['comment', 'title', 'setting'],
     illegal: '[^\\s]'
   },

*** /path/to/original timestamp
--- /path/to/new      timestamp
***************
*** 1,3 ****
--- 1,9 ----
+ This is an important
+ notice! It should
+ therefore be located at
+ the beginning of this
+ document!

! compress the size of the
! changes.

  It is important to spell
```

## Table

| 特殊字符 | 正则表达式 记忆方式 |
| --- | --- | --- |
| 换行符 | \n | new line |
| 换页符 | \f | form feed |
| 回车符 | \r | return | 
| 空白符 | \s | space |

## Image

![Mountain](https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-439218.jpg)

![Mountain](https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-14215.jpg)

## Link

[掘金#Markdown](https://juejin.im/tag/Markdown)

## List

1. Bird
1. McHale
1. Parish


- Red
- Green
- Blue

