default:
	make compile
	make serve

compile:
	javac -d bin -sourcepath src src/**/*.java

serve: 
	java -cp .:bin pills/RemotePillComponentHost &

clean:
	rm -f *~
	rm -f ./bin/**/*.class
	rm -f src/**/*.java~
