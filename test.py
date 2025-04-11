from curl_cffi import requests 

headers = {
    'authority': 'gateway.golike.net',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9nYXRld2F5LmdvbGlrZS5uZXRcL2FwaVwvbG9naW4iLCJpYXQiOjE3NDQzNTM0NTEsImV4cCI6MTc3NTg4OTQ1MSwibmJmIjoxNzQ0MzUzNDUxLCJqdGkiOiJTZElkUm40MDF5RmtnRDB1Iiwic3ViIjoyODE2ODc4LCJwcnYiOiJiOTEyNzk5NzhmMTFhYTdiYzU2NzA0ODdmZmYwMWUyMjgyNTNmZTQ4In0.HxexPWqNIxOzsIWaO-00sWM4C_jqF1pCLwddF8ot0Lg',
    'content-type': 'application/json;charset=utf-8',
    'origin': 'https://app.golike.net',
    'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-platform': '"Android"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    't': 'VFZSak1FNUVUVEZOZWxFelRsRTlQUT09',
    'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36',
}
tk = []
response = requests.get('https://gateway.golike.net/api/users/me', headers=headers).json()
tk.append(response['id'])
print(tk.append)
