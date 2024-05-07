import random
import json

def generate_user_objects(user_ids):
    user_objects = []
    for user_id in user_ids:
        other_users = random.sample(user_ids, k=random.randint(int(0.5 * len(user_ids)), int(0.9 * len(user_ids))))
        for other_user in other_users:
            if other_user != user_id:
                rating = random.randint(1, 5)
                user_object = {
                    "user_id": user_id,
                    "other_user_id": other_user,
                    "rating": rating
                }
                user_objects.append(user_object)
    return user_objects

user_ids = ["irW11kX6LhRBjOvMsrhJvE6z76D2", "nqIdEMjyQVaPAOhHd6INDADSeRE3", "EQWYhKFuekbagBb7qo2yKVUc7YU2", "PUbFB3QTSkaKlwyIZuMT3Yn0ggZ2", "dp4mjMpfCTQwJ8REP66LxioJlXy1"]  # Replace with your list of user ids
user_objects = generate_user_objects(user_ids)
json_data = json.dumps(user_objects, indent=4)
print(json_data)