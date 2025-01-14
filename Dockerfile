FROM node:21.6.2-alpine as build
ARG CLIENT_ID
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN sed -i "s/clientId:.*/clientId: '$CLIENT_ID',/" /app/src/environments/environment.ts
RUN pnpm build

FROM nginx:1.21.5-alpine
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
RUN chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d && \
        chown -R nginx:nginx /usr/share/nginx
RUN touch /var/run/nginx.pid && chown -R nginx:nginx /var/run/nginx.pid
USER nginx
COPY --from=build /app/dist/**/ /usr/share/nginx/html
EXPOSE 80