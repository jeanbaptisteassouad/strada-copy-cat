image_name = strada-copy-cat
pwd = $(shell pwd)

all: run

clean:
	sudo docker container prune -f

build: clean
	sudo docker build \
		--tag=$(image_name) \
		.

run: build
	sudo docker run \
		--rm \
		-p 8000:8000 \
		--mount type=bind,source=$(pwd)/db,target=/workdir/db \
		-it \
		$(image_name)