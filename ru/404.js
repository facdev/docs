
$('title').text('Запрашиваемая страница не найдена');

$DOC.onload(function() {
    var div = $DOC.cbody.add('div');
    div
        ._add('h2', 'Запрашиваемая страница не найдена\nСоздать страницу?')
        ._add('bootstrap.Button', 'Да')
        ._add('bootstrap.Button', 'Нет');
    div.createElement();
});