
// example of using $DOC.parseContent function to create sections
$DOC.parseContent(function(){/*

<!--fixed-top-bar
%navbar(
[Главная]({{=$DOC.root}}index.html)
***
* [Главная]({{=$DOC.root}}index.html)
)%navbar
-->

<!--header-panel

# Markdown webdocs
Система подготовки веб-справки и документации
-->

<!--footer-panel
%footer-layout#scheme=line(
* © 2013 [aplib on GitHub](https://github.com/aplib/markdown-site-template) Artistic license 2.0
***
* [Редактировать эту страницу](?edit)
)%footer-layout
-->

*/});


