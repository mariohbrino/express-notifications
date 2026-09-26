FROM node:26.6-bullseye-slim AS deploy
ARG USERNAME=node

WORKDIR /app
RUN chown ${USERNAME}:${USERNAME} /app
USER ${USERNAME}

COPY --chown=${USERNAME}:${USERNAME} package*.json ./
RUN npm install
COPY --chown=${USERNAME}:${USERNAME} . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
