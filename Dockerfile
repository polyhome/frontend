FROM node:10.16-stretch as builder

WORKDIR /app

COPY . .

RUN ls -la && yarn install && \
  yarn buildprod

FROM nginx:1.17

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./entryPoint.sh /

COPY ./default.conf /etc/nginx/conf.d

RUN chmod +x entryPoint.sh

ENTRYPOINT ["./entryPoint.sh"]

CMD ["nginx", "-g", "daemon off;"]