# grouped tasks
make:
	make install
	make compile
	make test
all:
	make preinstall
	make install
	make
	make publish

# tasks
preinstall:
	npm  install -g cnpm --registry=https://registry.npmmirror.com
	cnpm install -g webpack
	cnpm install -g jasmine
install:
	cnpm install
	npm  install
test:
	#jasmine init
	#jasmine
publish:
	npm publish
	cnpm sync template2module

