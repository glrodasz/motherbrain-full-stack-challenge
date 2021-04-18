const http = require("http");
const { URL } = require("url");
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: process.env.ES_URL
});

http.createServer(handle).listen(8080);

async function handle(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const url = new URL(`http://incoming${req.url}`);
    switch (`${req.method} ${url.pathname}`) {
      case "GET /orgs":
        res.writeHead(200).end(
          JSON.stringify({
            message: "OK",
            results: await searchOrgs(url.searchParams)
          })
        );
        break;

      case "GET /fundings":
        res.writeHead(200).end(
          JSON.stringify({
            message: "OK",
            results: await searchFundings(url.searchParams)
          })
        );
        break;

      default:
        res.writeHead(404).end(
          JSON.stringify({
            message: "Not Found"
          })
        );
        break;
    }
  } catch (e) {
    console.error(e.stack);
    res.writeHead(500).end(
      JSON.stringify({
        message: "Something went wrong"
      })
    );
  }
}

function buildSearchParams(index, queryParams) {
  const limit = queryParams.get("limit");
  const offset = queryParams.get("offset");
  const sortBy = queryParams.get("sort_by");
  const orderBy = queryParams.get("order_by");
  const query = queryParams.get("query");

  const searchParams = {
    index,
    body: {
      size: limit != null ? limit : 10,
      from: offset != null ? offset : 0,
    },
  };

  if (sortBy) {
    searchParams.body.sort = [{ [sortBy]: orderBy || "asc" }];
  }

  if (query) {
    searchParams.q = query
  }

  return searchParams
}

async function searchOrgs(queryParams) {
  const searchParams = buildSearchParams('org', queryParams)
  const response = await client.search(searchParams);

  return {
    hits: response.body.hits.hits.map(h => h._source),
    total: response.body.hits.total.value
  };
}

async function searchFundings(queryParams) {
  const searchParams = buildSearchParams('funding', queryParams)
  const response = await client.search(searchParams);

  return {
    hits: response.body.hits.hits.map(h => h._source),
    total: response.body.hits.total.value
  };
}
