# Makefile for VirtualKeyboard
#
# @author Ilya Lebedev <ilya@lebedev.net>

CURDIR = .

# JavaScript compressor, see TrickyScripter.com for more info
TS = /bin/ts
# Set owner for files in archive
TAR = tar --group=users --owner=wingedfox
# Grep version
DIST_VERSION = $(shell perl -ne 'm/$$HeadURL.*?\/(tags\/[^.]+.v([\w.]+)|trunk)/ && print ($$2||$$1) && exit' ./virtualkeyboard.js)
DIST_BUILD = $(shell perl -ne 'm/\$$Id[^\d]+(\d+)/ && print ($$1) && exit' ./virtualkeyboard.js)
$(shell perl -pi -e 's/{{VERSION}}/$(DIST_VERSION).$(DIST_BUILD)/' ./virtualkeyboard.js)
# Distribution name
DIST_NAME = VirtualKeyboard.$@.$(DIST_VERSION)
DIST_NAME_ARC = VirtualKeyboard.$@.$(DIST_VERSION).tar.gz
# Distribution path
DIST_PATH = $(CURDIR)/$(DIST_NAME)/

# Common folders
EXT_DIR = $(CURDIR)/extensions
CSS_DIR = $(CURDIR)/css
EXT_COMPRESS_OUT = e.js

# {{{ DOCS
DOCS=$(CURDIR)/license.txt
# }}}

# {{{ BrowserExtensions
EXT=$(EXT_DIR)/helpers.js \
		$(EXT_DIR)/ext/object.js \
		$(EXT_DIR)/ext/array.js \
		$(EXT_DIR)/dom.js \
		$(EXT_DIR)/eventmanager.js \
		$(EXT_DIR)/ext/regexp.js \
		$(EXT_DIR)/ext/string.js \
		$(EXT_DIR)/documentcookie.js \
		$(EXT_DIR)/documentselection.js \
# }}}

# {{{ LAYOUTS
LAYOUTS=$(CURDIR)/layouts/layouts.js
# }}}

# {{{ SKINS
SKINS=$(CSS_DIR)/*/button_set.gif \
		$(CSS_DIR)/*/button_set.png \
		$(CSS_DIR)/*/thumbnail.png \
		$(CSS_DIR)/*/keyboard.css
# }}}

# {{{ SOURCES
SOURCES=$(CURDIR)/virtualkeyboard.js \
		$(CURDIR)/vk_*.js \
		$(CURDIR)/vk_*.html \
		$(EXT_DIR)/scriptqueue.js
# }}}

# {{{ DEMO
DEMO=$(CURDIR)/demo*.html 
# }}}

# {{{ SETUP
SETUP=$(CURDIR)/setup
# }}}

# {{{ ICON
ICON=$(CURDIR)/img/jsvk.gif \
		$(CURDIR)/img/jsvk_off.gif
# }}}

