Virtual Keyboard v1.2.0

��� ������ ���� ���������� �� ������ �������� �� ���� ���� ����������� ����������, ��� ������ ������� ������������ ����� ������ �������� �����. � ������ ���� ������ ��������� �� � ����� ������, �� ���������� ����� ����� ���������� ��� ��������� �����. � ��������� ��� ������� �� �������� � �������� Opera. � ��� ���������� ����� ������ ����������� ����� ��� ���������� � ��������� ���� ������.

��� ������������� ���������� ���������� ��������� ��������� ��������:
1) �������� � ������ head html-��������� ��������� ���:

<script type="text/javascript" src="ArrayExtensions.js"></script>
<script type="text/javascript" src="DOMextensions.js"></script>
<script type="text/javascript" src="ddi/ddi.js"></script>
<script type="text/javascript" src="ddi/Plugins/ddi.plugin.fixNoMouseSelect.js"></script>
<script type="text/javascript" src="ddi/Plugins/ddi.plugin.moveIT.js"></script>
<script type="text/javascript" src="ddi/Plugins/ddi.plugin.adjustZIndex.js"></script>
<script type="text/javascript" src="ddi/Plugins/ddi.plugin.fixDragInMz.js"></script>
<script type="text/javascript" src="ddi/Plugins/ddi.plugin.fixDragInIE.js"></script>
<script type="text/javascript" src="virtualkeyboard.js"></script>
<link rel="stylesheet" type="text/css" href="keyboard/keyboard.css" /><!-- ��������� �� ���� �� keyboard.css -->

(���� � ������ ����� �������� � ������������ � �� �������� ������������� �� ����� �������)

2) ��������� ������� onclick ��� �������� ��� ����� �� ������� ������ ���������� ����������. ������� ������ ��������� ��������� �������:
	onclick="return showKeyboard('inputid');"
��� inputid - ��� �������� id ���������� ���� � ������� ����� ���������� ���������� �����.



������� ���������� (������ � ��������):
 DOMextensions, http://forum.dklab.ru/js/advises/RasshireniyaIe-domDlyaDrugihBrauzerovDomextensionsJs.html
 Drag'n'Drop Interface http://forum.dklab.ru/js/advises/DragNDropInterface.html

Legend:
! ��������! ��� �����
? �� ������������� ���
+ ����� �����������
% ���������/����������� ����
- ��������

������:

1.2.0
	+ ��� ����� �������� �� JS. (c) WingedFox
	+ ��������� ���������� ������. (c) WingedFox, (���� ��������� ��� ����������� � Opera 7.21)
	+ ���������� ������� ��������� �� ������� � CSS ��������. (c) WingedFox (��������� ����� ���������� ����)
	- ������ ������ ���
	- ������� ������� onmouse ���������������

1.1.0d
	% ���������� ��������� ������ � ������ "�" (� ���������� ������ ��� ���� �������� �� 3px ������)
	���: � IE 6 ��� �������� ���� ���� ������ ����� ������� �� ������������� ����. ��� ����������� �������� ���� ��������������� �� ����� �����.

1.1.0c
	% ������ ���� ������ ���������� �� ������ "�������"
	���: � IE 6 ��� �������� ���� ���� ������ ����� ������� �� ������������� ����. ��� ����������� �������� ���� ��������������� �� ����� �����.

1.1.0b
	+ ����� ���������� �������� � css
	+ ������� �������� �� ����.
	���: � IE 6 ��� �������� ���� ���� ������ ����� ������� �� ������������� ����. ��� ����������� �������� ���� ��������������� �� ����� �����.

1.1.0a
	+ ��������� ���������� ������ Shift. (�) Yuriy Nasretdinov
	% ��� ���������� ������� "����" �� ������������. (�) Yuriy Nasretdinov
	% ���������� ������� ��� (�) Yuriy Nasretdinov
	+ ��������� ����������� ��������� (������� kb_notice()). (�) Yuriy Nasretdinov

1.0.1
	+ ����� ����� ������ �������� � CSS
	% ��� ����������� ���������� ������� �� ������� ��������������.
	% ������� Caps Lock �������� ������� Shift

1.0
	+ ������ ������