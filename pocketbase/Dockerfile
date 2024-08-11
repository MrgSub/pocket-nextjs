FROM node:latest

ARG PB_VERSION=0.21.3
RUN apt-get update && apt-get install -y wget unzip ca-certificates
COPY pb_hooks pb_hooks
RUN npm install
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /

EXPOSE 8080

# start PocketBase
CMD ["./pocketbase", "serve", "--dev", "--http=0.0.0.0:8080"]
