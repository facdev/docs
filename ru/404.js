
$('title').text('Запрашиваемая страница не найдена');

$DOC.onload(function() {
    $DOC.cbody
        .add('h2', 'Запрашиваемая страница не найдена')
        .createElement();
});