# ---------- 构建阶段 ----------
FROM node:24-slim AS build
WORKDIR /app

RUN npm install -g pnpm@10

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ---------- 运行阶段 ----------
FROM node:24-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

RUN groupadd --system nodejs && useradd --system --gid nodejs nodejs

COPY --from=build --chown=nodejs:nodejs /app/.output ./

USER nodejs
EXPOSE 3000

ENTRYPOINT ["node", "server/index.mjs"]
