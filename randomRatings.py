import random
import json

def generate_user_objects(user_ids):
    user_objects = []
    for user_id in user_ids:
        other_users = random.sample(user_ids, k=random.randint(int(0.4 * len(user_ids)), int(0.9 * len(user_ids))))
        for other_user in other_users:
            if other_user != user_id:
                rating = random.randint(1, 5)
                user_object = {
                    "reviewerId": user_id,
                    "reviewedId": other_user,
                    "rating": rating
                }
                user_objects.append(user_object)
    return user_objects

user_ids = [
  "44c2b668-24d9-4396-abde-3f69cffaead4",
  "dp4mjMpfCTQwJ8REP66LxioJlXy1",
  "irW11kX6LhRBjOvMsrhJvE6z76D2",
  "b95a34dd-bd99-4204-baa3-bd558d5c82c1",
  "e508771a-30c3-48dd-83ae-6ca55ed7d3e3",
  "nqIdEMjyQVaPAOhHd6INDADSeRE3",
  "EQWYhKFuekbagBb7qo2yKVUc7YU2",
  "9578fa5d-cd56-4f36-961f-27ad5550b9b7",
  "5d347b29-b142-459f-9116-be35e5a387bc",
  "PUbFB3QTSkaKlwyIZuMT3Yn0ggZ2",
  "7e8e6534-808d-4b9c-95ff-9980a0181d02",
  "72c9fe4c-ee72-4a8e-80ca-81b70636e738",
  "45c445e3-b59c-467c-bc22-6ec71651e919",
  "e4c9e6e6-7cd7-4614-a422-edda1baa6840",
  "dccfdaee-b7aa-4b2c-9718-9f30b05da117",
  "64d63384-6c16-4f71-9799-47990fa1748f",
  "a6ff7770-afad-4b5d-97fe-5fc0e678770c",
  "9LJPR2NUkIQ5aU3BRFZlRTLuSw73",
  "6a37ff5e-ac10-4a20-9d43-1adf1211835a",
  "bca12663-cb93-4a55-89d0-1fbc1c878e70",
  "4384125b-be3f-47fc-a93d-d8d3dae19dfa",
  "eedd7b94-75db-4867-ba70-64a86a7df0a3",
  "147eef61-5aa6-41cd-859e-9081442c27a8",
  "5cdb13d3-ef9b-4713-9e5a-69e18ac100b4",
  "6e60296e-1594-43cb-872f-dd5e28bb4397",
  "9f9533a8-9847-4697-9fb8-51cfbd586412",
  "e3859f44-6deb-4665-8f82-40f322ce87d9",
  "0cfc22ba-c5f5-47a9-afb6-d67218024a8d",
  "94ac4065-5dac-48a3-b95d-185d648bd1a9",
  "02e22b5f-4925-490f-acca-c9829a318c95",
  "402a86a1-fc72-4909-813e-7f87b1618f68",
  "656a07e8-4b6e-4de2-8e9d-3755f679f57f",
  "9f6db8ae-7474-4267-9c6c-e619d4dc2cee",
  "c85b824d-bed2-4728-9606-a76d8e23f473",
  "eaefb4b1-1e59-4513-a942-8ed7924782f1",
  "4d039ecd-8f02-45f5-9f51-b1a3d814d600",
  "f7e32779-f488-4c77-b91b-befe45c772e6",
  "ee95eac3-6cdb-41ec-9cfd-4bb0fff91f18",
  "b2edb505-7c11-485d-b852-412fe856669b",
  "5bd80f53-9bc4-4fe3-9147-9f3783ee6850",
  "36e1a29a-9c31-4b35-bd6d-5ce95b58ffaf",
  "246ec58c-e6cf-4ff2-a02f-6425be9c5f52",
  "a5d90900-f7ac-488c-a9ae-93be8b49f628",
  "21cfd048-872a-4142-aa54-c49c17139174",
  "e75c5e21-a987-40a5-9b2c-2180c2f5b0a1",
  "329becd1-62cc-412a-9806-1ff198a9e1be",
  "3d896487-6986-4c4b-980f-12b9e9737608",
  "770eb6df-6063-4a0e-8622-1402d13e7618",
  "bfcbe9e0-7d86-4d03-bdaa-a0b735ef91db",
  "0d0812ae-83a5-44e8-b8bc-df1d5ba71e25",
  "1867b9d6-4e3e-4993-b42e-41905c1059a1",
  "bf53e194-29e5-43e0-bb03-9a61a1fbf06b",
  "e5ef4573-e11c-42fa-a419-f6f5fe62947d",
  "e183a9d9-bb81-4c52-a6c6-d62cbb49f472",
  "abd34f0d-f7c0-47ae-8c94-26886d498e47",
  "ede8d809-ab7b-4412-a06d-e49a1d5b6ec9",
  "fd518e64-b083-4221-9414-6d878fe09c77",
  "5e75575f-cc6e-4178-b0ba-4f5d04844d68",
  "6b78a942-1df4-429e-8ab2-05230691a62c",
  "1b57b252-e840-4d12-9f1f-eb4b17dbdb1a",
  "64ba32a2-20b5-4710-bf89-b30f518279b6",
  "a142dd62-4225-492d-9dcc-8bd211bb26d2",
  "44219136-c6cf-4b2a-9c1f-52ae98281f50",
  "41cde3c2-cb85-472a-befc-db4ca44252e9",
  "7293683a-0246-4b5f-bd50-22528ac9eb52"
]
user_objects = generate_user_objects(user_ids)
json_data = json.dumps(user_objects, indent=4)
with open('P:/ProConnect/user_objects.json', 'w') as file:
    file.write(json_data)