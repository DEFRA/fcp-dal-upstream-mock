ARG PARENT_VERSION=latest-22
ARG PROD_PARENT_VERSION=22-debian12
ARG PORT=3100
ARG PORT_DEBUG=9229

# Build a static version of curl
FROM alpine:3 AS curl
WORKDIR /root
RUN apk add --no-cache \
  autoconf automake build-base curl-dev git libssh2-dev libtool musl-dev \
  openssl-dev openssl-libs-static pkgconfig zlib-static zstd-static \
 && git clone --depth=1 https://github.com/curl/curl.git . \
 && autoreconf -fi \
 && ./configure \
  --disable-shared --disable-ldap --disable-rtsp --disable-dict --disable-gopher \
  --disable-imap --disable-pop3 --disable-smtp --disable-telnet --disable-tftp \
  --disable-manual --disable-libcurl-option \
  --enable-static \
  --with-openssl \
  --without-libpsl --without-brotli \
  --prefix=/static-build \
  CPPFLAGS="-I/usr/include" \
  LDFLAGS="-L/usr/lib -static" \
 && make -j$(nproc) LDFLAGS="-all-static"

# Install the prod dependencies
FROM defradigital/node-development:${PARENT_VERSION} AS base
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src

# Build a development and debugging image
FROM base AS development
ARG PARENT_VERSION
LABEL uk.gov.defra.ffc.parent-image=defradigital/node-development:${PARENT_VERSION}
RUN apk add --no-cache curl jq

ARG PORT
ARG PORT_DEBUG
ENV PORT=${PORT}
EXPOSE ${PORT} ${PORT_DEBUG}

RUN npm install
CMD [ "npm", "run", "server:watch" ]

# Build production image
FROM gcr.io/distroless/nodejs${PROD_PARENT_VERSION} AS production
ARG PROD_PARENT_VERSION
LABEL uk.gov.defra.ffc.parent-image=gcr.io/distroless/nodejs:${PROD_PARENT_VERSION}

# add curl to satisfy platform health check demands
COPY --from=curl /root/src/curl /usr/bin/curl

ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}
WORKDIR /home/nonroot
COPY --from=base /home/node/node_modules ./node_modules
COPY src ./src

ENV NODE_ENV=production
USER nonroot
CMD [ "src/index.js" ]
