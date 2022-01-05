ARG path_prefix

FROM freeyeti/dev-in-docker:node-12-yarn-2 as builder

ARG path_prefix
ENV PATH_PREFIX=${path_prefix}

RUN mkdir /workcode
WORKDIR /workcode
COPY . .

RUN yarn install && yarn build \
    && mv ./assets /assets

FROM nginx:mainline-alpine

COPY --from=builder /assets /assets
COPY ./nginx-site.conf /etc/nginx/conf.d/default.conf

WORKDIR /
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
