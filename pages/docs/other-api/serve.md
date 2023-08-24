---
title: "@remix-run/serve"
toc: false
order: 3
---

# Remix App Server

Remix is designed for you to own your server, but if you don't want to set one up you can use the Remix App Server instead. It's a production-ready, but basic Node.js server built with Express. If you find you want to customize it, use the `@remix-run/express` adapter instead.

```sh
remix-serve <server-build-path>
```

Depending on `process.env.NODE_ENV`, the server will boot in development or production mode.

The `server-build-path` needs to point to the `serverBuildDirectory` defined in `remix.config.js`.

Because only the build artifacts (`build/`, `public/build/`) need to be deployed to production, the `remix.config.js` is not guaranteed to be available in production, so you need to tell Remix where your server build is with this option.

In development, `remix-serve` will ensure the latest code is run by purging the require cache for every request. This has some effects on your code you might need to be aware of:

- Any values in the module scope will be "reset"

  ```tsx lines=[1-3]
  // this will be reset for every request because the module cache was
  // cleared and this will be required brand new
  const cache = new Map();

  export async function loader({ params }: LoaderArgs) {
    if (cache.has(params.foo)) {
      return json(cache.get(params.foo));
    }

    const record = await fakeDb.stuff.find(params.foo);
    cache.set(params.foo, record);
    return json(record);
  }
  ```

  If you need a workaround for preserving cache in development, you can use the [`remember` utility][remember]

- Any **module side effects** will remain in place! This may cause problems, but should probably be avoided anyway.

  ```tsx lines=[3-6]
  import { json } from "@remix-run/node"; // or cloudflare/deno

  // this starts running the moment the module is imported
  setInterval(() => {
    console.log(Date.now());
  }, 1000);

  export async function loader() {
    // ...
  }
  ```

  If you need to write your code in a way that has these types of module side-effects, you should set up your own [@remix-run/express][remix-run-express] server and a tool in development like pm2-dev or nodemon to restart the server on file changes instead.

In production this doesn't happen. The server boots up and that's the end of it.

## `HOST` environment variable

You can configure the hostname for your Express app via `process.env.HOST` and that value will be passed to the internal [`app.listen`][express-listen] method when starting the server.

```sh
HOST=127.0.0.1 npx remix-serve build/
```

[remix-run-express]: adapter#createrequesthandler
[remember]: ./dev-v2#keeping-in-memory-server-state-across-rebuilds
[express-listen]: https://expressjs.com/en/api.html#app.listen
