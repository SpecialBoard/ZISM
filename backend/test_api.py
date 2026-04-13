import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_api():
    print("1. Registering user 1")
    r1 = requests.post(f"{BASE_URL}/register", json={"password": "password123"})
    assert r1.status_code == 200, r1.text
    user1 = r1.json()
    print("User 1 registered:", user1['user_code'])

    print("2. Registering user 2")
    r2 = requests.post(f"{BASE_URL}/register", json={"password": "password456"})
    assert r2.status_code == 200
    user2 = r2.json()
    print("User 2 registered:", user2['user_code'])

    print("3. Login user 1")
    l1 = requests.post(f"{BASE_URL}/login", data={"username": user1['user_code'], "password": "password123"})
    assert l1.status_code == 200
    token1 = l1.json()['access_token']

    print("4. Login user 2")
    l2 = requests.post(f"{BASE_URL}/login", data={"username": user2['user_code'], "password": "password456"})
    assert l2.status_code == 200
    token2 = l2.json()['access_token']

    headers1 = {"Authorization": f"Bearer {token1}"}
    headers2 = {"Authorization": f"Bearer {token2}"}

    print("5. User 1 adds User 2 as friend")
    f1 = requests.post(f"{BASE_URL}/channels/add-friend", json={"friend_code": user2['user_code']}, headers=headers1)
    assert f1.status_code == 200
    channel_id = f1.json()['id']
    print("Channel created:", channel_id)

    print("6. User 1 sends message to User 2")
    m1 = requests.post(f"{BASE_URL}/messages/{channel_id}", json={"text": "Hello, secure world!"}, headers=headers1)
    assert m1.status_code == 200

    print("7. User 2 fetches messages")
    m2 = requests.get(f"{BASE_URL}/messages/{channel_id}", headers=headers2)
    assert m2.status_code == 200
    msgs = m2.json()
    print(f"Messages fetched: {len(msgs)}")
    for m in msgs:
        print(f" - {m['text']}")
    assert msgs[0]['text'] == "Hello, secure world!"
    
    print("All tests passed!")

if __name__ == "__main__":
    test_api()
