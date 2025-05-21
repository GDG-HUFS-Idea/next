FROM node:18-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

<<<<<<< Updated upstream
=======
# Build arguments for build-time variables
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_USER_JWT

# Set build-time environment variables
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_USER_JWT=${NEXT_PUBLIC_USER_JWT}

>>>>>>> Stashed changes
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:18-alpine AS runner

<<<<<<< Updated upstream
ENV NODE_ENV=production

=======
>>>>>>> Stashed changes
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["pnpm", "start"]