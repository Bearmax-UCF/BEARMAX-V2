FROM node:lts-alpine

ENV TZ America/New_York

RUN addgroup -S backend \
    && adduser -S -G backend backend \
    && mkdir -p /home/backend/app \
    && chown -R backend:backend /home/backend

USER backend:backend

WORKDIR /home/backend/app

COPY --chown=backend:backend . .

RUN npm ci

EXPOSE 8080/tcp

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
