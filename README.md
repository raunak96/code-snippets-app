Source code for the [Next.js](https://nextjs.org/) project that uses Tailwind CSS, SWR, React Hook Form, and FaunaDB!

## Getting Started
#### FAUNADB SETUP
1. [Sign up for a free account at FaunaDB](http://fauna.com).

2. In `.env.local`, fill in your `FAUNA_SECRET` which we get by adding Key in Security Section in FaunaDb dashboard.

3. Create a collection in Fauna called `snippets`.

4. Different Commands for `CRUD` operations and querying can be found [here](https://docs.fauna.com/fauna/current/start/fql_for_sql_users.html).

### AUTH0 SetUP

1. For Auth0-NextJs documentation, refer this [Github Repo](https://github.com/auth0/nextjs-auth0/blob/main/README.md).

2. [Sign up for a free account at Auth0](https://auth0.com/signup). 

3. Go To Application and create new Application.

4. In `Application Properties` section, add the following details:
   ```bash
    Allowed Callback URLs = http://localhost:3000/api/auth/callback
    Allowed Logout URLs = http://localhost:3000/
   ```
   
5. In Settings find the various Keys and add the following in `.env.local`.
   ```bash
    AUTH0_SECRET='LONG_RANDOM_VALUE'

    # The base url of your application
    AUTH0_BASE_URL='http://localhost:3000'

    # The url of your Auth0 tenant domain
    AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'

    # Your Auth0 application's Client ID
    AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'

    # Your Auth0 application's Client Secret
    AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
    ```