# {{{ TINY_MCE
TINYMCE=$(CURDIR)/plugins/tinymce/*
# }}}

# {{{ TINY_MCE3
TINYMCE3=$(CURDIR)/plugins/tinymce3/*
# }}}

# {{{ XINHA
XINHA=$(CURDIR)/plugins/xinha/*
# }}}

# {{{ FCKEDITOR
FCKEDITOR=$(CURDIR)/plugins/fckeditor/*
# }}}

FILES_LITE = $(DOCS) $(LAYOUTS) $(SKINS) $(SOURCES) $(DEMO) $(ICON)
FILES_COMPACT = $(FILES_LITE) $(SETUP)
FILES_FULL  = $(FILES_COMPACT) $(EXT)
FILES_TINYMCE = $(TINYMCE)
FILES_TINYMCE3 = $(TINYMCE3)
FILES_XINHA = $(XINHA)
FILES_FCKEDITOR = $(FCKEDITOR)

# Target names substitution
tinymce = TINYMCE
tinymce3 = TINYMCE3
xinha = XINHA
fckeditor = FCKEDITOR

full:
		@echo "Creating full distribution"
		@-rm $(DIST_NAME) -Rf
		@mkdir $(DIST_NAME)
		@cp --parents -r $(FILES_FULL) $(DIST_PATH)
		@echo "Creating archive"
		@$(TAR) -zcf $(DIST_NAME_ARC) $(DIST_PATH)
		@rm $(DIST_NAME) -Rf
		@echo "All done"

compact:
		@echo "Creating compact distribution"
		@-rm $(DIST_NAME) -Rf
		@mkdir $(DIST_NAME)
		@mkdir $(DIST_PATH)extensions
		@cp --parents -r $(FILES_COMPACT) $(DIST_PATH)
		@echo "Compressing scripts"
		@$(TS) -db $(EXT) $(DIST_PATH)extensions/e.js
		@sed '/var dpd/!b;/extensions\//!b;:a /]/!{N;ba};s,\[[^]]\+,["extensions/e.js",' $(DIST_PATH)vk_loader.js >$(DIST_PATH)vk_loader.js.tmp
		@mv $(DIST_PATH)vk_loader.js.tmp $(DIST_PATH)vk_loader.js
		@$(TS) -r -db $(DIST_PATH)
		@echo "Creating archive"
		@$(TAR) -zcf $(DIST_NAME_ARC) $(DIST_PATH)
		@rm $(DIST_NAME) -Rf
		@echo "All done"

lite:
		@echo "Creating lite distribution"
		@-rm $(DIST_NAME) -Rf
		@mkdir $(DIST_NAME)
		@mkdir $(DIST_PATH)extensions
		@cp --parents -r $(FILES_LITE) $(DIST_PATH)
		@echo "Compressing scripts"
		@$(TS) -db $(EXT) $(DIST_PATH)extensions/e.js
		@sed '/var dpd/!b;/extensions\//!b;:a /]/!{N;ba};s,\[[^]]\+,["extensions/e.js",' $(DIST_PATH)vk_loader.js >$(DIST_PATH)vk_loader.js.tmp
		@mv $(DIST_PATH)vk_loader.js.tmp $(DIST_PATH)vk_loader.js
		@$(TS) -r -db $(DIST_PATH)
		@echo "Creating archive"
		@$(TAR) -zcf $(DIST_NAME_ARC) $(DIST_PATH)
		@rm $(DIST_NAME) -Rf
		@echo "All done"

tinymce tinymce3 xinha fckeditor:: compact
		@echo "Creating $@ plugin from $< distribution"
		@-rm $(DIST_NAME) -Rf
		@mkdir $(DIST_NAME)
		@mkdir $(DIST_PATH)Jsvk
		@cp -r $(FILES_$($@)) $(DIST_PATH)Jsvk/
		@cp -r $(ICON) $(DIST_PATH)Jsvk/img
		@echo "Creating archive"
		@$(TAR) -zxf $(subst $@,$<,$(DIST_NAME_ARC)) -C "$(DIST_PATH)Jsvk/jscripts/" --strip=2 "./$(subst $@,$<,$(DIST_NAME))" 
		@$(call $(findstring tinymce,$@)_renamer)
		@$(TAR) -zcf $(DIST_NAME_ARC) --strip=3 -C "$(DIST_PATH)" Jsvk
		@rm -Rf $(DIST_NAME)
		@echo "All done"

define tinymce_renamer
		@echo "Creating _src copy of plugin script"
	        @cp $(DIST_PATH)Jsvk/editor_plugin.js $(DIST_PATH)Jsvk/editor_plugin_src.js
		@echo "Packing plugin"
	        @$(TS) -r -db $(DIST_PATH)Jsvk/editor_plugin.js
endef

all: full compact lite plugins

plugins: tinymce tinymce3 xinha fckeditor 

# setup vim:ts=4:sw=4:fdm:marker:
