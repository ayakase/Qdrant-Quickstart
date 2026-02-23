import { Hono } from 'hono'
import { QdrantClient } from "@qdrant/js-client-rest";

const app = new Hono()
const client = new QdrantClient({ host: "localhost", port: 6333 });

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.get('/create/:collectionName', async (c) => {
  const collection = await client.createCollection(c.req.param("collectionName"), {
    vectors: { size: 4, distance: "Dot" },
  });
  return c.json(collection)
})
app.get('/show/:collectionName', async (c) => {
  const collection = await client.getCollection(c.req.param("collectionName"));
  return c.json(collection)
})
app.get('/upsert/:collectionName', async (c) => {
  const operationInfo = await client.upsert(c.req.param("collectionName"), {
    wait: true,
    points: [
      { id: 1, vector: [0.05, 0.61, 0.76, 0.74], payload: { city: "Berlin" } },
      { id: 2, vector: [0.19, 0.81, 0.75, 0.11], payload: { city: "London" } },
      { id: 3, vector: [0.36, 0.55, 0.47, 0.94], payload: { city: "Moscow" } },
      { id: 4, vector: [0.18, 0.01, 0.85, 0.80], payload: { city: "New York" } },
      { id: 5, vector: [0.24, 0.18, 0.22, 0.44], payload: { city: "Beijing" } },
      { id: 6, vector: [0.35, 0.08, 0.11, 0.44], payload: { city: "Mumbai" } },
    ],
  });
  return c.json(operationInfo)
})
app.get('/query/:collectionName', async (c) => {
  let searchResult = await client.query(
    c.req.param("collectionName"), {
    // sample vector
    query: [0.2, 0.1, 0.9, 0.7],
    limit: 3
  });
  return c.json(searchResult)
})
export default app
