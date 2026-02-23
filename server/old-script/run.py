# kept for reference

from qdrant_client import models, QdrantClient
from sentence_transformers import SentenceTransformer
from dataset import documents
encoder = SentenceTransformer("all-MiniLM-L6-v2")
client = QdrantClient(url="http://localhost:6333")

# create a collection

# client.create_collection(
#     collection_name="my_books",
#     vectors_config=models.VectorParams(
#         size=encoder.get_sentence_embedding_dimension(),  # Vector size is defined by used model
#         distance=models.Distance.COSINE,
#     ),
# )

# upload points to the collection

# client.upload_points(
#     collection_name="my_books",
#     points=[
#         models.PointStruct(
#             id=idx, vector=encoder.encode(doc["description"]).tolist(), payload=doc
#         )
#         for idx, doc in enumerate(documents)
#     ],
# )

#  query the collection

hits = client.query_points(
    collection_name="my_books",
    query=encoder.encode("future").tolist(),
    limit=3,
).points

for hit in hits:
    print(hit.payload, "score:", hit.score)
