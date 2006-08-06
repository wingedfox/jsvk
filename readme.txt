Virtual Keyboard v1.2.0

При помощи этой библиотеки вы можите добавить на свой сайт виртуальную клавиатуру, при помощи которой пользователь может мышкой набирать текст. В случае если курсор находится не в конце строки, то набираемый текст будет раздвигать уже имеющийся текст. К сожалению эта функция не работает в броузере Opera. В нем набираемый текст всегда добавляется после уже имеющегося в текстовом поле текста.

Для использования библиотеки необходимо выполнить следующие действия:
1) добавить в раздел head html-документа следующий код:

<script type="text/javascript" src="ArrayExtensions.js"></script>
<script type="text/javascript" src="DOMextensions.js"></script>
<script type="text/javascript" src="ddi/ddi.js"></script>
<script type="text/javascript" src="ddi/Plugins/ddi.plugin.fixNoMouseSelect.js"></script>
<script type="text/javascript" src="ddi/Plugins/ddi.plugin.moveIT.js"></script>
<script type="text/javascript" src="ddi/Plugins/ddi.plugin.adjustZIndex.js"></script>
<script type="text/javascript" src="ddi/Plugins/ddi.plugin.fixDragInMz.js"></script>
<script type="text/javascript" src="ddi/Plugins/ddi.plugin.fixDragInIE.js"></script>
<script type="text/javascript" src="virtualkeyboard.js"></script>
<link rel="stylesheet" type="text/css" href="keyboard/keyboard.css" /><!-- исправить на путь до keyboard.css -->

(пути к файлам нужно изменить в соответствии с их реальным расположением на вашем сервере)

2) прописать событие onclick тем объектам при клике на которых дожена появляться клавиатура. Событие должно выглядеть следующим образом:
	onclick="return showKeyboard('inputid');"
где inputid - это параметр id текстового поля в которое будет выводиться набираемый текст.



Требует библиотеки (входят в комплект):
 DOMextensions, http://forum.dklab.ru/js/advises/RasshireniyaIe-domDlyaDrugihBrauzerovDomextensionsJs.html
 Drag'n'Drop Interface http://forum.dklab.ru/js/advises/DragNDropInterface.html

Legend:
! внимание! это важно
? не подтверждённый баг
+ новая возможность
% изменение/исправление бага
- удаление

Версии:

1.2.0
	+ Все стили вынесены из JS. (c) WingedFox
	+ Полностью переделана вёрстка. (c) WingedFox, (Мной исправлен баг возникающий в Opera 7.21)
	+ Управление стилями построено на классах и CSS событиях. (c) WingedFox (несколько багов исправлено мной)
	- Удален лишний код
	- Удалена функция onmouse заненадобнастью

1.1.0d
	% Исправлено положение кнопки с буквой "б" (в предыдущей версии она была сдвинута на 3px вправо)
	баг: В IE 6 при переносе окна меню выбора языка отстает от перемещаемого окна. При прекращении переноса меню останавливается на новом месте.

1.1.0c
	% Теперь окно нельзя переносить за кнопку "Закрыть"
	баг: В IE 6 при переносе окна меню выбора языка отстает от перемещаемого окна. При прекращении переноса меню останавливается на новом месте.

1.1.0b
	+ Часть оформления вынесена в css
	+ Таблицы заменены на слои.
	баг: В IE 6 при переносе окна меню выбора языка отстает от перемещаемого окна. При прекращении переноса меню останавливается на новом месте.

1.1.0a
	+ Добавлено «залипание» кнопки Shift. (с) Yuriy Nasretdinov
	% При скроллинге позиция "окна" не сбрасывается. (с) Yuriy Nasretdinov
	% Подправлен внешний вид (с) Yuriy Nasretdinov
	+ Добавлено отображение подсказок (функция kb_notice()). (с) Yuriy Nasretdinov

1.0.1
	+ Часть стиля кнопок вынесена в CSS
	% При отображении клавиатуры надписи на кнопках переписываются.
	% Нажатие Caps Lock отменяет нажатие Shift

1.0
	+ первая версия